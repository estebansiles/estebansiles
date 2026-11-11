Diálogo modal para confirmaciones y formularios cortos.

```jsx
<Dialogo titulo="Agendá una llamada" alCerrar={cerrar}
  acciones={<><Boton variante="fantasma" onClick={cerrar}>Cancelar</Boton><Boton>Confirmar</Boton></>}>
  Elegí un horario de 30 minutos.
</Dialogo>
```
