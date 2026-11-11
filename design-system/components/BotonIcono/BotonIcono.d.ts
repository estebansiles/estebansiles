import type { NombreIcono } from '../Icono/Icono';
/** Botón cuadrado solo con ícono; requiere etiqueta accesible. */
export interface BotonIconoProps {
  icono: NombreIcono;
  /** Texto accesible (aria-label y title) */
  etiqueta: string;
  variante?: 'primario' | 'secundario' | 'fantasma' | 'acento';
  tamano?: 'md' | 'sm';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function BotonIcono(props: BotonIconoProps): JSX.Element;
