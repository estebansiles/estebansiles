# Sitio en inglés, portugués y francés con WPML

Idiomas: español (principal, sin carpeta), inglés (`/en/`), portugués de Brasil (`/pt-br/`) y francés (`/fr/`).
Traducción: la hace Claude a mano y la sube por la API. WPML no traduce automáticamente ni gasta créditos.
Alcance de la primera etapa: páginas principales, proyectos y páginas legales. El blog queda en español.

Todo se hace primero en el **staging** (`staging2.siles.cr`).

---

## 1. Instalar los plugins (Esteban)

Descargalos desde tu cuenta de wpml.org (Descargas) y subilos en Plugins › Añadir nuevo › Subir plugin:

- [ ] **WPML Multilingual CMS**
- [ ] **WPML String Translation**
- [ ] **Yoast SEO Multilingual**

No hace falta el complemento de Contact Form 7: Contacto y Opt-out usan el formulario de Divi.

## 2. Asistente de configuración de WPML

- [ ] **Idioma principal:** Español.
- [ ] **Otros idiomas:** English, Português (Brasil) y Français.
- [ ] **Formato de las URL:** "Idiomas diferentes en directorios" (`siles.cr/en/`). Dejá **sin marcar** "Usar directorio para el idioma predeterminado": el español sigue en la raíz.
- [ ] **Selector de idioma:** no agregues ninguno (ni al menú, ni al pie, ni en widgets). El tema trae su propio selector.
- [ ] **Modo de traducción:** "Traducir lo que elijas" (o "Translate Some"). **No** elijas "Traducir todo automáticamente".
- [ ] **Quién traduce:** "Solo yo".
- [ ] **Clave del sitio:** registrá el staging con una clave de sitio de desarrollo desde tu cuenta de WPML.
- [ ] **Compatibilidad:** si pregunta por enviar información de plugins y temas, es opcional.

## 3. Tipos de contenido

En WPML › Ajustes › Traducción de tipos de entrada:

- [ ] **Páginas:** Traducible, solo mostrar elementos traducidos.
- [ ] **Proyectos:** Traducible, solo mostrar elementos traducidos.
- [ ] **Entradas (blog):** No traducible.
- [ ] **Diseños del Theme Builder** (Diseños de encabezado, de cuerpo y de pie, o "Layouts"): **Traducible, usar la traducción si existe o mostrar el original**. Claude traduce el encabezado, el pie, la 404 y las plantillas de proyecto; el blog sigue con sus plantillas en español.
- [ ] **Plantillas del Theme Builder** ("Templates"): **No traducible**. Son las reglas que dicen qué diseño va en cada página y sirven igual para todos los idiomas.

En WPML › Ajustes › Traducción de taxonomías:

- [ ] **Categorías y etiquetas de proyecto:** Traducible.

Opcional, más adelante: en WPML › Ajustes › Traducción de slugs, traducir `portafolio` (por ejemplo `portfolio` en inglés y francés, `portfolio` en portugués). Mientras tanto, los proyectos en otros idiomas quedan en `/en/portafolio/…`.

## 4. Avisar a Claude

Cuando termines, avisá. Claude sube el tema con el selector de idioma y la API para las traducciones, y empieza a cargar las páginas.

---

## Lo que hace Claude

1. **Tema multilingüe:** textos del cotizador, del menú móvil y de las redes en los cuatro idiomas; enlaces internos que apuntan a la página del mismo idioma; selector de idioma en el menú móvil y en el encabezado de escritorio.
2. **Encabezado, pie y plantillas:** Claude crea por la API la versión traducida de cada diseño del Theme Builder. No hay que importar nada a mano.
3. **API de traducciones:** un punto de la API, solo para administradores, que crea cada página, proyecto o diseño traducido y lo enlaza con su original en WPML.
4. **Traducciones:** Inicio, Sobre mí, Servicios, Proyectos y cada proyecto, Cotización, Contacto, Conversemos, 404, Términos, Privacidad y Opt-out, en inglés de EE. UU., portugués de Brasil y francés.
5. **SEO y cumplimiento:** títulos y descripciones de Yoast por idioma, `hreflang`, banner de cookies traducido y agenda de Google Calendar en el idioma de cada página.

## Antes de publicar en producción

- [ ] **Revisión legal:** que un abogado revise Términos, Privacidad y Opt-out en cada idioma.
- [ ] **Recorrido:** revisar cada idioma en el celular y en la computadora.
- [ ] **Paso a producción:** el despliegue completo reemplaza la base de datos de producción. Hay que decidir si se despliega completo (y se repite en producción lo que cambió solo ahí) o si se instala WPML en producción y se importan las traducciones.

---

## Estado en el staging (18 de noviembre de 2026)

- [x] **Tema 0.11.5:** diccionario del tema, selector de idioma, `hreflang`, nota legal y API de traducciones y cadenas.
- [x] **Páginas, proyectos y plantillas:** traducidos a en, pt-BR y fr con `divi/traducir.py` (textos en `divi/traducciones/textos/`). La API marca cada traducción como manual para que WPML no la reconstruya con el texto en español.
- [x] **Menús y categorías de proyecto:** traducidos (`divi/traducciones/menus.json` y `terminos.json`).
- [x] **Yoast y Complianz:** cadenas traducidas por la API (`divi/traducciones/cadenas.json` y `cadenas-complianz.json`). Los textos de Complianz estaban registrados como inglés; se pasaron a español con `siles/v1/cadenas-origen`.
- [ ] **Revisión legal** de Términos, Privacidad y Opt-out en cada idioma.
- [ ] **Paso a producción** (ver "Antes de publicar en producción").

**Si se edita una página en español,** su traducción no se actualiza sola: hay que volver a descargar el original, extraer, traducir lo nuevo y subir (`python3 divi/traducir.py extraer|llenar|subir`).
