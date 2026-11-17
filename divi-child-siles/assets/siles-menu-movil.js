/* Menú para celular y tableta: abre y cierra el panel a pantalla completa y el buscador.
   Marcado en inc/menu-movil.php y estilos en siles-menu-movil.css. */
(function () {
  'use strict';
  var raiz = document.querySelector('[data-siles-movil]');
  if (!raiz) return;

  var botonMenu = raiz.querySelector('[data-siles-menu]');
  var textoMenu = raiz.querySelector('[data-siles-menu-texto]');
  var panel = document.getElementById('siles-movil-menu');
  var botonBuscar = raiz.querySelector('[data-siles-buscar]');
  var textoBuscar = raiz.querySelector('[data-siles-buscar-texto]');
  var buscador = document.getElementById('siles-movil-buscar');
  var campo = document.getElementById('siles-movil-campo');
  var html = document.documentElement;
  var reducido = window.matchMedia('(prefers-reduced-motion: reduce)');
  var espera = null;

  function abierto() { return botonMenu.getAttribute('aria-expanded') === 'true'; }

  /* Fin de la transición del panel (o un tope de tiempo, por si no llega el evento). */
  function alTerminar(fn, tope) {
    clearTimeout(espera);
    var listo = false;
    function fin(e) {
      if (e && e.target !== panel) return;
      if (listo) return;
      listo = true;
      panel.removeEventListener('transitionend', fin);
      clearTimeout(espera);
      fn();
    }
    panel.addEventListener('transitionend', fin);
    espera = setTimeout(fin, tope);
  }

  function abrirMenu() {
    cerrarBuscador(false);
    clearTimeout(espera);
    raiz.classList.remove('siles-movil--cerrando');
    panel.hidden = false;
    void panel.offsetWidth; /* aplica el estado inicial antes de animar */
    raiz.classList.add('siles-movil--abierto');
    html.classList.add('siles-menu-abierto');
    botonMenu.setAttribute('aria-expanded', 'true');
    textoMenu.textContent = 'Cerrar el menú';
    var primero = panel.querySelector('a');
    if (primero) setTimeout(function () { primero.focus({ preventScroll: true }); }, reducido.matches ? 0 : 120);
  }

  function cerrarMenu(devolverFoco) {
    if (!abierto()) return;
    botonMenu.setAttribute('aria-expanded', 'false');
    textoMenu.textContent = 'Abrir el menú';
    raiz.classList.add('siles-movil--cerrando');
    raiz.classList.remove('siles-movil--abierto');
    html.classList.remove('siles-menu-abierto');
    if (devolverFoco !== false) botonMenu.focus({ preventScroll: true });
    alTerminar(function () {
      if (abierto()) return;
      panel.hidden = true;
      raiz.classList.remove('siles-movil--cerrando');
    }, reducido.matches ? 200 : 900);
  }

  function abrirBuscador() {
    if (abierto()) cerrarMenu(false);
    buscador.hidden = false;
    botonBuscar.setAttribute('aria-expanded', 'true');
    textoBuscar.textContent = 'Cerrar el buscador';
    campo.focus();
  }

  function cerrarBuscador(devolverFoco) {
    if (buscador.hidden) return;
    buscador.hidden = true;
    botonBuscar.setAttribute('aria-expanded', 'false');
    textoBuscar.textContent = 'Buscar';
    if (devolverFoco !== false) botonBuscar.focus({ preventScroll: true });
  }

  botonMenu.addEventListener('click', function () { abierto() ? cerrarMenu() : abrirMenu(); });
  botonBuscar.addEventListener('click', function () { buscador.hidden ? abrirBuscador() : cerrarBuscador(); });

  /* Al tocar un enlace del panel, se cierra con su animación mientras carga la página siguiente. */
  panel.addEventListener('click', function (e) {
    var enlace = e.target.closest('a');
    if (enlace && enlace.hash && enlace.pathname === location.pathname) cerrarMenu(false);
  });

  buscador.addEventListener('submit', function (e) {
    if (!campo.value.trim()) { e.preventDefault(); campo.focus(); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (abierto()) { e.preventDefault(); cerrarMenu(); }
      else if (!buscador.hidden) { e.preventDefault(); cerrarBuscador(); }
      return;
    }
    /* El foco se queda entre el panel y los botones de la barra mientras el menú está abierto. */
    if (e.key === 'Tab' && abierto()) {
      var orden = [].slice.call(raiz.querySelectorAll('.siles-movil__barra a, .siles-movil__barra button, #siles-movil-menu a, #siles-movil-menu button, #siles-movil-menu select'))
        .filter(function (el) { return el.offsetParent !== null; });
      if (!orden.length) return;
      var i = orden.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); orden[orden.length - 1].focus(); }
      else if (!e.shiftKey && i === orden.length - 1) { e.preventDefault(); orden[0].focus(); }
    }
  });

  /* Si la pantalla se agranda (tableta que gira), se cierra el menú para no dejar la página bloqueada. */
  var ancho = window.matchMedia('(min-width: 981px)');
  function alCambiarAncho(m) { if (m.matches) { cerrarMenu(false); cerrarBuscador(false); } }
  if (ancho.addEventListener) ancho.addEventListener('change', alCambiarAncho);
  else if (ancho.addListener) ancho.addListener(alCambiarAncho);

  /* Al volver con el botón Atrás (página guardada en memoria), el menú aparece cerrado. */
  window.addEventListener('pageshow', function (e) {
    if (e.persisted && abierto()) {
      botonMenu.setAttribute('aria-expanded', 'false');
      raiz.classList.remove('siles-movil--abierto', 'siles-movil--cerrando');
      html.classList.remove('siles-menu-abierto');
      panel.hidden = true;
    }
  });
})();
