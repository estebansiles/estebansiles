# Test de madurez digital (lead magnet)

Cuestionario de 10 preguntas para `siles.cr/madurezdigital`. Al terminar, pide nombre y correo, muestra el nivel de madurez digital con 3 pasos inmediatos personalizados y dispara una secuencia de 3 correos según el nivel.

**Estado:** diseño y prototipo funcional. Todavía no está montado en WordPress ni conectado a una herramienta de envío.

## Archivos

| Archivo | Contenido |
| --- | --- |
| `madurez.json` | Fuente única del contenido: preguntas, opciones con puntos, los 30 pasos recomendados y los 3 niveles. |
| `correos/1-supervivencia-analogica.md` | Secuencia de 3 correos para 10 a 16 puntos. |
| `correos/2-digitalizacion-fragmentada.md` | Secuencia de 3 correos para 17 a 24 puntos. |
| `correos/3-operacion-escalar.md` | Secuencia de 3 correos para 25 a 30 puntos. |
| `../sitio-web/madurez-datos.js` | Copia de `madurez.json` que usa el prototipo. |
| `../sitio-web/app.js` | Prototipo navegable, en la vista `#/madurezdigital` (función `Madurez` y `calcularMadurez`). |

Para verlo: servir `sitio-web/` (por ejemplo `python3 -m http.server 8000`) y abrir `http://localhost:8000/#/madurezdigital`.

Si se edita `madurez.json`, hay que regenerar `sitio-web/madurez-datos.js`:

```bash
node -e 'const d=require("./madurez-digital/madurez.json");require("fs").writeFileSync("sitio-web/madurez-datos.js","/* Generado desde madurez-digital/madurez.json. Editá el JSON y regenerá este archivo. */\nwindow.SILES_MADUREZ = "+JSON.stringify(d,null,2)+";\n")'
```

## Cómo se calcula

- **Puntos:** cada pregunta suma A = 1, B = 2, C = 3. Total de 10 a 30.
- **Selección múltiple:** la pregunta 1 permite marcar varias opciones; cuenta la más baja marcada.
- **Niveles:** Supervivencia analógica (10 a 16), Digitalización fragmentada (17 a 24) y Operación escalar (25 a 30).
- **Los 3 pasos:** salen de las 3 áreas con menor puntaje. Cada área tiene un paso distinto según la respuesta (A, B o C). Si hay empate, se usa el orden de `prioridad` del nivel (por ejemplo, en el nivel intermedio la integración va primero).

## Flujo del lead magnet

1. La persona responde las 10 preguntas.
2. Deja nombre, correo, empresa (opcional), sector y su consentimiento según la Ley 8968. Sin consentimiento no se envía nada.
3. Ve su reporte en pantalla.
4. La herramienta de envío recibe el contacto con su nivel, su puntaje y sus 3 pasos, y arranca la secuencia de ese nivel: correo 1 al instante, correo 2 el día 2 y correo 3 el día 4.
5. La secuencia se detiene si la persona agenda una llamada o se da de baja.

## Pendiente para la implementación

- Elegir la herramienta de envío y crear un campo por cada variable de los correos (`nombre`, `puntaje`, `nivel` y los 3 pasos).
- Reemplazar `{{enlace_agenda}}` por el enlace real del calendario; hoy los botones del prototipo llevan a Contacto.
- Definir `{{enlace_reporte}}`: una página que muestre el reporte guardado, o quitar ese enlace del correo 1.
- Guardar las respuestas con el consentimiento y la fecha, para poder demostrarlo ante la PRODHAB si hace falta.
- Montarlo en WordPress con el tema hijo de Divi (`divi-child-siles/`).

## Notas sobre el texto

Los textos siguen la voz del sistema de diseño de Siles: voseo, primera persona del singular, sin emojis ni signos de exclamación. Se quitaron afirmaciones que no se pueden respaldar (porcentajes de ahorro y comparaciones con "el promedio").
