import React from 'react';
import { LOGO, ISOTIPO } from './logos-data.js';
const T='#1E2020',V='#008C99',B='#FFFFFF';
const VARIANTES={color:[T,V,T],tinta:[T,T,T],verde:[V,T,V],blanco:[B,V,B],'blanco-pleno':[B,B,B]};
export function Logo({ tipo='completo', variante='color', alto, titulo, style, ...rest }) {
  const d = tipo==='isotipo' ? ISOTIPO : LOGO;
  const c = VARIANTES[variante] || VARIANTES.color;
  const h = alto ?? (tipo==='isotipo' ? 48 : 40);
  return (
    <svg viewBox={d.viewBox} height={h} role="img" aria-label={titulo || (tipo==='isotipo'?'Siles':'Siles Comunicación')} style={{display:'block',width:'auto',height:h,...style}} {...rest}>
      {d.paths.map((p,i)=>React.createElement('path',{key:i,d:p,fill:c[i]}))}
    </svg>
  );
}
