import React from 'react';
import { Icono } from '../marca/Icono.jsx';
export function BotonIcono({ icono, etiqueta, variante='fantasma', tamano='md', onClick, disabled, style }) {
  return <button type="button" aria-label={etiqueta} title={etiqueta} className={['sl-boton','sl-boton-icono','sl-boton--'+variante,tamano==='sm'?'sl-boton--sm':''].join(' ')} style={{color:variante==='fantasma'?'var(--texto)':undefined,...style}} onClick={onClick} disabled={disabled}><Icono nombre={icono} tamano={tamano==='sm'?18:22}/></button>;
}
