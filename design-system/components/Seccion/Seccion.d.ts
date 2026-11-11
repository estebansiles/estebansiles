/** Bloque de página: se abre y cierra con filete de 1px, space-24 vertical (space-16 en móvil), contenido a 1120px. */
export interface SeccionProps {
  /** oscuro = data-theme="dark" en la sección: bloque tinta dentro de página clara */
  tema?: 'claro' | 'oscuro';
  /** Fondo suave en lugar de blanco */
  alterna?: boolean;
  id?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Seccion(props: SeccionProps): JSX.Element;
