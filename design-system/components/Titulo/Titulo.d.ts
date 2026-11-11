/** Título con la firma de la marca (barra de realce bajo la primera letra). Una vez por bloque. */
export interface TituloProps {
  /** Nivel semántico h1–h6 */
  nivel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Escala visual; por defecto igual al nivel */
  tamano?: 'display' | 1 | 2 | 3;
  /** Barra de realce bajo la primera letra (sl-titulo). Solo un título con firma por bloque. */
  firma?: boolean;
  /** Antetítulo en estilo etiqueta */
  antetitulo?: string;
  /** Subtítulo en Poppins Regular, texto-suave */
  bajada?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Titulo(props: TituloProps): JSX.Element;
