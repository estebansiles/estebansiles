(() => {
const { Titulo, Seccion, Campo, Selector, Casilla, Boton, Aviso, Icono, Dialogo } = window.SilesDesignSystem_ba437f;
function Contacto() {
  const [enviado,setEnviado]=React.useState(false);
  const [error,setError]=React.useState('');
  const [dialogo,setDialogo]=React.useState(false);
  const enviar=e=>{e.preventDefault();const c=e.target.correo.value;if(!c.includes('@')){setError('Escribe un correo válido');return;}setError('');setEnviado(true);};
  return (
    <Seccion>
      <div className="sl-reticula">
        <div style={{gridColumn:'span 5',display:'flex',flexDirection:'column',gap:'var(--space-8)'}}>
          <Titulo nivel={1} tamano={1} antetitulo="Contacto" bajada="Cuéntame qué quieres transformar. Te respondo en menos de 24 horas.">Hablemos</Titulo>
          <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)'}}>
            {[['correo','esteban@siles.cr'],['mensaje','Escríbeme por WhatsApp'],['calendario','Agenda una llamada de 30 minutos']].map(([i,t])=><a key={t} href="#" onClick={e=>{e.preventDefault();if(i==='calendario')setDialogo(true);}} className="sl-cuerpo" style={{display:'flex',gap:12,alignItems:'center',color:'var(--texto)',textDecoration:'none',padding:'var(--space-3) 0',borderBottom:'1px solid var(--linea)'}}><Icono nombre={i} tamano={24}/>{t}</a>)}
          </div>
        </div>
        <form onSubmit={enviar} style={{gridColumn:'7 / span 6',display:'flex',flexDirection:'column',gap:'var(--space-5)'}}>
          {enviado ? <Aviso tipo="exito">Recibí tu mensaje. Te respondo en menos de 24 horas.</Aviso> : <>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'var(--space-5)'}}><Campo etiqueta="Nombre" name="nombre" placeholder="Tu nombre"/><Campo etiqueta="Correo" name="correo" placeholder="nombre@empresa.cr" error={error||undefined}/></div>
          <Selector etiqueta="¿Qué te interesa?" opciones={['Transformación digital','Automatización','Marketing digital','Experiencia de usuario']}/>
          <Campo etiqueta="Cuéntame tu proyecto" multilinea rows={5} placeholder="Qué haces hoy y qué te gustaría cambiar"/>
          <Casilla etiqueta="Acepto que Siles Comunicación use estos datos para responderme" defaultChecked/>
          <div><Boton type="submit" iconoFinal="flecha">Envía tu mensaje</Boton></div></>}
        </form>
      </div>
      <Dialogo abierto={dialogo} titulo="Agenda una llamada" alCerrar={()=>setDialogo(false)} acciones={<><Boton variante="fantasma" onClick={()=>setDialogo(false)}>Cancelar</Boton><Boton onClick={()=>setDialogo(false)}>Confirmar</Boton></>}>
        <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)'}}><p className="sl-cuerpo">Elige un horario de 30 minutos. Te envío la invitación por correo.</p>
        <Selector etiqueta="Horario" opciones={['Martes 11 de noviembre · 9:00','Martes 11 de noviembre · 14:00','Jueves 13 de noviembre · 10:00']}/></div>
      </Dialogo>
    </Seccion>
  );
}
window.Contacto=Contacto;
})();
