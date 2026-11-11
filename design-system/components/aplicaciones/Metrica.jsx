import React from 'react';
export function Metrica({ etiqueta, valor, cambio, direccion='sube', nota, style }) {
  return (
    <div className="sl-metrica" style={style}>
      <span className="sl-etiqueta" style={{color:'var(--texto-suave)'}}>{etiqueta}</span>
      <span className="sl-metrica__valor">{valor}</span>
      {cambio && <span className={'sl-metrica__cambio sl-metrica__cambio--'+direccion}>{direccion==='sube'?'Sube':'Baja'} {cambio}</span>}
      {nota && <span className="sl-nota">{nota}</span>}
    </div>
  );
}
