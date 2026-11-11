import React from 'react';
export function Pestanas({ pestanas=[], activa, alCambiar, style }) {
  const [int,setInt]=React.useState(activa ?? (pestanas[0]&&pestanas[0].id));
  const act=activa ?? int;
  return (
    <div role="tablist" className="sl-pestanas" style={style}>
      {pestanas.map(p=><button key={p.id} role="tab" aria-selected={p.id===act?'true':'false'} className="sl-pestana" onClick={()=>{setInt(p.id);alCambiar&&alCambiar(p.id);}}>{p.texto}</button>)}
    </div>
  );
}
