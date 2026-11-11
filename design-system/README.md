# Siles Comunicación — Sistema de diseño

Sistema de diseño de **Siles Comunicación**, la consultora de Esteban Siles en transformación digital, marketing y experiencia del usuario (Costa Rica).
Lema: **“Todo se puede transformar digitalmente, no hay excusas.”**

## Fuentes
- Manual de marca entregado como texto (voz, color, tipografía, forma, logo, patrón, impresión, imágenes).
- `uploads/siles-vectores-e-iconos/` — logos e isotipos SVG (5 versiones c/u) y 37 íconos propios (versión normal y `-blanco`).
- `uploads/2.png … 8.png`, `uploads/Logo Full Color.png` — renders PNG de las versiones del logo (referencia visual).
- GitHub: https://github.com/estebansiles/estebansiles — solo contiene un README de perfil (sin código ni UI). Vale la pena revisar otros repositorios de Esteban si se publican, para recrear superficies reales.
- Versión anterior del sistema: de ahí salen `aplicaciones.md` e `impresion.md` (consolidados en esta versión).

Índice

- `styles.css` — punto de entrada (solo `@import`).
- `tokens.json` — marca + función, tema claro/oscuro, tipografía, espacio, radios, sombra y medidas; `tokens.css` se genera de ahí. `components/bundle.css` — CMYK pendiente y clases `sl-*`.
- `fonts/` — Poppins 400/500/600 y Lato 300/400/700/300i/400i (woff2, Google Fonts, OFL).
- `components/` — componentes React (`bundle.js`; fuentes en las carpetas de grupo) + `bundle.css`.
- `guidelines/` — tarjetas de fundamentos (Colors, Type, Spacing, Brand).
- `assets/logos/`, `assets/iconos/` — SVG originales sin metadatos.
- `ui_kits/sitio-web/` — composición de referencia del sitio.
- `aplicaciones.md` — cómo se aplica el sistema en sitio web, paneles, propuestas, redes y tarjetas.
- `impresion.md` — valores CMYK de los colores de marca y reglas de impresión.
- `assets/notes/SKILL.from-standalone.md`, `github.md`.

## Componentes
- **Marca** (`components/marca/`): Logo, Icono, Patron
- **Acciones** (`components/acciones/`): Boton, BotonIcono, Enlace
- **Formularios** (`components/formularios/`): Campo, Selector, Casilla, Interruptor
- **Contenido** (`components/contenido/`): Titulo, Seccion, Tarjeta, Estado, Ficha, Monto, Cotizacion
- **Navegación** (`components/navegacion/`): Pestanas, Menu
- **Retroalimentación** (`components/retroalimentacion/`): Aviso, Dialogo, Notificacion, Ayuda

Sin inventario de componentes en la fuente, se creó un conjunto estándar a la medida de la marca. Adiciones propias de la marca: **Monto** y **Cotización** (reglas de montos e IVA 13 % del manual), **Patron** y **Icono** (envoltorios de los recursos de marca).

Piezas y recursos añadidos en esta versión:

- **Piezas** (`components/piezas/`): HeroWeb, Diapositiva, PublicacionRedes, TarjetaPresentacion
- **Aplicaciones** (`components/aplicaciones/`): Panel, Métrica, Tabla
- **Marca** suma Franja (banda con degradado o motivo) e Imagen (duotono); **Contenido** suma Pasos.

## UI kits
- `ui_kits/sitio-web/` — Inicio, Servicios, Cotización, Contacto (click-through). No replica un sitio existente: no se entregó.

---

## Fundamentos de contenido
- **Persona:** primera del singular, voseo costarricense. “Hola, soy Esteban. Me dedico a la comunicación estratégica.” Nunca “nosotros” ni “usted”.
- **Tono:** cercano, directo, optimista sobre la tecnología. Frases cortas que afirman: “Casi todo se puede automatizar, no hay motivo para no intentarlo.”
- **Llamadas a la acción:** verbo en imperativo de vos — “Agendá una llamada”, “Escribime por WhatsApp”, “Pedí una cotización”. Nunca “Haga clic aquí”.
- **Mayúsculas:** tipo oración en títulos (solo primera letra y nombres propios): “Diseño de experiencia de usuario”. Mayúsculas sostenidas solo en el estilo etiqueta.
- **Sin emojis ni signos de exclamación** en piezas de marca.
- **Montos:** moneda + separador de miles con espacio: ₡2 825 000, US$1 500. En cotizaciones, IVA 13 % en fila aparte (componente Cotizacion).
- **Estados:** siempre con una palabra (Listo, Pendiente, Error), nunca solo color.
- **Idioma:** español de Costa Rica por defecto; inglés estadounidense para clientes internacionales.

## Fundamentos visuales
- **Color:** verde-1 `#008C99` es la marca (barra del logo, realce bajo títulos, bloques grandes). verde-2 `#00D1B1` es el acento (fondos de alto impacto, un nodo del patrón), con texto en tinta encima. tinta `#1E2020` texto y bloques oscuros; cafe `#666666` texto secundario; blanco domina. Proporción 70 % blanco/fondo-suave · 20 % tinta/cafe · 10 % verdes.
- **Tokens de función** en interfaces: `--fondo`, `--superficie`, `--texto`, `--texto-suave`, `--linea`, `--accion`, `--realce` (+ `--exito/--alerta/--error`). Cambian solos con `data-theme="dark"`; para un bloque oscuro en página clara: `<section class="sl-seccion" data-theme="dark">`.
- **Contraste:** blanco sobre verde-1 solo ≥24px; botones y enlaces usan `--accion` (`#00737E`, versión más oscura). verde-2 nunca como texto sobre blanco.
- **Tipografía:** Poppins Semi Bold para display/titulo-1/2/3; Poppins Regular para subtítulo; Lato Light para cuerpo; Lato Regular para UI densa; etiqueta en Lato mayúsculas 0.2em (como el descriptor del logo); nota en Lato Light cursiva + texto-suave. Medida 60–75 caracteres, alineado a la izquierda, nunca justificado.
- **Firma de marca:** primera letra del título con barra de realce debajo, del grosor del trazo y a esa misma distancia — `sl-titulo` (o `<span class="sl-firma">` en la primera letra; Titulo lo hace solo). Una vez por bloque. Eco del isotipo (S + barra).
- **Fondos:** blanco y fondo-suave como base. Degradados de marca (`gradiente-marca` verde-1 a verde-2; `gradiente-profundo` tinta a verde-1 profundo) para franjas, portadas, diapositivas, publicaciones y reversos: una pieza de alto impacto por vista. Motivos: patrón de red (un nodo verde-2, solo en portadas), trama y líneas (separadores). El texto va siempre dentro de un bloque liso, nunca suelto sobre un degradado o un patrón.
- **Imágenes:** componente `Imagen` con tratamiento duotono (escala de grises multiplicada con el degradado profundo), para que la foto lleve color de marca. Fotos propias o con licencia; esquinas rectas.
- **Esquinas:** `radio-0` en bloques, tarjetas e imágenes; `radio-sm` (4px) solo en botones, campos y estados.
- **Bordes y tarjetas:** bloques abiertos y cerrados con filete 1px en `--linea`. Tarjetas = filete 1px, sin sombra, sin radio; hover = filete pasa a tinta. Nunca borde de color a la izquierda.
- **Sombras:** ninguna, salvo `--sombra-flotante` en menús y diálogos. Sin desenfoques ni transparencias decorativas (solo el velo de diálogo).
- **Espacio y retícula:** escala `space-1`–`space-24` (4–96px). Entre secciones space-24 en escritorio, space-16 en móvil. Contenido a 1120px sobre 12 columnas con space-8 de separación.
- **Interacción:** hover = color más oscuro (`--accion-hover`) o inversión en contorno; presionado = 1px hacia abajo; transiciones 120–200ms `cubic-bezier(.2,0,0,1)`, sin rebotes. Enlaces de acción: la flecha avanza 3px.
- **Foco:** anillo 2px sólido en `--foco`, separado 2px, en todo elemento interactivo (`:focus-visible` global).
- **Encabezado:** fijo arriba, blanco con filete inferior; pie en tinta (tema oscuro).

## Iconografía
- Serie propia (37 íconos): línea 1.5 sobre retícula 24, extremos rectos, uniones en ángulo y un único acento sólido (cuadrado o círculo) en verde. SVG en `assets/iconos/` (normal: trazo tinta + acento verde-1; `-blanco`: trazo blanco + acento verde-2).
- Componente **Icono**: trazo en `currentColor`, acento en `--icono-acento` (cambia con el tema). Datos generados en `components/marca/iconos-data.js`.
- No hay fuente de íconos ni sprite; no se usan emojis ni caracteres Unicode como íconos. No mezclar con otras familias.

## Logo
- Completo (SILES + barra + COMUNICACIÓN) siempre que quepa; isotipo (S + barra) en avatares, favicon y barras de aplicación. Siempre SVG.
- Versiones: color (letras tinta, barra verde-1), tinta, verde (letras verde-1, barra tinta), blanco (letras blancas, barra verde-1, sobre tinta), blanco-pleno (sobre verde-1 o foto).

## Impresión
- Valores CMYK de los colores de marca en `impresion.md`, calculados con perfil FOGRA39 (papel estucado). Son orientativos: validar con prueba de color antes de imprimir. No usar conversión automática desde hex.
- `verde-2` sale más apagado en cuatricromía; si la pieza depende de él, pedir tinta directa.
- `components/bundle.css` aún marca los valores CMYK como pendientes hasta que se validen.

---

## Consuming this system (generated — do not edit)

Every path named below is under `project/` in this design system: read `project/api/tokens.md`, not `api/tokens.md`.

`components/bundle.js` defines `window.SilesDesignSystem_ba437f` (33 components); `components/bundle.css` is its stylesheet; `tokens.css` is every token as a CSS variable plus `@font-face` for the fonts. `components/bundle.css` reads its variables from `tokens.css`. The bundle needs react 18 (not packed in this system: bring your own copy) (`window.React`), react-dom 18 (not packed in this system: bring your own copy) (`window.ReactDOM`), loaded before it. Build any UI by mounting these components; never hand-build a control or draw an icon the system provides.

- **Standalone page:** inline `tokens.css` and `components/bundle.css` in a `<style>`, then the library files and `components/bundle.js` as classic scripts (a file containing `</style`, `</script` or `<!--` breaks an inline element: write the sequence `<\/style`, `<\/script` or `\x3C!--` in your copy, or load that file by URL).
- **Design canvas:** bring `tokens.css`, `components/bundle.css`, `components/bundle.js` and `components/index.d.ts` (for the editor’s props panel) onto the canvas in full, as the canvas type’s design-system components reference says (a server-side copy first where it offers one); in each artboard that uses this system, right after the `support.js` line, load `tokens.css` first, then the stylesheet, then the script; skip the library files (the artboard supplies React); mount with `<x-import component-from-global-scope="SilesDesignSystem_ba437f.<Comp>" …>`.
- **Slides deck, or any surface that cannot run the bundle:** tokens and fonts — the values are on `api/tokens.md`; the deck takes `tokens.json` by file path for its colour pickers, and fonts as “Fonts” below says.

Fonts: `tokens.css` loads each font from its file, by path.

- **Design canvas:** copy `fonts/lato-300-italic.woff2`, `fonts/lato-400-italic.woff2`, `fonts/lato-300.woff2`, `fonts/lato-400.woff2`, `fonts/lato-700.woff2`, `fonts/poppins-400.woff2`, `fonts/poppins-500.woff2` and `fonts/poppins-600.woff2` to the same paths under the canvas’s `project/ds/<folder>/` (`<folder>` is the folder you install this system under; `fonts/lato-300-italic.woff2` lands on `project/ds/<folder>/fonts/lato-300-italic.woff2`), in the same call that installs this system; the copy of `tokens.css` that each artboard links loads them from there. If the install’s reply leaves a font out, bring that font in as for any other page.
- **Slides deck:** for each family you use in the deck (`faces` holds at most the number of typefaces Slides’ `deck-files.md` gives), install its file with the system and name the path it lands on as that family’s `src` in `project/deck.json` `faces`, under the key in the Slides column. A deck takes a font as a file only under the rule in Slides’ `fonts.md` (no space or leading underscore in its path, for two): any other font, or one kept by id, is uploaded as `fonts.md` says.
- **Any other page:** one file per family is enough (below: the upright face nearest regular weight; bold and italic synthesize). Fetch it as the fetch column says (Artifact tool `read`, that id or path as `path`), upload it as an asset (`publish`, `file_path`, `asset:true`) and declare it with an `@font-face { font-family: "<family>"; src: url(<uploaded>) }` rule.

| family | file | fetch | CSS | Slides `faces` key |
| --- | --- | --- | --- | --- |
| Lato | `fonts/lato-400.woff2` (weight 400) | `read` the file with `project/` in front | `var(--font-texto)` | `lato` |
| Poppins | `fonts/poppins-400.woff2` (weight 400) | `read` the file with `project/` in front | `var(--font-titulos)` | `poppins` |

**Read, per thing:** a component’s props, parts and examples: `api/components/<Comp>.md`; token values: `api/tokens.md`. After this README, fetch the cards and fonts you need in ONE message as parallel calls — none depends on another.

**Two rules.** Before you use a thing — a component, a token group, an icon, an asset — read its card from the index below; a value you did not read from a card is a guess. `tokens.json`, `manifest.json`, `components/index.d.ts` and `design-system.json` are sources for tools: hand them over. `components/<Comp>/README.md` is the long-form second read a card links to; `SKILL.md` and `artifact-type/` beside them are authoring guidance, not needed to consume the system.

## Index (generated — do not edit)

**Tokens**

- `api/tokens.md` — Every token: text, palette, type, spacing, radius, shadow, medidas, gradiente. (15.8k)

**Components** (`api/components/<Comp>.md`, 33)

- **Acciones**: `Boton` — Botón principal de la marca (radio-sm, Poppins 500); úsalo para llamadas a la acción con verbo en imperativo · `BotonIcono` — Botón de ícono para menú, cerrar, descargar · `Enlace` — Enlace de acción en accion con subrayado de 1px y flecha que avanza al pasar el cursor
- **Contenido**: `Cotizacion` — Tabla de cotización: encabezados en etiqueta, números tabulares a la derecha, IVA 13 % en fila aparte · `Estado` — Etiqueta de estado compacta (radio-sm) para cotizaciones, proyectos y tareas · `Ficha` — Ficha (chip) seleccionable para filtrar servicios o casos · `Monto` — Formatea montos según la marca (moneda + espacio fino como separador de miles) · `Seccion` — Contenedor de sección de página (sl-seccion + sl-contenedor); úsalo para cada bloque de una página o propuesta · `Tarjeta` — Tarjeta recta con filete para servicios, casos y pasos de proceso · `Titulo` — Título de bloque con antetítulo opcional y la firma de la marca; úsalo para abrir cada sección (uno con firma por bloque) · `Pasos` — Secuencia numerada de pasos o fases; el paso activo se marca con acento sólido y filete de realce
- **Formularios**: `Campo` — Campo de formulario (alto 44px, radio-sm, Lato Regular) para contacto y cotización · `Casilla` — Casilla (checkbox) o radio con etiqueta clicable · `Interruptor` — Interruptor para ajustes que aplican al instante (p. ej. tema oscuro) · `Selector` — Selector desplegable nativo
- **Marca**: `Icono` — Ícono de la serie propia Siles (37 glifos); úsalo en servicios, botones y listas — nunca mezclado con otras familias ni con emojis · `Logo` — Logo de Siles Comunicación en SVG; úsalo completo siempre que quepa y el isotipo en avatares, favicon y barras de aplicación · `Patron` — Patrón de red de Siles como fondo de portada (hero, portada de propuesta o de presentación); una sola vez por pieza, con el texto dentro de un bloque liso · `Franja` — Banda de ancho completo con degradado de marca o motivo gráfico; el contenido va en un bloque liso · `Imagen` — Fotografía de marca con tratamiento duotono (tinta y verde) para que la imagen lleve color de marca
- **Navegación**: `Menu` — Menú desplegable anclado a un disparador · `Pestanas` — Pestañas para alternar vistas dentro de un bloque
- **Retroalimentación**: `Aviso` — Mensaje de estado en línea (formularios, cotizaciones), con filete superior de 2px en el color del estado · `Ayuda` — Tooltip corto sobre tinta para explicar un término o un ícono · `Dialogo` — Diálogo modal para confirmaciones y formularios cortos · `Notificacion` — Notificación (toast) para confirmar acciones; posicionarla fija abajo a la izquierda
- **Piezas**: `HeroWeb` — Portada del sitio: texto en bloque liso a la izquierda y una pieza visual a la derecha sobre degradado de marca · `Diapositiva` — Lámina 16:9 para propuestas y presentaciones, con logo y pie de página fijos · `PublicacionRedes` — Plantilla de publicación para redes: 1080×1080 o 1080×1920, con texto en bloque liso e isotipo · `TarjetaPresentacion` — Tarjeta de presentación de 89×51 mm: frente claro con datos y reverso en degradado profundo con logo
- **Aplicaciones**: `Panel` — Estructura de panel de aplicación: barra lateral en tinta de 200 px, cabecera de vista y contenido · `Metrica` — Indicador de una cifra con su variación; la barra de marca arriba marca el bloque · `Tabla` — Tabla de datos con encabezados en etiqueta; las columnas numéricas van alineadas a la derecha
