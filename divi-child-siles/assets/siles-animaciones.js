/* Animaciones de Siles: aparición al entrar en pantalla, contadores y carrusel.
   Mejora progresiva: sin este script (o con "reducir movimiento") el contenido se ve completo y quieto.
   - .siles-anima          recibe .es-visible la primera vez que entra en pantalla.
   - [data-contar="16"]    cuenta de 0 al número cuando su bloque se vuelve visible (data-prefijo, data-sufijo).
   - [data-carrusel]       carrusel accesible: avanza solo cada 8 s, se pausa con el cursor o el foco, flechas del teclado. */
(function () {
  'use strict';
  var d = document;
  var reducir = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function contar(el) {
    if (el.getAttribute('data-contado')) return;
    el.setAttribute('data-contado', '1');
    var fin = parseFloat(el.getAttribute('data-contar')) || 0;
    var pre = el.getAttribute('data-prefijo') || '', suf = el.getAttribute('data-sufijo') || '';
    if (reducir) { el.textContent = pre + fin + suf; return; }
    var inicio = null, duracion = 1400;
    function paso(t) {
      if (inicio === null) inicio = t;
      var p = Math.min(1, (t - inicio) / duracion), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + Math.round(fin * e) + suf;
      if (p < 1) window.requestAnimationFrame(paso);
    }
    window.requestAnimationFrame(paso);
  }

  function mostrar(el) {
    el.classList.add('es-visible');
    Array.prototype.forEach.call(el.querySelectorAll('[data-contar]'), contar);
  }

  function revelar() {
    var els = d.querySelectorAll('.siles-anima');
    if (reducir || !('IntersectionObserver' in window)) { Array.prototype.forEach.call(els, mostrar); return; }
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) { if (e.isIntersecting) { mostrar(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
  }

  function carrusel(c) {
    var items = c.querySelectorAll('.siles-carrusel__item');
    var puntos = c.querySelectorAll('.siles-carrusel__punto');
    var anterior = c.querySelector('[data-anterior]'), siguiente = c.querySelector('[data-siguiente]');
    if (items.length < 2) return;
    var actual = 0, temporizador = null, pausado = false, INTERVALO = 8000;

    function ir(n) {
      actual = (n + items.length) % items.length;
      Array.prototype.forEach.call(items, function (it, i) {
        var activo = i === actual;
        it.classList.toggle('es-activo', activo);
        it.setAttribute('aria-hidden', activo ? 'false' : 'true');
      });
      Array.prototype.forEach.call(puntos, function (p, i) { p.setAttribute('aria-current', i === actual ? 'true' : 'false'); });
      reiniciar();
    }
    function reiniciar() {
      window.clearTimeout(temporizador);
      c.classList.remove('esta-corriendo'); void c.offsetWidth; /* reinicia la barra de progreso */
      if (reducir || pausado) return;
      c.classList.add('esta-corriendo');
      temporizador = window.setTimeout(function () { ir(actual + 1); }, INTERVALO);
    }
    function pausar(si) { pausado = si; c.classList.toggle('esta-pausado', si); if (si) { window.clearTimeout(temporizador); c.classList.remove('esta-corriendo'); } else { reiniciar(); } }

    if (anterior) anterior.addEventListener('click', function () { ir(actual - 1); });
    if (siguiente) siguiente.addEventListener('click', function () { ir(actual + 1); });
    Array.prototype.forEach.call(puntos, function (p, i) { p.addEventListener('click', function () { ir(i); }); });
    c.addEventListener('mouseenter', function () { pausar(true); });
    c.addEventListener('mouseleave', function () { pausar(false); });
    c.addEventListener('focusin', function () { pausar(true); });
    c.addEventListener('focusout', function (e) { if (!c.contains(e.relatedTarget)) pausar(false); });
    c.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { ir(actual - 1); e.preventDefault(); }
      if (e.key === 'ArrowRight') { ir(actual + 1); e.preventDefault(); }
    });
    d.addEventListener('visibilitychange', function () { pausar(d.hidden); });
    ir(0);
  }

  function iniciar() {
    revelar();
    Array.prototype.forEach.call(d.querySelectorAll('[data-carrusel]'), carrusel);
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
