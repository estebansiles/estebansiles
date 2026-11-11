(() => {
const { Logo, Icono } = window.SilesDesignSystem_ba437f;
function Pie() {
  return (
    <footer data-theme="dark" style={{background:'var(--fondo)',color:'var(--texto)',padding:'var(--space-16) 0 var(--space-8)'}}>
      <div className="sl-contenedor sl-reticula">
        <div style={{gridColumn:'span 5',display:'flex',flexDirection:'column',gap:'var(--space-6)'}}>
          <Logo variante="blanco" alto={40}/>
          <p className="sl-cuerpo" style={{color:'var(--texto-suave)',maxWidth:'36ch'}}>Todo se puede transformar digitalmente, no hay excusas.</p>
        </div>
        <div style={{gridColumn:'span 3',display:'flex',flexDirection:'column',gap:'var(--space-3)'}}>
          <span className="sl-etiqueta" style={{color:'var(--texto-suave)'}}>Contacto</span>
          {[['correo','esteban@siles.cr'],['mensaje','WhatsApp'],['ubicacion','San José, Costa Rica']].map(([i,t])=><span key={t} className="sl-cuerpo-ui" style={{display:'flex',gap:10,alignItems:'center'}}><Icono nombre={i} tamano={20}/>{t}</span>)}
        </div>
        <div style={{gridColumn:'span 4',display:'flex',flexDirection:'column',gap:'var(--space-3)'}}>
          <span className="sl-etiqueta" style={{color:'var(--texto-suave)'}}>Servicios</span>
          {['Transformación digital','Automatización','Marketing digital','Experiencia de usuario'].map(t=><span key={t} className="sl-cuerpo-ui">{t}</span>)}
        </div>
        <div style={{gridColumn:'1 / -1',borderTop:'1px solid var(--linea)',paddingTop:'var(--space-6)',marginTop:'var(--space-8)'}} className="sl-etiqueta"><span style={{color:'var(--texto-suave)'}}>© 2026 Siles Comunicación</span></div>
      </div>
    </footer>
  );
}
window.Pie=Pie;
})();
