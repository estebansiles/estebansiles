import React from 'react';
import { Logo } from '../marca/Logo.jsx';
export function Diapositiva({ tema='claro', numero, titulo, pie, children, style }) {
  return (
    <div className={'sl-diapositiva sl-diapositiva--'+tema} style={style} data-theme={tema==='oscuro'?'dark':undefined}>
      <div className="sl-diapositiva__bloque">
        <div className="sl-diapositiva__contenido">
          {titulo && <h2 className="sl-titulo-1 sl-titulo" style={{margin:0}}>{titulo}</h2>}
          {children}
        </div>
        <div className="sl-diapositiva__pie">
          <Logo tipo="completo" variante={tema==='oscuro'?'blanco':'color'} alto={18} />
          <span className="sl-etiqueta">{pie}</span>
          {numero && <span className="sl-etiqueta">{numero}</span>}
        </div>
      </div>
    </div>
  );
}
