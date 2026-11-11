Diálogo modal para confirmaciones y formularios cortos.

```jsx
<Dialogo titulo="Agenda una llamada" alCerrar={cerrar}
  acciones={<><Boton variante="fantasma" onClick={cerrar}>Cancelar</Boton><Boton>Confirmar</Boton></>}>
  Elige un horario de 30 minutos.
</Dialogo>
```
