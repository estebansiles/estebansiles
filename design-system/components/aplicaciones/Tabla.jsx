import React from 'react';
export function Tabla({ columnas=[], filas=[], pie, style }) {
  return (
    <div style={{overflowX:'auto',...style}}>
      <table className="sl-tabla">
        <thead><tr>{columnas.map(c=><th key={c.clave} className={c.num?'num':undefined}>{c.texto}</th>)}</tr></thead>
        <tbody>{filas.map((f,i)=>(
          <tr key={i}>{columnas.map(c=><td key={c.clave} className={c.num?'num':undefined}>{c.celda?c.celda(f):f[c.clave]}</td>)}</tr>))}
        </tbody>
        {pie && <tfoot>{pie}</tfoot>}
      </table>
    </div>
  );
}
