/* Prototipo del sitio de Siles Comunicación.
   Sitio estático de una sola página con rutas por hash (#/servicios, #/blog, ...).
   Usa los componentes reales del sistema de diseño (ds/components/bundle.js) con React 18 y htm, sin paso de compilación. */
(function () {
  'use strict';

  var DS = window.SilesDesignSystem_ba437f;
  var Logo = DS.Logo, Icono = DS.Icono, Boton = DS.Boton, Enlace = DS.Enlace, Seccion = DS.Seccion,
    Tarjeta = DS.Tarjeta, Patron = DS.Patron, Franja = DS.Franja, Pasos = DS.Pasos, Pestanas = DS.Pestanas,
    Ficha = DS.Ficha, Estado = DS.Estado, Campo = DS.Campo, Selector = DS.Selector, Casilla = DS.Casilla,
    Aviso = DS.Aviso, Notificacion = DS.Notificacion;
  var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;

  /* htm sobre React: acepta class="" y style="" escritos como en HTML */
  function estilo(texto) {
    var o = {};
    texto.split(';').forEach(function (par) {
      var i = par.indexOf(':');
      if (i < 0) return;
      var k = par.slice(0, i).trim(), v = par.slice(i + 1).trim();
      if (!k) return;
      if (k.indexOf('--') !== 0) k = k.replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); });
      o[k] = v;
    });
    return o;
  }
  function crear(tipo, props) {
    if (props) {
      if (typeof props.style === 'string') props.style = estilo(props.style);
      if (typeof tipo === 'string' && 'class' in props) { props.className = props.class; delete props.class; }
    }
    return React.createElement.apply(React, arguments);
  }
  var html = htm.bind(crear);

  var SUAVE = 'color: var(--texto-suave)';
  var RUTAS = [['inicio', 'Inicio'], ['servicios', 'Servicios'], ['proyectos', 'Proyectos'], ['blog', 'Blog'], ['cotizacion', 'Cotización'], ['contacto', 'Contacto']];
  function ir(ruta) { return '#/' + (ruta === 'inicio' ? '' : ruta); }
  function correoValido(c) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(c); }

  /* ---------- Piezas compartidas ---------- */

  function Encabezado(p) {
    var cta = p.vista === 'contacto' ? ['cotizacion', 'Pedí una cotización'] : ['contacto', 'Agendá una llamada'];
    return html`
      <header style="position: sticky; top: 0; z-index: 10; background: var(--fondo); border-bottom: 1px solid var(--linea)">
        <div class="sl-contenedor" style="display: flex; align-items: center; flex-wrap: wrap; gap: var(--space-2) var(--space-8); min-height: 80px; padding-top: var(--space-2); padding-bottom: var(--space-2)">
          <a href=${ir('inicio')} aria-label="Siles Comunicación, inicio" style="display: flex; align-items: center; min-height: 44px"><${Logo} alto=${36} /></a>
          <nav aria-label="Principal" style="display: flex; flex-wrap: wrap; gap: 0 var(--space-6); margin-left: auto">
            ${RUTAS.filter(function (r) { return r[0] !== 'cotizacion'; }).map(function (r) {
              var actual = p.vista === r[0] ? 'page' : (p.vista === 'proyecto' && r[0] === 'proyectos' ? 'true' : undefined);
              return html`<a key=${r[0]} class="sl-cuerpo-ui nav-a" href=${ir(r[0])} aria-current=${actual}>${r[1]}</a>`;
            })}
          </nav>
          <${Boton} variante="secundario" tamano="sm" href=${ir(cta[0])}>${cta[1]}<//>
        </div>
      </header>`;
  }

  function Pie(p) {
    return html`
      <footer data-theme="dark" style="background: var(--fondo); color: var(--texto); padding: var(--space-16) 0 var(--space-8)">
        <div class="sl-contenedor" style="display: flex; flex-wrap: wrap; gap: var(--space-12) var(--space-8)">
          <div style="flex: 5 1 280px; display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-6)">
            <${Logo} variante="blanco" alto=${40} />
            <p class="sl-cuerpo" style="margin: 0; color: var(--texto-suave); max-width: 36ch">Todo se puede transformar digitalmente, no hay excusas.</p>
          </div>
          <div style="flex: 3 1 200px; display: flex; flex-direction: column; gap: var(--space-3)">
            <span class="sl-etiqueta" style=${SUAVE}>Contacto</span>
            <span class="sl-cuerpo-ui" style="display: flex; gap: 10px; align-items: center"><${Icono} nombre="correo" tamano=${20} />esteban@siles.cr</span>
            <span class="sl-cuerpo-ui" style="display: flex; gap: 10px; align-items: center"><${Icono} nombre="mensaje" tamano=${20} />WhatsApp</span>
            <span class="sl-cuerpo-ui" style="display: flex; gap: 10px; align-items: center"><${Icono} nombre="ubicacion" tamano=${20} />San José, Costa Rica</span>
          </div>
          <div style="flex: 4 1 200px; display: flex; flex-direction: column; gap: var(--space-3)">
            <span class="sl-etiqueta" style=${SUAVE}>Sitio</span>
            ${RUTAS.filter(function (r) { return r[0] !== p.vista && r[0] !== 'inicio'; }).map(function (r) {
              return html`<a key=${r[0]} class="sl-cuerpo-ui nav-a" href=${ir(r[0])} style="align-self: flex-start">${r[1]}</a>`;
            })}
          </div>
          <div class="sl-etiqueta" style="flex: 1 1 100%; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: var(--space-2) var(--space-6); border-top: 1px solid var(--linea); padding-top: var(--space-6); color: var(--texto-suave)">
            <span>© 2026 Siles Comunicación</span>
            <span style="display: flex; flex-wrap: wrap; gap: 0 var(--space-6)"><a class="nav-a" href="#privacidad">Privacidad</a><a class="nav-a" href="#terminos">Términos de servicio</a></span>
          </div>
        </div>
      </footer>`;
  }

  /* Título de sección con la firma de la marca (barra bajo la primera letra) */
  function Firma(p) {
    var T = p.nivel || 'h2';
    var t = p.children;
    return html`<${T} class=${(p.clase || 'sl-titulo-2') + ' sl-titulo ' + (p.extra || '')} style=${'margin: 0;' + (p.estilo || '')}><span class="sl-firma">${t.charAt(0)}</span>${t.slice(1)}<//>`;
  }

  function Cabecera(p) {
    return html`
      <div style="display: flex; flex-direction: column; gap: var(--space-4)">
        <span class="sl-etiqueta entra" style=${SUAVE}>${p.antetitulo}</span>
        <${Firma} nivel="h1" clase="sl-titulo-1" extra="entra" estilo="animation-delay: .1s">${p.titulo}<//>
        <p class="sl-subtitulo sl-medida entra" style="margin: var(--space-2) 0 0; color: var(--texto-suave); animation-delay: .22s">${p.bajada}</p>
      </div>`;
  }

  function Encabezado2(p) {
    return html`
      <div class="revela" style="display: flex; flex-wrap: wrap; align-items: flex-end; gap: var(--space-6) var(--space-8); margin-bottom: ${p.margen || 'var(--space-12)'}">
        <div style="flex: 7 1 320px; display: flex; flex-direction: column; gap: var(--space-4)">
          <span class="sl-etiqueta" style=${SUAVE}>${p.antetitulo}</span>
          <${Firma}>${p.titulo}<//>
        </div>
        ${p.children}
      </div>`;
  }

  var REJILLA = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr)); gap: var(--space-6)';

  /* ---------- Inicio ---------- */

  var SERVICIOS = [
    ['transformacion-digital', 'Transformación digital', 'Ordeno tus procesos y elijo con vos las herramientas que sí vas a usar.'],
    ['automatizacion', 'Automatización', 'Casi todo se puede automatizar. Empiezo por lo que más tiempo te quita.'],
    ['marketing', 'Marketing digital', 'Estrategia, contenido y medición para que cada colón invertido rinda.'],
    ['experiencia-usuario', 'Experiencia de usuario', 'Diseño sitios y aplicaciones pensando en quien los usa.'],
    ['factura-electronica', 'Factura electrónica', 'Integro la facturación con tu contabilidad y tu sistema de ventas.'],
    ['agente-ia', 'Agentes de IA', 'Asistentes que responden, agendan y dan seguimiento por vos.']
  ];
  var PROCESO = [
    ['investigar', 'Investigo', 'Entiendo tu negocio y a tus clientes.'],
    ['planear', 'Planeo', 'Defino prioridades, costos y plazos.'],
    ['desarrollo', 'Implemento', 'Construyo y conecto las herramientas.'],
    ['mejorar', 'Mejoro', 'Mido resultados y ajusto.']
  ];
  var TEMAS = ['Transformación digital', 'Automatización', 'Agentes de IA', 'Factura electrónica 4.4', 'Integración SINPE Móvil', 'Firma digital', 'Ley 8968', 'Experiencia de usuario'];

  function Inicio() {
    return html`
      <${Patron} alto=${600} semilla=${11} densidad=${14}>
        <div style="display: flex; flex-direction: column; gap: var(--space-6)">
          <span class="sl-etiqueta entra" style=${SUAVE}>Comunicación estratégica</span>
          <${Firma} nivel="h1" clase="sl-display" extra="entra" estilo="animation-delay: .1s">Todo se puede transformar<//>
          <p class="sl-subtitulo entra" style="margin: 0; color: var(--texto-suave); animation-delay: .22s">Hola, soy Esteban. Me dedico a la comunicación estratégica y a la transformación digital. No hay excusas.</p>
          <div class="entra" style="display: flex; flex-wrap: wrap; gap: var(--space-3); animation-delay: .34s">
            <${Boton} iconoFinal="flecha" href=${ir('contacto')}>Agendá una llamada<//>
            <${Boton} variante="secundario" icono="mensaje" href=${ir('contacto')}>Escribime por WhatsApp<//>
          </div>
        </div>
      <//>

      <div class="cinta" aria-hidden="true">
        <div class="cinta__pista">
          ${TEMAS.concat(TEMAS).map(function (t, i) {
            return html`<span key=${i} class="sl-etiqueta" style="display: flex; align-items: center; gap: var(--space-8); padding: var(--space-5) 0 var(--space-5) var(--space-8); color: var(--texto-suave); white-space: nowrap">${t}<span style="width: 6px; height: 6px; background: var(--realce)"></span></span>`;
          })}
        </div>
      </div>

      <${Seccion}>
        <${Encabezado2} antetitulo="Servicios" titulo="Lo que hago">
          <p class="sl-cuerpo-lg" style="flex: 5 1 280px; margin: 0; color: var(--texto-suave)">Te acompaño desde la estrategia hasta la implementación.</p>
        <//>
        <div style=${REJILLA}>
          ${SERVICIOS.map(function (s) {
            return html`<div key=${s[1]} class="revela eleva" style="display: grid"><${Tarjeta} icono=${s[0]} titulo=${s[1]} href=${ir('servicios')}>${s[2]}<//></div>`;
          })}
        </div>
      <//>

      <${Seccion} alterna=${true}>
        <div class="revela" style="display: flex; flex-direction: column; gap: var(--space-4)">
          <span class="sl-etiqueta" style=${SUAVE}>Proceso</span>
          <${Firma}>Cómo trabajo<//>
        </div>
        <div class="pasos-4" style="gap: var(--space-8); margin-top: var(--space-12)">
          ${PROCESO.map(function (s, i) {
            return html`
              <div key=${s[1]} class="traza revela" style="display: flex; flex-direction: column; gap: var(--space-3)">
                <div style="display: flex; justify-content: space-between; align-items: center"><span class="sl-etiqueta" style=${SUAVE}>Paso ${i + 1}</span><${Icono} nombre=${s[0]} tamano=${32} /></div>
                <h3 class="sl-titulo-3" style="margin: 0">${s[1]}</h3>
                <p class="sl-cuerpo" style="margin: 0; color: var(--texto-suave)">${s[2]}</p>
              </div>`;
          })}
        </div>
      <//>

      <${Franja} fondo="marca" alto=${420}>
        <div class="revela" style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-6)">
          <${Firma} clase="sl-titulo-1">Casi todo se puede automatizar<//>
          <p class="sl-subtitulo sl-medida" style="margin: 0; color: var(--texto-suave)">Una llamada de 30 minutos basta para encontrar el primer proceso que podés automatizar.</p>
          <${Boton} iconoFinal="flecha" href=${ir('contacto')}>Agendá una llamada<//>
        </div>
      <//>`;
  }

  /* ---------- Servicios ---------- */

  var DETALLE = {
    automatizacion: { icono: 'automatizacion', titulo: 'Automatización', texto: 'Reviso tus tareas repetitivas y las convierto en flujos que corren solos: aprobaciones, recordatorios, reportes y conciliaciones.', puntos: ['Mapa de procesos y priorización', 'Integración entre sistemas existentes', 'Capacitación para tu equipo'], plazo: '4 a 8 semanas' },
    marketing: { icono: 'marketing', titulo: 'Marketing digital', texto: 'Defino con vos a quién le hablás, qué le decís y cómo medir si funciona. Sin campañas que nadie revisa.', puntos: ['Estrategia y calendario de contenido', 'Pauta en redes y buscadores', 'Tablero de resultados mensual'], plazo: 'Mensual' },
    ux: { icono: 'experiencia-usuario', titulo: 'Experiencia de usuario', texto: 'Investigo cómo usan tus clientes el sitio o la aplicación y rediseño lo que les estorba.', puntos: ['Entrevistas y pruebas con usuarios', 'Prototipos navegables', 'Guía de diseño para desarrollo'], plazo: '6 a 10 semanas' }
  };
  var FASES = [
    { etiqueta: 'Fase 1', titulo: 'Diagnóstico', texto: 'Reviso procesos y datos, y priorizo con vos.' },
    { etiqueta: 'Fase 2', titulo: 'Diseño', texto: 'Defino la solución, los costos y los plazos.' },
    { etiqueta: 'Fase 3', titulo: 'Implementación', texto: 'Construyo, conecto y capacito a tu equipo.' }
  ];

  function Servicios() {
    var e = useState('automatizacion'), activa = e[0], setActiva = e[1];
    var d = DETALLE[activa];
    return html`
      <${Seccion}>
        <${Cabecera} antetitulo="Servicios" titulo="Servicios" bajada="Elegí por dónde empezar. Todo se puede combinar." />
        <div class="entra" style="margin-top: var(--space-12); overflow-x: auto; animation-delay: .34s">
          <${Pestanas} pestanas=${[{ id: 'automatizacion', texto: 'Automatización' }, { id: 'marketing', texto: 'Marketing digital' }, { id: 'ux', texto: 'Experiencia de usuario' }]} activa=${activa} alCambiar=${setActiva} />
        </div>
        <div key=${activa} class="cambia" style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: var(--space-12) var(--space-16); margin-top: var(--space-12); animation-name: sube-a">
          <div style="flex: 7 1 360px; min-width: 0; display: flex; flex-direction: column; gap: var(--space-6)">
            <${Icono} nombre=${d.icono} tamano=${48} />
            <h2 class="sl-titulo-2" style="margin: 0">${d.titulo}</h2>
            <p class="sl-cuerpo-lg sl-medida" style="margin: 0; color: var(--texto-suave)">${d.texto}</p>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column">
              ${d.puntos.map(function (punto) {
                return html`<li key=${punto} class="sl-cuerpo" style="display: flex; gap: 12px; align-items: center; padding: var(--space-3) 0; border-bottom: 1px solid var(--linea)"><${Icono} nombre="check" tamano=${24} />${punto}</li>`;
              })}
            </ul>
          </div>
          <aside style="flex: 4 1 280px; background: var(--fondo-alterno); padding: var(--space-8); display: flex; flex-direction: column; gap: var(--space-4)">
            <span class="sl-etiqueta" style=${SUAVE}>Plazo</span>
            <span class="sl-titulo-3">${d.plazo}</span>
            <span class="sl-etiqueta" style="color: var(--texto-suave); margin-top: var(--space-2)">Disponibilidad</span>
            <span><${Estado} tipo="exito">Abierta<//></span>
            <div style="margin-top: var(--space-4)"><${Boton} bloque=${true} iconoFinal="flecha" href=${ir('cotizacion')}>Pedí una cotización<//></div>
          </aside>
        </div>
      <//>

      <${Seccion} alterna=${true}>
        <${Encabezado2} antetitulo="Método" titulo="Por fases, sin saltos al vacío">
          <p class="sl-cuerpo-lg" style="flex: 5 1 280px; margin: 0; color: var(--texto-suave)">Cada fase entrega algo que ya podés usar, y decidís si seguimos con la siguiente.</p>
        <//>
        <div class="revela" style="overflow-x: auto"><${Pasos} pasos=${FASES} /></div>
      <//>

      <${Seccion}>
        <div class="revela" style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-6) var(--space-8)">
          <div style="flex: 8 1 320px; display: flex; flex-direction: column; gap: var(--space-4)">
            <${Firma}>¿No sabés por dónde empezar?<//>
            <p class="sl-subtitulo sl-medida" style="margin: 0; color: var(--texto-suave)">Contame qué hacés hoy y te digo cuál es el primer paso.</p>
          </div>
          <${Enlace} href=${ir('contacto')}>Hablemos<//>
        </div>
      <//>`;
  }

  /* ---------- Proyectos ---------- */

  var SECTORES = ['Todos', 'Turismo', 'Agroindustria', 'Comercio', 'Servicios profesionales', 'Salud'];
  var PROYECTOS = [
    { sector: 'Turismo', icono: 'calendario' },
    { sector: 'Agroindustria', icono: 'analitica' },
    { sector: 'Comercio', icono: 'pagos' },
    { sector: 'Servicios profesionales', icono: 'clientes' },
    { sector: 'Salud', icono: 'proteccion-datos' },
    { sector: 'Comercio', icono: 'factura-electronica' }
  ];

  function Filtro(p) {
    return html`
      <div class="revela" role="group" aria-label=${p.etiqueta} style="display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-8)">
        ${p.opciones.map(function (o) {
          return html`<${Ficha} key=${o} activa=${o === p.valor} onClick=${function () { p.alCambiar(o); }}>${o}<//>`;
        })}
      </div>`;
  }

  function Proyectos() {
    var e = useState('Todos'), sector = e[0], setSector = e[1];
    var lista = PROYECTOS.filter(function (p) { return sector === 'Todos' || p.sector === sector; });
    return html`
      <${Seccion}>
        <${Cabecera} antetitulo="Portafolio" titulo="Proyectos" bajada="Lo que ya transformé con pymes y empresas de Costa Rica. Cada caso cuenta el reto, lo que hice y el resultado." />
        <article class="entra papel" style="display: flex; flex-wrap: wrap; align-items: stretch; margin-top: var(--space-12); border: 1px solid var(--linea); animation-delay: .34s">
          <div style="flex: 5 1 320px; min-width: 0; min-height: 280px; display: grid"><${Patron} alto=${280} semilla=${5} densidad=${10} /></div>
          <div style="flex: 7 1 360px; min-width: 0; box-sizing: border-box; padding: var(--space-12) var(--space-8); display: flex; flex-direction: column; gap: var(--space-6)">
            <div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-3)">
              <span class="sl-etiqueta" style=${SUAVE}>Caso destacado</span>
              <${Estado} tipo="exito">En producción<//>
            </div>
            <h2 class="sl-titulo-2" style="margin: 0">[Nombre del proyecto destacado]</h2>
            <p class="sl-cuerpo-lg sl-medida" style="margin: 0; color: var(--texto-suave)">[Cliente, sector y una frase que resuma el cambio que lograron]</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr)); gap: var(--space-6)">
              ${[['Reto', '[Qué problema tenía el cliente]'], ['Solución', '[Qué construí y con qué herramientas]'], ['Resultado', '[Cifra o cambio medible]']].map(function (c) {
                return html`<div key=${c[0]} class="traza" style="display: flex; flex-direction: column; gap: var(--space-2)"><span class="sl-etiqueta" style=${SUAVE}>${c[0]}</span><p class="sl-cuerpo-ui" style="margin: 0">${c[1]}</p></div>`;
              })}
            </div>
            <div><${Enlace} href=${ir('proyecto')}>Mirá el caso completo<//></div>
          </div>
        </article>
      <//>

      <${Seccion} alterna=${true}>
        <${Encabezado2} antetitulo="Por sector" titulo="Todos los proyectos" margen="var(--space-8)">
          <p class="sl-cuerpo-ui" role="status" style="flex: 0 1 auto; margin: 0; color: var(--texto-suave)">${lista.length === 1 ? '1 proyecto' : lista.length + ' proyectos'}</p>
        <//>
        <${Filtro} etiqueta="Filtrar por sector" opciones=${SECTORES} valor=${sector} alCambiar=${setSector} />
        <div key=${sector} class="cambia" style=${REJILLA + '; animation-name: sube-a'}>
          ${lista.map(function (p, i) {
            return html`<div key=${i} class="eleva" style="display: grid"><${Tarjeta} icono=${p.icono} antetitulo=${p.sector} titulo="[Nombre del proyecto]" href=${ir('proyecto')}>[Reto del cliente, lo que hice y el resultado medible]<//></div>`;
          })}
        </div>
        <p class="sl-nota" style="margin: var(--space-8) 0 0; color: var(--texto-suave)">Tarjetas de ejemplo: reemplazá cada una por un proyecto real con el permiso del cliente.</p>
      <//>

      <${Franja} fondo="marca" alto=${420}>
        <div class="revela" style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-6)">
          <${Firma} clase="sl-titulo-1">Tu proyecto puede ser el siguiente<//>
          <p class="sl-subtitulo sl-medida" style="margin: 0; color: var(--texto-suave)">Contame qué querés transformar y armamos el plan por fases.</p>
          <${Boton} iconoFinal="flecha" href=${ir('cotizacion')}>Pedí una cotización<//>
        </div>
      <//>`;
  }

  /* ---------- Proyecto único (plantilla) ---------- */

  var CAPTURAS = [
    { id: 'escritorio', texto: 'Escritorio', icono: 'diseno-web', proporcion: '16 / 10', rotulo: '[Captura de escritorio · 16:10]', alt: 'Espacio para la captura de escritorio', pie: 'Vista de escritorio' },
    { id: 'tableta', texto: 'Tableta', icono: 'experiencia-usuario', proporcion: '4 / 3', rotulo: '[Captura de tableta · 4:3]', alt: 'Espacio para la captura de tableta', pie: 'Vista de tableta' },
    { id: 'movil', texto: 'Móvil', icono: 'app-movil', proporcion: '1 / 1', rotulo: '[Captura de móvil]', alt: 'Espacio para la captura de móvil', pie: 'Vista de móvil' }
  ];
  var FICHA_PROYECTO = [['Cliente', '[Nombre del cliente]'], ['Año', '[Año]'], ['Sector', 'Salud'], ['Plazo', '[Duración]'], ['Servicios', '[Servicios aplicados]', true], ['Herramientas', '[Plataforma e integraciones]', true]];
  var CASO = [
    ['Reto', 'investigar', '[Qué problema tenía el cliente]', '[Contexto: cómo trabajaba antes, qué le costaba y qué quería lograr]'],
    ['Solución', 'desarrollo', '[Qué construí]', '[Decisiones de diseño, estructura del sitio e integraciones]'],
    ['Resultado', 'mejorar', '[Qué cambió]', '[Cifra o cambio medible, con el periodo en que se midió]']
  ];

  function Proyecto() {
    var e = useState('escritorio'), vista = e[0], setVista = e[1];
    var v = CAPTURAS.filter(function (x) { return x.id === vista; })[0];
    function alSitio(ev) { ev.preventDefault(); var el = document.getElementById('sitio'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    return html`
      <${Seccion}>
        <nav class="migas sl-cuerpo-ui entra" aria-label="Migas de pan" style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-2); margin-bottom: var(--space-8); color: var(--texto-suave)">
          <a href=${ir('inicio')}>Inicio</a><span aria-hidden="true">/</span>
          <a href=${ir('proyectos')}>Proyectos</a><span aria-hidden="true">/</span>
          <span aria-current="page" style="color: var(--texto)">Sitio web para doctor</span>
        </nav>

        <div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: var(--space-12) var(--space-16)">
          <div style="flex: 7 1 360px; min-width: 0; display: flex; flex-direction: column; gap: var(--space-4)">
            <div class="entra" style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-3); animation-delay: .06s">
              <span class="sl-etiqueta" style=${SUAVE}>Salud · Diseño web</span>
              <${Estado} tipo="exito">En producción<//>
            </div>
            <${Firma} nivel="h1" clase="sl-titulo-1" extra="entra" estilo="animation-delay: .12s">Sitio web para doctor<//>
            <p class="sl-subtitulo sl-medida entra" style="margin: var(--space-2) 0 0; color: var(--texto-suave); animation-delay: .24s">[Una frase que resuma qué se hizo y qué cambió para el cliente]</p>
            <div class="entra" style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-4) var(--space-6); margin-top: var(--space-4); animation-delay: .36s">
              <${Boton} iconoFinal="enlace-externo" href="#sitio" onClick=${alSitio}>Visitá el sitio<//>
              <${Enlace} href=${ir('contacto')}>Quiero algo así<//>
            </div>
          </div>
          <dl class="entra" style="flex: 4 1 280px; min-width: 0; margin: 0; padding: var(--space-8); background: var(--fondo-alterno); display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--space-6); animation-delay: .3s">
            ${FICHA_PROYECTO.map(function (f) {
              return html`<div key=${f[0]} style=${'display: flex; flex-direction: column; gap: var(--space-2);' + (f[2] ? 'grid-column: 1 / -1' : '')}><dt class="sl-etiqueta" style=${SUAVE}>${f[0]}</dt><dd class="sl-cuerpo-ui" style="margin: 0">${f[1]}</dd></div>`;
            })}
          </dl>
        </div>

        <figure id="sitio" class="entra" style="margin: var(--space-12) 0 0; display: flex; flex-direction: column; gap: var(--space-3); animation-delay: .42s">
          <div class="marco marco--16x9 papel" role="img" aria-label="Espacio para la captura principal del proyecto">
            <${Icono} nombre="diseno-web" tamano=${48} />
            <span class="sl-etiqueta">[Captura principal del sitio · 16:9]</span>
          </div>
          <figcaption class="sl-nota" style=${SUAVE}>[Pie de foto: qué se ve en la captura]</figcaption>
        </figure>
      <//>

      <${Seccion} alterna=${true}>
        <div class="revela" style="display: flex; flex-direction: column; gap: var(--space-4); margin-bottom: var(--space-12)">
          <span class="sl-etiqueta" style=${SUAVE}>El caso</span>
          <${Firma}>Del reto al resultado<//>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr)); gap: var(--space-8)">
          ${CASO.map(function (c) {
            return html`
              <div key=${c[0]} class="traza revela" style="display: flex; flex-direction: column; gap: var(--space-3)">
                <div style="display: flex; justify-content: space-between; align-items: center"><span class="sl-etiqueta" style=${SUAVE}>${c[0]}</span><${Icono} nombre=${c[1]} tamano=${32} /></div>
                <h3 class="sl-titulo-3" style="margin: 0">${c[2]}</h3>
                <p class="sl-cuerpo" style="margin: 0; color: var(--texto-suave)">${c[3]}</p>
              </div>`;
          })}
        </div>
      <//>

      <${Seccion}>
        <${Encabezado2} antetitulo="Galería" titulo="Así se ve" margen="var(--space-8)">
          <p class="sl-cuerpo-ui" role="status" style="flex: 0 1 auto; margin: 0; color: var(--texto-suave)">${v.pie}</p>
        <//>
        <div class="revela" style="overflow-x: auto; margin-bottom: var(--space-8)">
          <${Pestanas} pestanas=${CAPTURAS.map(function (x) { return { id: x.id, texto: x.texto }; })} activa=${vista} alCambiar=${setVista} />
        </div>
        <div key=${vista} class="cambia" style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: var(--space-6); animation-name: sube-a">
          <div class="marco papel" role="img" aria-label=${v.alt} style=${'flex: 8 1 420px; min-width: 0; aspect-ratio: ' + v.proporcion}>
            <${Icono} nombre=${v.icono} tamano=${48} />
            <span class="sl-etiqueta">${v.rotulo}</span>
          </div>
          <div style="flex: 4 1 260px; min-width: 0; display: flex; flex-direction: column; gap: var(--space-6)">
            <div class="marco marco--4x3" role="img" aria-label="Espacio para un detalle del diseño"><span class="sl-etiqueta">[Detalle 1 · 4:3]</span></div>
            <div class="marco marco--4x3" role="img" aria-label="Espacio para otro detalle del diseño"><span class="sl-etiqueta">[Detalle 2 · 4:3]</span></div>
          </div>
        </div>
      <//>

      <${Seccion} alterna=${true}>
        <div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: var(--space-12) var(--space-16)">
          <div class="revela" style="flex: 6 1 340px; min-width: 0; display: flex; flex-direction: column; gap: var(--space-6)">
            <div style="display: flex; flex-direction: column; gap: var(--space-4)">
              <span class="sl-etiqueta" style=${SUAVE}>Alcance</span>
              <${Firma}>Lo que incluyó<//>
            </div>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column">
              ${[1, 2, 3, 4].map(function (n) {
                return html`<li key=${n} class="sl-cuerpo" style="display: flex; gap: 12px; align-items: center; padding: var(--space-3) 0; border-bottom: 1px solid var(--linea)"><${Icono} nombre="check" tamano=${24} />[Entregable ${n}]</li>`;
              })}
            </ul>
          </div>
          <figure class="revela" style="flex: 5 1 320px; min-width: 0; margin: 0; padding: var(--space-8); background: var(--superficie); border: 1px solid var(--linea); display: flex; flex-direction: column; gap: var(--space-5)">
            <span class="sl-etiqueta" style=${SUAVE}>Lo que dice el cliente</span>
            <blockquote class="sl-cuerpo-lg" style="margin: 0">[Testimonio del cliente, en una o dos frases, con su permiso para publicarlo]</blockquote>
            <figcaption class="sl-cuerpo-ui" style=${SUAVE}>[Nombre y cargo]</figcaption>
          </figure>
        </div>
      <//>

      <${Seccion}>
        <nav class="revela" aria-label="Otros proyectos" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr)); gap: var(--space-6)">
          <div class="eleva" style="display: grid"><${Tarjeta} antetitulo="Proyecto anterior" titulo="[Nombre del proyecto anterior]" href=${ir('proyecto')}>[Sector y una línea de resumen]<//></div>
          <div class="eleva" style="display: grid"><${Tarjeta} antetitulo="Proyecto siguiente" titulo="[Nombre del proyecto siguiente]" href=${ir('proyecto')}>[Sector y una línea de resumen]<//></div>
        </nav>
        <div class="revela" style="margin-top: var(--space-8)"><${Enlace} href=${ir('proyectos')}>Mirá todos los proyectos<//></div>
      <//>

      <${Franja} fondo="marca" alto=${420}>
        <div class="revela" style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-6)">
          <${Firma} clase="sl-titulo-1">Tu proyecto puede ser el siguiente<//>
          <p class="sl-subtitulo sl-medida" style="margin: 0; color: var(--texto-suave)">Contame qué querés transformar y armamos el plan por fases.</p>
          <${Boton} iconoFinal="flecha" href=${ir('cotizacion')}>Pedí una cotización<//>
        </div>
      <//>`;
  }

  /* ---------- Blog ---------- */

  var CATEGORIAS = ['Todos', 'Automatización', 'Normativa', 'Agentes de IA', 'Marketing', 'Experiencia de usuario'];
  var ARTICULOS = [
    { id: 'factura', categoria: 'Normativa', icono: 'factura-electronica', titulo: 'Factura electrónica 4.4: qué cambia para tu pyme', resumen: 'Lo que tenés que revisar en tu sistema de facturación y cómo hacerlo sin frenar las ventas.' },
    { id: 'tareas', categoria: 'Automatización', icono: 'automatizacion', titulo: 'Cinco tareas que podés automatizar esta semana', resumen: 'Recordatorios, reportes y aprobaciones que hoy hacés a mano y pueden correr solos.' },
    { id: 'sinpe', categoria: 'Automatización', icono: 'pagos', titulo: 'Cobrá con SINPE Móvil sin perder el control', resumen: 'Cómo conciliar los pagos con tus ventas para que nada se quede sin registrar.' },
    { id: 'ley', categoria: 'Normativa', icono: 'proteccion-datos', titulo: 'Ley 8968: lo mínimo que tu sitio debe cumplir', resumen: 'Consentimiento, formularios y avisos de privacidad explicados sin lenguaje legal.' },
    { id: 'agente', categoria: 'Agentes de IA', icono: 'agente-ia', titulo: 'Un agente de IA que responde tu WhatsApp', resumen: 'Qué puede atender solo, cuándo debe pasarte la conversación y cómo empezar en pequeño.' },
    { id: 'medir', categoria: 'Marketing', icono: 'analitica', titulo: 'Medí tu marketing sin ahogarte en tableros', resumen: 'Tres números que sí vale la pena revisar cada mes y los que podés dejar de mirar.' },
    { id: 'formularios', categoria: 'Experiencia de usuario', icono: 'experiencia-usuario', titulo: 'Formularios que la gente sí termina', resumen: 'Menos campos, mejores etiquetas y errores claros: lo que más pesa al pedir datos.' }
  ];

  function Boletin() {
    var e = useState(''), error = e[0], setError = e[1];
    var s = useState(false), suscrito = s[0], setSuscrito = s[1];
    function suscribir(ev) {
      ev.preventDefault();
      var ok = correoValido((ev.target.elements.correo.value || '').trim());
      setError(ok ? '' : 'Escribí un correo válido');
      setSuscrito(ok);
    }
    if (suscrito) return html`<div class="entra"><${Aviso} tipo="exito">Quedaste en la lista. Te escribo cuando publique algo nuevo.<//></div>`;
    return html`
      <form onSubmit=${suscribir} noValidate=${true} style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-4)">
        <div style="align-self: stretch"><${Campo} etiqueta="Correo" name="correo" type="email" placeholder="nombre@empresa.cr" autoComplete="email" error=${error || undefined} ayuda="Uso tu correo solo para el boletín, según la Ley 8968." /></div>
        <${Boton} type="submit" variante="secundario" icono="correo">Suscribite<//>
      </form>`;
  }

  function Blog() {
    var e = useState('Todos'), tema = e[0], setTema = e[1];
    var a = useState(null), abiertoId = a[0], setAbierto = a[1];
    function abrir(id) { return function (ev) { ev.preventDefault(); setAbierto(id); window.scrollTo(0, 0); }; }
    var abierto = ARTICULOS.filter(function (x) { return x.id === abiertoId; })[0];

    if (abierto) {
      return html`
        <${Seccion} id="articulo">
          <article class="entra" style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-6); max-width: 760px; margin: 0 auto">
            <${Boton} variante="fantasma" tamano="sm" onClick=${function () { setAbierto(null); window.scrollTo(0, 0); }}>Volvé al blog<//>
            <span class="sl-etiqueta" style=${SUAVE}>${abierto.categoria} · [Fecha de publicación]</span>
            <${Firma} nivel="h1" clase="sl-titulo-1">${abierto.titulo}<//>
            <p class="sl-subtitulo" style="margin: 0; color: var(--texto-suave)">${abierto.resumen}</p>
            <div style="align-self: stretch; height: 1px; background: var(--linea)"></div>
            <p class="sl-cuerpo" style="margin: 0">[Texto del artículo. Empezá por el problema del lector, seguí con los pasos concretos y cerrá con lo que puede hacer hoy.]</p>
            <h2 class="sl-titulo-3" style="margin: var(--space-4) 0 0">[Subtítulo de la primera sección]</h2>
            <p class="sl-cuerpo" style="margin: 0">[Desarrollo de la sección, en párrafos de 60 a 75 caracteres por línea.]</p>
            <aside style="align-self: stretch; box-sizing: border-box; margin-top: var(--space-6); padding: var(--space-8); background: var(--fondo-alterno); display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-4) var(--space-8)">
              <p class="sl-cuerpo" style="flex: 1 1 280px; margin: 0">¿Querés aplicar esto en tu negocio? Lo vemos en una llamada de 30 minutos.</p>
              <${Boton} iconoFinal="flecha" href=${ir('contacto')}>Agendá una llamada<//>
            </aside>
          </article>
        <//>`;
    }

    var destacado = ARTICULOS[0];
    var lista = ARTICULOS.slice(1).filter(function (x) { return tema === 'Todos' || x.categoria === tema; });
    return html`
      <${Seccion}>
        <${Cabecera} antetitulo="Blog" titulo="Ideas para transformar tu negocio" bajada="Escribo corto y al grano sobre automatización, marketing, experiencia de usuario y la normativa que te toca cumplir." />
        <article class="entra papel" style="display: flex; flex-wrap: wrap; align-items: stretch; margin-top: var(--space-12); border: 1px solid var(--linea); animation-delay: .34s">
          <div style="flex: 7 1 360px; min-width: 0; box-sizing: border-box; padding: var(--space-12) var(--space-8); display: flex; flex-direction: column; gap: var(--space-5)">
            <span class="sl-etiqueta" style=${SUAVE}>Destacado · ${destacado.categoria}</span>
            <h2 class="sl-titulo-2" style="margin: 0">${destacado.titulo}</h2>
            <p class="sl-cuerpo-lg sl-medida" style="margin: 0; color: var(--texto-suave)">${destacado.resumen}</p>
            <div><${Enlace} href="#articulo" onClick=${abrir(destacado.id)}>Leé el artículo<//></div>
          </div>
          <div style="flex: 5 1 320px; min-width: 0; min-height: 280px; display: grid"><${Patron} alto=${280} semilla=${23} densidad=${10} /></div>
        </article>
      <//>

      <${Seccion} alterna=${true}>
        <${Encabezado2} antetitulo="Por tema" titulo="Artículos" margen="var(--space-8)">
          <p class="sl-cuerpo-ui" role="status" style="flex: 0 1 auto; margin: 0; color: var(--texto-suave)">${lista.length === 1 ? '1 artículo' : lista.length + ' artículos'}</p>
        <//>
        <${Filtro} etiqueta="Filtrar por tema" opciones=${CATEGORIAS} valor=${tema} alCambiar=${setTema} />
        <div key=${tema} class="cambia" style=${REJILLA + '; animation-name: sube-a'}>
          ${lista.map(function (x) {
            return html`
              <div key=${x.id} class="eleva" style="display: grid">
                <${Tarjeta} icono=${x.icono} antetitulo=${x.categoria} titulo=${x.titulo} pie=${html`<${Enlace} href="#articulo" onClick=${abrir(x.id)}>Leé el artículo<//>`}>${x.resumen}<//>
              </div>`;
          })}
        </div>
        <p class="sl-nota" style="margin: var(--space-8) 0 0; color: var(--texto-suave)">Títulos de ejemplo para arrancar el calendario de contenido. Cambialos por tus artículos publicados.</p>
      <//>

      <${Seccion}>
        <div class="revela" style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: var(--space-8) var(--space-16)">
          <div style="flex: 6 1 320px; min-width: 0; display: flex; flex-direction: column; gap: var(--space-4)">
            <span class="sl-etiqueta" style=${SUAVE}>Boletín</span>
            <${Firma}>Recibí lo nuevo por correo<//>
            <p class="sl-cuerpo" style="margin: 0; color: var(--texto-suave)">Un correo cuando publico algo que vale la pena. Te das de baja cuando querás.</p>
          </div>
          <div style="flex: 5 1 320px; min-width: 0"><${Boletin} /></div>
        </div>
      <//>`;
  }

  /* ---------- Cotización ---------- */

  var OFERTA = [
    { id: 'transformacion', icono: 'transformacion-digital', concepto: 'Transformación digital', detalle: 'Ordeno tus procesos y elijo con vos las herramientas.', alcance: 'Diagnóstico de procesos, selección de herramientas y plan por fases.' },
    { id: 'automatizacion', icono: 'automatizacion', concepto: 'Automatización', detalle: 'Flujos que corren solos.', alcance: 'Mapa de procesos y priorización, integración entre sistemas existentes y capacitación para tu equipo.' },
    { id: 'marketing', icono: 'marketing', concepto: 'Marketing digital', detalle: 'Estrategia, contenido y medición.', alcance: 'Estrategia y calendario de contenido, pauta en redes y buscadores, y tablero de resultados mensual.' },
    { id: 'ux', icono: 'experiencia-usuario', concepto: 'Experiencia de usuario', detalle: 'Sitios y aplicaciones pensados para quien los usa.', alcance: 'Entrevistas y pruebas con usuarios, prototipos navegables y guía de diseño para desarrollo.' },
    { id: 'factura', icono: 'factura-electronica', concepto: 'Factura electrónica', detalle: 'Facturación conectada con tu operación.', alcance: 'Integración de la facturación con tu contabilidad y tu sistema de ventas.' },
    { id: 'agentes', icono: 'agente-ia', concepto: 'Agentes de IA', detalle: 'Asistentes que atienden por vos.', alcance: 'Asistentes que responden, agendan y dan seguimiento a tus clientes.' }
  ];
  var CONDICIONES = [
    ['factura-electronica', 'Factura electrónica', 'Cada pago lleva su comprobante, con el IVA del 13 % en fila aparte.'],
    ['pagos', 'Pago por fases', 'La mitad al iniciar y la otra mitad contra entrega, por transferencia o SINPE Móvil.'],
    ['firma-digital', 'Firma digital', 'Aprobás la propuesta con firma digital certificada, sin imprimir nada.']
  ];

  function Cotizacion() {
    var e = useState({ transformacion: true, automatizacion: true }), elegidas = e[0], setElegidas = e[1];
    var a = useState(false), aviso = a[0], setAviso = a[1];
    var temporizador = useRef(null);
    useEffect(function () { return function () { clearTimeout(temporizador.current); }; }, []);
    var partidas = OFERTA.filter(function (p) { return elegidas[p.id]; });
    function alternar(id) { var n = Object.assign({}, elegidas); n[id] = !n[id]; setElegidas(n); }
    function pedir() {
      setAviso(true);
      clearTimeout(temporizador.current);
      temporizador.current = setTimeout(function () { setAviso(false); }, 3200);
    }
    return html`
      <${Seccion}>
        <${Firma} nivel="h1" extra="entra">Cotización<//>
        <div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: var(--space-12) var(--space-16); margin-top: var(--space-8)">
          <fieldset class="entra" style="flex: 4 1 300px; min-width: 0; margin: 0; padding: 0; border: 0; display: flex; flex-direction: column; animation-delay: .12s">
            <legend class="sl-etiqueta" style="padding: 0; margin-bottom: var(--space-4); color: var(--texto-suave)">Elegí los servicios</legend>
            ${OFERTA.map(function (op) {
              return html`
                <div key=${op.id} style="display: flex; flex-direction: column; gap: var(--space-1); padding: var(--space-4) 0; border-top: 1px solid var(--linea)">
                  <${Casilla} etiqueta=${op.concepto} checked=${!!elegidas[op.id]} onChange=${function () { alternar(op.id); }} />
                  <span class="sl-cuerpo-ui" style="padding-left: var(--space-8); color: var(--texto-suave)">${op.detalle}</span>
                </div>`;
            })}
          </fieldset>

          <article class="entra papel" style="flex: 7 1 420px; min-width: 0; box-sizing: border-box; background: var(--superficie); border: 1px solid var(--linea); padding: var(--space-12) var(--space-8); display: flex; flex-direction: column; gap: var(--space-8); animation-delay: .24s">
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: var(--space-4)">
              <${Logo} alto=${40} />
              <${Estado} tipo="neutro">Borrador<//>
            </div>
            <h2 class="sl-titulo-3" style="margin: 0">Servicios que querés cotizar</h2>
            ${partidas.length > 0 ? html`
              <div key=${partidas.length} class="cambia" style="display: flex; flex-direction: column; animation-name: sube-a">
                <div class="sl-etiqueta" style="display: flex; justify-content: space-between; gap: var(--space-4); padding-bottom: var(--space-3); border-bottom: 1px solid var(--texto); color: var(--texto-suave)"><span>Servicio y alcance</span><span role="status">${partidas.length === 1 ? '1 servicio' : partidas.length + ' servicios'}</span></div>
                ${partidas.map(function (p) {
                  return html`
                    <div key=${p.id} style="display: flex; align-items: flex-start; gap: var(--space-4); padding: var(--space-4) 0; border-bottom: 1px solid var(--linea)">
                      <${Icono} nombre=${p.icono} tamano=${32} />
                      <div style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: var(--space-1)">
                        <h3 style="margin: 0; font-family: var(--font-titulos); font-weight: 600; font-size: 19px; line-height: 1.3">${p.concepto}</h3>
                        <p class="sl-cuerpo-ui" style="margin: 0; color: var(--texto-suave)">${p.alcance}</p>
                      </div>
                    </div>`;
                })}
                <p class="sl-nota" style="margin: var(--space-4) 0 0; color: var(--texto-suave)">Te envío los montos en colones, con el IVA del 13 % en fila aparte, después de una llamada de 30 minutos.</p>
              </div>` : html`<${Aviso} tipo="alerta">Marcá al menos un servicio para armar tu cotización.<//>`}
            <div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-4) var(--space-6)">
              <${Boton} iconoFinal="flecha" disabled=${partidas.length === 0} onClick=${pedir}>Pedí esta cotización<//>
              <${Enlace} href=${ir('contacto')}>Prefiero conversarlo<//>
            </div>
          </article>
        </div>
      <//>

      <${Seccion} alterna=${true}>
        <div class="revela" style="display: flex; flex-direction: column; gap: var(--space-4); margin-bottom: var(--space-12)">
          <span class="sl-etiqueta" style=${SUAVE}>Condiciones</span>
          <${Firma}>Claro desde el inicio<//>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr)); gap: var(--space-8)">
          ${CONDICIONES.map(function (c) {
            return html`
              <div key=${c[1]} class="traza revela" style="display: flex; flex-direction: column; gap: var(--space-3)">
                <${Icono} nombre=${c[0]} tamano=${40} />
                <h3 class="sl-titulo-3" style="margin: 0">${c[1]}</h3>
                <p class="sl-cuerpo" style="margin: 0; color: var(--texto-suave)">${c[2]}</p>
              </div>`;
          })}
        </div>
      <//>

      ${aviso ? html`<div class="tostada" role="status" style="position: fixed; left: 24px; bottom: 24px; z-index: 50"><${Notificacion} tipo="exito">Recibí tu solicitud. Te escribo en menos de 24 horas.<//></div>` : null}`;
  }

  /* ---------- Contacto ---------- */

  var FILA = 'display: flex; gap: 12px; align-items: center; min-height: 44px; padding: var(--space-3) 0; color: var(--texto); text-decoration: none; border-bottom: 1px solid var(--linea)';

  function Contacto() {
    var e = useState({}), errores = e[0], setErrores = e[1];
    var s = useState(false), enviado = s[0], setEnviado = s[1];
    function enviar(ev) {
      ev.preventDefault();
      var f = ev.target.elements;
      var err = {
        nombre: (f.nombre.value || '').trim() ? '' : 'Escribí tu nombre',
        correo: correoValido((f.correo.value || '').trim()) ? '' : 'Escribí un correo válido',
        consentimiento: !f.consentimiento.checked
      };
      setErrores(err);
      setEnviado(!err.nombre && !err.correo && !err.consentimiento);
    }
    function alFormulario(ev) {
      ev.preventDefault();
      var el = document.getElementById('formulario');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    return html`
      <${Seccion}>
        <div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: var(--space-12) var(--space-16)">
          <div style="flex: 5 1 320px; min-width: 0; display: flex; flex-direction: column; gap: var(--space-8)">
            <${Cabecera} antetitulo="Contacto" titulo="Hablemos" bajada="Contame qué querés transformar. Te respondo en menos de 24 horas." />
            <div class="entra" style="display: flex; flex-direction: column; animation-delay: .34s">
              <a class="sl-cuerpo fila" href="mailto:esteban@siles.cr" style=${FILA}><${Icono} nombre="correo" tamano=${24} />esteban@siles.cr</a>
              <a class="sl-cuerpo fila" href="#formulario" onClick=${alFormulario} style=${FILA}><${Icono} nombre="mensaje" tamano=${24} />WhatsApp: [TU NÚMERO]</a>
              <a class="sl-cuerpo fila" href="#formulario" onClick=${alFormulario} style=${FILA}><${Icono} nombre="calendario" tamano=${24} />Agendá una llamada de 30 minutos</a>
              <span class="sl-cuerpo" style="display: flex; gap: 12px; align-items: center; min-height: 44px; padding: var(--space-3) 0; color: var(--texto-suave)"><${Icono} nombre="ubicacion" tamano=${24} />San José, Costa Rica</span>
            </div>
          </div>

          <div id="formulario" class="entra" style="flex: 6 1 360px; min-width: 0; scroll-margin-top: 104px; animation-delay: .46s">
            ${enviado ? html`
              <div class="entra" style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-6)">
                <${Aviso} tipo="exito">Recibí tu mensaje. Te respondo en menos de 24 horas.<//>
                <${Boton} variante="fantasma" onClick=${function () { setEnviado(false); setErrores({}); }}>Escribí otro mensaje<//>
              </div>` : html`
              <form onSubmit=${enviar} noValidate=${true} style="display: flex; flex-direction: column; gap: var(--space-5)">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr)); gap: var(--space-5)">
                  <${Campo} etiqueta="Nombre" name="nombre" placeholder="Tu nombre" autoComplete="name" error=${errores.nombre || undefined} />
                  <${Campo} etiqueta="Correo" name="correo" type="email" placeholder="nombre@empresa.cr" autoComplete="email" error=${errores.correo || undefined} />
                </div>
                <${Selector} etiqueta="¿Qué te interesa?" name="interes" opciones=${SERVICIOS.map(function (x) { return x[1]; })} />
                <${Campo} etiqueta="Contame tu proyecto" name="proyecto" multilinea=${true} rows=${5} placeholder="Qué hacés hoy y qué te gustaría cambiar" />
                <${Casilla} name="consentimiento" etiqueta="Acepto que Siles Comunicación use estos datos solo para responderme, según la Ley 8968." />
                ${errores.consentimiento ? html`<div class="tostada"><${Aviso} tipo="error">Marcá la casilla de consentimiento para poder responderte.<//></div>` : null}
                <div><${Boton} type="submit" iconoFinal="flecha">Enviá tu mensaje<//></div>
              </form>`}
          </div>
        </div>
      <//>`;
  }

  /* ---------- Aplicación ---------- */

  var VISTAS = { inicio: Inicio, servicios: Servicios, proyectos: Proyectos, proyecto: Proyecto, blog: Blog, cotizacion: Cotizacion, contacto: Contacto };
  var TITULOS = { inicio: 'Siles Comunicación', servicios: 'Servicios', proyectos: 'Proyectos', proyecto: 'Sitio web para doctor', blog: 'Blog', cotizacion: 'Cotización', contacto: 'Contacto' };

  function rutaActual() {
    var h = window.location.hash;
    if (h && h.indexOf('#/') !== 0) return null; /* ancla dentro de la página: no cambia de vista */
    var r = h.slice(2);
    return VISTAS[r] ? r : 'inicio';
  }

  function Sitio() {
    var e = useState(rutaActual() || 'inicio'), vista = e[0], setVista = e[1];
    useEffect(function () {
      function alCambiar() {
        var r = rutaActual();
        if (r) { setVista(r); window.scrollTo(0, 0); }
      }
      window.addEventListener('hashchange', alCambiar);
      return function () { window.removeEventListener('hashchange', alCambiar); };
    }, []);
    useEffect(function () {
      document.title = vista === 'inicio' ? TITULOS.inicio : TITULOS[vista] + ' · Siles Comunicación';
    }, [vista]);
    var Vista = VISTAS[vista];
    /* key=vista: cada página se monta de nuevo y repite su transición de entrada */
    return html`
      <div key=${vista} class="pagina" style="min-height: 100vh; display: flex; flex-direction: column; background: var(--fondo); color: var(--texto); font-family: var(--font-texto)">
        <${Encabezado} vista=${vista} />
        <main style="flex-grow: 1; display: flex; flex-direction: column"><${Vista} /></main>
        <${Pie} vista=${vista} />
      </div>`;
  }

  ReactDOM.createRoot(document.getElementById('raiz')).render(html`<${Sitio} />`);
})();
