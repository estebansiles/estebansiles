(() => {
const { Patron, Titulo, Boton, Tarjeta, Enlace, Seccion, Icono } = window.SilesDesignSystem_ba437f;
const SERVICIOS=[
  ['transformacion-digital','Transformación digital','Ordeno tus procesos y elijo contigo las herramientas que sí vas a usar.'],
  ['automatizacion','Automatización','Casi todo se puede automatizar. Empiezo por lo que más tiempo te quita.'],
  ['marketing','Marketing digital','Estrategia, contenido y medición para que cada colón invertido rinda.'],
  ['experiencia-usuario','Experiencia de usuario','Diseño sitios y aplicaciones pensando en quien los usa.'],
  ['factura-electronica','Factura electrónica','Integro la facturación con tu contabilidad y tu sistema de ventas.'],
  ['agente-ia','Agentes de IA','Asistentes que responden, agendan y dan seguimiento por ti.']];
function Inicio({ ir }) {
  return (<>
    <Patron alto={560} semilla={11} densidad={14}>
      <div style={{display:'flex',flexDirection:'column',gap:'var(--space-6)'}}>
        <span className="sl-etiqueta" style={{color:'var(--texto-suave)'}}>Comunicación estratégica</span>
        <h1 className="sl-display sl-titulo" style={{margin:0}}><span className="sl-firma">T</span>odo se puede transformar</h1>
        <p className="sl-subtitulo" style={{color:'var(--texto-suave)'}}>Hola, soy Esteban. Me dedico a la comunicación estratégica y a la transformación digital. No hay excusas.</p>
        <div style={{display:'flex',gap:'var(--space-3)',flexWrap:'wrap'}}><Boton iconoFinal="flecha" onClick={()=>ir('contacto')}>Agendá una llamada</Boton><Boton variante="secundario" icono="mensaje">Escribime por WhatsApp</Boton></div>
      </div>
    </Patron>
    <Seccion>
      <div className="sl-reticula" style={{alignItems:'end',marginBottom:'var(--space-12)'}}>
        <div style={{gridColumn:'span 7'}}><Titulo nivel={2} antetitulo="Servicios">Lo que hago</Titulo></div>
        <p className="sl-cuerpo-lg" style={{gridColumn:'span 5',color:'var(--texto-suave)'}}>Te acompaño desde la estrategia hasta la implementación.</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'var(--space-6)'}}>
        {SERVICIOS.map(([i,t,d])=><Tarjeta key={t} icono={i} titulo={t} pie={<Enlace href="#" onClick={e=>{e.preventDefault();ir('servicios');}}>Ver más</Enlace>}>{d}</Tarjeta>)}
      </div>
    </Seccion>
    <Seccion alterna>
      <Titulo nivel={2} antetitulo="Proceso">Cómo trabajo</Titulo>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:'var(--space-8)',marginTop:'var(--space-12)'}}>
        {[['investigar','Investigo','Entiendo tu negocio y a tus clientes.'],['planear','Planeo','Defino prioridades, costos y plazos.'],['desarrollo','Implemento','Construyo y conecto las herramientas.'],['mejorar','Mejoro','Mido resultados y ajusto.']].map(([i,t,d],n)=>(
          <div key={t} style={{display:'flex',flexDirection:'column',gap:'var(--space-3)',borderTop:'1px solid var(--texto)',paddingTop:'var(--space-5)'}}>
            <div style={{display:'flex',justifyContent:'space-between'}}><span className="sl-etiqueta" style={{color:'var(--texto-suave)'}}>Paso {n+1}</span><Icono nombre={i} tamano={32}/></div>
            <h3 className="sl-titulo-3" style={{margin:0}}>{t}</h3><p className="sl-cuerpo" style={{color:'var(--texto-suave)'}}>{d}</p>
          </div>))}
      </div>
    </Seccion>
    <Seccion tema="oscuro">
      <div className="sl-reticula" style={{alignItems:'center'}}>
        <div style={{gridColumn:'span 8'}}><Titulo nivel={2} tamano={1} bajada="Una llamada de 30 minutos basta para encontrar el primer proceso que podés automatizar.">Casi todo se puede automatizar</Titulo></div>
        <div style={{gridColumn:'span 4',display:'flex',justifyContent:'flex-end'}}><Boton variante="primario" iconoFinal="flecha" onClick={()=>ir('contacto')}>Agendá una llamada</Boton></div>
      </div>
    </Seccion>
  </>);
}
window.Inicio=Inicio;
})();
