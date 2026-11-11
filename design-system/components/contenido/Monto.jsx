import React from 'react';
const SIM={CRC:'₡',USD:'US$'};
export function formatearMonto(valor, moneda='CRC', decimales){
  const d=decimales ?? (Number.isInteger(valor)?0:2);
  const [ent,dec]=Math.abs(valor).toFixed(d).split('.');
  const miles=ent.replace(/\B(?=(\d{3})+(?!\d))/g,'\u00A0');
  return (valor<0?'−':'')+(SIM[moneda]||moneda)+miles+(dec?','+dec:'');
}
export function Monto({ valor, moneda='CRC', decimales, style }) {
  return <span style={{fontVariantNumeric:'tabular-nums',whiteSpace:'nowrap',...style}}>{formatearMonto(valor,moneda,decimales)}</span>;
}
