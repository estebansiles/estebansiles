import React from 'react';
import { Icono } from '../marca/Icono.jsx';
export function Enlace({ href='#', externo, sinIcono, children, onClick, style }) {
  return <a className="sl-enlace" href={href} onClick={onClick} target={externo?'_blank':undefined} rel={externo?'noopener':undefined} style={style}>{children}{!sinIcono&&<Icono nombre={externo?'enlace-externo':'flecha'} tamano={18}/>}</a>;
}
