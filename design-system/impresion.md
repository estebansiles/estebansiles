# Impresión

Valores CMYK de los colores de marca para offset o digital sobre papel estucado. Calculados con el perfil FOGRA39 (ISO Coated v2), conversión colorimétrica relativa con compensación de punto negro.

> Nota: son valores calculados, no oficiales. Validar con prueba de color en la imprenta antes de la tirada.

| Color | Hex | C | M | Y | K | Cómo se ve impreso |
|---|---|---|---|---|---|---|
| `verde-1` | #008C99 | 78 | 13 | 30 | 20 | Prácticamente igual (ΔE 1.3) |
| `verde-2` | #00D1B1 | 61 | 0 | 41 | 0 | Más apagado, cercano a #67BFAB (ΔE 19.5): está fuera de la gama CMYK |
| `tinta`, fondos y bloques | #1E2020 | 60 | 40 | 40 | 100 | Negro enriquecido, igual al de pantalla |
| `tinta`, texto y líneas | #1E2020 | 0 | 0 | 0 | 100 | Negro puro, sin riesgo de registro |
| `cafe` | #666666 | 0 | 0 | 0 | 75 | Igual (ΔE 0.6), en una sola tinta |
| `accion` | #00737E | pendiente | pendiente | pendiente | pendiente | Pendiente de recalcular con FOGRA39 (el valor anterior, C84 M27 Y37 K28, correspondía a #00727D) |
| `fondo-suave` | #F4F5F5 | 0 | 0 | 0 | 5 | Igual (recalcular con el hex de tokens) |
| `blanco` | #FFFFFF | 0 | 0 | 0 | 0 | El papel |

## Reglas

- Texto y filetes en `tinta` van en K100; el negro enriquecido (C60 M40 Y40 K100) es solo para fondos y bloques grandes.
- Los grises van solo en negro (K75, K5), no en cuatro tintas: así no viran de tono.
- `verde-2` impreso en cuatricromía pierde viveza. Para piezas donde sea protagonista, pedir una tinta directa igualada con muestra física; en el resto, preferir `verde-1` como color dominante.
- Texto calado en blanco sobre `verde-1` o `tinta`: no menos de 7pt y nunca en Lato Light.
- Estos valores son para papel estucado. En papel sin estucar o con otro perfil de imprenta (GRACoL, SWOP) varían unos puntos: pedir siempre prueba de color.
- Entregar a imprenta en PDF con los logos en vector, sangrado de 3mm y textos convertidos a curvas.
