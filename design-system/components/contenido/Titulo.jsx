import React from 'react';
const CLASE={display:'sl-display',1:'sl-titulo-1',2:'sl-titulo-2',3:'sl-titulo-3'};
export function Titulo({ nivel=2, tamano, firma=true, antetitulo, bajada, children, style, className='' }) {
  const Tag='h'+Math.min(Math.max(nivel,1),6);
  const cls=[CLASE[tamano??nivel]||'sl-titulo-3', firma?'sl-titulo':'', className].join(' ').trim();
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)',...style}}>
      {antetitulo && <span className="sl-etiqueta" style={{color:'var(--texto-suave)'}}>{antetitulo}</span>}
      {React.createElement(Tag,{className:cls,style:{margin:0}},firma&&typeof children==='string'?[React.createElement('span',{key:0,className:'sl-firma'},children.charAt(0)),children.slice(1)]:children)}
      {bajada && <p className="sl-subtitulo sl-medida" style={{color:'var(--texto-suave)',marginTop:'var(--space-2)'}}>{bajada}</p>}
    </div>
  );
}
