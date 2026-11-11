import React from 'react';
const PALABRA={exito:'Listo',alerta:'Atención',error:'Error'};
export function Notificacion({ tipo='exito', estado, children, accion, style }) {
  return <div role="status" className={'sl-notificacion sl-notificacion--'+tipo} style={style}><span className="sl-notificacion__estado">{estado ?? PALABRA[tipo]}</span><span style={{flex:1}}>{children}</span>{accion}</div>;
}
