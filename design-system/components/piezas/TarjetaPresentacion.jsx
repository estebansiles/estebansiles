import React from 'react';
import { Logo } from '../marca/Logo.jsx';
export function TarjetaPresentacion({ lado='frente', nombre, cargo, contacto=[], style }) {
  if (lado === 'reverso') {
    return (
      <div className="sl-tarjeta-presentacion sl-tarjeta-presentacion--reverso" style={style}>
        <Logo tipo="completo" variante="blanco" alto={38} />
      </div>
    );
  }
  return (
    <div className="sl-tarjeta-presentacion" style={style}>
      <div>
        <div className="sl-tp__nombre">{nombre}</div>
        <div className="sl-etiqueta sl-tp__cargo">{cargo}</div>
        <div className="sl-tp__bajo" />
      </div>
      <ul className="sl-tp__contacto">{contacto.map((c,i)=><li key={i}>{c}</li>)}</ul>
    </div>
  );
}
