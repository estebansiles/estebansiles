import React from 'react';
import { formatearMonto } from './Monto.jsx';
export function Cotizacion({ partidas=[], moneda='CRC', iva=13, nota, style }) {
  const sub=partidas.reduce((s,p)=>s+(p.cantidad??1)*p.precio,0);
  const imp=Math.round(sub*iva)/100;
  const f=v=>formatearMonto(v,moneda);
  return (
    <div style={style}>
      <table className="sl-tabla">
        <thead><tr><th>Servicio</th><th className="num">Cant.</th><th className="num">Precio</th><th className="num">Total</th></tr></thead>
        <tbody>{partidas.map((p,i)=>(
          <tr key={i}><td><div style={{fontWeight:700}}>{p.concepto}</div>{p.detalle&&<div style={{color:'var(--texto-suave)',fontSize:14,marginTop:2}}>{p.detalle}</div>}</td>
          <td className="num">{p.cantidad??1}</td><td className="num">{f(p.precio)}</td><td className="num">{f((p.cantidad??1)*p.precio)}</td></tr>))}
        </tbody>
        <tfoot>
          <tr><td colSpan={3} className="num" style={{color:'var(--texto-suave)'}}>Subtotal</td><td className="num">{f(sub)}</td></tr>
          <tr><td colSpan={3} className="num" style={{color:'var(--texto-suave)'}}>IVA {iva}\u00A0%</td><td className="num">{f(imp)}</td></tr>
          <tr className="total"><td colSpan={3} className="num">Total</td><td className="num">{f(sub+imp)}</td></tr>
        </tfoot>
      </table>
      {nota && <p className="sl-nota" style={{marginTop:'var(--space-4)'}}>{nota}</p>}
    </div>
  );
}
