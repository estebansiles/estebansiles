import React from 'react';
import { Icono } from '../marca/Icono.jsx';
export function Tarjeta({ icono, antetitulo, titulo, children, pie, href, variante='borde', style, className='' }) {
  const Tag = href ? 'a' : 'div';
  return (
    <Tag href={href} className={['sl-tarjeta', variante==='hundida'?'sl-tarjeta--hundida':'', className].join(' ').trim()} style={style}>
      {icono && <span className="sl-tarjeta__icono"><Icono nombre={icono} tamano={40} /></span>}
      {antetitulo && <span className="sl-etiqueta" style={{color:'var(--texto-suave)'}}>{antetitulo}</span>}
      {titulo && <h3 className="sl-titulo-3" style={{margin:0}}>{titulo}</h3>}
      {children && <div className="sl-cuerpo" style={{color:'var(--texto-suave)'}}>{children}</div>}
      {pie && <div style={{marginTop:'auto',paddingTop:'var(--space-2)'}}>{pie}</div>}
    </Tag>
  );
}
