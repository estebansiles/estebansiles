/** Casilla de verificación o botón de opción (tipo="radio") con etiqueta. */
export interface CasillaProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'style'> {
  etiqueta: React.ReactNode;
  tipo?: 'checkbox' | 'radio';
  style?: React.CSSProperties;
}
export declare function Casilla(props: CasillaProps): JSX.Element;
