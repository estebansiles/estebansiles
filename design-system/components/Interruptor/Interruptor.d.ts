/** Interruptor encendido/apagado para preferencias inmediatas. */
export interface InterruptorProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'style'> {
  etiqueta: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Interruptor(props: InterruptorProps): JSX.Element;
