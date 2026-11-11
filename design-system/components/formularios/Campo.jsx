import React from 'react';
export function Campo({ etiqueta, ayuda, error, multilinea, id, type='text', style, ...rest }) {
  const auto=React.useId?React.useId():'c';
  const fid=id||('campo-'+auto);
  const C=multilinea?'textarea':'input';
  return (
    <div className={'sl-campo'+(error?' sl-campo--error':'')} style={style}>
      {etiqueta && <label className="sl-campo__label" htmlFor={fid}>{etiqueta}</label>}
      <C id={fid} className="sl-campo__control" type={multilinea?undefined:type} aria-invalid={error?'true':undefined} aria-describedby={(error||ayuda)?fid+'-d':undefined} {...rest}/>
      {error ? <span id={fid+'-d'} className="sl-campo__error">Error: {error}</span> : ayuda && <span id={fid+'-d'} className="sl-campo__ayuda">{ayuda}</span>}
    </div>
  );
}
