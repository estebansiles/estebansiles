# Lista de verificación: paso a producción de siles.cr (lanzamiento multilingüe)

De `staging2.siles.cr` a `www.siles.cr` en SiteGround, con WPML: español (raíz), inglés (`/en/`), portugués de Brasil (`/pt-br/`) y francés (`/fr/`). Marcá cada casilla al terminar.

**Por qué un despliegue completo:** WPML guarda en la base de datos las traducciones, los enlaces entre idiomas, las cadenas (Yoast, Complianz), los menús y las categorías traducidas. Un despliegue solo de archivos no las lleva.

**Estado confirmado (18 de noviembre de 2026):** no hay publicaciones ni cambios en producción desde que se creó el staging; la revisión legal de Términos, Privacidad y Opt-out en los cuatro idiomas está hecha y se mantiene el texto actual.

**Sobre el staging:** está registrado en WordPress como `www.staging2.siles.cr`, y así debe quedar: al desplegar, SiteGround cambia las direcciones a `www.siles.cr`. Se trabaja entrando por `staging2.siles.cr` (sin www) gracias al tema; para eso, en el `.htaccess` del staging están comentadas las dos líneas de SG Optimizer que obligan a usar www. En producción, WordPress redirige `siles.cr` a `www.siles.cr` por su cuenta.

**Después del lanzamiento,** recreá el staging desde producción.

**Tiempo estimado:** 60 a 90 minutos, más una revisión a las 48 horas.

---

## 1. Antes del paso

- [ ] **Licencia de WPML:** en tu cuenta de wpml.org › Sitios, agregá `www.siles.cr` y copiá su clave de sitio. La vas a pegar en el paso 4.
- [ ] **Tema:** el staging tiene el tema hijo **0.11.6** activo.
- [ ] **Horario:** de poco tráfico, con acceso a Site Tools, al administrador de WordPress, a Search Console y a contact@siles.cr.

## 2. Respaldo

- [ ] **Copia de producción:** en Site Tools › Seguridad › Copias de seguridad, creá una copia a demanda de **www.siles.cr** con el nombre "Antes de idiomas".
- [ ] **Confirmación:** verificá que la copia aparezca en la lista con la fecha de hoy.

## 3. El paso

- [ ] **Despliegue:** en Site Tools › WordPress › Staging, en `www.staging2.siles.cr`, elegí **Deploy › Full Deploy** (archivos y base de datos).
- [ ] **Esperá:** dejá que termine sin tocar el sitio.

## 4. Inmediatamente después, en producción

**WPML**

- [ ] **Aviso de sitio movido:** si WPML muestra un aviso de que el sitio cambió de dirección, elegí la opción de que **el sitio se movió** (no "es una copia").
- [ ] **Clave de sitio:** en Plugins › Añadir nuevo › Comercial (o WPML › Registro), pegá la clave de `www.siles.cr`.
- [ ] **Idiomas:** en WPML › Idiomas, confirmá español como idioma principal y English, Português (Brasil) y Français activos, con el formato "Idiomas diferentes en directorios".

**Dominio e indexación**

- [ ] **Direcciones:** en Ajustes › Generales, la dirección de WordPress y la del sitio deben ser `https://www.siles.cr`.
- [ ] **Lectura:** en Ajustes › Lectura, que **no** esté marcada "Disuadir a los motores de búsqueda".
- [ ] **robots.txt:** `https://www.siles.cr/robots.txt` empieza con `# START YOAST BLOCK` y tiene `Disallow:` vacío. Si dice `Disallow: /`, borrá `public_html/robots.txt`.
- [ ] **.htaccess:** el despliegue copia el del staging, con las líneas de SG Optimizer comentadas. En Speed Optimizer › Ambiente, volvé a guardar la opción que obliga a usar www (o confirmá que `https://siles.cr/servicios/` termine en `https://www.siles.cr/servicios/` en un solo salto).

**Caché (obligatorio)**

- [ ] **Enlaces permanentes:** en Ajustes › Enlaces permanentes, hacé clic en **Guardar** sin cambiar nada (regenera las reglas de `/en/`, `/pt-br/` y `/fr/`).
- [ ] **Divi:** en Divi › Opciones del tema › Constructor › Avanzado, **Vaciar** en "Hojas de estilo estáticas". Si no, el CSS sigue cargando fuentes desde el staging.
- [ ] **Speed Optimizer:** vaciá la caché.
- [ ] **Yoast:** en Yoast › Herramientas, ejecutá "Optimizar los datos de SEO".

**Formularios** (una prueba de cada uno; confirmá que llegue a contact@siles.cr)

- [ ] **Contacto:** `/contacto/` y `/en/contact/`.
- [ ] **Cotizador:** `/cotizacion/` y `/fr/devis/` (el correo indica el idioma de la página).
- [ ] **Opt-out:** `/opt-out/`.

**Recorrido en los cuatro idiomas** (celular y computadora)

- [ ] **Portadas:** `/`, `/en/`, `/pt-br/`, `/fr/`: red animada, cinta y botones en su idioma.
- [ ] **Selector de idioma:** en el encabezado (ES · EN · PT · FR) y en el menú móvil; cada idioma lleva a la misma página traducida.
- [ ] **Menú y pie:** en el idioma de la página; el Blog figura como "Blog (Spanish)", "Blog (espanhol)" o "Blog (espagnol)".
- [ ] **Sobre mí:** `/esteban/` en cada idioma; en el celular, la red animada, el método con sus números y la cronología alineada.
- [ ] **Proyectos:** `/portafolio/` en cada idioma, con el filtro por sector traducido, y un proyecto completo.
- [ ] **Cotización:** en inglés, portugués y francés dice dólares estadounidenses, impuestos aplicables, transferencia bancaria internacional y firma electrónica.
- [ ] **Legales:** Términos y Privacidad en cada idioma muestran la nota de que prevalece la versión en español, con su enlace.
- [ ] **Agenda:** `/conversemos/` y sus traducciones cargan Google Calendar en el idioma de la página.
- [ ] **Banner de cookies:** aparece en los cuatro idiomas, en su idioma; en el celular, la ✕ de las preferencias se ve completa.
- [ ] **404:** `/prueba-404/` y `/en/prueba-404/` muestran la 404 en su idioma.

## 5. Google y redes

- [ ] **Sitemap:** en Search Console, volvé a enviar `https://www.siles.cr/sitemap_index.xml` (incluye los cuatro idiomas).
- [ ] **Indexación:** en Inspección de URL, pedí indexar `/en/`, `/pt-br/` y `/fr/`.
- [ ] **hreflang:** en el código de cualquier página traducida aparecen las etiquetas `hreflang` de los cuatro idiomas y `x-default`.
- [ ] **Analytics:** en GA4 › Tiempo real, entran visitas a las páginas en otros idiomas (después de aceptar cookies).
- [ ] **Vista previa en Facebook:** en el depurador de Facebook, "Volver a extraer" para `/en/`.

## 6. A las 48 horas

- [ ] **Errores de indexación:** en Search Console › Páginas, revisá 404 y "Página con redirección", con atención a `/en/`, `/pt-br/` y `/fr/`.
- [ ] **Correos:** los formularios siguen llegando y no caen en spam.
- [ ] **Staging:** recreá el staging desde producción.

## Si algo sale mal

- [ ] **Restaurar:** en Site Tools › Seguridad › Copias de seguridad, restaurá "Antes de idiomas". El staging no se toca, así que se puede corregir ahí y volver a desplegar.

---

## Mantenimiento de las traducciones

Las traducciones son manuales: si se edita una página en español, su traducción no cambia sola. El procedimiento está en `divi/IDIOMAS.md` (descargar el original, extraer, traducir lo nuevo y subir con `divi/traducir.py`).
