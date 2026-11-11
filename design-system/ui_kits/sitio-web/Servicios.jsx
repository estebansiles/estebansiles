(() => {
const { Titulo, Seccion, Pestanas, Ficha, Icono, Boton, Estado } = window.SilesDesignSystem_ba437f;
const DETALLE={
  automatizacion:{icono:'automatizacion',titulo:'Automatización',texto:'Reviso tus tareas repetitivas y las convierto en flujos que corren solos: aprobaciones, recordatorios, reportes y conciliaciones.',puntos:['Mapa de procesos y priorización','Integración entre sistemas existentes','Capacitación para tu equipo'],plazo:'4 a 8 semanas'},
  marketing:{icono:'marketing',titulo:'Marketing digital',texto:'Defino contigo a quién le hablas, qué le dices y cómo medir si funciona. Sin campañas que nadie revisa.',puntos:['Estrategia y calendario de contenido','Pauta en redes y buscadores','Tablero de resultados mensual'],plazo:'Mensual'},
  ux:{icono:'experiencia-usuario',titulo:'Experiencia de usuario',texto:'Investigo cómo usan tus clientes el sitio o la aplicación y rediseño lo que les estorba.',puntos:['Entrevistas y pruebas con usuarios','Prototipos navegables','Guía de diseño para desarrollo'],plazo:'6 a 10 semanas'}};
function Servicios({ ir }) {
  const [tab,setTab]=React.useState('automatizacion');
  const [filtro,setFiltro]=React.useState('Pymes');
  const d=DETALLE[tab];
  return (
    <Seccion>
      <Titulo nivel={1} tamano={1} antetitulo="Servicios" bajada="Elige por dónde empezar. Todo se puede combinar.">Servicios</Titulo>
      <div style={{display:'flex',gap:'var(--space-2)',margin:'var(--space-8) 0 var(--space-6)'}}>{['Pymes','Instituciones','Profesionales'].map(f=><Ficha key={f} activa={filtro===f} onClick={()=>setFiltro(f)}>{f}</Ficha>)}</div>
      <Pestanas activa={tab} alCambiar={setTab} pestanas={[{id:'automatizacion',texto:'Automatización'},{id:'marketing',texto:'Marketing digital'},{id:'ux',texto:'Experiencia de usuario'}]}/>
      <div className="sl-reticula" style={{marginTop:'var(--space-12)'}}>
        <div style={{gridColumn:'span 7',display:'flex',flexDirection:'column',gap:'var(--space-6)'}}>
          <Icono nombre={d.icono} tamano={48}/>
          <h2 className="sl-titulo-2" style={{margin:0}}>{d.titulo}</h2>
          <p className="sl-cuerpo-lg sl-medida" style={{color:'var(--texto-suave)'}}>{d.texto}</p>
          <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column'}}>{d.puntos.map(p=><li key={p} className="sl-cuerpo" style={{display:'flex',gap:12,alignItems:'center',padding:'var(--space-3) 0',borderBottom:'1px solid var(--linea)'}}><Icono nombre="check" tamano={24}/>{p}</li>)}</ul>
        </div>
        <aside style={{gridColumn:'9 / span 4',background:'var(--fondo-alterno)',padding:'var(--space-8)',display:'flex',flexDirection:'column',gap:'var(--space-4)',alignSelf:'start'}}>
          <span className="sl-etiqueta" style={{color:'var(--texto-suave)'}}>Plazo</span><span className="sl-titulo-3">{d.plazo}</span>
          <span className="sl-etiqueta" style={{color:'var(--texto-suave)',marginTop:'var(--space-2)'}}>Disponibilidad</span><span><Estado tipo="exito">Abierta</Estado></span>
          <Boton bloque onClick={()=>ir('cotizacion')} style={{marginTop:'var(--space-4)'}}>Pide una cotización</Boton>
        </aside>
      </div>
    </Seccion>
  );
}
window.Servicios=Servicios;
})();
