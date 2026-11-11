import React from 'react';
export function Ficha({ activa, onClick, children, style }) {
  return <button type="button" className="sl-ficha" aria-pressed={activa?'true':'false'} onClick={onClick} style={style}>{children}</button>;
}
