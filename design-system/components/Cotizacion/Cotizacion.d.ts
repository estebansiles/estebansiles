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
