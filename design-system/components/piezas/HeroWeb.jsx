import React from 'react';
import { Titulo } from '../contenido/Titulo.jsx';
export function HeroWeb({ antetitulo, titulo, bajada, acciones, visual, fondo='marca', style }) {
  const oscuro = fondo==='profundo';
  return (
    <section className={'sl-hero sl-hero--'+fondo} style={style}>
      <div className="sl-hero__grid">
        <div className="sl-hero__bloque" data-theme={oscuro?'dark':undefined}>
          <Titulo nivel={1} tamano="display" antetitulo={antetitulo} bajada={bajada}>{titulo}</Titulo>
          {acciones && <div className="sl-hero__acciones">{acciones}</div>}
        </div>
        {visual && <div className="sl-hero__visual">{visual}</div>}
      </div>
    </section>
  );
}
