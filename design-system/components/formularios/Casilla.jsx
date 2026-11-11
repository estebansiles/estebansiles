import React from 'react';
export function Casilla({ etiqueta, tipo='checkbox', style, ...rest }) {
  return <label className="sl-check" style={style}><input type={tipo} {...rest}/><span>{etiqueta}</span></label>;
}
