import type { ReactNode, CSSProperties } from 'react';
export interface HeroWebProps { antetitulo?: string; titulo: ReactNode; bajada?: string; acciones?: ReactNode; visual?: ReactNode; fondo?: 'claro' | 'marca' | 'profundo'; style?: CSSProperties; }
export declare function HeroWeb(props: HeroWebProps): JSX.Element;
