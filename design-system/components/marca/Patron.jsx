import React from 'react';
function rng(seed){let s=seed>>>0||1;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};}
function red(seed,cols,rows){
  const r=rng(seed),n=[];
  for(let y=0;y<=rows;y++)for(let x=0;x<=cols;x++){if(r()<0.28)continue;n.push({x:(x+(r()-.5)*.7)/cols*100,y:(y+(r()-.5)*.7)/rows*100});}
  const e=[];
  n.forEach((a,i)=>{const d=n.map((b,j)=>({j,d:Math.hypot((a.x-b.x)/100*cols,(a.y-b.y)/100*rows)})).filter(o=>o.j>i&&o.d<1.6).sort((p,q)=>p.d-q.d).slice(0,2);d.forEach(o=>e.push([i,o.j]));});
  const acento=Math.floor(r()*n.length);
  return {n,e,acento};
}
export function Patron({ semilla=7, densidad=12, tema='claro', alto=480, bloque=true, alineacion='inicio', children, style, className='' }) {
  const rows=Math.max(3,Math.round(densidad*alto/1120));
  const {n,e,acento}=React.useMemo(()=>red(semilla,densidad,rows),[semilla,densidad,rows]);
  const oscuro=tema==='oscuro';
  const linea=oscuro?'#3A3E3E':'#BFC3C3', nodo=oscuro?'#555A5A':'#8A8F8F';
  return (
    <div className={'sl-patron '+className} data-theme={oscuro?'dark':undefined} style={{minHeight:alto,display:'flex',alignItems:'center',justifyContent:alineacion==='centro'?'center':'flex-start',padding:'var(--space-12)',...style}}>
      <svg className="sl-patron__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {e.map(([a,b],i)=><line key={i} x1={n[a].x} y1={n[a].y} x2={n[b].x} y2={n[b].y} stroke={linea} strokeWidth="1" vectorEffect="non-scaling-stroke"/>)}
      </svg>
      <svg className="sl-patron__svg" aria-hidden="true">
        {n.map((p,i)=>{const s=i===acento?12:5;return <rect key={i} x={`calc(${p.x}% - ${s/2}px)`} y={`calc(${p.y}% - ${s/2}px)`} width={s} height={s} fill={i===acento?'#00D1B1':nodo}/>;})}
      </svg>
      {children!=null && (bloque ? <div className="sl-patron__bloque">{children}</div> : <div style={{position:'relative'}}>{children}</div>)}
    </div>
  );
}
