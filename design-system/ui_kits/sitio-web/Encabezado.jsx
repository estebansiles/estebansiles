(() => {
const { Logo, Boton, BotonIcono } = window.SilesDesignSystem_ba437f;
function Encabezado({ vista, ir }) {
  const items=[['inicio','Inicio'],['servicios','Servicios'],['cotizacion','Cotización'],['contacto','Contacto']];
  return (
    <header style={{position:'sticky',top:0,zIndex:10,background:'var(--fondo)',borderBottom:'1px solid var(--linea)'}}>
      <div className="sl-contenedor" style={{display:'flex',alignItems:'center',gap:'var(--space-8)',height:80}}>
        <a href="#" onClick={e=>{e.preventDefault();ir('inicio');}} aria-label="Inicio"><Logo alto={36}/></a>
        <nav style={{display:'flex',gap:'var(--space-6)',marginLeft:'auto'}}>
          {items.map(([id,t])=><a key={id} href="#" onClick={e=>{e.preventDefault();ir(id);}} className="sl-cuerpo-ui" style={{color:vista===id?'var(--texto)':'var(--texto-suave)',textDecoration:'none',fontWeight:vista===id?700:400,borderBottom:vista===id?'2px solid var(--realce)':'2px solid transparent',padding:'6px 0'}}>{t}</a>)}
        </nav>
        <Boton tamano="sm" onClick={()=>ir('contacto')}>Agenda una llamada</Boton>
      </div>
    </header>
  );
}
window.Encabezado=Encabezado;
})();
