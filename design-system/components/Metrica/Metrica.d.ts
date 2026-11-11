import type { CSSProperties } from 'react';
export interface MetricaProps { etiqueta: string; valor: string; cambio?: string; direccion?: 'sube' | 'baja'; nota?: string; style?: CSSProperties; }
export declare function Metrica(props: MetricaProps): JSX.Element;
