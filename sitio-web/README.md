# Sitio web de Siles Comunicación (prototipo)

Prototipo funcional del sitio: Inicio, Servicios, Proyectos, plantilla de proyecto único, Blog, Cotización y Contacto.
Es un sitio estático, sin paso de compilación. Usa los componentes del sistema de diseño de Siles.

## Cómo verlo

Abrí `index.html` desde un servidor local (las fuentes y los scripts se cargan por ruta relativa):

```bash
cd sitio-web
```

```bash
python3 -m http.server 8000
```

Luego entrá a `http://localhost:8000`.

También se puede publicar tal cual en GitHub Pages u otro alojamiento estático, apuntando a esta carpeta.

## Estructura

| Archivo | Contenido |
| --- | --- |
| `index.html` | Página única; carga estilos, librerías y `app.js`. |
| `app.js` | Las siete vistas, la navegación por hash (`#/servicios`, `#/blog`, ...) y la lógica de formularios y filtros. |
| `sitio.css` | Movimiento, sombras y ajustes de adaptación a tableta y móvil. |
| `ds/` | Copia del sistema de diseño: `tokens.css`, `components/bundle.css`, `components/bundle.js` y fuentes (Poppins y Lato). |
| `vendor/` | React 18, ReactDOM 18 y htm, incluidos para no depender de una red de distribución externa. |

## Pendiente antes de publicar

- **Envíos:** el formulario de contacto, la solicitud de cotización y el boletín solo simulan el envío.
- **WhatsApp:** falta el número (`[TU NÚMERO]` en Contacto).
- **Proyectos:** todas las tarjetas, el caso destacado y la plantilla de proyecto único (`#/proyecto`) usan marcadores entre corchetes; las capturas son marcos vacíos.
- **Blog:** los títulos y resúmenes son propuestas; el cuerpo de los artículos y las fechas son marcadores.
- **Privacidad y Términos de servicio:** los enlaces del pie aún no llevan a ninguna página.
- **Condiciones comerciales:** confirmar el pago 50/50 y la respuesta en menos de 24 horas.

## Notas

- Las animaciones ligadas al scroll usan `animation-timeline`; en navegadores sin soporte el contenido se muestra sin animar.
- Todo el movimiento se desactiva con la preferencia del sistema "reducir movimiento".
- `ds/` es una copia: si el sistema de diseño cambia, hay que volver a copiar esos archivos.
