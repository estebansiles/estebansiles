/**
 * Patrón de red (conexiones) para fondos de portada. Una vez por pieza; el texto siempre dentro de un bloque liso.
 * Reconstrucción paramétrica: sustituir por el arte original cuando esté disponible.
 */
export interface PatronProps {
  /** Cambia la distribución de nodos de forma determinista */
  semilla?: number;
  /** Columnas de la red (más = más denso). 8–16. */
  densidad?: number;
  tema?: 'claro' | 'oscuro';
  /** Alto mínimo en px */
  alto?: number;
  /** Envuelve children en un bloque liso (por defecto true; no desactivar si hay texto) */
  bloque?: boolean;
  alineacion?: 'inicio' | 'centro';
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Patron(props: PatronProps): JSX.Element;
