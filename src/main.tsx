import {createRoot} from 'react-dom/client';
import RawBehaviorView from './raw-behavior-view';
import './globals.css';
const repository='https://github.com/agastyasridharan/olmo-raw-continuations';
createRoot(document.getElementById('root')!).render(<main>
  <header><div><div className="eyebrow">PERSONA SELECTION · OLMO 32B</div><h1>Raw-continuation behavior audit</h1><p className="subtitle">Six training checkpoints. Exact continuations, two-axis classifications, and supporting evidence.</p></div><div className="header-right"><span className="live">Published research snapshot</span><a href={repository}>Data and source on GitHub</a><a href="#trial-browser">Browse model outputs</a></div></header>
  <p className="micro">This public snapshot contains the completed raw-continuation audit for twelve non-biological reporting-integrity settings. The local dashboard’s other experiments are separate. Review notes are saved only in your browser; export them to keep a copy.</p>
  <RawBehaviorView/>
  <footer><span>Exploratory model judgments, with documented uncertainty and exclusions.</span><a href={import.meta.env.BASE_URL+'snapshot-manifest.json'}>Snapshot checksums</a></footer>
</main>);
