# Persona Selection — Research Dashboard

Public dashboard: https://agastyasridharan.github.io/persona-selection-results/

The default **Benign continuations** workspace combines the trajectory overview, all 64 exact prefixes, and a searchable full-record reader. Shared checkpoint / prefix / condition / wording / observation-window filters connect all views. Click a chart segment or prefix to open its records. The reader shows exact continuations, native follow-up boundaries, evidence highlights, primary and stronger judgments, and classifications across windows. URLs preserve filters and record selections; `j` / `k` navigate records when focus is outside a control.

Benign coverage: 20,323 retained first-stage samples, 20,310 short-window observations from the same draws, and 4,001 retained joint follow-ups. The combined chart has **one entry per original sample**: 4,001 joint replacements, 16,316 unchanged first-stage labels, and six unresolved excluded follow-ups. The windows have different denominators and observed lengths. Functional labels include document Q&A and do not establish an internal Assistant basin. Two window records of one benign generated credential-shaped string are redacted in the public copy; labels are unchanged and evidence highlighting is disabled for these copies. See the Methods tab and final report for all limitations.

The other study tabs preserve the saved reporting-integrity experiments across OLMo 32B (six checkpoints), Llama 3.1–Tülu 3 70B (four checkpoints), Gemma 3 27B (base and IT), and Qwen2.5 32B (base and Instruct). The overview compares raw misconduct continuations; study tabs contain full saved continuations, classifications, supporting quotations, methods, validation records, and figures.

Published scope:

- OLMo: 4,595 classified raw misconduct outputs, revised two-axis audit, archived pilot, and exploration of Other.
- Tülu: 12,263 classified outputs across raw/Assistant formats and misconduct/accurate-reporting objectives; eligible set complete.
- Gemma/Qwen: 12,217 classified outputs across both formats and objectives. Forty main judgments and 32 stronger reviews remain deferred. Available main labels remain when a stronger review is missing.

All settings concern non-biological reporting integrity. Guard-excluded content is omitted; excluded identities retain metadata only. One Tülu output contains a generated credential-shaped string, redacted in its public copy (including any duplicated text); reconstructable token-ID arrays are removed from that record. The snapshot manifest identifies the affected trial and retains hashes of original private source files. Other published continuations preserve the saved text. Reporting-integrity outputs have a 192-token generation budget; judgments are exploratory and do not establish real-world efficacy or an internal persona mechanism.

This is a curated static export, not the complete private research project. Credentials, private machine configuration, and raw API archives are not published. Study protocols sometimes refer to private archives that are intentionally absent. Coin-flip experiments and historical superseded benign grading runs are not included. The completed functional-v2 benign census is published.

## Browse and reproduce

Use the study tabs, checkpoint/format/objective selectors, and trial filters to inspect outputs and judge evidence. Data loads by condition rather than downloading an entire checkpoint. OLMo personal review notes use browser-local storage and can be exported; they are never uploaded.

With Node.js 22.13 or later:

```sh
npm ci
npm run build
npm run preview
```

GitHub Pages serves the committed `docs/` directory on `main`. After editing source or curated `public/` data, build, commit source/data plus `docs/`, and push. The deployed site requires no local server, VPN, or GPUs. It is a saved snapshot; updates require another deployment.

`public/snapshot-manifest.json` contains source checksums, counts, publication redactions, and exported-file checksums. The repository was previously named `olmo-raw-continuations`; GitHub Pages does not redirect the old website URL after a repository rename. Use the new dashboard URL above.

## Benign snapshot maintenance

`public/data/benign/` contains a compact classification index, protocol, final reports and figures, and 160 full-record shards keyed by checkpoint and prefix family. The UI fetches only the shard being inspected. The export preserves saved labels and text, except the documented credential-shaped-string redactions; operational API request identifiers are omitted. Excluded extensions have no exported text.

To refresh from an authorized private research checkout that already contains the completed screened browser exports:

```sh
python3 scripts/export-benign.py /path/to/private/research/project
npm run build
python3 scripts/validate-benign.py
```

This does not perform inference or grading. Validation reconciles all checkpoint/category denominators with the final combined report, checks each record against the classification index, verifies original/joint text boundaries and all judge evidence spans, and verifies public/build file hashes. Source checksums and public redactions are recorded in `snapshot-manifest.json`. Run the benign exporter after any legacy-study exporter so its manifest entries are retained.

The compact toolbar, tabular prefix browser, and adjacent text/evidence panes take visual inspiration from the linked Story imprinting O-lens viewer. This implementation uses the existing React/Vite GitHub Pages application and no backend service.
