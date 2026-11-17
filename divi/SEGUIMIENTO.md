# Seguimiento y consentimiento: inventario y plan

Inventario hecho el 17 de noviembre de 2026 en `staging2.siles.cr` (copia de producción), con el HTML de la portada, la API de Site Kit, el contenedor público de GTM y un navegador que registró y **bloqueó** cada envío, para no ensuciar las estadísticas reales.

## Lo que hay hoy

| Herramienta | Identificador | Quién la carga | ¿Espera el consentimiento? |
| --- | --- | --- | --- |
| Google Analytics 4 | `G-1FEPWW0E8H` | **Tres vías:** fragmento pegado a mano en el `<head>`; etiqueta 8 del contenedor de GTM; Site Kit tiene el módulo de Analytics con "insertar fragmento" activado. | No. Complianz trata las estadísticas como anónimas y deja `cmplz_statistics=allow` desde la primera visita, así que GA4 registra la visita antes de que la persona elija. |
| Google Tag Manager | `GTM-THQ5FK5` (versión 3) | **Dos vías:** fragmento pegado a mano en el `<head>`, junto al de GA4; Site Kit tiene el módulo de Tag Manager con "insertar fragmento" activado. | Las etiquetas del contenedor no tienen requisitos de consentimiento. |
| Píxel de Meta | `300361413088359` | Plugin "Meta pixel for WordPress" 5.2.2: código base en `<head>`, inicio por AJAX e imagen `noscript`. | No. Carga `fbevents.js` y crea la cookie `_fbp` sin consentimiento. |
| Microsoft Clarity | `lmigexys8q` | Etiqueta 9 del contenedor de GTM (HTML personalizado). El plugin "Microsoft Clarity" está activo pero no inserta nada: sobra. | No. |
| Mailchimp | sitio conectado (`mcjs`) | Fragmento pegado a mano en el `<head>`, en el mismo bloque que GA4 y GTM. | No. |
| Complianz | 7.5.7 | Banner de aceptación previa (opt-in), región UE, categorías Estadísticas y Marketing. WP Consent API activo. | No bloquea ningún script: los fragmentos pegados a mano y el plugin de Meta no pasan por Complianz. |
| Modo de consentimiento de Google | Site Kit | Deniega por defecto **solo** en la UE, el Reino Unido, Suiza, Noruega, Islandia y Liechtenstein. Para Costa Rica y EE. UU. queda concedido. | — |

**Dónde están los fragmentos pegados a mano:** el bloque GA4 + Mailchimp + GTM aparece seguido en el `<head>`, sin marca de ningún plugin. Lo más probable es que esté en **Divi › Opciones del tema › Integración › "Agregar código al `<head>`"**. Hay que confirmarlo.

**Nota del staging:** en `staging2` el banner de Complianz no se muestra (`cmplz-hidden`). En producción sí. Hay que revisarlo antes de probar el esquema nuevo en el staging.

## Problemas

1. **Medición sin consentimiento.** GA4, el píxel de Meta, Clarity y Mailchimp se activan antes de que la persona acepte. La Política de privacidad promete poder excluirse del rastreo y cita la Ley 8968 y el GDPR.
2. **GA4 cargado por tres vías y GTM por dos.** Hoy no duplica visitas, pero es frágil: cualquier cambio en una vía puede empezar a contar doble.
3. **Plugins que sobran:** Microsoft Clarity no hace nada, y el de Meta duplica lo que puede hacer GTM.
4. **La política no menciona Clarity ni Mailchimp.**

## Esquema propuesto

Un solo lugar para todas las etiquetas: **Google Tag Manager**, conectado a **Complianz** con el **modo de consentimiento v2 de Google**, y aceptación previa para todos los visitantes, no solo los de la UE.

| Etiqueta en GTM | Espera el consentimiento de |
| --- | --- |
| GA4 (`G-1FEPWW0E8H`) | Estadísticas (`analytics_storage`) |
| Clarity | Estadísticas (`analytics_storage`) |
| Píxel de Meta | Marketing (`ad_storage`, `ad_user_data`, `ad_personalization`) |
| Píxel de TikTok (nuevo) | Marketing |
| Insight Tag de LinkedIn (nuevo) | Marketing |
| Mailchimp (`mcjs`) | Marketing |

Pasos, en el staging primero:

1. **Fragmentos a mano:** quitar el bloque de GA4, Mailchimp y GTM del `<head>` (Divi › Integración).
2. **Site Kit:** dejarlo para los informes, con "insertar fragmento" **desactivado** en Analytics y en Tag Manager. Site Kit inserta GTM una sola vez; o, si preferís, se pega el fragmento de GTM a mano y Site Kit no inserta nada. Una sola vía.
3. **Complianz:**
   - activar la integración con Google Tag Manager y el modo de consentimiento v2;
   - pedir consentimiento a todos los visitantes;
   - marcar las estadísticas como **no** anónimas, para que dejen de permitirse por defecto.
4. **GTM:**
   - configurar el consentimiento de cada etiqueta según la tabla;
   - mover el píxel de Meta y Mailchimp al contenedor;
   - agregar TikTok y LinkedIn;
   - publicar una versión nueva.
5. **Plugins:** desactivar Microsoft Clarity. Para Meta, decidir antes (ver abajo).
6. **Política de privacidad:** agregar Clarity y Mailchimp en la sección 4.
7. **Prueba:** verificar qué se envía en cada caso: sin tocar el banner, rechazando y aceptando.

## Decisiones (17 de noviembre de 2026)

- **Fragmentos a mano:** están en Divi › Opciones del tema › Integración. Se quitan GA4 y Mailchimp; GTM queda una sola vez.
- **Plugin de Meta:** se queda para la API de Conversiones (eventos desde el servidor), conectado al consentimiento; el píxel del navegador pasa a GTM. El aviso de Meta sobre el SDK de iOS (app `439714358517446`) es de apps de iPhone y no afecta al sitio. Si no hay app de iOS, se quita esa plataforma de la app en developers.facebook.com.
- **Mailchimp:** no se usa; se quita.
- **TikTok:** píxel `DBTUGSJC77U5KA7Q8O2G`, en GTM y con consentimiento de marketing.
- **LinkedIn:** no se agrega. La política ya no lo menciona y ahora nombra a Microsoft Clarity (en el staging).
- **Consentimiento:** aceptación previa para **todos** los visitantes, con Complianz gratuito (opción 2). Pedirlo solo en Europa requería Complianz Premium.
- **Píxel de Meta:** el del navegador se queda en el plugin, no pasa a GTM. Así el plugin envía el mismo evento por el navegador y por la API de Conversiones con un identificador común, y Meta no lo cuenta dos veces. Complianz bloquea el plugin hasta que haya consentimiento de marketing.

### Cambios al configurar el staging (17 de noviembre de 2026)

- **Sin modo de consentimiento v2:** en Complianz gratuito la opción "modo de consentimiento V2 de Google" es Premium (no se puede activar). Tampoco hay campo para el ID de GTM: **Complianz gratuito no inserta GTM**.
- **Etiquetas activadas por eventos de Complianz:** en lugar de los requisitos de consentimiento de GTM, cada etiqueta se activa con el evento que Complianz envía a la capa de datos cuando hay consentimiento (y en cada página, si ya lo había): `cmplz_event_statistics` y `cmplz_event_marketing`. Los requisitos de consentimiento adicionales de las etiquetas quedan en "Sin establecer", porque nadie actualiza `analytics_storage` ni `ad_storage`.
- **GTM vuelve a Divi:** como Complianz no lo inserta, el fragmento de GTM (solo ese, sin `<noscript>`) se pega en Divi › Integración › `<head>`. El contenedor no deja cookies por sí solo; las etiquetas esperan el evento de Complianz.
- **TikTok, solo en GTM:** el plugin **TikTok for Business** usaba el mismo píxel (`DBTUGSJC77U5KA7Q8O2G`), sin catálogo ni eventos configurados, y podía enviar eventos desde el servidor sin pasar por Complianz. Se desactiva.
- **SDK de Facebook en Divi:** en Divi › Integración › `<body>` hay un SDK de JavaScript de Facebook (`FB.init`, v19.0) que llama a `FB.AppEvents.logPageView()`, probablemente para el botón "Me gusta" de las entradas. Se deja por ahora; Complianz lo bloquea como marketing.
- **Script de diseño en Divi:** el `<head>` también tenía un script de jQuery que ajusta el `padding-top` del contenido según la altura del encabezado. No es seguimiento; se queda.

## Tabla final de etiquetas

| Etiqueta en GTM | Activador | Categoría de Complianz |
| --- | --- | --- |
| GA4 (`G-1FEPWW0E8H`) | "Complianz – statistics" (`cmplz_event_statistics`) | Estadísticas |
| Clarity (`lmigexys8q`) | "Complianz – statistics" (`cmplz_event_statistics`) | Estadísticas |
| Píxel de TikTok (`DBTUGSJC77U5KA7Q8O2G`): etiqueta "TikTok – base" (HTML personalizado) | "Complianz – marketing" (`cmplz_event_marketing`) | Marketing |

**TikTok va como HTML personalizado, no con la plantilla.** La plantilla de la comunidad "TikTok Pixel" no carga el código base: espera que `ttq` ya exista en la página (lo ponía el plugin TikTok for Business). Sin el plugin, en la Vista previa falló con `[ERROR] ttq not found`. Por eso "TikTok – base" lleva el código base oficial de TikTok con `ttq.load('DBTUGSJC77U5KA7Q8O2G')` y `ttq.page()`, y la etiqueta de la plantilla queda **en pausa** (junto con su variable "TikTok – page_view"), por si más adelante se quieren eventos de TikTok además de la visita.

Fuera de GTM: el **píxel de Meta** (`300361413088359`) queda en su plugin, bloqueado por la integración de Complianz hasta el consentimiento de marketing.

## Guía paso a paso

Todo en el **staging** (`www.staging2.siles.cr/wp-admin`), salvo GTM, que es un solo contenedor para el staging y para producción. En GTM se prepara todo en el espacio de trabajo y **no se publica** hasta después del despliegue.

Estado al 17 de noviembre de 2026: ✅ hecho · ⏳ pendiente. Desplegado a producción y GTM publicado (versión 4).

### 1. Divi: dejar solo GTM ✅
En **Divi › Opciones del tema › Integración**:
- **"Agregar código al `<head>`":** borrá el fragmento de GA4 (`gtag/js?id=G-1FEPWW0E8H` y su configuración), el de Mailchimp (`mcjs`) y el de GTM viejo. Pegá **solo** el fragmento estándar de GTM (`GTM-THQ5FK5`) al principio. El script de jQuery del encabezado se queda.
- **"Agregar código al `<body>`":** borrá el `<noscript>` de GTM (`googletagmanager.com/ns.html?id=GTM-THQ5FK5`). El SDK de Facebook se queda por ahora (ver "A verificar después").
- Guardá.

### 2. Site Kit: que no inserte nada
Site Kit se queda para ver los informes en el escritorio de WordPress.
- **Analytics** ✅ y **Tag Manager** ✅: "Insertar el fragmento de código" desactivado.
- **Modo de consentimiento** ✅ en producción: en Site Kit › Settings › Admin Settings, **"Enable consent mode"** desactivado. Ya no aparece el script `google_gtagjs-js-consent-mode-data-layer`, que denegaba por defecto solo en el Espacio Económico Europeo, el Reino Unido y Suiza. En el staging no se pudo cambiar (el usuario "Claude" no está conectado a Site Kit).
- **Acceder con Google** (Sign in with Google, beta) está conectado y carga scripts de `accounts.google.com` en el sitio. No es seguimiento; revisar si se usa.

### 3. Plugins ✅
- **Microsoft Clarity:** desactivado. Clarity se carga desde GTM.
- **TikTok for Business:** desactivado. El píxel de TikTok se carga solo desde GTM.
- **Meta pixel for WordPress:** se queda.

### 4. Complianz ✅
En **Complianz › Asistente**:
- **Región:** Unión Europea (aceptación previa). En la versión gratuita se aplica a todos los visitantes.
- **Estadísticas:** **"Sí, y Google Tag Manager ejecuta este script"**. Dejá sin marcar las condiciones de anonimización: así las estadísticas no se permiten por defecto.
- **Modo de consentimiento V2:** queda en **No** (es Premium).
- **Servicios:** consentimiento por servicio **No**; redes sociales con **Facebook** y **TikTok**; scripts con fines publicitarios **Sí**, sin framework adicional (así existe la categoría Marketing).
- **Plugins:** verificá que esté activa la integración **"Official Facebook Pixel"**.
- **Cookiedatabase.org:** **Microsoft Clarity** ya figura entre los servicios.
- **Concluir:** banner **Sí** y bloqueador de cookies y scripts **Sí**. Sin el bloqueador, Complianz no frena el plugin de Meta.

Complianz no inserta GTM (eso lo hace Divi, paso 1) y envía a la capa de datos `cmplz_event_functional`, `cmplz_event_statistics` y `cmplz_event_marketing` según lo que se acepte.

### 5. Google Tag Manager (contenedor `GTM-THQ5FK5`), sin publicar ✅
- **Descripción general del consentimiento:** ya estaba activada.
- **Activadores nuevos** (Evento personalizado):
  - **"Complianz – statistics"**: `cmplz_event_statistics`.
  - **"Complianz – marketing"**: `cmplz_event_marketing`.
- **Etiqueta de Google `G-1FEPWW0E8H`** ("Google Analytics 4 silescr"): activador "Complianz – statistics" en lugar de All Pages. Consentimiento adicional: "Sin establecer".
- **Etiqueta de Clarity** ("Microsoft Clarity - Official"): lo mismo.
- **Etiqueta nueva "TikTok – base"** (HTML personalizado):
  - Código base oficial de TikTok, con `ttq.load('DBTUGSJC77U5KA7Q8O2G');` y `ttq.page();`.
  - Activador: **"Complianz – marketing"**.
- **Etiqueta "TikTok Pixel"** (plantilla de la comunidad de TikTok, con Event Name = variable constante **"TikTok – page_view"**): **en pausa**. No carga el código base y sola falla.
- **No agregues** el píxel de Meta.
- Los 8 cambios se publicaron como **versión 4, "Consentimiento con Complianz + TikTok"** (17/11/2026, 0:56), después del despliegue.

### 6. Prueba en el staging ✅
Como visitante sin aceptar: GTM se carga, aparece el banner, y el píxel de Meta, el SDK de Facebook y (antes de desactivarlo) el script del plugin de TikTok salen bloqueados como `text/plain`, categoría marketing.

Con **Vista previa** de GTM (versión del espacio de trabajo) sobre `https://www.staging2.siles.cr`, el 17 de noviembre de 2026:

| Caso | Eventos de Complianz | Etiquetas de GTM | Envíos |
| --- | --- | --- | --- |
| Sin tocar el banner | `cmplz_event_functional` | ninguna | ninguno |
| Rechazando (y recargando) | `cmplz_event_functional` | ninguna | ninguno |
| Aceptando estadísticas | `cmplz_event_statistics` | GA4 y Clarity | `analytics.google.com/g/collect`, `p.clarity.ms/collect` |
| Aceptando marketing | `cmplz_event_marketing` | TikTok – base | `analytics.tiktok.com/api/v2/pixel`; además Complianz libera el píxel de Meta (`fbevents.js`) y el SDK de Facebook |

Con sesión de administrador el banner no se muestra; las elecciones se simularon con las funciones de Complianz que usan sus botones (`cmplz_deny_all`, `cmplz_set_consent`). La prueba envió datos reales desde `staging2.siles.cr` (una visita en GA4, una sesión en Clarity, una visita en Meta y en TikTok).

**Verificación desde la sesión en la nube (17 de noviembre de 2026):** sin tocar el banner, GTM está en el `<head>`, Complianz solo envía `cmplz_event_functional` y retiene como `text/plain` (marketing) el píxel de Meta, su `PageView`, el SDK de Facebook y el reCAPTCHA de Divi. Los casos de rechazar y aceptar no se pudieron repetir desde la nube: la protección contra bots de SiteGround respondió `202` a varios scripts, entre ellos el de Complianz. Valen los resultados de la Vista previa de arriba.

Ojo: mientras la versión nueva no se publique, el staging carga la versión publicada de GTM, que todavía dispara GA4 y Clarity en All Pages sin consentimiento.

### 7. Producción ✅
1. Comparación previa con producción.
2. Respaldo y *Full Deploy*. Verificado en producción antes de publicar GTM: un solo fragmento de GTM, sin GA4 pegado a mano ni Mailchimp, sin el plugin de TikTok, banner de Complianz visible, y el píxel de Meta y el SDK de Facebook bloqueados (`text/plain`).
3. **GTM publicado:** versión 4. El servidor de Google ya la entrega; un navegador que tenía `gtm.js` en caché siguió usando la versión vieja hasta una recarga forzada (la caché dura unos 15 minutos).
4. Revisión en producción, como visitante sin aceptar y con la versión 4: ningún envío a GA4, Clarity, TikTok ni Meta.
5. Site Kit: modo de consentimiento desactivado (paso 2).

En GTM, "TikTok Pixel" (la plantilla) sigue en pausa en la versión publicada. Se deja así por si más adelante se quieren enviar otros eventos a TikTok: alcanza con darle otro activador y reactivarla, porque "TikTok – base" ya carga el código. Si no se va a usar, se borran la etiqueta, la variable "TikTok – page_view" y la plantilla, y se publica otra versión.

### A verificar después
- **API de Conversiones de Meta:** los eventos del servidor no se ven desde el navegador. Hay que confirmar en el plugin, o en el Administrador de eventos de Meta, que sin consentimiento no se envíen eventos `PageView` desde el servidor.
- **SDK de Facebook en Divi (`<body>`):** decidir si se quita. Si el botón "Me gusta" de las entradas no hace falta, se borran el SDK y el `fb-like` de "parte superior de las entradas".
- **Datos de Complianz › Información de la web:** tienen el correo `esteban@siles.cr` y la dirección "Contiguo a Coopelesca, Avenida 5, Calle del Comercio"; la Política de privacidad dice `contact@siles.cr` y "Ciudad Quesada, San Carlos, Alajuela, 21001". Conviene unificarlos.
