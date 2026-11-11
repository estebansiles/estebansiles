import React from 'react';
import { Icono } from '../marca/Icono.jsx';
export function Menu({ disparador, opciones=[], abierto, style }) {
  const [open,setOpen]=React.useState(!!abierto);
  const ref=React.useRef(null);
  React.useEffect(()=>{const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};document.addEventListener('mousedown',h);return()=>document.removeEventListener('mousedown',h);},[]);
  return (
    <div className="sl-menu" ref={ref} style={style}>
      <span onClick={()=>setOpen(o=>!o)}>{disparador}</span>
      {open && <ul className="sl-menu__lista" role="menu">
        {opciones.map((o,i)=><li key={i}><button role="menuitem" className="sl-menu__item" onClick={()=>{setOpen(false);o.alElegir&&o.alElegir();}}>{o.icono&&<Icono nombre={o.icono} tamano={20}/>}{o.texto}</button></li>)}
      </ul>}
    </div>
  );
}
