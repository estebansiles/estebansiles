# Lista de verificación: paso a producción de siles.cr

De `staging2.siles.cr` a `www.siles.cr` en SiteGround. Marcá cada casilla al terminar.

**Sobre el staging:** el staging está registrado en WordPress como `www.staging2.siles.cr`, y así debe quedar: al desplegar, SiteGround mantiene `www.siles.cr` en producción. Se trabaja entrando por `staging2.siles.cr` (sin www); el tema (0.9.4 o posterior) sirve el sitio con esa dirección sin tocar la base. Para eso, en el `.htaccess` del staging están comentadas las dos líneas de SG Optimizer que obligan a usar www. Si SG Optimizer las vuelve a escribir, hay que comentarlas de nuevo. En producción, WordPress redirige `siles.cr` a `www.siles.cr` por su cuenta.

**Después de cada lanzamiento,** recreá el staging desde producción.

**Tiempo estimado:** 60 a 90 minutos, más una revisión a las 48 horas.

**Conviene hacerlo** en un horario de poco tráfico, por ejemplo un sábado temprano, con acceso a Site Tools, al administrador de WordPress, a Search Console y a tu correo contact@siles.cr.

---

## 1. Antes del paso, en el staging

**SEO (Yoast)**

- [ ] **Imagen del sitio:** en Yoast › Ajustes › Información básica del sitio, elegí "Siles Comunicación: imagen para redes" (id 2990).
- [ ] **Títulos y meta descripciones:** pegalos en cada página (Inicio, Servicios, Proyectos, Cotización, Contacto, Conversemos, Términos y Opt-out).
- [ ] **Conversemos:** en su pestaña de Yoast › Social, borrá la descripción vieja ("En esta página tengo un calendario…") y la imagen vieja (el logo).
- [ ] **Blog:** cambiá el título "Blog de Esteban Siles | UX & Digital Marketing" y su descripción por la marca nueva.
- [ ] **Lema del sitio:** en Ajustes › Generales, decidí si cambiás "UX & MARKETING".

**Contenido de producción**

- [ ] **Cambios desde el 11 de noviembre:** confirmá si publicaste o editaste algo en producción desde que se creó el staging (entradas, páginas, comentarios, ajustes de plugins). El paso completo **reemplaza la base de datos de producción** con la del staging, así que cualquier cambio posterior en producción se pierde. Si hubo alguno, anotalo para repetirlo después.

**Seguimiento y consentimiento**

Esto puede esperar a después del lanzamiento, pero decidilo antes:

- [ ] **Etiquetas antes del consentimiento:** el píxel de Meta, Clarity y Mailchimp se cargan antes de que la persona acepte cookies. Decidí si lo corregís antes del lanzamiento o justo después.
- [ ] **Política de privacidad:** agregá Microsoft Clarity y Mailchimp a la sección 4 de terceros.
- [ ] **AMP:** el plugin AMP está activo. Si no usás páginas AMP, desactivalo: Divi no genera AMP y puede mostrar versiones rotas.

---

## 2. Respaldo

- [ ] **Copia de producción:** en Site Tools › Seguridad › Copias de seguridad, creá una copia a demanda de **www.siles.cr** y ponele de nombre "Antes del rediseño".
- [ ] **Confirmación:** verificá que la copia aparezca en la lista con la fecha de hoy.

---

## 3. El paso

- [ ] **Abrí el despliegue:** en Site Tools › WordPress › Staging, en `www.staging2.siles.cr`, elegí **Deploy › Full Deploy** (archivos y base de datos). El rediseño vive casi todo en la base de datos (páginas, plantillas del Theme Builder, menús, proyectos y ajustes), así que un despliegue solo de archivos no alcanza.
- [ ] **Esperá:** dejá que termine sin tocar el sitio.

---

## 4. Inmediatamente después, en producción

**Indexación**

- [ ] **robots.txt:** abrí `https://www.siles.cr/robots.txt`.
  - Si empieza con `# START YOAST BLOCK` y dice `Disallow:` vacío, está bien.
  - Si dice `Disallow: /`, borrá `public_html/robots.txt` en Site Tools › Sitio › Administrador de archivos.
- [ ] **Lectura:** en Ajustes › Lectura, verificá que **no** esté marcada "Disuadir a los motores de búsqueda".

**Dominio con www** (el despliegue anterior dejó `siles.cr`; se vuelve a `www.siles.cr`)

- [ ] **Ajustes:** en Ajustes › Generales, poné `https://www.siles.cr` en la dirección de WordPress y en la del sitio. WordPress va a pedir que vuelvas a iniciar sesión.
- [ ] **Redirección:** en Site Tools › Dominio, `siles.cr` tiene que redirigir a `www.siles.cr`, no al revés.
- [ ] **Reemplazo en la base:** con el plugin Better Search Replace, cambiá `https://siles.cr` por `https://www.siles.cr` en todas las tablas. Corré primero la prueba en seco y revisá el conteo. El patrón incluye `https://`, así que `contact@siles.cr` no se toca.
- [ ] **Prueba:** abrí `https://siles.cr/servicios/` y confirmá que termine en `https://www.siles.cr/servicios/`.

**Direcciones y caché**

- [ ] **Dominio:** en Ajustes › Generales, la dirección de WordPress y la del sitio deben ser `https://www.siles.cr`.
- [ ] **Enlaces permanentes:** en Ajustes › Enlaces permanentes, hacé clic en **Guardar** sin cambiar nada; eso regenera las reglas de URL.
- [ ] **Caché de Divi:** en Divi › Opciones del tema › Constructor › Avanzado, vaciá la caché de CSS estático.
- [ ] **Caché del servidor:** en Speed Optimizer, vaciá la caché.
- [ ] **Yoast:** en Yoast › Herramientas, ejecutá "Optimizar los datos de SEO" para que tome el dominio nuevo.
- [ ] **Complianz:** en Complianz › Asistente, volvé a escanear las cookies del dominio de producción y guardá.

**Formularios** (enviá una prueba de cada uno y confirmá que llegue a contact@siles.cr)

- [ ] **Contacto:** `/contacto/`.
- [ ] **Cotizador:** `/cotizacion/`.
- [ ] **Opt-out:** `/opt-out/`.
- [ ] **Boletín:** al pie de `/blog/`.

**Recorrido visual** (en el celular y en la computadora)

- [ ] **Portada:** carga la red animada, la cinta y los botones.
- [ ] **Navegación:** el menú y el pie (Términos y Privacidad) funcionan.
- [ ] **Proyectos:** el filtro por sector y un proyecto completo.
- [ ] **Agenda:** `/conversemos/` carga la agenda de Google Calendar.
- [ ] **404:** una dirección inventada, por ejemplo `/prueba-404/`, muestra la página 404 con Travolta.
- [ ] **Redes:** pegá `https://www.siles.cr` en un chat de WhatsApp y verificá que se vea la imagen nueva.

---

## 5. Google

- [ ] **Propiedad:** en Search Console, usá la propiedad de dominio `siles.cr` o la de `https://www.siles.cr`.
- [ ] **Sitemap:** en Search Console, enviá `https://www.siles.cr/sitemap_index.xml`.
- [ ] **Indexación:** en Search Console › Inspección de URL, pedí indexar la portada, `/servicios/`, `/portafolio/` y `/cotizacion/`.
- [ ] **Analytics:** en GA4 › Tiempo real, confirmá que entren visitas a `www.siles.cr`.
- [ ] **Vista previa en Facebook:** en el depurador de Facebook (developers.facebook.com/tools/debug), pegá la portada y hacé clic en "Volver a extraer", para que Facebook tome la imagen nueva.

---

## 6. A las 48 horas

- [ ] **Errores de indexación:** revisá Search Console › Páginas, con atención a 404 y "Página con redirección".
- [ ] **Correos:** verificá que los formularios sigan llegando y que no caigan en spam.
- [ ] **Limpieza:** borrá definitivamente lo que quedó en la papelera (Custom GPTs y las páginas de prueba) y la Inicio vieja en borrador, si ya no la necesitás.
- [ ] **Plantillas viejas:** borrá las plantillas desactivadas del Theme Builder, si queda alguna.

---

## Si algo sale mal

- [ ] **Restaurar:** en Site Tools › Seguridad › Copias de seguridad, restaurá la copia "Antes del rediseño". El staging no se toca, así que se puede corregir ahí y volver a desplegar.

---

## Lo que viene después del lanzamiento

1. **Seguimiento:** todo pasa por Google Tag Manager, conectado al consentimiento de Complianz. Se suman los píxeles de TikTok y LinkedIn.
2. **Versión en inglés con WPML:**
   - instalar WPML y sus complementos;
   - hacer traducibles los textos del tema;
   - traducir páginas, proyectos y plantillas al inglés estadounidense;
   - pasar los documentos legales en inglés por revisión legal.
