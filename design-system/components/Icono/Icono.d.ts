export type NombreIcono = 'agente-ia'|'analitica'|'app-movil'|'automatizacion'|'busqueda'|'calendario'|'candado'|'capacitacion'|'cerrar'|'check'|'clientes'|'correo'|'desarrollo'|'descargar'|'diseno-web'|'enlace-externo'|'estrategia'|'experiencia-usuario'|'factura-electronica'|'firma-digital'|'flecha'|'integracion'|'investigar'|'marketing'|'mejorar'|'mensaje'|'menu'|'nube'|'pagos'|'planear'|'probar'|'proteccion-datos'|'redes'|'sistemas'|'tiempo'|'transformacion-digital'|'ubicacion';
/** Ícono de la serie propia Siles: línea 1.5 sobre retícula 24, extremos rectos, un acento sólido verde. El trazo toma currentColor; el acento, --icono-acento (verde-1 en claro, verde-2 en oscuro). */
export interface IconoProps {
  nombre: NombreIcono;
  /** px; múltiplos de 24 preferidos (24, 32, 40, 48) */
  tamano?: number;
  /** Sobrescribe el color del acento */
  acento?: string;
  /** Si se da, el ícono se anuncia; si no, es decorativo */
  titulo?: string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Icono(props: IconoProps): JSX.Element | null;
