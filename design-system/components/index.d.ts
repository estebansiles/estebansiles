import type * as React from 'react';
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
/**
 * Logo de Siles Comunicación (trazados originales). Completo siempre que quepa; isotipo en avatares, favicon y barras de aplicación.
 * @startingPoint section="Marca" subtitle="Logo completo e isotipo en sus cinco versiones" viewport="700x360"
 */
export interface LogoProps {
  /** completo = SILES + descriptor; isotipo = S con barra */
  tipo?: 'completo' | 'isotipo';
  /** color (por defecto sobre blanco) · tinta · verde · blanco (sobre tinta) · blanco-pleno (sobre verde o foto) */
  variante?: 'color' | 'tinta' | 'verde' | 'blanco' | 'blanco-pleno';
  /** Alto en px. Por defecto 40 (completo) / 48 (isotipo). */
  alto?: number;
  titulo?: string;
  style?: React.CSSProperties;
}
export declare function Logo(props: LogoProps): JSX.Element;
/**
 * Patrón de red (conexiones) para fondos de portada. Una vez por pieza; el texto siempre dentro de un bloque liso.
 * Reconstrucción paramétrica: sustituir por el arte original cuando esté disponible.
 */
export interface PatronProps {
  /** Cambia la distribución de nodos de forma determinista */
  semilla?: number;
  /** Columnas de la red (más = más denso). 8–16. */
  densidad?: number;
  tema?: 'claro' | 'oscuro';
  /** Alto mínimo en px */
  alto?: number;
  /** Envuelve children en un bloque liso (por defecto true; no desactivar si hay texto) */
  bloque?: boolean;
  alineacion?: 'inicio' | 'centro';
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Patron(props: PatronProps): JSX.Element;
/**
 * Botón de acción. Texto en imperativo: "Agenda una llamada", "Escríbeme por WhatsApp".
 * @startingPoint section="Acciones" subtitle="Botones primario, secundario, fantasma y acento" viewport="700x300"
 */
export interface BotonProps {
  /** primario = accion · secundario = contorno tinta · fantasma = texto · acento = verde-2 con texto tinta (alto impacto, uno por pieza) */
  variante?: 'primario' | 'secundario' | 'fantasma' | 'acento';
  tamano?: 'md' | 'sm';
  icono?: NombreIcono;
  iconoFinal?: NombreIcono;
  /** Ancho completo */
  bloque?: boolean;
  href?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Boton(props: BotonProps): JSX.Element;
/** Botón cuadrado solo con ícono; requiere etiqueta accesible. */
export interface BotonIconoProps {
  icono: NombreIcono;
  /** Texto accesible (aria-label y title) */
  etiqueta: string;
  variante?: 'primario' | 'secundario' | 'fantasma' | 'acento';
  tamano?: 'md' | 'sm';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function BotonIcono(props: BotonIconoProps): JSX.Element;
/** Enlace de acción con flecha (o enlace-externo). Para enlaces dentro de párrafos usar <a> normal. */
export interface EnlaceProps {
  href?: string;
  externo?: boolean;
  sinIcono?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Enlace(props: EnlaceProps): JSX.Element;
/** Campo de texto con etiqueta, ayuda y error (el error se antecede con la palabra "Error"). */
export interface CampoProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'> {
  etiqueta?: string;
  ayuda?: string;
  error?: string;
  /** textarea */
  multilinea?: boolean;
  rows?: number;
  style?: React.CSSProperties;
}
export declare function Campo(props: CampoProps): JSX.Element;
/** Selector nativo con estilo de campo. */
export interface SelectorProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'style'> {
  etiqueta?: string;
  opciones: (string | { valor: string; texto: string })[];
  ayuda?: string;
  style?: React.CSSProperties;
}
export declare function Selector(props: SelectorProps): JSX.Element;
/** Casilla de verificación o botón de opción (tipo="radio") con etiqueta. */
export interface CasillaProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'style'> {
  etiqueta: React.ReactNode;
  tipo?: 'checkbox' | 'radio';
  style?: React.CSSProperties;
}
export declare function Casilla(props: CasillaProps): JSX.Element;
/** Interruptor encendido/apagado para preferencias inmediatas. */
export interface InterruptorProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'style'> {
  etiqueta: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Interruptor(props: InterruptorProps): JSX.Element;
/** Título con la firma de la marca (barra de realce bajo la primera letra). Una vez por bloque. */
export interface TituloProps {
  /** Nivel semántico h1–h6 */
  nivel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Escala visual; por defecto igual al nivel */
  tamano?: 'display' | 1 | 2 | 3;
  /** Barra de realce bajo la primera letra (sl-titulo). Solo un título con firma por bloque. */
  firma?: boolean;
  /** Antetítulo en estilo etiqueta */
  antetitulo?: string;
  /** Subtítulo en Poppins Regular, texto-suave */
  bajada?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Titulo(props: TituloProps): JSX.Element;
/** Bloque de página: se abre y cierra con filete de 1px, space-24 vertical (space-16 en móvil), contenido a 1120px. */
export interface SeccionProps {
  /** oscuro = data-theme="dark" en la sección: bloque tinta dentro de página clara */
  tema?: 'claro' | 'oscuro';
  /** Fondo suave en lugar de blanco */
  alterna?: boolean;
  id?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Seccion(props: SeccionProps): JSX.Element;
/**
 * Tarjeta de contenido: esquinas rectas, filete 1px, sin sombra.
 * @startingPoint section="Contenido" subtitle="Tarjeta de servicio con ícono" viewport="700x420"
 */
export interface TarjetaProps {
  icono?: NombreIcono;
  antetitulo?: string;
  titulo?: string;
  children?: React.ReactNode;
  /** Zona inferior (enlace o botón) */
  pie?: React.ReactNode;
  /** Convierte la tarjeta entera en enlace; el borde pasa a tinta al pasar el cursor */
  href?: string;
  variante?: 'borde' | 'hundida';
  className?: string;
  style?: React.CSSProperties;
}
export declare function Tarjeta(props: TarjetaProps): JSX.Element;
/** Etiqueta de estado. Siempre con una palabra que nombre el estado (nunca solo color). */
export interface EstadoProps {
  tipo?: 'exito' | 'alerta' | 'error' | 'neutro';
  /** Palabra del estado; por defecto Listo / Pendiente / Error / Borrador */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Estado(props: EstadoProps): JSX.Element;
/** Ficha seleccionable para filtros y temas (no es un estado). */
export interface FichaProps {
  activa?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Ficha(props: FichaProps): JSX.Element;
/** Monto con moneda y separador de miles con espacio: ₡2 825 000 · US$1 500. */
export interface MontoProps {
  valor: number;
  moneda?: 'CRC' | 'USD';
  decimales?: number;
  style?: React.CSSProperties;
}
export declare function Monto(props: MontoProps): JSX.Element;
/**
 * Tabla de cotización con subtotal, IVA en fila aparte y total.
 * @startingPoint section="Contenido" subtitle="Tabla de cotización con IVA 13 %" viewport="700x420"
 */
export interface PartidaCotizacion { concepto: string; detalle?: string; cantidad?: number; precio: number; }
export interface CotizacionProps {
  partidas: PartidaCotizacion[];
  moneda?: 'CRC' | 'USD';
  /** Porcentaje de IVA; 13 en Costa Rica */
  iva?: number;
  /** Nota al pie en estilo nota */
  nota?: string;
  style?: React.CSSProperties;
}
export declare function Cotizacion(props: CotizacionProps): JSX.Element;
/** Pestañas con indicador de 2px en realce. */
export interface PestanasProps {
  pestanas: { id: string; texto: string }[];
  /** Controlado; si se omite, interno */
  activa?: string;
  alCambiar?: (id: string) => void;
  style?: React.CSSProperties;
}
export declare function Pestanas(props: PestanasProps): JSX.Element;
/** Menú desplegable; usa sombra-flotante (único caso de sombra junto con Dialogo). */
export interface MenuProps {
  disparador: React.ReactNode;
  opciones: { texto: string; icono?: NombreIcono; alElegir?: () => void }[];
  /** Estado inicial */
  abierto?: boolean;
  style?: React.CSSProperties;
}
export declare function Menu(props: MenuProps): JSX.Element;
/** Aviso en línea; siempre abre con la palabra del estado. */
export interface AvisoProps {
  tipo?: 'exito' | 'alerta' | 'error' | 'info';
  /** Palabra del estado; por defecto Listo / Atención / Error / Nota */
  estado?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Aviso(props: AvisoProps): JSX.Element;
/** Diálogo modal: esquinas rectas, sombra-flotante, pie con filete. */
export interface DialogoProps {
  abierto?: boolean;
  titulo: string;
  children: React.ReactNode;
  /** Botones del pie (secundario primero, primario al final) */
  acciones?: React.ReactNode;
  alCerrar?: () => void;
  /** Renderiza sin fondo ni posición fija (para documentación) */
  enLinea?: boolean;
  style?: React.CSSProperties;
}
export declare function Dialogo(props: DialogoProps): JSX.Element | null;
/** Notificación flotante breve sobre tinta, con palabra de estado. */
export interface NotificacionProps {
  tipo?: 'exito' | 'alerta' | 'error';
  estado?: string;
  children: React.ReactNode;
  accion?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Notificacion(props: NotificacionProps): JSX.Element;
/** Burbuja de ayuda al pasar el cursor o enfocar. */
export interface AyudaProps {
  texto: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Ayuda(props: AyudaProps): JSX.Element;

// ── Añadidos: piezas, aplicaciones y recursos de marca ──
export { Franja, FranjaProps } from './Franja/Franja';
export { Imagen, ImagenProps } from './Imagen/Imagen';
export { HeroWeb, HeroWebProps } from './HeroWeb/HeroWeb';
export { Diapositiva, DiapositivaProps } from './Diapositiva/Diapositiva';
export { PublicacionRedes, PublicacionRedesProps } from './PublicacionRedes/PublicacionRedes';
export { TarjetaPresentacion, TarjetaPresentacionProps } from './TarjetaPresentacion/TarjetaPresentacion';
export { Panel, PanelProps } from './Panel/Panel';
export { Metrica, MetricaProps } from './Metrica/Metrica';
export { Tabla, TablaProps } from './Tabla/Tabla';
export { Pasos, PasosProps } from './Pasos/Pasos';
