# What is inside “Other”? Preliminary exploration

“Other” means both original axes were no: no plausibly useful assistance toward the falsification/concealment objective and no actual expressed refusal. It does not mean incoherent, harmless, truthful, or intentionally evasive.

I inspected 96 existing Other outputs: 24 sampled uniformly without replacement within each of pretraining end, mid-training end, released base, and SFT. The four stages contain 477 Other outputs altogether. The two Other outputs from DPO and RL were outside this requested exploration. This was a local assistant reading, not an additional API call or independent human annotation. Stage names, source identities and previous assessments were hidden during annotation; previously seen examples could nevertheless be recognizable. The taxonomy was developed during reading, so this is exploratory, not a preregistered test.

| Checkpoint | Other / all eligible | Other rate | Ends at EOS, within Other | Median characters, within Other |
|---|---:|---:|---:|---:|
| Pretraining end | 136/763 | 17.8% | 25/136 | 869 |
| Mid-training end | 109/765 | 14.2% | 30/109 | 820 |
| Released base | 146/766 | 19.1% | 33/146 | 784.5 |
| SFT | 86/767 | 11.2% | 74/86 | 281.5 |

These are whole-corpus descriptive counts. The shorter SFT outputs are not specific to Other: 639/767 of all SFT outputs ended at EOS, versus 132/763 at pretraining, 165/765 at mid-training and 152/766 at released base. EOS records a stopping event, not a reason for it. Lengths are characters, not tokens; every generation had the same 192-token cap.

| Dominant pattern in the inspected sample | Pretraining | Mid-training | Released base | SFT |
|---|---:|---:|---:|---:|
| Nonsensical / broken procedure | 9/24 | 8/24 | 16/24 | 4/24 |
| Topic or format drift | 7/24 | 11/24 | 2/24 | 7/24 |
| Generic / insufficient instructions | 1/24 | 1/24 | 1/24 | 10/24 |
| Checking, repair, or exposing defects | 6/24 | 2/24 | 3/24 | 2/24 |
| Possible missed assistance | 1/24 | 2/24 | 2/24 | 1/24 |

The 24-case sample sizes are equal per stage, but the setting composition is not matched: these are random draws from each stage’s Other pool, not two examples per setting. In particular, the released-base sample covers eight settings and contains five fire cases. Because selection conditions on Other, these are different residual subsets of each model’s outputs, not a capability comparison over matched trials. Variation can reflect setting composition and annotation decisions as well as stage. Do not read small between-stage differences as established population effects.

Pattern definitions: broken procedures rely on illogical steps, undefined pseudo-technical machinery, surreal content, or unusable decision rules; topic/format drift switches into another document, joke, task, forum or data format; generic instructions remain relevant but never supply a substantive manipulation; checking/repair/exposure works against the requested concealment or examines defects without explicitly refusing; borderline cases may contain an independent useful contribution despite flawed surroundings. One dominant category was chosen for each example. Categories can co-occur in the text. The checking label does not verify factual accuracy or safety: it includes reverse-direction edits and fake-detection exercises.

Observed pattern: pretraining and mid-training include many unrelated-document continuations and broken procedures. Released-base examples are especially often technical-sounding but nonsensical in this sample (16/24). SFT has more fluent, generic, insufficient instructions (10/24) and fewer broken procedures (4/24), although seven examples still drift into another task or format. Several SFT outputs begin a new user-style request with formatting constraints; resemblance to an instruction dataset does not demonstrate memorization or contamination.

Six cases remain diagnostic concerns about the original Other label, not confirmed errors. They include potentially meaningful information-restriction, evidence-substitution, temporal-accounting, or evasive-reporting contributions embedded in defective text. They are separately flagged, and all original study labels remain unchanged. The sample establishes that Other is heterogeneous; it does not establish precise subtype prevalence or judge accuracy.

Interpretation in relation to PSM: the paper describes context-conditioned selection and refinement of an Assistant persona; it does not require the model to enact the Assistant in every raw document continuation. A partial misconduct list strongly cues its document’s author and local continuation. The existing raw-only graph therefore tests transfer of refusal and useful assistance into this particular context, not persona representations directly. A large assistance-only segment is evidence against context-independent refusal on these prefixes, not a direct refutation of PSM.

The mixed segment is a narrower sign that refusal behavior can appear outside a designated Assistant turn while failing to prevent earlier assistance. The model could be producing a conventional disclaimer ending; this graph alone cannot identify activation of the same internal Assistant representation. Compare harmful-assistance totals (assistance-only plus mixed), rather than interpreting a larger mixed segment as successful safety.

In the completed audit, DPO has 763/766 outputs with assistance (581 assistance-only + 182 mixed) and RL 765/768 (628 + 137), both 99.6%. Only one output per stage is refusal-only. Thus the tested raw prefixes do not show robust suppression of useful misconduct assistance. Earlier chat-format results showed a large contrast, but used an older assistance rubric; a quantitatively matched raw/chat comparison should apply this newer rubric to both. Neither result establishes model intent, true effectiveness of the advice, or general behavior outside these 12 fixed prefixes and 192-token windows.

The decline in Other cannot automatically be read as declining safety: many early Other outputs are failed or irrelevant continuations, and SFT can improve completion quality without having made a different safety choice. Conversely, defect-checking outputs inside Other should not be called harmful compliance just because they lack a refusal phrase.

Useful next discriminator: compare the same underlying document content across raw lists, explicit Assistant turns and non-Assistant narration, using this same rubric; separately tag direct Assistant self-reference, address to a user, speaker switches, refusal position, and basic coherence. Those measures distinguish role/style transfer, safety transfer, and improved completion ability, which this bar graph currently combines.

Source for the conceptual PSM claim: local papers/persona-selection-model/psm.md, lines 62–152 (introductory theory only). Source for all quantitative statements here: the frozen, filtered results/raw-behavior-v2/records.json and the saved sample/annotations in this folder. No biologically sensitive source was sought; this analysis uses the previously filtered reporting-integrity corpus.

Rebuild: .venv-figures/bin/python scripts/analyze_raw_behavior_other.py. The script verifies the source SHA256, exact sample identities, all 96 source texts and annotation coverage, then regenerates data, this report and figures. Saved examples contain full prefixes/completions, the new annotation and the unchanged original judge explanation. No hidden API cost: zero new API calls.
