import type { ReactNode, CSSProperties } from 'react';
export interface PanelProps { navegacion?: { texto: string; icono?: string; href?: string; activo?: boolean }[]; titulo: ReactNode; acciones?: ReactNode; children?: ReactNode; style?: CSSProperties; }
export declare function Panel(props: PanelProps): JSX.Element;
