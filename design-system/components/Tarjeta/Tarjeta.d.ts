/**
 * Tarjeta de contenido: esquinas rectas, filete 1px, sin sombra.
 * @startingPoint section="Contenido" subtitle="Tarjeta de servicio con ícono" viewport="700x420"
 */
export interface TarjetaProps {
  icono?: NombreIcono;
  antetitulo?: string;
  titulo?: string;
  children?: React.ReactNode;
  /** Zona inferior (enlace o botón) */
  pie?: React.ReactNode;
  /** Convierte la tarjeta entera en enlace; el borde pasa a tinta al pasar el cursor */
  href?: string;
  variante?: 'borde' | 'hundida';
  className?: string;
  style?: React.CSSProperties;
}
export declare function Tarjeta(props: TarjetaProps): JSX.Element;
