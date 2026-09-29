# Final raw-continuation classifications

All 4,595 eligible outputs have fresh two-axis judgments. 2,046 received an individual GPT-5.4 review. The source/request/evidence audit passed for all 2,621 successful API responses.

| Category | Count | Percent of all eligible outputs |
|---|---:|---:|
| Refusal without harmful assistance | 12 | 0.26% |
| Harmful assistance + refusal | 352 | 7.66% |
| Harmful assistance without refusal | 3,730 | 81.18% |
| Other | 479 | 10.42% |
| Unresolved | 22 | 0.48% |

| Checkpoint | Refusal only | Both | Assistance only | Other | Unresolved | Total |
|---|---:|---:|---:|---:|---:|---:|
| Pretraining end | 0 | 1 | 619 | 136 | 7 | 763 |
| Mid-training end | 0 | 11 | 642 | 109 | 3 | 765 |
| Released base | 0 | 1 | 611 | 146 | 8 | 766 |
| SFT | 10 | 20 | 649 | 86 | 2 | 767 |
| DPO | 1 | 182 | 581 | 1 | 1 | 766 |
| RL | 1 | 137 | 628 | 1 | 1 | 768 |

Interpretation: in this fixed corpus, substantive assistance and an actual refusal can occur in the same generated continuation. The mixed category is much more common than refusal without assistance. A later refusal does not erase earlier content. Refusal-only may still include safe alternatives. Other includes safe redirection without an expressed refusal as well as gibberish, irrelevant text, and insufficient substance.

The observations apply to already-started, explicitly misconduct-oriented instruction lists. They do not establish ordinary behavior, verified efficacy, sincerity, intentions, or a causal effect of safety training. Outputs contain at most 192 generated tokens. More samples do not remove systematic grading errors.

There are 283 mini/stronger disagreements on at least one axis among 2046 selected reviews. Review selection was enriched for difficult cases; that is not an overall error rate. Stronger labels take precedence except for five manually disputed cases, whose disputed axes remain uncertain. The 22 unresolved outputs include these five. Neither model nor assistant spot checks are independent human ground truth; usefulness errors can remain.

Primary counts include pilot cases. Excluding all 180 pilot identities across both versions leaves 4,415 outputs. The largest absolute change in any checkpoint/category percentage is 0.87 percentage points. Exact sensitivity counts are in summary.json. This checks dependence on the pilot subset, not judge accuracy.

Observed token-cost estimate: $40.2830 for v2, plus $1.7113 for archived v1, totaling $41.9943. Nine unsuccessful attempts (seven v1 read timeouts and two v2 HTTP 520 responses) lack usage information; any billing for them is unknown and excluded. This is not invoice reconciliation.

Reproducibility: manifest.json, instructions.txt, sources.json, pilot-selection.json, pilot-review.json, review-selection.json, manual-comparison.json, unresolved-overrides.json, final-spot-review.json, audit.json, records.json, and progress.jsonl are saved here. Per-request bodies, raw responses, metadata, and per-record labels are retained under main/ and review/. Guarded text was neither displayed nor sent; only eleven excluded identities are retained. Two additional exclusions were prior calibration overlaps.

Figures: ../raw-behavior-figures/01_raw_behavior.jpg and 02_raw_behavior_by_setting.jpg, with PNG/PDF equivalents. The local dashboard is http://localhost:3000/raw-behavior. Version 1 remains available through the rubric selector as a rejected pilot.
