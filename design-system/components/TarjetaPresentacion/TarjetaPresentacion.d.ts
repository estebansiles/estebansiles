import type { CSSProperties } from 'react';
export interface TarjetaPresentacionProps { lado?: 'frente' | 'reverso'; nombre?: string; cargo?: string; contacto?: string[]; style?: CSSProperties; }
export declare function TarjetaPresentacion(props: TarjetaPresentacionProps): JSX.Element;
