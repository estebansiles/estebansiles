/**
 * Botón de acción. Texto en imperativo: "Agenda una llamada", "Escríbeme por WhatsApp".
 * @startingPoint section="Acciones" subtitle="Botones primario, secundario, fantasma y acento" viewport="700x300"
 */
export interface BotonProps {
  /** primario = accion · secundario = contorno tinta · fantasma = texto · acento = verde-2 con texto tinta (alto impacto, uno por pieza) */
  variante?: 'primario' | 'secundario' | 'fantasma' | 'acento';
  tamano?: 'md' | 'sm';
  icono?: NombreIcono;
  iconoFinal?: NombreIcono;
  /** Ancho completo */
  bloque?: boolean;
  href?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Boton(props: BotonProps): JSX.Element;
