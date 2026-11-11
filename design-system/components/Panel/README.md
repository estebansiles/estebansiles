Estructura de panel de aplicación: barra lateral en tinta de 200 px, cabecera de vista y contenido.

```jsx
<Panel titulo="Cotizaciones" navegacion={[{texto:'Inicio',icono:'planear',activo:true},{texto:'Clientes',icono:'clientes'}]} acciones={<Boton variante="secundario" tamano="sm">Nueva</Boton>}>...</Panel>
```

- Usar solo tokens de función: el tema oscuro cambia solo.
- Un solo elemento activo en la navegación, marcado con verde-2 y su nombre.
