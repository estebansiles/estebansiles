/** Ficha seleccionable para filtros y temas (no es un estado). */
export interface FichaProps {
  activa?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Ficha(props: FichaProps): JSX.Element;
