import React from 'react';
import { BotonIcono } from '../acciones/BotonIcono.jsx';
export function Dialogo({ abierto=true, titulo, children, acciones, alCerrar, enLinea, style }) {
  if(!abierto) return null;
  const caja=(
    <div role="dialog" aria-modal={enLinea?undefined:'true'} aria-label={titulo} className="sl-dialogo" style={style} onClick={e=>e.stopPropagation()}>
      <div className="sl-dialogo__cabecera"><h2 className="sl-titulo-3" style={{margin:0}}>{titulo}</h2>{alCerrar&&<BotonIcono icono="cerrar" etiqueta="Cerrar" tamano="sm" onClick={alCerrar}/>}</div>
      <div className="sl-dialogo__cuerpo">{children}</div>
      {acciones && <div className="sl-dialogo__pie">{acciones}</div>}
    </div>);
  return enLinea ? caja : <div className="sl-dialogo-fondo" onClick={alCerrar}>{caja}</div>;
}
