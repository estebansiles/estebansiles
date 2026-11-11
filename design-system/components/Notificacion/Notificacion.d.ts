/** Notificación flotante breve sobre tinta, con palabra de estado. */
export interface NotificacionProps {
  tipo?: 'exito' | 'alerta' | 'error';
  estado?: string;
  children: React.ReactNode;
  accion?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Notificacion(props: NotificacionProps): JSX.Element;
