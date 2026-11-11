import type { CSSProperties } from 'react';
export interface PublicacionRedesProps { formato?: 'cuadrado' | 'historia'; fondo?: 'verde' | 'tinta' | 'trama' | 'gradiente'; titulo: string; texto?: string; firma?: string; style?: CSSProperties; }
export declare function PublicacionRedes(props: PublicacionRedesProps): JSX.Element;
