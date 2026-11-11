import type { ReactNode, CSSProperties } from 'react';
export interface FranjaProps { fondo?: 'marca' | 'profundo' | 'trama' | 'lineas' | 'claro'; alto?: number; children?: ReactNode; style?: CSSProperties; className?: string; }
export declare function Franja(props: FranjaProps): JSX.Element;
