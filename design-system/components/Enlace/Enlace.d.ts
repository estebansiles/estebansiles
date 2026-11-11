/** Enlace de acción con flecha (o enlace-externo). Para enlaces dentro de párrafos usar <a> normal. */
export interface EnlaceProps {
  href?: string;
  externo?: boolean;
  sinIcono?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Enlace(props: EnlaceProps): JSX.Element;
