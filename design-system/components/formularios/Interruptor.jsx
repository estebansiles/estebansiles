import React from 'react';
export function Interruptor({ etiqueta, style, ...rest }) {
  return <label className="sl-interruptor" style={style}><input type="checkbox" role="switch" {...rest}/><span>{etiqueta}</span></label>;
}
