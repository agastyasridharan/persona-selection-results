# Persona Selection — Model Comparisons

Public dashboard: https://agastyasridharan.github.io/persona-selection-results/

Saved reporting-integrity experiments across OLMo 32B (six checkpoints), Llama 3.1–Tülu 3 70B (four checkpoints), Gemma 3 27B (base and IT), and Qwen2.5 32B (base and Instruct). The overview compares raw misconduct continuations; study tabs contain full saved continuations, classifications, supporting quotations, methods, validation records, and figures.

Published scope:

- OLMo: 4,595 classified raw misconduct outputs, revised two-axis audit, archived pilot, and exploration of Other.
- Tülu: 12,263 classified outputs across raw/Assistant formats and misconduct/accurate-reporting objectives; eligible set complete.
- Gemma/Qwen: 12,217 classified outputs across both formats and objectives. Forty main judgments and 32 stronger reviews remain deferred. Available main labels remain when a stronger review is missing.

All settings concern non-biological reporting integrity. Guard-excluded content is omitted; excluded identities retain metadata only. One Tülu output contains a generated credential-shaped string, redacted in its public copy (including any duplicated text); reconstructable token-ID arrays are removed from that record. The snapshot manifest identifies the affected trial and retains hashes of original private source files. Other published continuations preserve the saved text. Outputs have a 192-token generation budget; judgments are exploratory and do not establish real-world efficacy or an internal persona mechanism.

This is a curated static export, not the complete private research project. Credentials, private machine configuration, and raw API archives are not published. Study protocols sometimes refer to private archives that are intentionally absent. Coin-flip and ordinary-completion experiments are not included in this reporting-integrity dashboard.

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
