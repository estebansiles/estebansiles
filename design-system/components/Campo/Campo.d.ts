/** Campo de texto con etiqueta, ayuda y error (el error se antecede con la palabra "Error"). */
export interface CampoProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'> {
  etiqueta?: string;
  ayuda?: string;
  error?: string;
  /** textarea */
  multilinea?: boolean;
  rows?: number;
  style?: React.CSSProperties;
}
export declare function Campo(props: CampoProps): JSX.Element;
