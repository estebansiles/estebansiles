import React from 'react';
export function Seccion({ tema='claro', alterna=false, id, children, style, className='' }) {
  return (
    <section id={id} className={('sl-seccion '+className).trim()} data-theme={tema==='oscuro'?'dark':undefined}
      style={{...(alterna&&tema!=='oscuro'?{background:'var(--fondo-alterno)'}:null),...style}}>
      <div className="sl-contenedor">{children}</div>
    </section>
  );
}
