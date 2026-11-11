/** Etiqueta de estado. Siempre con una palabra que nombre el estado (nunca solo color). */
export interface EstadoProps {
  tipo?: 'exito' | 'alerta' | 'error' | 'neutro';
  /** Palabra del estado; por defecto Listo / Pendiente / Error / Borrador */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Estado(props: EstadoProps): JSX.Element;
