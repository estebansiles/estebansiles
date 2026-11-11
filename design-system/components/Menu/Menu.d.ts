import type { NombreIcono } from '../Icono/Icono';
/** Menú desplegable; usa sombra-flotante (único caso de sombra junto con Dialogo). */
export interface MenuProps {
  disparador: React.ReactNode;
  opciones: { texto: string; icono?: NombreIcono; alElegir?: () => void }[];
  /** Estado inicial */
  abierto?: boolean;
  style?: React.CSSProperties;
}
export declare function Menu(props: MenuProps): JSX.Element;
