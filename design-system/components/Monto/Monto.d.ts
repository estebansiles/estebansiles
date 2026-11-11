/** Monto con moneda y separador de miles con espacio: ₡2 825 000 · US$1 500. */
export interface MontoProps {
  valor: number;
  moneda?: 'CRC' | 'USD';
  decimales?: number;
  style?: React.CSSProperties;
}
export declare function Monto(props: MontoProps): JSX.Element;
