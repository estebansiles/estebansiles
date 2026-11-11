import React from 'react';
export function Imagen({ src, alt='', tratamiento='duotono', proporcion='4 / 5', pie, style, className='' }) {
  return (
    <figure className={['sl-imagen','sl-imagen--'+tratamiento,className].join(' ').trim()} style={{margin:0,...style}}>
      <div className="sl-imagen__marco" style={{aspectRatio:proporcion}}>
        <img src={src} alt={alt} />
      </div>
      {pie && <figcaption className="sl-nota sl-imagen__pie">{pie}</figcaption>}
    </figure>
  );
}
