# Aplicaciones

Cómo se aplica el sistema en cada medio. Cada uno tiene un componente de referencia.

> Todos los componentes de referencia de esta tabla existen en `components/`.

| Medio | Componente | Formato | Fondo habitual |
|---|---|---|---|
| Sitio web y WordPress | `HeroWeb`, `Navegacion`, `Tarjeta`, `Pasos` | Ancho máximo 1120px | `fondo` con franjas `fondo-suave` |
| Aplicaciones y paneles | `Panel`, `Tabla`, `Metrica`, `Estado`, `Campo`, `Aviso` | Barra lateral de 200px | `fondo`, lateral en `tinta` |
| Propuestas y presentaciones | `Diapositiva`, `Tabla`, `Pasos` | 16:9, 1920×1080 | `fondo` entre filetes |
| Redes sociales | `PublicacionRedes` | 1080×1080 y 1080×1920 | `verde-2`, `tinta` o patrón |
| Tarjetas de presentación | `TarjetaPresentacion` | 89×51mm, CMYK | `blanco` y `tinta` |

## Sitio web y WordPress

- Cargar Poppins (400, 600) y Lato (300, 300 cursiva, 400, 700).
- Registrar en el tema los colores `verde-1`, `verde-2`, `tinta`, `cafe`, `blanco`, `fondo-suave` y `accion` como paleta del editor, y desactivar los colores personalizados.
- Orden de página de servicios: `Navegacion`, `HeroWeb`, `Pasos`, rejilla de `Tarjeta`, cierre con un botón primario.
- Botones de 44px de alto en móvil. Un solo botón primario por pantalla.

## Aplicaciones y paneles

- Texto de interfaz en `cuerpo-ui`; títulos de vista en `titulo-2` con `sl-titulo`.
- Formularios en una columna, con `Campo`. Errores junto al campo y, si afectan a toda la vista, con `Aviso`.
- Tema oscuro disponible: usar solo tokens de función para que el cambio sea automático.

## Propuestas y presentaciones

- Portada, contexto, método (`Pasos`), alcance por fases, inversión (`Tabla` con IVA desglosado), siguientes pasos.
- Una idea por lámina. Los montos llevan moneda y la aclaración de IVA en la franja inferior.

## Redes sociales

- Alternar los tres fondos de `PublicacionRedes` para dar ritmo al perfil.
- Avatar: isotipo en una tinta blanca sobre `verde-1`.

## Tarjetas de presentación

- Seguir `TarjetaPresentacion`. Papel mate sin laminado brillante, de 300g o más.
