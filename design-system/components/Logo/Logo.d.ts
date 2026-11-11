/**
 * Logo de Siles Comunicación (trazados originales). Completo siempre que quepa; isotipo en avatares, favicon y barras de aplicación.
 * @startingPoint section="Marca" subtitle="Logo completo e isotipo en sus cinco versiones" viewport="700x360"
 */
export interface LogoProps {
  /** completo = SILES + descriptor; isotipo = S con barra */
  tipo?: 'completo' | 'isotipo';
  /** color (por defecto sobre blanco) · tinta · verde · blanco (sobre tinta) · blanco-pleno (sobre verde o foto) */
  variante?: 'color' | 'tinta' | 'verde' | 'blanco' | 'blanco-pleno';
  /** Alto en px. Por defecto 40 (completo) / 48 (isotipo). */
  alto?: number;
  titulo?: string;
  style?: React.CSSProperties;
}
export declare function Logo(props: LogoProps): JSX.Element;
