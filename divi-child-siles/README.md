# Siles (tema hijo de Divi 4)

Tema hijo que aplica el sistema de diseño de Siles Comunicación sobre Divi 4: tokens, tipografía, estilos de módulos y movimiento.
Es la fase 1 de la migración del prototipo (`sitio-web/`) a WordPress.

**Estado: sin probar en un WordPress con Divi.** Se escribió contra los nombres de clase de Divi 4 y hay que validarlo en el staging antes de usarlo en producción.

## Instalación

1. Comprimí la carpeta `divi-child-siles` en un zip.
2. En WordPress: Apariencia › Temas › Añadir nuevo › Subir tema, y activalo. Divi debe estar instalado.
3. En SiteGround, vaciá la caché (SG Optimizer › Purge) para ver los cambios.

```bash
zip -r divi-child-siles.zip divi-child-siles -x '*.md'
```

## Qué trae

| Archivo | Contenido |
| --- | --- |
| `style.css` | Cabecera del tema hijo. Libre para ajustes puntuales. |
| `functions.php` | Carga el estilo de Divi y las tres hojas de `assets/`; precarga dos fuentes; agrega la clase `siles` al `<body>`. |
| `assets/tokens.css` | Variables del sistema de diseño (color, espacio, radios, tipografía) y `@font-face`. Copia de `sitio-web/ds/tokens.css`. |
| `assets/fonts/` | Poppins 400/500/600 y Lato 300/400/700 con cursivas, servidas desde el propio sitio. |
| `assets/siles-divi.css` | La marca sobre los módulos de Divi y las clases de apoyo. |
| `assets/siles-movimiento.css` | Animaciones, transiciones y sombras. |

## Qué cambia solo, sin tocar módulos

- Texto y títulos (Lato y Poppins, escala del sistema), enlaces y anillo de foco.
- Ancho de contenido de 1120 px y espacio vertical entre secciones.
- Botones de Divi y botón de envío de formularios.
- Menú principal, encabezado y pie (también los del Theme Builder).
- Rejilla de blog, rejilla de portafolio y sus filtros, pestañas y campos de formulario.

## Clases para el campo "Clase CSS"

| Clase | Dónde | Efecto |
| --- | --- | --- |
| `siles-firma` | Módulo Texto con un título | Barra de realce bajo la primera letra. Una vez por bloque. |
| `siles-display`, `siles-subtitulo`, `siles-cuerpo-lg`, `siles-cuerpo-ui`, `siles-etiqueta`, `siles-nota`, `siles-medida` | Módulo Texto | Estilos de texto del sistema. |
| `siles-boton--secundario`, `siles-boton--acento` | Módulo Botón | Variantes de botón. |
| `siles-tarjeta` | Módulo Anuncio (blurb) | Tarjeta recta con filete, que se eleva al pasar el cursor. |
| `siles-alterna`, `siles-franja`, `siles-franja-profunda` | Sección | Fondo suave, degradado de marca y degradado profundo. |
| `siles-bloque` | Fila o módulo sobre una franja | Bloque liso para el texto. |
| `siles-oscuro` | Sección | Bloque en tema oscuro dentro de una página clara. |
| `siles-estado` + `--exito`, `--alerta`, `--error` | `<span>` en un módulo Texto | Etiqueta de estado. |
| `siles-ficha` | Módulo Código con una `<dl>` | Ficha de datos del proyecto único. |
| `siles-pasos-4` | Contenedor en un módulo Código | Cuatro pasos; dos y dos en tableta y móvil. |
| `siles-entra` + `siles-retraso-1` a `-4` | Cualquier módulo | Entrada escalonada al cargar. |
| `siles-revela` | Cualquier módulo | Aparece al entrar en pantalla. |
| `siles-traza` | Cualquier módulo | Filete que se dibuja sobre el módulo. |
| `siles-eleva`, `siles-papel` | Cualquier módulo | Elevación al pasar el cursor; bloque con filete y sombra de reposo. |
| `siles-cinta` | Módulo Código | Banda de temas en movimiento. |

## Ajustes que hay que hacer en Divi

- **Paleta del constructor:** cargar a mano `#008C99`, `#00D1B1`, `#1E2020`, `#666666`, `#FFFFFF`, `#F4F5F5` y `#00737E` en Divi › Opciones del tema › Paleta de colores.
- **Tipografía del personalizador:** dejar las fuentes en "Predeterminado" para que no pisen las del tema hijo.
- **Animaciones de Divi:** apagarlas en los módulos que usen `siles-entra` o `siles-revela`.
- **SG Optimizer:** si se activa la combinación de CSS, probar que las fuentes sigan cargando; las rutas de `tokens.css` son relativas.

## Pendiente (fases siguientes)

- Diseños de Divi para encabezado, pie, Inicio y Contacto.
- Plantilla de proyecto único y listado de Proyectos en el Theme Builder.
- Blog, Servicios y cotizador.
- Los íconos de la serie Siles aún no están en el tema: hay que subirlos como SVG a la biblioteca de medios.
