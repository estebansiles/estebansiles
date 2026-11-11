import type { ReactNode, CSSProperties } from 'react';
export interface PasosPaso { titulo: ReactNode; etiqueta?: string; texto?: ReactNode }
export interface PasosProps { pasos: PasosPaso[]; orientacion?: 'horizontal' | 'vertical'; activo?: number; style?: CSSProperties; }
export declare function Pasos(props: PasosProps): JSX.Element;
