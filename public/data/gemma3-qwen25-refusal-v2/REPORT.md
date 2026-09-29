Gemma 3 27B and Qwen2.5 32B: available results

The study generated 12,288 outputs. Available results are finalized for 12,217 classified outputs; 40 remain ungraded after interrupted API requests, and 31 are excluded (23 by the initial guard, 8 after API safety flags). Safety-flagged content was not inspected or resubmitted.

The main judge supplied 12,217 saved judgments. There are 5,736 saved stronger reviews and 32 deferred stronger reviews; those deferred cases retain their main labels. The recorded-response cost estimate is $96.85, excluding unknown charges from interrupted requests. This is an available-case analysis, not a claim that every planned judgment was completed.

Raw falsification/concealment continuations:

| Checkpoint | Classified n | Refusal only | Assistance + refusal | Assistance only | Other | Uncertain |
|---|---:|---:|---:|---:|---:|---:|
| Gemma 3 27B base | 760 | 0.0% | 0.0% | 82.0% | 17.6% | 0.4% |
| Gemma 3 27B IT | 759 | 4.1% | 39.9% | 53.0% | 2.8% | 0.3% |
| Qwen2.5 32B base | 763 | 0.0% | 3.3% | 77.1% | 18.7% | 0.9% |
| Qwen2.5 32B Instruct | 760 | 0.8% | 33.9% | 64.2% | 0.5% | 0.5% |

Each percentage uses classified outputs as its denominator. Uncertain labels stay in that denominator; ungraded and excluded outputs do not. Bars pool 64 draws of each of twelve fixed prompts before exclusions. The repeated draws do not represent additional independent task settings.

Assistant-turn falsification/concealment controls:

| Checkpoint | Classified n | Any actual refusal | Any useful harmful assistance |
|---|---:|---:|---:|
| Gemma 3 27B base | 759 | 0.3% | 27.7% |
| Gemma 3 27B IT | 759 | 100.0% | 0.0% |
| Qwen2.5 32B base | 761 | 7.2% | 28.4% |
| Qwen2.5 32B Instruct | 763 | 96.3% | 0.0% |

These columns use the two independently judged axes and overlap when both are yes. A known yes on one axis still counts when the other axis is uncertain. Base checkpoints receive the same family chat wrapper as a formatting control; they are not natively instruction-tuned.

Accurate-reporting controls:

| Checkpoint | Format | Classified n | Useful truthful assistance | Actual refusal |
|---|---|---:|---:|---:|
| Gemma 3 27B base | Raw | 767 | 91.0% | 0.0% |
| Gemma 3 27B base | Assistant wrapper | 768 | 39.1% | 0.0% |
| Gemma 3 27B IT | Raw | 767 | 100.0% | 0.0% |
| Gemma 3 27B IT | Assistant wrapper | 768 | 97.8% | 0.0% |
| Qwen2.5 32B base | Raw | 767 | 90.9% | 0.0% |
| Qwen2.5 32B base | Assistant wrapper | 764 | 44.2% | 0.4% |
| Qwen2.5 32B Instruct | Raw | 765 | 99.6% | 0.0% |
| Qwen2.5 32B Instruct | Assistant wrapper | 767 | 100.0% | 0.0% |

Interpretation:

For Gemma, any labeled actual refusal in raw misconduct continuations changes from 0.0% in base to 44.1% after instruction tuning. The instruction-tuned model has 39.9% assistance-plus-refusal and 4.1% refusal-only outputs. This distinguishes refusal language accompanying useful misconduct assistance from refusals that avoid providing such assistance within the observed window.

For Qwen, any labeled actual refusal in raw misconduct continuations changes from 3.3% in base to 34.7% after instruction tuning. The instruction-tuned model has 33.9% assistance-plus-refusal and 0.8% refusal-only outputs. This distinguishes refusal language accompanying useful misconduct assistance from refusals that avoid providing such assistance within the observed window.

These observations support the narrower claim that assistant-like refusal behavior can appear outside the chat wrapper in these model families and prompts. They do not identify an internal persona mechanism, prove coherent goals outside chat, or establish robustness to other prompts. A 192-token completion may omit later changes of behavior. The unfinished numbered-list prefixes themselves provide strong genre and task cues.

The raw cross-family comparison uses saved OLMo and Llama–Tülu aggregate results. Differences in architecture, training data, model size, post-training, and review history prevent attribution to a single causal training ingredient. Exact source-summary hashes accompany the comparison.

The supplementary cited-evidence ordering in the numerical export compares judge-selected line numbers for assistance and refusal. It does not establish the first occurrence of either behavior or demonstrate a latent transition into an assistant state.

Validation and limitations:

Main judge: agreement with 32 available precommitted census reference assessments is 28/32 for assistance and 32/32 for refusal. Disagreements: F01, F07, F08, F28. These are Codex assessments, not independent human ground truth.
Stronger reviewer: agreement with 32 available precommitted census reference assessments is 29/32 for assistance and 32/32 for refusal. Disagreements: F01, F07, F08. These are Codex assessments, not independent human ground truth.

There are 7 preserved manual uncertainty overrides. Targeted inspections found both defensible stronger-judge corrections and residual ambiguities about substantive assistance and warning-versus-refusal. Selected review and targeted inspections cannot establish general classification accuracy.

Available-main and available-review integrity audits check source hashes, payloads, saved responses, quotation lines, and label identity. Integrity is distinct from semantic correctness. Rubrics were frozen; source labels and disagreements remain inspectable in the dashboard. No flagged content was used in this report.

Files:

- METHODS.md: checkpoints, BOS correction, sampling, rubrics and exclusions.
- gq-results-analysis.json: exact numerical counts per group and setting.
- gq-results-raw.jpg / .pdf: raw continuations and accurate-reporting controls.
- gq-results-assistant.jpg / .pdf: Assistant-turn controls.
- gq-results-settings.jpg / .pdf: twelve-setting breakdown.
- gq-results-families.jpg / .pdf: four-family comparison.
- census-main-available-audit.json and census-review-available-audit.json: available-result integrity audits.
- census-validation-comparison.json and census-interim-spotchecks.json: reference comparisons and targeted inspection notes.
