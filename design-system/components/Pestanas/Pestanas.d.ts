/** Pestañas con indicador de 2px en realce. */
export interface PestanasProps {
  pestanas: { id: string; texto: string }[];
  /** Controlado; si se omite, interno */
  activa?: string;
  alCambiar?: (id: string) => void;
  style?: React.CSSProperties;
}
export declare function Pestanas(props: PestanasProps): JSX.Element;
