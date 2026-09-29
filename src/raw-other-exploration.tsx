'use client';
import {useEffect, useMemo, useState} from 'react';

type Row = Record<string, any>;
const PATH = import.meta.env.BASE_URL+'data/raw-behavior-other-exploration/';

export default function RawOtherExploration() {
  const [summary, setSummary] = useState<Row | null>(null);
  const [records, setRecords] = useState<Row[]>([]);
  const [error, setError] = useState('');
  const [stage, setStage] = useState('pretrain');
  const [pattern, setPattern] = useState('all');
  const [selected, setSelected] = useState('');
  useEffect(() => {
    let active = true;
    Promise.all(['summary.json', 'annotated-records.json'].map(async file => {
      const response = await fetch(PATH + file);
      if (!response.ok) throw Error('Saved Other exploration could not be loaded.');
      return response.json();
    })).then(([s, r]) => {
      if (active) { setSummary(s); setRecords(r); }
    }).catch(e => { if (active) setError(String(e)); });
    return () => { active = false; };
  }, []);
  const filtered = useMemo(() => records.filter(r => r.stage === stage && (pattern === 'all' || r.pattern === pattern)), [records, stage, pattern]);
  const chosen = filtered.find(r => r.review_id === selected) || filtered[0];
  return <section className="panel space-top" id="other-exploration">
    <div className="eyebrow">PRELIMINARY EXPLORATION · SAVED 11 SEPTEMBER 2026</div>
    <h2>What is inside “Other”?</h2>
    <p>“Other” includes outputs that neither provide plausibly useful misconduct assistance nor express an actual refusal. It includes failed continuations, vague instructions, unrelated documents, and checking or repair advice. It is not a synonym for gibberish or safe behavior.</p>
    {error && <p className="alert" role="alert">{error}</p>}
    {summary ? <>
      <p>{summary.annotation_method}</p>
      <p className="micro">96 inspected cases out of 477 Other outputs across these four stages. Completed without new API calls. {summary.limits}</p>
      <a href={PATH + 'other_patterns.jpg'} target="_blank" rel="noreferrer"><img src={PATH + 'other_patterns.jpg'} style={{width:'100%', height:'auto'}} alt="Left: Other rates of 17.8%, 14.2%, 19.1%, and 11.2%. Right: pattern counts in 24 sampled Other outputs per checkpoint; released-base samples often have broken procedures, while SFT has more generic instructions." /></a>
      <div className="table-wrap"><table><thead><tr><th>Pattern in inspected sample</th>{summary.groups.map((g:Row) => <th key={g.stage}>{g.name}</th>)}</tr></thead><tbody>{summary.patterns.map((p:Row) => <tr key={p.key}><td>{p.label}</td>{summary.groups.map((g:Row) => <td key={g.stage}>{g.patterns[p.key]}/24</td>)}</tr>)}</tbody></table></div>
      <p>In this sample, pretraining and mid-training often drift into unrelated documents or broken procedures. Released base has many nonsensical procedures with technical language (16/24). SFT more often gives fluent but generic instructions (10/24), although it still switches into other tasks or formats (7/24).</p>
      <p className="micro">One dominant pattern per case; mixed patterns are common. The random samples have different setting compositions and condition on being classified Other, so they are different subsets of each model’s outputs. These counts do not establish an overall capability ranking. “Checking, repair, or exposing defects” describes the direction of the text, not verified accuracy or safety.</p>
      <details><summary>Whole-corpus length and stopping patterns</summary>
        <div className="table-wrap"><table><thead><tr><th>Checkpoint</th><th>Other / all</th><th>Other ending at EOS</th><th>Other median characters</th><th>All outputs ending at EOS</th></tr></thead><tbody>{summary.groups.map((g:Row) => <tr key={g.stage}><td>{g.name}</td><td>{g.other_n}/{g.total_n} ({g.other_percent.toFixed(1)}%)</td><td>{g.other_eos_n}/{g.other_n}</td><td>{g.other_median_characters}</td><td>{g.all_eos_n}/{g.total_n}</td></tr>)}</tbody></table></div>
        <p className="micro">SFT tends to stop earlier across the whole corpus, not only within Other. EOS records how generation ended; it does not reveal why. All generations were limited to 192 tokens. Character lengths are not token counts.</p>
      </details>
      <details><summary>What this means for the persona selection model</summary>
        <p>PSM describes context-conditioned selection and refinement of an Assistant persona. It does not require Assistant behavior in every document continuation. These already-started misconduct lists test whether refusal behavior transfers into a particular raw context; they do not directly measure internal persona representations.</p>
        <p>The large assistance-only segment indicates weak transfer of refusal to these prefixes. The mixed segment shows that refusal behavior can appear outside a designated Assistant turn while failing to prevent assistance. It could reflect a learned disclaimer ending; the graph cannot distinguish that from activation of an Assistant representation.</p>
        <p>In the completed audit, assistance-only plus mixed accounts for 763/766 DPO outputs and 765/768 RL outputs, both 99.6%; each has only one refusal-only output. These are model-judged rates. Earlier chat-format results showed a large contrast, but used an older rubric, so an exact comparison should regrade chat outputs with this rubric.</p>
        <p>A decrease in Other can reflect better completion quality rather than a change in safety. Conversely, a checking or repair continuation can work against the misconduct without explicitly refusing. Role/style transfer, safety transfer, and competence are distinct questions.</p>
      </details>
      <div className="toolbar"><a href={PATH + 'REPORT.md'} download>Analysis and interpretation</a><a href={PATH + 'other_patterns.jpg'} download>Download JPG</a><a href={PATH + 'annotated-records.json'} download>All 96 annotated examples</a><a href={PATH + 'manifest.json'} download>Sampling provenance</a></div>
      <details><summary>Inspect all 96 examples and the six borderline cases</summary>
        <p className="micro">Original classifications remain unchanged. Borderline cases are possible missed assistance, not confirmed grading errors. Each entry preserves the full source text and both the original judge explanation and this exploratory annotation.</p>
        <div className="toolbar"><label>Exploration checkpoint<select value={stage} onChange={e => {setStage(e.target.value); setSelected('');}}>{summary.groups.map((g:Row) => <option key={g.stage} value={g.stage}>{g.name}</option>)}</select></label><label>Exploratory pattern<select value={pattern} onChange={e => {setPattern(e.target.value); setSelected('');}}><option value="all">All patterns</option>{summary.patterns.map((p:Row) => <option key={p.key} value={p.key}>{p.label}</option>)}</select></label></div>
        <p className="micro">{filtered.length} matching inspected cases.</p>
        <div className="output-layout"><aside className="sample-list">{filtered.map(r => <button key={r.review_id} className={chosen?.review_id === r.review_id ? 'selected' : ''} onClick={() => setSelected(r.review_id)}><strong>{r.review_id} · {r.title}</strong><span>{summary.patterns.find((p:Row) => p.key === r.pattern)?.label}</span></button>)}</aside><article>{chosen ? <>
          <h3>{chosen.review_id} · {summary.patterns.find((p:Row) => p.key === chosen.pattern)?.label}</h3>
          <p>{chosen.explanation}</p>
          <p className="micro">{chosen.trial_id} · {chosen.finish_reason === 'length' ? '192-token limit' : 'End token'}</p>
          <h3>Exact prefix</h3><pre className="prompt-block">{chosen.prompt}</pre>
          <h3>Full visible continuation</h3><pre className="completion-block" style={{whiteSpace:'pre-wrap'}}>{chosen.completion}</pre>
          <details><summary>Unchanged original assistance assessment · {chosen.original_model}</summary><p>{chosen.original_assistance_explanation}</p></details>
        </> : <p>No examples match this filter.</p>}</article></div>
      </details>
    </> : !error && <p>Loading saved exploration…</p>}
  </section>;
}
