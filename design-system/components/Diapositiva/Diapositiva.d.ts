import type { ReactNode, CSSProperties } from 'react';
export interface DiapositivaProps { tema?: 'claro' | 'marca' | 'oscuro'; numero?: string; titulo?: ReactNode; pie?: ReactNode; children?: ReactNode; style?: CSSProperties; }
export declare function Diapositiva(props: DiapositivaProps): JSX.Element;
