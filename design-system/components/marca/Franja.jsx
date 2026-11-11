import React from 'react';
export function Franja({ fondo='marca', alto=320, children, style, className='' }) {
  return (
    <section className={['sl-franja','sl-franja--'+fondo,className].join(' ').trim()} style={{minHeight:alto,...style}}>
      {children!=null && <div className="sl-franja__bloque" data-theme={fondo==='profundo'?'dark':undefined}>{children}</div>}
    </section>
  );
}
