/** Diálogo modal: esquinas rectas, sombra-flotante, pie con filete. */
export interface DialogoProps {
  abierto?: boolean;
  titulo: string;
  children: React.ReactNode;
  /** Botones del pie (secundario primero, primario al final) */
  acciones?: React.ReactNode;
  alCerrar?: () => void;
  /** Renderiza sin fondo ni posición fija (para documentación) */
  enLinea?: boolean;
  style?: React.CSSProperties;
}
export declare function Dialogo(props: DialogoProps): JSX.Element | null;
