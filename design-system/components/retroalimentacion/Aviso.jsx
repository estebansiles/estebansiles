import React from 'react';
const PALABRA={exito:'Listo',alerta:'Atención',error:'Error',info:'Nota'};
export function Aviso({ tipo='info', estado, children, style }) {
  return <div role={tipo==='error'?'alert':'status'} className={'sl-aviso sl-aviso--'+tipo} style={style}><span className="sl-aviso__estado">{estado ?? PALABRA[tipo]}</span><span className="sl-aviso__texto">{children}</span></div>;
}
