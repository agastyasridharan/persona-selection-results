export const ROOT = import.meta.env.BASE_URL + 'data/benign/';
export const STAGES = [
  ['olmo_pretrain','OLMo pretraining'], ['olmo_midtrain','OLMo mid-training'],
  ['olmo_base','OLMo released base'], ['olmo_sft','OLMo SFT'], ['olmo_dpo','OLMo DPO'],
  ['olmo_rl','OLMo RL'], ['gemma_base','Gemma base'], ['gemma_instruct','Gemma IT'],
  ['qwen_base','Qwen base'], ['qwen_instruct','Qwen Instruct'],
];
export const CATEGORIES = [
  {id:'assistant_from_start',label:'Assistant from start',color:'#008b76',help:'The first generated role is Assistant.'},
  {id:'context_to_assistant_direct',label:'Context → Assistant',color:'#087fa9',help:'Context followed by Assistant behavior, without an earlier generated User request.'},
  {id:'context_to_user_to_assistant',label:'Context → User → Assistant',color:'#e5a000',help:'Context, then a generated User request or exercise, then an answer. Includes document Q&A.'},
  {id:'user_without_observed_assistant',label:'User; no observed Assistant',color:'#c47daa',help:'A generated User role appears, but no Assistant is observed in this window.'},
  {id:'user_from_start_then_assistant',label:'User from start → Assistant',color:'#8661aa',help:'The first generated role is User, followed by Assistant.'},
  {id:'continued_context',label:'Continued context',color:'#88969e',help:'The continuation remains in the context mode, with no observed functional User or Assistant.'},
  {id:'other',label:'Other',color:'#d9d5c9',help:'Does not fit the other trajectories. This does not necessarily mean incoherent text.'},
  {id:'uncertain',label:'Uncertain / disagreement',color:'#e8ebed',help:'Ambiguous trajectory, judge disagreement, or an excluded eligible follow-up. Included in the denominator.'},
];
export const WINDOWS: Record<string,string> = {combined:'After boundary follow-up', '512':'First stage · up to 512 tokens', '192':'Same draws · first 192 tokens', joint:'Eligible follow-ups only'};
export const WINDOW_NOTES: Record<string,string> = {
  combined:'One row per original sample. A retained joint judgment replaces its first-stage label; other samples retain their first-stage label. Six excluded follow-ups remain uncertain. Observed lengths differ.',
  '512':'One row per retained first-stage output, stopped at a native stop token or 512 new tokens. No follow-up text is used in these labels.',
  '192':'The first 192 tokens of the same draws, not a separate generation. Thirteen exact short-window decodes were unavailable and are omitted.',
  joint:'Only samples with retained follow-ups at eligible native turn boundaries. Up to 512 additional tokens, with no injected Assistant header. This selected subset is not comparable to the full population.',
};
export type View = {category:string;assistant_presence:string;review_status:string};
export type Entry = {parent_id:string;stage:string;family:string;condition:string;wording:number;sample:number;cell:string;rule:string;views:Record<string,View>};
export type Filters = {window:string;stage:string;family:string;condition:string;wording:string};
export const pretty = (s:string) => s.replaceAll('_',' ').replace(/^./,c=>c.toUpperCase());
export const stageName = (s:string) => STAGES.find(([id])=>id===s)?.[1] || s;
export const catName = (s:string) => CATEGORIES.find(c=>c.id===s)?.label || pretty(s);
export const reviewName = (s:string) => ({not_selected:'Not selected for review',corroborated:'Corroborated',disagreement:'Judge disagreement',eligible_extension_excluded:'Excluded follow-up'}[s] || pretty(s || 'unavailable'));
export const fmt = (n:number) => n.toLocaleString('en-US');
export const pct = (n:number,total:number) => total ? (100*n/total).toFixed(1)+'%' : '—';
export function matches(r:Entry,f:Filters){return !!r.views[f.window] && (f.stage==='all'||r.stage===f.stage) && (f.family==='all'||r.family===f.family) && (f.condition==='all'||r.condition===f.condition) && (f.wording==='all'||String(r.wording)===f.wording)}
export function totals(rows:Entry[],window:string){const counts:Record<string,number>={};for(const r of rows){const c=r.views[window]?.category;if(c)counts[c]=(counts[c]||0)+1}return counts}
export function saveFile(name:string,value:unknown){const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
