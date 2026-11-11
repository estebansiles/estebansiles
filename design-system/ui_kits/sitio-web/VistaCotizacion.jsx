(() => {
const { Logo, Cotizacion: TablaCotizacion, Estado, Boton, Menu, Seccion, Notificacion } = window.SilesDesignSystem_ba437f;
function VistaCotizacion() {
  const [aviso,setAviso]=React.useState(null);
  const mostrar=t=>{setAviso(t);setTimeout(()=>setAviso(null),2600);};
  return (
    <Seccion alterna>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'var(--space-6)'}}>
        <div style={{display:'flex',gap:'var(--space-3)',alignItems:'center'}}><span className="sl-etiqueta" style={{color:'var(--texto-suave)'}}>Cotización SC-2026-041</span><Estado tipo="alerta">En revisión</Estado></div>
        <div style={{display:'flex',gap:'var(--space-3)'}}>
          <Menu disparador={<Boton variante="secundario" tamano="sm" iconoFinal="descargar">Exportar</Boton>} opciones={[{texto:'Descargar PDF',icono:'descargar',alElegir:()=>mostrar('Descargué el PDF.')},{texto:'Enviar por correo',icono:'correo',alElegir:()=>mostrar('Cotización enviada a tu correo.')}]}/>
          <Boton tamano="sm" icono="firma-digital" onClick={()=>mostrar('Cotización aprobada.')}>Aprobar con firma digital</Boton>
        </div>
      </div>
      <article style={{background:'var(--superficie)',border:'1px solid var(--linea)',padding:'var(--space-16)',display:'flex',flexDirection:'column',gap:'var(--space-12)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
          <Logo alto={44}/>
          <div className="sl-cuerpo-ui" style={{textAlign:'right',color:'var(--texto-suave)'}}>9 de noviembre de 2026<br/>Vigencia: 15 días</div>
        </div>
        <div className="sl-reticula">
          <div style={{gridColumn:'span 6'}}><span className="sl-etiqueta" style={{color:'var(--texto-suave)'}}>Para</span><p className="sl-cuerpo-ui" style={{marginTop:8}}><b>Distribuidora del Valle S. A.</b><br/>Laura Méndez · Gerencia general</p></div>
          <div style={{gridColumn:'span 6'}}><span className="sl-etiqueta" style={{color:'var(--texto-suave)'}}>Proyecto</span><p className="sl-cuerpo-ui" style={{marginTop:8}}><b>Automatización de facturación y cobro</b><br/>Inicio estimado: enero 2027</p></div>
        </div>
        <h1 className="sl-titulo-2 sl-titulo" style={{margin:0}}><span className="sl-firma">P</span>ropuesta económica</h1>
        <TablaCotizacion partidas={[{concepto:'Diagnóstico digital',detalle:'Entrevistas, mapa de procesos y priorización',precio:450000},{concepto:'Automatización de facturación',detalle:'Integración con factura electrónica y contabilidad',precio:1187500},{concepto:'Recordatorios de cobro',detalle:'Flujo por correo y WhatsApp',precio:687500},{concepto:'Capacitación',detalle:'Dos sesiones de 2 horas',cantidad:2,precio:250000}]} nota="Precios en colones costarricenses. Pagos: 50 % al iniciar, 50 % contra entrega."/>
        <p className="sl-cuerpo sl-medida">Con esta propuesta tu equipo deja de digitar facturas a mano y el cobro se da seguimiento solo. Si tienes dudas, escríbeme. Lo resolvemos en una llamada.</p>
      </article>
      {aviso && <div style={{position:'fixed',left:24,bottom:24,zIndex:50}}><Notificacion>{aviso}</Notificacion></div>}
    </Seccion>
  );
}
window.VistaCotizacion=VistaCotizacion;
})();
