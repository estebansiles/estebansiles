/* Selector de idioma del encabezado: cierra el desplegable con Escape, al hacer clic afuera o al salir con el teclado.
   El desplegable es un <details>, así que abre y cierra sin este script. */
(function () {
  'use strict';
  var selectores = document.querySelectorAll('[data-siles-idiomas]');
  if (!selectores.length) return;
  function cerrar(d, devolverFoco) {
    if (!d.open) return;
    d.open = false;
    if (devolverFoco) d.querySelector('summary').focus();
  }
  document.addEventListener('click', function (e) {
    selectores.forEach(function (d) { if (!d.contains(e.target)) cerrar(d, false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    selectores.forEach(function (d) { if (d.open) { e.preventDefault(); cerrar(d, true); } });
  });
  selectores.forEach(function (d) {
    d.addEventListener('focusout', function (e) {
      if (e.relatedTarget && !d.contains(e.relatedTarget)) cerrar(d, false);
    });
    /* Al abrir, el foco pasa al idioma actual para elegir con Tab. */
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      var actual = d.querySelector('a[aria-current]') || d.querySelector('a');
      if (actual && d.matches(':focus-within')) actual.focus();
    });
  });
})();
