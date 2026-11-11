import React from 'react';
export function Ayuda({ texto, children, style }) {
  return <span className="sl-ayuda" style={style}>{children}<span role="tooltip" className="sl-ayuda__burbuja">{texto}</span></span>;
}
