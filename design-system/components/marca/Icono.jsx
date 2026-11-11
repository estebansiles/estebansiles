import React from 'react';
import { ICONOS } from './iconos-data.js';
export function Icono({ nombre, tamano=24, acento, titulo, style, className, ...rest }) {
  const body = ICONOS[nombre];
  if (!body) return null;
  return (
    <svg viewBox="0 0 24 24" width={tamano} height={tamano} className={className}
      role={titulo?'img':undefined} aria-hidden={titulo?undefined:true} aria-label={titulo}
      style={{display:'inline-block',flex:'none',color:'inherit',...(acento?{'--icono-acento':acento}:null),...style}}
      dangerouslySetInnerHTML={{__html: body}} {...rest} />
  );
}
export const NOMBRES_ICONOS = Object.keys(ICONOS);
