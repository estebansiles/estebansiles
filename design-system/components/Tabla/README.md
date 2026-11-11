Tabla de datos con encabezados en etiqueta; las columnas numéricas van alineadas a la derecha.

```jsx
<Tabla columnas={[{clave:'c',texto:'Servicio'},{clave:'m',texto:'Monto',num:true}]} filas={[{c:'Diagnóstico',m:'₡350 000'}]} />
```

- Para estados usar `celda` con el componente `Estado`: siempre con una palabra.
- En móvil la tabla hace scroll horizontal; no se reduce la letra.
