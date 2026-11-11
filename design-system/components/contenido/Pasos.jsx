import React from 'react';
export function Pasos({ pasos=[], orientacion='horizontal', activo, style }) {
  return (
    <ol className={'sl-pasos sl-pasos--'+orientacion} style={style}>
      {pasos.map((p,i)=>(
        <li key={i} className={'sl-paso'+(i===activo?' sl-paso--activo':'')}>
          <span className="sl-paso__marca">{String(i+1).padStart(2,'0')}</span>
          {p.etiqueta && <span className="sl-etiqueta" style={{color:'var(--texto-suave)'}}>{p.etiqueta}</span>}
          <h3 className="sl-titulo-3" style={{margin:0}}>{p.titulo}</h3>
          {p.texto && <p className="sl-cuerpo" style={{color:'var(--texto-suave)',margin:0}}>{p.texto}</p>}
        </li>))}
    </ol>
  );
}
