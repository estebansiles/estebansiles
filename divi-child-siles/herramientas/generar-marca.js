/* Genera los recursos de marca del tema hijo a partir del sistema de diseño (sitio-web/ds).
   Uso, desde la raíz del repositorio:  node divi-child-siles/herramientas/generar-marca.js
   Escribe:
     assets/marca/logo-color.svg, logo-blanco.svg   Logo completo.
     assets/marca/patron-<semilla>.svg              Patrón de red, estático, para fondo de sección.
     assets/iconos/<nombre>.svg                     Íconos con colores fijos (tinta y verde), para módulos Anuncio.
     inc/iconos-data.php                            Los mismos íconos para el shortcode [siles_icono] (en línea, con currentColor). */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const raiz = path.resolve(__dirname, '..', '..');
const tema = path.resolve(__dirname, '..');
const fuente = fs.readFileSync(path.join(raiz, 'sitio-web/ds/components/bundle.js'), 'utf8');

function extraer(nombre) {
  const m = fuente.match(new RegExp('var ' + nombre + ' = (\\{[\\s\\S]*?\\n  \\});|var ' + nombre + ' = (\\{.*?\\});'));
  if (!m) throw new Error('No encontré ' + nombre + ' en bundle.js');
  return vm.runInNewContext('(' + (m[1] || m[2]) + ')');
}
const ICONOS = extraer('ICONOS');
const LOGO = extraer('LOGO');

const TINTA = '#1E2020', VERDE = '#008C99', BLANCO = '#FFFFFF', REALCE = '#00D1B1';
function escribir(rel, texto) {
  const f = path.join(tema, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, texto);
}

/* Logo */
const VARIANTES = { color: [TINTA, VERDE, TINTA], blanco: [BLANCO, VERDE, BLANCO] };
for (const [v, c] of Object.entries(VARIANTES)) {
  const paths = LOGO.paths.map((d, i) => `<path fill="${c[i]}" d="${d}"/>`).join('');
  escribir(`assets/marca/logo-${v}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO.viewBox}" role="img" aria-label="Siles Comunicación">${paths}</svg>\n`);
}

/* Íconos estáticos: currentColor pasa a tinta y el acento queda en verde */
for (const [nombre, cuerpo] of Object.entries(ICONOS)) {
  const fijo = cuerpo.replace(/var\(--icono-acento, (#[0-9A-Fa-f]{6})\)/g, '$1').replace(/currentColor/g, TINTA);
  escribir(`assets/iconos/${nombre}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">${fijo}</svg>\n`);
}

/* Íconos en línea para PHP */
const php = ['<?php', '/**', ' * Íconos de la serie Siles. Archivo generado por herramientas/generar-marca.js: no editar a mano.', ' *', ' * @package siles-divi', ' */', '', "if ( ! defined( 'ABSPATH' ) ) {", '\texit;', '}', '', 'return array('];
for (const [nombre, cuerpo] of Object.entries(ICONOS)) php.push(`\t'${nombre}' => '${cuerpo.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',`);
php.push(');', '');
escribir('inc/iconos-data.php', php.join('\n'));

/* Patrón: misma red que el componente Patron (semilla, densidad, alto), en píxeles reales.
   preserveAspectRatio "slice" llena la sección sin deformar los nodos. */
function rng(seed) { let s = seed >>> 0 || 1; return () => { s = s * 1664525 + 1013904223 >>> 0; return s / 4294967296; }; }
function red(seed, cols, rows) {
  const r = rng(seed), n = [];
  for (let y = 0; y <= rows; y++) for (let x = 0; x <= cols; x++) {
    if (r() < 0.28) continue;
    n.push({ x: (x + (r() - 0.5) * 0.7) / cols * 100, y: (y + (r() - 0.5) * 0.7) / rows * 100 });
  }
  const e = [];
  n.forEach((a, i) => {
    const d = n.map((b, j) => ({ j, d: Math.hypot((a.x - b.x) / 100 * cols, (a.y - b.y) / 100 * rows) })).filter((o) => o.j > i && o.d < 1.6).sort((p, q) => p.d - q.d).slice(0, 2);
    d.forEach((o) => e.push([i, o.j]));
  });
  return { n, e, acento: Math.floor(r() * n.length) };
}
/* Colores de la paleta para los nodos que se encienden en la portada */
const PALETA_NODOS = ['#008C99', '#00D1B1', '#5FE3CE', '#00737E', '#1E2020'];

function patron(semilla, densidad, alto, ancho = 1440, animado = false, oscuro = false) {
  const C = oscuro ? { fondo: '#1E2020', linea: '#3A3E3E', nodo: '#555A5A', paleta: ['#008C99', '#00D1B1', '#5FE3CE', '#00737E', '#FFFFFF'] }
                   : { fondo: '#F4F5F5', linea: '#BFC3C3', nodo: '#8A8F8F', paleta: PALETA_NODOS };
  const rows = Math.max(3, Math.round(densidad * alto / 1120));
  const { n, e, acento } = red(semilla, densidad, rows);
  const X = (p) => +(p.x / 100 * ancho).toFixed(1), Y = (p) => +(p.y / 100 * alto).toFixed(1);
  const lineas = e.map(([a, b]) => `<line x1="${X(n[a])}" y1="${Y(n[a])}" x2="${X(n[b])}" y2="${Y(n[b])}"/>`).join('');
  const nodos = n.map((p, i) => { const s = i === acento ? 12 : 5; return `<rect x="${X(p) - s / 2}" y="${Y(p) - s / 2}" width="${s}" height="${s}"${i === acento ? ` fill="${REALCE}"` : ''}/>`; }).join('');
  let brillos = '', estilo = '';
  if (animado) {
    /* Una capa de nodos que se encienden y se apagan. Retraso y duración salen de otra semilla:
       cada nodo sigue su propio ciclo y en pantalla se ve aleatorio. Retrasos negativos: arranca ya en marcha. */
    const r = rng(semilla * 7919 + 17);
    brillos = n.map((p, i) => {
      if (i === acento || r() > 0.42) return '';
      const s = 11, color = C.paleta[Math.floor(r() * C.paleta.length)];
      const dur = (7 + r() * 7).toFixed(1), retraso = (-r() * 14).toFixed(1);
      return `<rect class="b" x="${X(p) - s / 2}" y="${Y(p) - s / 2}" width="${s}" height="${s}" fill="${color}" style="animation-duration:${dur}s;animation-delay:${retraso}s"/>`;
    }).join('');
    estilo = '<style>.b{opacity:0;transform-box:fill-box;transform-origin:center;animation:brilla 10s ease-in-out infinite}'
      + '@keyframes brilla{0%,30%,100%{opacity:0;transform:scale(.45)}10%,18%{opacity:1;transform:scale(1)}}'
      + '@media (prefers-reduced-motion:reduce){.b{animation:none;opacity:0}}</style>';
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ancho} ${alto}" preserveAspectRatio="xMidYMid slice">${estilo}<rect width="100%" height="100%" fill="${C.fondo}"/><g stroke="${C.linea}" stroke-width="1">${lineas}</g><g fill="${C.nodo}">${nodos}</g>${brillos ? `<g>${brillos}</g>` : ''}</svg>\n`;
}
/* Semillas del prototipo: 11 portada de Inicio, 5 caso destacado de Proyectos, 23 destacado del Blog */
escribir('assets/marca/patron-11.svg', patron(11, 14, 600, 1440, true)); /* portada: nodos que se encienden */
escribir('assets/marca/patron-11-quieto.svg', patron(11, 14, 600));
/* Versión oscura para portadas en tema oscuro (Sobre mí) */
escribir('assets/marca/patron-oscuro.svg', patron(29, 14, 760, 1440, true, true));
escribir('assets/marca/patron-oscuro-quieto.svg', patron(29, 14, 760, 1440, false, true)); /* la misma red sin animación, para "reducir movimiento" */
escribir('assets/marca/patron-5.svg', patron(5, 10, 280, 640));
/* Imagen para redes sociales (1200 × 630): misma red de la portada, con nodos de la paleta encendidos */
escribir('herramientas/patron-social.svg', patron(11, 14, 630, 1200, true));
escribir('assets/marca/patron-23.svg', patron(23, 10, 280, 640));

console.log('Listo:', Object.keys(ICONOS).length, 'íconos, 2 logos, 3 patrones.');
