import type { ReactNode } from 'react';
export interface ImagenProps { src: string; alt?: string; tratamiento?: 'duotono' | 'natural'; proporcion?: string; pie?: ReactNode; }
export declare function Imagen(props: ImagenProps): JSX.Element;
