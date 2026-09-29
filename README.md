# OLMo raw-continuation behavior audit

Interactive public dashboard: https://agastyasridharan.github.io/olmo-raw-continuations/

A static snapshot of 4,595 saved OLMo 32B continuations across end-of-pretraining, end-of-mid-training, released-base, SFT, DPO, and RL checkpoints. Includes the completed two-axis refusal/assistance audit, supporting evidence, archived rejected pilot, and a preliminary exploration of the Other category.

All records concern twelve non-biological reporting-integrity settings. Guarded records and calibration overlaps remain excluded. This repository contains curated browser-facing data and UI source, not credentials, raw API request archives, or the full research project. Full visible outputs are limited by the original 192-token generation budget. Judgments remain exploratory; unresolved classifications and documented disagreements are retained.

## Use and reproduce

Open the dashboard to filter by checkpoint, setting, category, review status, or text. Inspect full saved outputs and judge explanations; download individual records, counts, protocols, and figures. Personal review notes use browser-local storage and can be exported. They are not uploaded or synced.

With Node.js 22.13+:

```sh
npm ci
npm run build
npm run preview
```

GitHub Pages serves the committed `docs/` directory on `main`. After changing source or the curated data in `public/`, run `npm run build`, commit the updated source/data and `docs/`, and push. Publishing does not require a running local server. It is a snapshot, not a live connection to ongoing runs.

`public/snapshot-manifest.json` records the curated source-file checksums. Original methods and audit history are under `public/data/raw-behavior-v2/`. Some methods describe the original local pipeline and refer to private run archives that are intentionally not included here.
