#!/usr/bin/env python3
"""Export only screened, completed benign census artifacts. Never run inference.

Usage: python3 scripts/export-benign.py /path/to/private/research/project
"""
import collections
import hashlib
import json
import pathlib
import re
import shutil
import sys

DEST = pathlib.Path(__file__).resolve().parents[1] / 'public'
ROOT = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else DEST.parents[1]
SOURCE = ROOT / 'dashboard/public/data/benign-functional-census-v2'
OUT = DEST / 'data/benign'
STAGES = ['olmo_pretrain', 'olmo_midtrain', 'olmo_base', 'olmo_sft', 'olmo_dpo', 'olmo_rl', 'gemma_base', 'gemma_instruct', 'qwen_base', 'qwen_instruct']

def read(path):
    return json.loads(path.read_text())

def save(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, separators=(',', ':')) + '\n')

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def keep(value, keys):
    return {k: value[k] for k in keys.split() if k in value}

source_hashes = {}
def source(name):
    path = SOURCE / name
    source_hashes[name] = digest(path)
    return read(path)

manifest = read(ROOT / 'experiments/benign-role-generalization-v1/manifest.json')
combined = source('combined-trajectories-rows.json')
summary = source('combined-trajectories-summary.json')
reference = source('chart-counts.json')
assert summary['audit_passed'] and len(combined) == summary['original_samples'] == 20323
parents = {r['parent_id']: r for r in combined}
assert len(parents) == len(combined)
assert dict(collections.Counter(r['rule'] for r in combined)) == summary['rules']
index = []
counts = collections.Counter()
redactions = []
patterns = [r'(?<![\w-])sk-(?:proj-)?[A-Za-z0-9_-]{24,}', r'gh[pousr]_[A-Za-z0-9]{25,}', r'github_pat_[A-Za-z0-9_]{30,}', r'-----BEGIN [A-Z ]*PRIVATE KEY-----']

def redact(value):
    if isinstance(value, str):
        for pattern in patterns:
            value = re.sub(pattern, '[CREDENTIAL-SHAPED STRING REDACTED]', value)
    elif isinstance(value, dict):
        value = {k: redact(v) for k, v in value.items()}
    elif isinstance(value, list):
        value = [redact(v) for v in value]
    return value

for stage in STAGES:
    rows = {}
    for window in ['512', '192', 'joint']:
        original = source(f'{window}-{stage}.json')
        actual = collections.Counter((r['stage'], r['family'], r['condition'], r['wording'], r['category']) for r in original)
        expected = {tuple(r[k] for k in ['stage', 'family', 'condition', 'wording', 'category']): r['count'] for r in reference[window] if r['stage'] == stage}
        assert actual == expected, (stage, window, 'classification mismatch')
        for r in original:
            assert r['parent_id'] in parents and r['window'] == window
            assert r.get('status') != 'excluded'
            item = keep(r, 'id parent_id stage family condition wording sample cell prompt completion manifest_sha256 window extension_boundary_char extension_id output_ids_sha256 generated_tokens category assistant_presence primary_category review_status disagreements')
            for judge in ['primary', 'review']:
                j = r.get(judge)
                item[judge] = keep(j, 'assessment raw_assessment normalizations evidence events category uncertain_reason attribution_scope model rubric_sha256 source_sha256 parser_sha256 delegated_parser_sha256 grading_version status judged_at') if j else None
            clean = redact(item)
            if clean != item:
                clean['publication_redaction'] = 'A credential-shaped generated string was redacted in this public copy.'
                redactions.append(r['id'])
            rows.setdefault(r['parent_id'], {})[window] = clean
            counts[window] += 1
    shards = collections.defaultdict(dict)
    for parent_id, views in rows.items():
        assert '512' in views
        parent = parents[parent_id]
        row = views['512']
        joined = views.get('joint')
        rule = parent['rule']
        assert bool(joined) == (rule == 'joint_replaces_first')
        if joined:
            assert joined['id'] == parent['source_id'] and joined['category'] == parent['category']
        elif rule == 'ineligible_keep_first':
            assert row['category'] == parent['category']
        else:
            assert rule == 'eligible_extension_excluded' and parent['category'] == 'uncertain'
        metadata = keep(row, 'parent_id stage family condition wording sample cell')
        metadata['rule'] = rule
        metadata['views'] = {w: keep(v, 'category assistant_presence review_status') for w, v in views.items()}
        metadata['views']['combined'] = {**keep(parent, 'category review_status'), 'assistant_presence': (joined or row)['assistant_presence'] if rule != 'eligible_extension_excluded' else 'uncertain'}
        index.append(metadata)
        shards[row['family']][parent_id] = views
    for family, shard in shards.items():
        save(OUT / 'records' / stage / f'{family}.json', shard)

assert dict(counts) == {'512': 20323, '192': 20310, 'joint': 4001}
for stage, group in summary['by_checkpoint'].items():
    actual = collections.Counter(r['views']['combined']['category'] for r in index if r['stage'] == stage)
    assert sum(actual.values()) == group['n']
    assert all(actual[k] == n for k, n in group['counts'].items())

save(OUT / 'index.json', sorted(index, key=lambda r: (STAGES.index(r['stage']), r['family'], r['wording'], r['condition'], r['sample'])))
save(OUT / 'protocol.json', {**keep(manifest, 'protocol models cells samples_per_cell planned_total generation'), 'snapshot': '2026-09-30', 'windows': dict(counts), 'combined': summary})
for name in ['REPORT.md', 'rubric.txt', 'final-summary.json', 'final-groups.json', 'final-scope-sensitivity.json', 'final-audit.json', 'combined-trajectories-summary.json', 'combined-trajectories-rows.json', 'combined-trajectories.jpg', 'combined-trajectories.pdf', 'final-trajectories.jpg', 'final-trajectories.pdf', 'final-length-boundary.jpg', 'final-length-boundary.pdf', 'final-family-controls.jpg', 'final-family-controls.pdf']:
    path = SOURCE / name
    source_hashes[name] = digest(path)
    shutil.copy2(path, OUT / name)

# Fail closed without printing possible secrets. Inspect only screened export files.
secret_values = []
env = ROOT / '.env'
if env.exists():
    for line in env.read_text().splitlines():
        if '=' not in line or line.lstrip().startswith('#'):
            continue
        key, value = line.split('=', 1)
        value = value.strip().strip('"').strip("'")
        if re.search(r'KEY|TOKEN|SECRET|PASSWORD', key, re.I) and len(value) > 12:
            secret_values.append(value)
for path in OUT.rglob('*'):
    if path.is_file() and path.suffix in ['.json', '.txt', '.md']:
        blob = path.read_text()
        assert not any(secret in blob for secret in secret_values), f'Export blocked: {path.name}'
        assert '/Users/agastyasridharan/' not in blob, f'Private path: {path.name}'
        assert not any(re.search(pattern, blob) for pattern in patterns), f'Credential-shaped text: {path.name}'

snapshot = read(DEST / 'snapshot-manifest.json')
snapshot['description'] = 'Persona Selection research dashboard; curated completed snapshots.'
snapshot['counts']['benign-functional-census-v2'] = {**dict(counts), 'original_samples': len(index), 'excluded_first_stage': 157, 'excluded_extensions': 6}
snapshot['benign_source_sha256'] = source_hashes
snapshot['benign_publication_redactions'] = redactions
snapshot['files'] = {str(p.relative_to(DEST)): digest(p) for p in sorted(DEST.rglob('*')) if p.is_file() and p.name != 'snapshot-manifest.json'}
save(DEST / 'snapshot-manifest.json', snapshot)
print(json.dumps({'parents': len(index), 'windows': dict(counts), 'shards': len(list((OUT/'records').glob('*/*.json'))), 'redactions': len(redactions), 'checks': 'all labels, denominator counts, source joins and publication scan passed'}))
