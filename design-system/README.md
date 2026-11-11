# Siles Comunicación — Sistema de diseño

Sistema de diseño de **Siles Comunicación**, la consultora de Esteban Siles en transformación digital, marketing y experiencia del usuario (Costa Rica).
Lema: **“Todo se puede transformar digitalmente, no hay excusas.”**

## Fuentes
- Manual de marca entregado como texto (voz, color, tipografía, forma, logo, patrón, impresión, imágenes).
- `uploads/siles-vectores-e-iconos/` — logos e isotipos SVG (5 versiones c/u) y 37 íconos propios (versión normal y `-blanco`).
- `uploads/2.png … 8.png`, `uploads/Logo Full Color.png` — renders PNG de las versiones del logo (referencia visual).
- GitHub: https://github.com/estebansiles/estebansiles — solo contiene un README de perfil (sin código ni UI). Vale la pena revisar otros repositorios de Esteban si se publican, para recrear superficies reales.
- Versión anterior del sistema: de ahí salen `aplicaciones.md` e `impresion.md` (consolidados en esta versión).

No hubo código de producto, Figma ni presentaciones; los componentes y el UI kit se construyeron desde el manual.

## Índice
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

Sin inventario de componentes en la fuente, se creó un conjunto estándar a la medida de la marca. Adiciones propias de la marca: **Monto** y **Cotizacion** (reglas de montos e IVA 13 % del manual), **Patron** y **Icono** (envoltorios de los recursos de marca).

Piezas y recursos añadidos en esta versión:
- **Piezas** (`components/piezas/`): HeroWeb, Diapositiva, PublicacionRedes, TarjetaPresentacion
- **Aplicaciones** (`components/aplicaciones/`): Panel, Metrica, Tabla
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
