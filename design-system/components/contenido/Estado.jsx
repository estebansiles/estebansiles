import React from 'react';
const PALABRA={exito:'Listo',alerta:'Pendiente',error:'Error',neutro:'Borrador'};
export function Estado({ tipo='neutro', children, style }) {
  return <span className={'sl-estado sl-estado--'+tipo} style={style}>{children ?? PALABRA[tipo]}</span>;
}
