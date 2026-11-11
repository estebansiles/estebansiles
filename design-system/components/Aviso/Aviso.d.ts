/** Aviso en línea; siempre abre con la palabra del estado. */
export interface AvisoProps {
  tipo?: 'exito' | 'alerta' | 'error' | 'info';
  /** Palabra del estado; por defecto Listo / Atención / Error / Nota */
  estado?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Aviso(props: AvisoProps): JSX.Element;
