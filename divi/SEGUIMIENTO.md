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

## Tabla final de etiquetas

| Etiqueta en GTM | Espera el consentimiento de |
| --- | --- |
| GA4 (`G-1FEPWW0E8H`) | Estadísticas (`analytics_storage`) |
| Clarity (`lmigexys8q`) | Estadísticas (`analytics_storage`) |
| Píxel de TikTok (`DBTUGSJC77U5KA7Q8O2G`) | Marketing (`ad_storage`, `ad_user_data`, `ad_personalization`) |

Fuera de GTM: el **píxel de Meta** (`300361413088359`) queda en su plugin, bloqueado por la integración de Complianz hasta el consentimiento de marketing.

## Guía paso a paso

Todo en el **staging** (`www.staging2.siles.cr/wp-admin`), salvo GTM, que es un solo contenedor para el staging y para producción. En GTM se prepara todo en el espacio de trabajo y **no se publica** hasta después del despliegue.

### 1. Divi: quitar los fragmentos pegados a mano
En **Divi › Opciones del tema › Integración**:
- **"Agregar código al `<head>`":** borrá todo el bloque. Incluye el fragmento de GA4 (`gtag/js?id=G-1FEPWW0E8H`), el de Mailchimp (`mcjs`) y el de GTM (`GTM-THQ5FK5`). Si hay otra cosa ahí, dejala y avisá.
- **"Agregar código al `<body>`":** borrá el `<noscript>` de GTM (`googletagmanager.com/ns.html?id=GTM-THQ5FK5`).
- Guardá.

### 2. Site Kit: que no inserte nada
Site Kit se queda para ver los informes en el escritorio de WordPress.
- **Analytics:** en Site Kit › Ajustes › Servicios conectados, abrí **Analytics** › Editar y desactivá **"Insertar el fragmento de código de Google Analytics"**.
- **Tag Manager:** en el mismo lugar, abrí **Tag Manager** › Editar y desactivá **"Insertar el fragmento de código"**.
- **Modo de consentimiento:** en Site Kit › Ajustes › Administrador, desactivá **"Modo de consentimiento"**. Lo maneja Complianz, para todos los países.

### 3. Plugins
- Desactivá **Microsoft Clarity**: Clarity se carga desde GTM.
- **Meta pixel for WordPress** se queda.

### 4. Complianz
En **Complianz › Asistente**:
- **Región:** Unión Europea (aceptación previa). En la versión gratuita se aplica a todos los visitantes.
- **Estadísticas:** elegí **Google Tag Manager** con el ID `GTM-THQ5FK5`; Complianz pasa a insertarlo. A la pregunta de si las estadísticas son respetuosas con la privacidad o anónimas, respondé **No**. Así dejan de permitirse por defecto.
- **Modo de consentimiento de Google (Consent Mode v2):** activalo.
- **Integraciones › Plugins:** verificá que esté activa la integración con el plugin del píxel de Meta.
- **Servicios de terceros:** que estén **Meta (Facebook)**, **TikTok** y **Microsoft Clarity**, para la política de cookies.
- Terminá el asistente y guardá. Si Complianz lo pide, regenerá la política de cookies.

### 5. Google Tag Manager (contenedor `GTM-THQ5FK5`), sin publicar
- **Descripción general del consentimiento:** en Administrar › Configuración del contenedor, activá **"Habilitar la descripción general del consentimiento"**.
- **Etiqueta de Google `G-1FEPWW0E8H`:** en Configuración avanzada › Configuración del consentimiento, elegí **"Requerir consentimiento adicional"** y agregá `analytics_storage`.
- **Etiqueta de Clarity** (HTML personalizado): lo mismo, con `analytics_storage`.
- **Etiqueta nueva de TikTok:**
  - En Etiquetas › Nueva › Galería de plantillas de la comunidad, elegí **"TikTok Pixel"** (de TikTok).
  - ID del píxel: `DBTUGSJC77U5KA7Q8O2G`.
  - Consentimiento requerido: `ad_storage`, `ad_user_data` y `ad_personalization`.
  - Activador: **All Pages**.
- **No agregues** el píxel de Meta.
- Probá con **Vista previa** sobre `https://www.staging2.siles.cr`. **No publiques todavía.**

### 6. Prueba en el staging
Aviso, y desde acá reviso qué se envía sin tocar el banner, rechazando y aceptando. Bloqueo los envíos para no ensuciar las estadísticas.

### 7. Producción
1. Comparación previa con producción.
2. Respaldo y *Full Deploy*.
3. **Recién ahí, publicar la versión nueva de GTM.**
4. Revisión en producción.

### A verificar después
- **API de Conversiones de Meta:** los eventos del servidor no se ven desde el navegador. Hay que confirmar en el plugin, o en el Administrador de eventos de Meta, que sin consentimiento no se envíen eventos `PageView` desde el servidor.
