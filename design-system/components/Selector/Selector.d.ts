/** Selector nativo con estilo de campo. */
export interface SelectorProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'style'> {
  etiqueta?: string;
  opciones: (string | { valor: string; texto: string })[];
  ayuda?: string;
  style?: React.CSSProperties;
}
export declare function Selector(props: SelectorProps): JSX.Element;
