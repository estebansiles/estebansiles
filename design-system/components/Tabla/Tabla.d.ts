import type { ReactNode, CSSProperties } from 'react';
export interface TablaColumna { clave: string; texto: string; num?: boolean; celda?: (fila: any) => ReactNode }
export interface TablaProps { columnas: TablaColumna[]; filas: any[]; pie?: ReactNode; style?: CSSProperties; }
export declare function Tabla(props: TablaProps): JSX.Element;
