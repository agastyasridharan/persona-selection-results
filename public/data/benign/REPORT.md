# Benign role generalization: final descriptive results

Generation and API grading are complete. The final provenance/coverage audit and an independent reporting/selection audit passed. This does not establish semantic label accuracy. All figures summarize exploratory functional role labels, not measurements of an internal Assistant basin.

## Coverage and procedure

16 families × 2 wordings × target/control × 10 checkpoints × 32 draws = 20,480 first-stage records. The original 5,120 pilot records are unchanged. Native raw input formatting, BOS, checkpoint revisions, BF16 sampling and stopping rules were preserved; first-stage generation stops at the model’s native stopping token or 512 new tokens. The short-window analysis uses the first 192 tokens of the same draws, not independent generations.

After screening, 20,323 first-stage outputs remain: 136 excluded by the generation guard and 21 additionally excluded before grading. No excluded content is reconstructed or analyzed. Thirteen exact short-window decodes were unavailable and were omitted, leaving 20,310 matched 192/512 pairs.

Every eligible native turn boundary received one separately stored additional turn using exact original input/output tokens, without an injected Assistant header. There are 4,007 eligible records, of which 6 extensions were screened out and 4,001 have joint judgments. The 998 pilot follow-ups are included once using the fixed draw; the other 273 selected-pilot draws are excluded from these population summaries.

All 44,634 primary GPT-5.4-mini assessments and 19,155 selected GPT-5.4 reviews are saved. No API assessments remain quarantined or ungraded. Strong review covers every primary Assistant-positive/uncertain or uncertain trajectory plus a deterministic 10% sample of the remaining negatives. 2,999 reviewed assessments disagree on initial role, role presence or trajectory and remain unresolved. Unreviewed negatives remain provisional. Agreement is not accuracy, and the selected review set is not a representative error-rate sample.

## How to read the results

Trajectory percentages divide by all retained outputs in that checkpoint/window, including uncertainty. “Context → Assistant” requires no earlier generated User request. “Context → User → Assistant” includes newly generated questions/exercises followed by answers, including document-style Q&A under the approved permissive rubric. Assistant-presence percentages can exceed the sum of resolved Assistant trajectories because judges may agree that an Assistant appears while disagreeing about its order or initial mode. “Other” is not synonymous with gibberish.

The matched controls differ by family. Target/control comparisons should be interpreted within each family; a pooled target advantage has no single causal meaning. Charts pool equal planned cells but use retained-output denominators after screening.

## First-stage results, up to 512 tokens

| Checkpoint | n | Assistant present | Direct context → Assistant | Context → User → Assistant | User without observed Assistant | Uncertain trajectory |
|---|---:|---:|---:|---:|---:|---:|
| OLMo pretraining | 2,024 | 6.4% | 0.7% | 4.6% | 6.6% | 6.9% |
| OLMo mid-training | 2,025 | 33.0% | 2.8% | 27.3% | 4.9% | 7.2% |
| OLMo released base | 2,029 | 44.7% | 2.1% | 39.6% | 5.1% | 6.4% |
| OLMo SFT | 2,028 | 28.2% | 1.6% | 24.8% | 33.1% | 8.3% |
| OLMo DPO | 2,040 | 25.4% | 1.4% | 22.1% | 40.5% | 6.2% |
| OLMo RL | 2,038 | 27.9% | 1.8% | 24.1% | 39.7% | 6.7% |
| Gemma base | 2,037 | 6.5% | 1.8% | 4.3% | 9.1% | 5.1% |
| Gemma IT | 2,047 | 43.6% | 13.2% | 27.3% | 5.5% | 5.5% |
| Qwen base | 2,020 | 46.8% | 2.6% | 36.3% | 5.9% | 9.6% |
| Qwen Instruct | 2,035 | 74.6% | 9.3% | 54.9% | 1.3% | 12.1% |

The main observed pattern is generated Q&A, rather than immediate Assistant speech or predominantly direct switches. Assistant behavior is already present in base checkpoints. OLMo rises substantially during mid-training and before the released base, so comparisons that call the released base “pure pretraining” would be misleading. Gemma IT and Qwen Instruct show more Assistant behavior than their respective base checkpoints in this study. OLMo’s post-trained first-stage rates cannot be interpreted without its frequent turn-ending stops.

## What the boundary follow-up changes

| Checkpoint | Eligible / retained population | Joint graded | Assistant before / after (same eligible subset) | No → yes | No → yes / full retained population | Yes → no |
|---|---:|---:|---:|---:|---:|---:|
| OLMo pretraining | 0 / 2024 | 0 | Not applicable | 0 | 0.0% | 0 |
| OLMo mid-training | 0 / 2025 | 0 | Not applicable | 0 | 0.0% | 0 |
| OLMo released base | 0 / 2029 | 0 | Not applicable | 0 | 0.0% | 0 |
| OLMo SFT | 797 / 2028 | 793 | 14.2% / 95.1% | 586 | 28.9% | 0 |
| OLMo DPO | 959 / 2040 | 958 | 10.2% / 97.4% | 792 | 38.8% | 1 |
| OLMo RL | 963 / 2038 | 962 | 8.9% / 96.3% | 794 | 39.0% | 2 |
| Gemma base | 0 / 2037 | 0 | Not applicable | 0 | 0.0% | 0 |
| Gemma IT | 1274 / 2047 | 1274 | 44.4% / 47.1% | 52 | 2.5% | 23 |
| Qwen base | 0 / 2020 | 0 | Not applicable | 0 | 0.0% | 0 |
| Qwen Instruct | 14 / 2035 | 14 | 78.6% / 78.6% | 0 | 0.0% | 0 |

OLMo SFT/DPO/RL frequently end after generating User-like material. The additional turn commonly supplies an answer, producing Context → User → Assistant. This is different evidence from a spontaneous direct switch. The follow-up population is selected by native stopping behavior, not the initial role judgment. Base checkpoints have zero eligible native turn boundaries here: this is not a measured zero conditional response probability. Qwen Instruct has only 14 eligible cases, too few for a stable conditional comparison.

Gemma’s eligible population is also different from OLMo’s, and often continues context. Joint rates must not be compared as if all checkpoints received equivalent follow-ups. Counts of first-stage no → joint yes divided by the full retained population describe observed additional detections under this stopping protocol, not an unconditional causal effect of post-training.

## Paired length comparison and reliability limitation

| Checkpoint | Paired n | Assistant at 192 | Assistant at 512 | No → yes | Yes → no |
|---|---:|---:|---:|---:|---:|
| OLMo pretraining | 2024 | 4.3% | 6.4% | 45 | 9 |
| OLMo mid-training | 2023 | 20.8% | 33.0% | 241 | 7 |
| OLMo released base | 2029 | 24.8% | 44.7% | 394 | 16 |
| OLMo SFT | 2023 | 19.1% | 28.2% | 189 | 11 |
| OLMo DPO | 2039 | 19.1% | 25.4% | 129 | 6 |
| OLMo RL | 2036 | 20.0% | 27.9% | 161 | 5 |
| Gemma base | 2037 | 5.1% | 6.5% | 38 | 10 |
| Gemma IT | 2047 | 35.1% | 43.6% | 165 | 7 |
| Qwen base | 2019 | 38.1% | 46.8% | 176 | 8 |
| Qwen Instruct | 2033 | 63.9% | 74.6% | 217 | 14 |

Longer windows generally yield more Assistant-positive judgments, but the classifier is not perfectly consistent across nested windows. The same visible earlier text can receive yes at 192 and no at 512, or yes before extension and no after extension. These reversals are explicitly reported; they may reflect classification errors or interpretation changes with more context, not disappearance of earlier tokens. No labels were manually overwritten to enforce monotonicity.

## Attribution-scope sensitivity

Among Assistant-positive first-stage outputs, the majority in every checkpoint have agreed document-Q&A scope. Counting these as functional Assistant behavior follows the approved rubric, but should not be mistaken for a model identifying itself as a live AI assistant. Scope disagreements remain visible and do not change the primary trajectory rule.

| Checkpoint | Assistant-positive n | Agreed document Q&A | Agreed conversational | Scope disagreement |
|---|---:|---:|---:|---:|
| OLMo pretraining | 129 | 71.3% | 3.1% | 15.5% |
| OLMo mid-training | 668 | 87.9% | 1.8% | 8.7% |
| OLMo released base | 907 | 89.1% | 1.9% | 7.6% |
| OLMo SFT | 572 | 87.1% | 2.4% | 7.9% |
| OLMo DPO | 519 | 83.2% | 3.9% | 11.2% |
| OLMo RL | 569 | 85.2% | 3.7% | 10.2% |
| Gemma base | 132 | 75.8% | 2.3% | 15.2% |
| Gemma IT | 893 | 72.3% | 9.9% | 17.0% |
| Qwen base | 945 | 89.5% | 2.5% | 6.6% |
| Qwen Instruct | 1518 | 81.2% | 7.0% | 10.9% |

Other scopes (forum, quoted examples and unclear) are included in the JSON export. These percentages condition on Assistant-positive outputs, not on all generations.

## Interpretation and limits

These results support context-sensitive selection among continuation behaviors. They do not show that the post-trained Assistant uniformly takes over non-Assistant text. Direct transitions exist but are much less common than generated question–answer sequences; both family and training stage matter. Under the permissive functional rubric, worksheet-like answers count. The scope-sensitivity export distinguishes agreed conversational, document-Q&A, forum and other scope tags; these tags are descriptive, not a validated alternative classifier.

The study cannot identify an internal attractor or prove/disprove PSM. Correlated judges, ambiguous segmentation, scope attribution, screened exclusions and finite generation lengths limit interpretation. Statistical confidence intervals would not remove semantic grading errors. Figures are descriptive percentages, not confidence intervals.

## Saved artifacts

- `final-trajectories.jpg`: separate raw first-stage and conditional joint trajectories.
- `final-length-boundary.jpg`: paired length and eligible-boundary comparisons.
- `final-family-controls.jpg`: per-family target/control Assistant-presence rates.
- `final-summary.json`: all checkpoint counts, denominators, transitions, usage and provenance.
- `final-groups.json`: checkpoint, family, condition and wording tables for each window.
- `final-scope-sensitivity.json`: agreed attribution scopes among Assistant-positive outputs.
- `final-audit.json`: generation, exact-token boundary, source/evidence and reuse checks.

API costs: request-level token usage, including retries, is in final-summary.json. Reused prior trial judgments are identified separately; their original charges are not newly incurred by this census. No dollar estimate is inferred from unverified pricing. DeepSeek inference remains deferred.
