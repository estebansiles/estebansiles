import React from 'react';
import { Logo } from '../marca/Logo.jsx';
export function PublicacionRedes({ formato='cuadrado', fondo='verde', titulo, texto, firma, style }) {
  return (
    <div className={['sl-publicacion','sl-publicacion--'+fondo,formato==='historia'?'sl-publicacion--historia':''].join(' ').trim()} style={style}
      data-theme={fondo==='tinta'?'dark':undefined}>
      <div className="sl-publicacion__bloque">
        <h2 className="sl-titulo-2 sl-titulo" style={{margin:0}}>{titulo}</h2>
        {texto && <p className="sl-cuerpo-ui">{texto}</p>}
        <div className="sl-publicacion__pie">
          <Logo tipo="isotipo" variante="color" alto={34} />
          {firma && <span className="sl-etiqueta">{firma}</span>}
        </div>
      </div>
    </div>
  );
}
