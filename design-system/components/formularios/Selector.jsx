import React from 'react';
export function Selector({ etiqueta, opciones=[], ayuda, id, style, ...rest }) {
  const auto=React.useId?React.useId():'s';
  const fid=id||('sel-'+auto);
  return (
    <div className="sl-campo" style={style}>
      {etiqueta && <label className="sl-campo__label" htmlFor={fid}>{etiqueta}</label>}
      <select id={fid} className="sl-campo__control sl-selector" {...rest}>
        {opciones.map(o=>{const v=typeof o==='string'?{valor:o,texto:o}:o;return <option key={v.valor} value={v.valor}>{v.texto}</option>;})}
      </select>
      {ayuda && <span className="sl-campo__ayuda">{ayuda}</span>}
    </div>
  );
}
