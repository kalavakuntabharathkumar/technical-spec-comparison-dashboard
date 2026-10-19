import { useEffect, useState } from 'react';
type Spec = { id:number; code:string; title:string; version:string; content:string; category:string };
export default function App(){
 const [specs,setSpecs]=useState<Spec[]>([]); const [q,setQ]=useState(''); const [left,setLeft]=useState(''); const [right,setRight]=useState(''); const [error,setError]=useState('');
 useEffect(()=>{fetch('/api/specs').then(r=>r.json()).then(setSpecs).catch(()=>setError('API unavailable. Start the server on port 4000.'));},[]);
 const filtered=specs.filter(s=>[s.code,s.title,s.category,s.content].join(' ').toLowerCase().includes(q.toLowerCase()));
 const a=specs.find(s=>String(s.id)===left), b=specs.find(s=>String(s.id)===right);
 return <main><header><div><p className="eyebrow">ENGINEERING KNOWLEDGE</p><h1>Specification Compare</h1><p className="muted">Search, review versions, and compare technical requirements.</p></div><span className="pill">{specs.length} specifications</span></header>
 <section className="panel"><label htmlFor="search">Search specifications</label><input id="search" placeholder="Search code, title, category or content…" value={q} onChange={e=>setQ(e.target.value)}/>
 {error&&<p role="alert">{error}</p>}<div className="layout"><div><h2>Library</h2>{filtered.map(s=><article className="spec" key={s.id}><div><b>{s.code}</b><span className="version">v{s.version}</span></div><h3>{s.title}</h3><p className="muted">{s.category}</p><p>{s.content}</p><div className="actions"><button onClick={()=>setLeft(String(s.id))}>Compare as A</button><button onClick={()=>setRight(String(s.id))}>Compare as B</button></div></article>)}{filtered.length===0&&<p>No matching specifications.</p>}</div>
 <div><h2>Side-by-side comparison</h2><div className="compare"><SpecView label="A" spec={a}/><SpecView label="B" spec={b}/></div>{a&&b&&<div className="panel result"><b>Comparison summary</b><p>{a.id===b.id?'Both sides select the same specification.':a.content===b.content?'Content matches; check version and metadata.':'Content differs. Review the highlighted text manually before approving a change.'}</p></div>}</div></div></section>
 <footer>Demo data is illustrative. Connect a configured MySQL database for persistent storage.</footer></main>
}
function SpecView({label,spec}:{label:string;spec?:Spec}){return <div className="specview"><span className="eyebrow">SPEC {label}</span>{spec?<><h3>{spec.title}</h3><p>{spec.code} · v{spec.version}</p><p>{spec.category}</p><blockquote>{spec.content}</blockquote></>:<p className="muted">Choose a specification from the library.</p>}</div>}
