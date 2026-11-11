import React from 'react';
import { Icono } from '../marca/Icono.jsx';
export function Boton({ variante='primario', tamano='md', icono, iconoFinal, bloque, href, disabled, type='button', onClick, children, style, className='' }) {
  const cls=['sl-boton','sl-boton--'+variante,tamano==='sm'?'sl-boton--sm':'',bloque?'sl-boton--bloque':'',className].join(' ').trim();
  const s=tamano==='sm'?18:20;
  const inner=<>{icono&&<Icono nombre={icono} tamano={s}/>}{children}{iconoFinal&&<Icono nombre={iconoFinal} tamano={s}/>}</>;
  if(href) return <a href={disabled?undefined:href} aria-disabled={disabled?'true':undefined} className={cls} style={style} onClick={onClick}>{inner}</a>;
  return <button type={type} className={cls} disabled={disabled} onClick={onClick} style={style}>{inner}</button>;
}
