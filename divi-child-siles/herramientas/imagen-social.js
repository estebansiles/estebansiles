/* Genera la imagen para redes sociales (Open Graph, 1200 × 630) con la red, el logo y el dominio.
   Uso, desde la raíz del repositorio:  node divi-child-siles/herramientas/imagen-social.js
   Escribe divi/imagenes/siles-social.png. Los nodos animados del SVG quedan en el cuadro del segundo 3. */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const tema = path.resolve(__dirname, '..');
const raiz = path.resolve(tema, '..');
const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Poppins;font-weight:600;src:url(${tema}/assets/fonts/poppins-600.woff2)}
@font-face{font-family:Poppins;font-weight:400;src:url(${tema}/assets/fonts/poppins-400.woff2)}
@font-face{font-family:Lato;font-weight:400;src:url(${tema}/assets/fonts/lato-400.woff2)}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#F4F5F5 url(${__dirname}/patron-social.svg) center/cover;display:flex;align-items:center;padding:0 80px;font-family:Lato,sans-serif;color:#1E2020}
.b{background:#fff;padding:56px 60px;width:640px;box-shadow:0 30px 60px -34px rgba(30,32,32,.45)}
img{height:72px;display:block;margin-bottom:40px}
h1{font:600 52px/1.12 Poppins,sans-serif;letter-spacing:-.01em}
h1 span{display:inline-block;line-height:1;background:linear-gradient(#008C99,#008C99) no-repeat 0 100%/100% 5px;padding-bottom:7px}
p{font:400 22px/1.45 Poppins,sans-serif;color:#666;margin-top:20px}
.u{margin-top:32px;font:400 15px/1 Lato,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#666}
</style><div class="b"><img src="${tema}/assets/marca/logo-color.svg" alt=""><h1><span>T</span>odo se puede transformar</h1>
<p>Transformación digital, automatización y marketing para pymes de Costa Rica.</p><div class="u">siles.cr</div></div>`;
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const archivo = path.join(__dirname, '.imagen-social.html');
  fs.writeFileSync(archivo, html);
  await pg.goto('file://' + archivo, { waitUntil: 'load' });
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForTimeout(3000);
  await pg.screenshot({ path: path.join(raiz, 'divi/imagenes/siles-social.png') });
  await b.close();
  fs.unlinkSync(archivo);
  console.log('Listo: divi/imagenes/siles-social.png');
})();
