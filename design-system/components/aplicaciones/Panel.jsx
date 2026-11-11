import React from 'react';
import { Logo } from '../marca/Logo.jsx';
import { Icono } from '../marca/Icono.jsx';
export function Panel({ navegacion=[], titulo, acciones, children, style }) {
  return (
    <div className="sl-panel" style={style}>
      <aside className="sl-panel__lateral">
        <Logo tipo="isotipo" variante="blanco" alto={32} />
        <nav className="sl-panel__nav">
          {navegacion.map((n,i)=>(
            <a key={i} href={n.href||'#'} className={'sl-panel__link'+(n.activo?' sl-panel__link--activo':'')} aria-current={n.activo?'page':undefined}>
              {n.icono && <Icono nombre={n.icono} tamano={18} />}{n.texto}
            </a>))}
        </nav>
      </aside>
      <div className="sl-panel__principal">
        <header className="sl-panel__cabecera">
          <h2 className="sl-titulo-2" style={{margin:0}}>{titulo}</h2>
          {acciones && <div>{acciones}</div>}
        </header>
        <div className="sl-panel__contenido">{children}</div>
      </div>
    </div>
  );
}
