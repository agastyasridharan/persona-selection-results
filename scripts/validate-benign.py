#!/usr/bin/env python3
"""Validate the distributable benign snapshot without any private source files."""
import collections
import hashlib
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
DATA = ROOT / 'public/data/benign'
read = lambda p: json.loads(p.read_text())
index = read(DATA / 'index.json')
protocol = read(DATA / 'protocol.json')
parents = {r['parent_id']: r for r in index}
assert len(parents) == len(index) == 20323
cells = {c['cell']: c for c in protocol['cells']}
assert len(cells) == 64
summary = read(DATA / 'combined-trajectories-summary.json')
assert dict(collections.Counter(r['rule'] for r in index)) == summary['rules']
for stage, group in summary['by_checkpoint'].items():
    counts = collections.Counter(r['views']['combined']['category'] for r in index if r['stage'] == stage)
    assert sum(counts.values()) == group['n']
    assert all(counts[k] == v for k, v in group['counts'].items())
seen = set()
windows = collections.Counter()
evidence_count = 0
for file in (DATA / 'records').glob('*/*.json'):
    for parent, views in read(file).items():
        assert parent not in seen
        seen.add(parent)
        meta = parents[parent]
        assert file.stem == meta['family'] and file.parent.name == meta['stage']
        assert set(views) == set(meta['views']) - {'combined'}
        for window, record in views.items():
            windows[window] += 1
            assert record['parent_id'] == parent and record['window'] == window
            assert record['prompt'] == cells[record['cell']]['prompt']
            for field in ['category', 'assistant_presence', 'review_status']:
                assert record[field] == meta['views'][window][field]
            text = record['completion']
            boundary = record['extension_boundary_char']
            if window == 'joint':
                assert isinstance(boundary, int) and 0 <= boundary <= len(text)
                assert text[:boundary] == views['512']['completion']
            else:
                assert boundary is None
            for judge in ['primary', 'review']:
                for evidence in (record.get(judge) or {}).get('evidence', {}).values():
                    evidence_count += 1
                    a, b = evidence['start_char'], evidence['end_char']
                    assert 0 <= a <= b <= len(text)
                    if not record.get('publication_redaction'):
                        assert text[a:b].strip() == evidence['quote'].strip()
assert seen == set(parents)
assert dict(windows) == {'512': 20323, '192': 20310, 'joint': 4001}
snapshot = read(ROOT / 'public/snapshot-manifest.json')
checked = 0
for relative, expected in snapshot['files'].items():
    if not relative.startswith('data/benign/'):
        continue
    assert hashlib.sha256((ROOT / 'public' / relative).read_bytes()).hexdigest() == expected
    assert (ROOT / 'docs' / relative).read_bytes() == (ROOT / 'public' / relative).read_bytes()
    checked += 1
print(json.dumps({'parents': len(seen), 'windows': dict(windows), 'evidence_spans': evidence_count, 'checked_deployed_files': checked, 'status': 'passed'}))
