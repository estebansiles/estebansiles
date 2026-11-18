/* Cotizador de Siles: arma la cotización en borrador a medida que se marcan servicios.
   Sin este script el formulario sigue funcionando; solo no se actualiza el resumen. */
(function () {
  'use strict';
  var form = document.getElementById('cotizador');
  if (!form) return;
  var iconos = (window.silesCotizador && window.silesCotizador.iconos) || {};
  var partidas = form.querySelector('[data-partidas]');
  var vacio = form.querySelector('[data-vacio]');
  var enviar = form.querySelector('[data-enviar]');
  var casillas = form.querySelectorAll('input[name="servicios[]"]');

  function icono(nombre) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '32');
    svg.setAttribute('height', '32');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('class', 'siles-icono');
    svg.innerHTML = iconos[nombre] || ''; /* marcado fijo del sistema de diseño */
    return svg;
  }

  function partida(c) {
    var fila = document.createElement('div');
    fila.className = 'siles-cotizador__partida';
    var texto = document.createElement('div');
    var h3 = document.createElement('h3');
    h3.textContent = c.dataset.concepto;
    var p = document.createElement('p');
    p.textContent = c.dataset.alcance;
    texto.append(h3, p);
    fila.append(icono(c.dataset.icono), texto);
    return fila;
  }

  function actualizar() {
    var elegidas = Array.prototype.filter.call(casillas, function (c) { return c.checked; });
    var cabeza = partidas.querySelector('.siles-cotizador__cabeza');
    partidas.replaceChildren(cabeza);
    elegidas.forEach(function (c) { partidas.append(partida(c)); });
    var textos = window.silesCotizador || {};
    cabeza.querySelector('[data-cuenta]').textContent = elegidas.length === 1 ? (textos.uno || '1 servicio') : (textos.varios || '%d servicios').replace('%d', elegidas.length);
    partidas.hidden = elegidas.length === 0;
    vacio.hidden = elegidas.length > 0;
    enviar.disabled = elegidas.length === 0;
    partidas.classList.remove('siles-cambia');
    void partidas.offsetWidth; /* reinicia la animación de cambio */
    partidas.classList.add('siles-cambia');
  }

  form.addEventListener('change', function (e) {
    if (e.target.name === 'servicios[]') actualizar();
  });
  actualizar();
})();
