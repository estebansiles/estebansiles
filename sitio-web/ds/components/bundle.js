/* @ds-bundle: {"format":4,"namespace":"SilesDesignSystem_ba437f","components":[{"name":"Boton","sourcePath":"components/acciones/Boton.jsx"},{"name":"BotonIcono","sourcePath":"components/acciones/BotonIcono.jsx"},{"name":"Enlace","sourcePath":"components/acciones/Enlace.jsx"},{"name":"Cotizacion","sourcePath":"components/contenido/Cotizacion.jsx"},{"name":"Estado","sourcePath":"components/contenido/Estado.jsx"},{"name":"Ficha","sourcePath":"components/contenido/Ficha.jsx"},{"name":"Monto","sourcePath":"components/contenido/Monto.jsx"},{"name":"Seccion","sourcePath":"components/contenido/Seccion.jsx"},{"name":"Tarjeta","sourcePath":"components/contenido/Tarjeta.jsx"},{"name":"Titulo","sourcePath":"components/contenido/Titulo.jsx"},{"name":"Campo","sourcePath":"components/formularios/Campo.jsx"},{"name":"Casilla","sourcePath":"components/formularios/Casilla.jsx"},{"name":"Interruptor","sourcePath":"components/formularios/Interruptor.jsx"},{"name":"Selector","sourcePath":"components/formularios/Selector.jsx"},{"name":"Icono","sourcePath":"components/marca/Icono.jsx"},{"name":"Logo","sourcePath":"components/marca/Logo.jsx"},{"name":"Patron","sourcePath":"components/marca/Patron.jsx"},{"name":"Franja","sourcePath":"components/marca/Franja.jsx"},{"name":"Imagen","sourcePath":"components/marca/Imagen.jsx"},{"name":"Menu","sourcePath":"components/navegacion/Menu.jsx"},{"name":"Pestanas","sourcePath":"components/navegacion/Pestanas.jsx"},{"name":"Aviso","sourcePath":"components/retroalimentacion/Aviso.jsx"},{"name":"Ayuda","sourcePath":"components/retroalimentacion/Ayuda.jsx"},{"name":"Dialogo","sourcePath":"components/retroalimentacion/Dialogo.jsx"},{"name":"Notificacion","sourcePath":"components/retroalimentacion/Notificacion.jsx"},{"name":"HeroWeb","sourcePath":"components/piezas/HeroWeb.jsx"},{"name":"Diapositiva","sourcePath":"components/piezas/Diapositiva.jsx"},{"name":"PublicacionRedes","sourcePath":"components/piezas/PublicacionRedes.jsx"},{"name":"TarjetaPresentacion","sourcePath":"components/piezas/TarjetaPresentacion.jsx"},{"name":"Panel","sourcePath":"components/aplicaciones/Panel.jsx"},{"name":"Metrica","sourcePath":"components/aplicaciones/Metrica.jsx"},{"name":"Tabla","sourcePath":"components/aplicaciones/Tabla.jsx"},{"name":"Pasos","sourcePath":"components/contenido/Pasos.jsx"}]} */
var SilesDesignSystem_ba437f = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // entry.js
  var entry_exports = {};
  __export(entry_exports, {
    Aviso: () => Aviso,
    Ayuda: () => Ayuda,
    Boton: () => Boton,
    BotonIcono: () => BotonIcono,
    Campo: () => Campo,
    Casilla: () => Casilla,
    Cotizacion: () => Cotizacion,
    Dialogo: () => Dialogo,
    Diapositiva: () => Diapositiva,
    Enlace: () => Enlace,
    Estado: () => Estado,
    Ficha: () => Ficha,
    Franja: () => Franja,
    HeroWeb: () => HeroWeb,
    Icono: () => Icono,
    Imagen: () => Imagen,
    Interruptor: () => Interruptor,
    Logo: () => Logo,
    Menu: () => Menu,
    Metrica: () => Metrica,
    Monto: () => Monto,
    Notificacion: () => Notificacion,
    Panel: () => Panel,
    Pasos: () => Pasos,
    Patron: () => Patron,
    Pestanas: () => Pestanas,
    PublicacionRedes: () => PublicacionRedes,
    Seccion: () => Seccion,
    Selector: () => Selector,
    Tabla: () => Tabla,
    Tarjeta: () => Tarjeta,
    TarjetaPresentacion: () => TarjetaPresentacion,
    Titulo: () => Titulo
  });

  // shim:react
  var R = window.React;
  var react_default = R;
  var { useState, useEffect, useRef, useMemo, useId, createElement, Fragment } = R;

  // ../consolidado/project/components/marca/iconos-data.js
  var ICONOS = {
    "agente-ia": '<g fill="var(--icono-acento, #008C99)"><rect x="7.5" y="11.5" width="2.5" height="2.5"></rect><rect x="14" y="11.5" width="2.5" height="2.5"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><rect x="4" y="8" width="16" height="12"></rect><path d="M12 8V5.2M1.75 12v4M22.25 12v4M9 17h6"></path><circle cx="12" cy="3.75" r="1.5"></circle></g>',
    "analitica": '<g fill="var(--icono-acento, #008C99)"><rect x="15.75" y="3.5" width="4.25" height="16.75"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><rect x="4" y="12" width="3.5" height="8.25"></rect><rect x="10.25" y="8" width="3.5" height="12.25"></rect><path d="M2 20.25h20"></path></g>',
    "app-movil": '<g fill="var(--icono-acento, #008C99)"><rect x="9.5" y="17" width="5" height="1.75"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><rect x="6.5" y="2.5" width="11" height="19"></rect><path d="M10.5 5.5h3"></path></g>',
    "automatizacion": '<g fill="var(--icono-acento, #008C99)"><rect x="14" y="14" width="7" height="7"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><rect x="3" y="3" width="7" height="7"></rect><path d="M10 6.5h7.5V13M15 10.5l2.5 2.5 2.5-2.5"></path></g>',
    "busqueda": '<g fill="var(--icono-acento, #008C99)"><circle cx="10.5" cy="10.5" r="2.25"></circle></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><circle cx="10.5" cy="10.5" r="7"></circle><path d="M15.5 15.5 21.5 21.5"></path></g>',
    "calendario": '<g fill="var(--icono-acento, #008C99)"><rect x="13.25" y="13.25" width="4.5" height="4.5"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><rect x="3" y="5" width="18" height="16"></rect><path d="M3 10h18M8 2.5V7M16 2.5V7"></path></g>',
    "candado": '<g fill="var(--icono-acento, #008C99)"><rect x="11.1" y="13.5" width="1.8" height="4"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><rect x="5" y="10" width="14" height="11"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></g>',
    "capacitacion": '<g fill="var(--icono-acento, #008C99)"><rect x="6.5" y="7" width="6" height="2.5"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><rect x="3" y="3.5" width="18" height="12.5"></rect><path d="M12 16v4M7.5 20.75h9M6.5 12h11"></path></g>',
    "cerrar": '<g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><path d="M5 5l14 14M19 5L5 19"></path></g>',
    "check": '<g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><path d="M3.5 12.5l5.5 5.5L20.5 6.5"></path></g>',
    "clientes": '<g fill="var(--icono-acento, #008C99)"><rect x="5" y="20" width="14" height="1.75"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><circle cx="12" cy="7" r="3.75"></circle><path d="M5 18.25v-.5a4.5 4.5 0 0 1 4.5-4.5h5a4.5 4.5 0 0 1 4.5 4.5v.5"></path></g>',
    "correo": '<g fill="var(--icono-acento, #008C99)"><circle cx="19.5" cy="5.5" r="2.75"></circle></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><path d="M3 5.5h13M21 10.5V19H3V5.5l9 7.25 5.2-4.2"></path></g>',
    "desarrollo": '<g fill="var(--icono-acento, #008C99)"><path d="M13.3 4.6l1.5.4-4.1 14.4-1.5-.4z"></path></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5"></path></g>',
    "descargar": '<g fill="var(--icono-acento, #008C99)"><rect x="4" y="19.25" width="16" height="1.75"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><path d="M12 3v12M6.5 9.5l5.5 5.5 5.5-5.5"></path></g>',
    "diseno-web": '<g fill="var(--icono-acento, #008C99)"><rect x="6" y="11.5" width="7" height="2.5"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><rect x="3" y="4" width="18" height="16"></rect><path d="M3 9h18M6 16.5h12"></path></g>',
    "enlace-externo": '<g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><path d="M10.5 5H4.5v14.5H19v-6M14 3.75h6.25V10M20 4l-9 9"></path></g>',
    "estrategia": '<g fill="var(--icono-acento, #008C99)"><circle cx="12" cy="12" r="2"></circle></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle></g>',
    "experiencia-usuario": '<g fill="var(--icono-acento, #008C99)"><path d="M12 11v10l2.9-2.6 2.1 3.6 1.7-1-2.1-3.6 3.8-.9z"></path></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><path d="M10 18H3V4h18v7M3 8h18"></path></g>',
    "factura-electronica": '<g fill="var(--icono-acento, #008C99)"><rect x="8.5" y="16.5" width="7" height="1.75"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><path d="M5.5 2.5h8.5l4.5 4.5v14.5h-13zM14 2.5V7h4.5M8.5 10.5h7M8.5 13.75h7"></path></g>',
    "firma-digital": '<g fill="var(--icono-acento, #008C99)"><rect x="3.5" y="19" width="17" height="1.75"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><path d="M3.5 15c1.2-5.5 2.6-8.5 4-8.5 2.6 0-1 9.5 1.5 9.5 1.8 0 2.2-5 4-5 1.6 0 .8 3.5 2.5 3.5 1.2 0 1.8-1.5 5-1.5"></path></g>',
    "flecha": '<g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><path d="M3.5 12h16M13.5 6l6 6-6 6"></path></g>',
    "integracion": '<g fill="var(--icono-acento, #008C99)"><rect x="9.75" y="9.75" width="4.5" height="4.5"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><rect x="3" y="3" width="12" height="12"></rect><rect x="9" y="9" width="12" height="12"></rect></g>',
    "investigar": '<g fill="var(--icono-acento, #008C99)"><rect x="9" y="18.25" width="6" height="1.75"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><path d="M9 16.5v-1.4a6.5 6.5 0 1 1 6 0v1.4zM10.5 22h3"></path></g>',
    "marketing": '<g fill="var(--icono-acento, #008C99)"><rect x="19" y="10.5" width="2.5" height="3"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><path d="M3.5 9.5h4l9-4.5v14l-9-4.5h-4zM7.5 14.5V20h3v-4"></path></g>',
    "mejorar": '<g fill="var(--icono-acento, #008C99)"><rect x="3" y="19.5" width="18" height="1.75"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><path d="M3 16l6-6 4 4 7.5-7.5M15 6h6v6"></path></g>',
    "mensaje": '<g fill="var(--icono-acento, #008C99)"><rect x="7" y="9.25" width="7" height="1.75"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><path d="M3.5 4h17v12.5H11L6.5 21v-4.5h-3z"></path></g>',
    "menu": '<g fill="var(--icono-acento, #008C99)"><rect x="3" y="11.1" width="18" height="1.8"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><path d="M3 6h18M3 18h18"></path></g>',
    "nube": '<g fill="var(--icono-acento, #008C99)"><rect x="7.5" y="20" width="9" height="1.75"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><path d="M7 17.5a4.5 4.5 0 0 1-.6-8.96 6 6 0 0 1 11.7 1.03A4 4 0 0 1 17.5 17.5z"></path></g>',
    "pagos": '<g fill="var(--icono-acento, #008C99)"><rect x="2.5" y="8.5" width="19" height="2.75"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><rect x="2.5" y="5" width="19" height="14"></rect><path d="M6 15.5h4"></path></g>',
    "planear": '<g fill="var(--icono-acento, #008C99)"><path d="M4 20l1.2-5.3 4.1 4.1z"></path></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><path d="M4 20l1.2-5.3L16 3.9l4.1 4.1L9.3 18.8zM13.4 6.5l4.1 4.1"></path></g>',
    "probar": '<g fill="var(--icono-acento, #008C99)"><rect x="12.5" y="9.75" width="4.5" height="4.5"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><path d="M3 6h4M11.5 6H21M3 12h9.5M17 12h4M3 18h2M9.5 18H21"></path><rect x="7" y="3.75" width="4.5" height="4.5"></rect><rect x="5" y="15.75" width="4.5" height="4.5"></rect></g>',
    "proteccion-datos": '<g fill="var(--icono-acento, #008C99)"><rect x="8.5" y="10.75" width="7" height="1.75"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><path d="M12 2.75l8 3v6.5c0 4.4-3.1 7.6-8 9-4.9-1.4-8-4.6-8-9v-6.5z"></path></g>',
    "redes": '<g fill="var(--icono-acento, #008C99)"><circle cx="6" cy="8" r="2.75"></circle></g><g fill="currentColor"><circle cx="17" cy="5" r="2"></circle><circle cx="13" cy="19" r="2"></circle><circle cx="20" cy="14" r="2"></circle></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><path d="M6 8l11-3M6 8l7 11M17 5l-4 14M13 19l7-5M17 5l3 9"></path></g>',
    "sistemas": '<g fill="var(--icono-acento, #008C99)"><rect x="13.5" y="13.5" width="7.5" height="7.5"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><rect x="3" y="3" width="7.5" height="7.5"></rect><rect x="13.5" y="3" width="7.5" height="7.5"></rect><rect x="3" y="13.5" width="7.5" height="7.5"></rect></g>',
    "tiempo": '<g fill="var(--icono-acento, #008C99)"><circle cx="12" cy="12" r="1.9"></circle></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><circle cx="12" cy="12" r="9"></circle><path d="M12 6.5V12l4 2.3"></path></g>',
    "transformacion-digital": '<g fill="var(--icono-acento, #008C99)"><rect x="9" y="9" width="6" height="6"></rect></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><path d="M4 11V4h12M13.5 1.5 16 4l-2.5 2.5M20 13v7H8M10.5 17.5 8 20l2.5 2.5"></path></g>',
    "ubicacion": '<g fill="var(--icono-acento, #008C99)"><circle cx="12" cy="9.75" r="2.5"></circle></g><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"><path d="M12 21.5s-7-6.3-7-11.75a7 7 0 0 1 14 0C19 15.2 12 21.5 12 21.5z"></path></g>'
  };

  // ../consolidado/project/components/marca/Icono.jsx
  function Icono({ nombre, tamano = 24, acento, titulo, style, className, ...rest }) {
    const body = ICONOS[nombre];
    if (!body) return null;
    return /* @__PURE__ */ react_default.createElement(
      "svg",
      {
        viewBox: "0 0 24 24",
        width: tamano,
        height: tamano,
        className,
        role: titulo ? "img" : void 0,
        "aria-hidden": titulo ? void 0 : true,
        "aria-label": titulo,
        style: { display: "inline-block", flex: "none", color: "inherit", ...acento ? { "--icono-acento": acento } : null, ...style },
        dangerouslySetInnerHTML: { __html: body },
        ...rest
      }
    );
  }
  var NOMBRES_ICONOS = Object.keys(ICONOS);

  // ../consolidado/project/components/acciones/Boton.jsx
  function Boton({ variante = "primario", tamano = "md", icono, iconoFinal, bloque, href, disabled, type = "button", onClick, children, style, className = "" }) {
    const cls = ["sl-boton", "sl-boton--" + variante, tamano === "sm" ? "sl-boton--sm" : "", bloque ? "sl-boton--bloque" : "", className].join(" ").trim();
    const s = tamano === "sm" ? 18 : 20;
    const inner = /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, icono && /* @__PURE__ */ react_default.createElement(Icono, { nombre: icono, tamano: s }), children, iconoFinal && /* @__PURE__ */ react_default.createElement(Icono, { nombre: iconoFinal, tamano: s }));
    if (href) return /* @__PURE__ */ react_default.createElement("a", { href: disabled ? void 0 : href, "aria-disabled": disabled ? "true" : void 0, className: cls, style, onClick }, inner);
    return /* @__PURE__ */ react_default.createElement("button", { type, className: cls, disabled, onClick, style }, inner);
  }

  // ../consolidado/project/components/acciones/BotonIcono.jsx
  function BotonIcono({ icono, etiqueta, variante = "fantasma", tamano = "md", onClick, disabled, style }) {
    return /* @__PURE__ */ react_default.createElement("button", { type: "button", "aria-label": etiqueta, title: etiqueta, className: ["sl-boton", "sl-boton-icono", "sl-boton--" + variante, tamano === "sm" ? "sl-boton--sm" : ""].join(" "), style: { color: variante === "fantasma" ? "var(--texto)" : void 0, ...style }, onClick, disabled }, /* @__PURE__ */ react_default.createElement(Icono, { nombre: icono, tamano: tamano === "sm" ? 18 : 22 }));
  }

  // ../consolidado/project/components/acciones/Enlace.jsx
  function Enlace({ href = "#", externo, sinIcono, children, onClick, style }) {
    return /* @__PURE__ */ react_default.createElement("a", { className: "sl-enlace", href, onClick, target: externo ? "_blank" : void 0, rel: externo ? "noopener" : void 0, style }, children, !sinIcono && /* @__PURE__ */ react_default.createElement(Icono, { nombre: externo ? "enlace-externo" : "flecha", tamano: 18 }));
  }

  // ../consolidado/project/components/contenido/Monto.jsx
  var SIM = { CRC: "\u20A1", USD: "US$" };
  function formatearMonto(valor, moneda = "CRC", decimales) {
    const d = decimales != null ? decimales : Number.isInteger(valor) ? 0 : 2;
    const [ent, dec] = Math.abs(valor).toFixed(d).split(".");
    const miles = ent.replace(/\B(?=(\d{3})+(?!\d))/g, "\xA0");
    return (valor < 0 ? "\u2212" : "") + (SIM[moneda] || moneda) + miles + (dec ? "," + dec : "");
  }
  function Monto({ valor, moneda = "CRC", decimales, style }) {
    return /* @__PURE__ */ react_default.createElement("span", { style: { fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", ...style } }, formatearMonto(valor, moneda, decimales));
  }

  // ../consolidado/project/components/contenido/Cotizacion.jsx
  function Cotizacion({ partidas = [], moneda = "CRC", iva = 13, nota, style }) {
    const sub = partidas.reduce((s, p) => {
      var _a;
      return s + ((_a = p.cantidad) != null ? _a : 1) * p.precio;
    }, 0);
    const imp = Math.round(sub * iva) / 100;
    const f = (v) => formatearMonto(v, moneda);
    return /* @__PURE__ */ react_default.createElement("div", { style }, /* @__PURE__ */ react_default.createElement("table", { className: "sl-tabla" }, /* @__PURE__ */ react_default.createElement("thead", null, /* @__PURE__ */ react_default.createElement("tr", null, /* @__PURE__ */ react_default.createElement("th", null, "Servicio"), /* @__PURE__ */ react_default.createElement("th", { className: "num" }, "Cant."), /* @__PURE__ */ react_default.createElement("th", { className: "num" }, "Precio"), /* @__PURE__ */ react_default.createElement("th", { className: "num" }, "Total"))), /* @__PURE__ */ react_default.createElement("tbody", null, partidas.map((p, i) => {
      var _a, _b;
      return /* @__PURE__ */ react_default.createElement("tr", { key: i }, /* @__PURE__ */ react_default.createElement("td", null, /* @__PURE__ */ react_default.createElement("div", { style: { fontWeight: 700 } }, p.concepto), p.detalle && /* @__PURE__ */ react_default.createElement("div", { style: { color: "var(--texto-suave)", fontSize: 14, marginTop: 2 } }, p.detalle)), /* @__PURE__ */ react_default.createElement("td", { className: "num" }, (_a = p.cantidad) != null ? _a : 1), /* @__PURE__ */ react_default.createElement("td", { className: "num" }, f(p.precio)), /* @__PURE__ */ react_default.createElement("td", { className: "num" }, f(((_b = p.cantidad) != null ? _b : 1) * p.precio)));
    })), /* @__PURE__ */ react_default.createElement("tfoot", null, /* @__PURE__ */ react_default.createElement("tr", null, /* @__PURE__ */ react_default.createElement("td", { colSpan: 3, className: "num", style: { color: "var(--texto-suave)" } }, "Subtotal"), /* @__PURE__ */ react_default.createElement("td", { className: "num" }, f(sub))), /* @__PURE__ */ react_default.createElement("tr", null, /* @__PURE__ */ react_default.createElement("td", { colSpan: 3, className: "num", style: { color: "var(--texto-suave)" } }, "IVA ", iva, "\\u00A0%"), /* @__PURE__ */ react_default.createElement("td", { className: "num" }, f(imp))), /* @__PURE__ */ react_default.createElement("tr", { className: "total" }, /* @__PURE__ */ react_default.createElement("td", { colSpan: 3, className: "num" }, "Total"), /* @__PURE__ */ react_default.createElement("td", { className: "num" }, f(sub + imp))))), nota && /* @__PURE__ */ react_default.createElement("p", { className: "sl-nota", style: { marginTop: "var(--space-4)" } }, nota));
  }

  // ../consolidado/project/components/contenido/Estado.jsx
  var PALABRA = { exito: "Listo", alerta: "Pendiente", error: "Error", neutro: "Borrador" };
  function Estado({ tipo = "neutro", children, style }) {
    return /* @__PURE__ */ react_default.createElement("span", { className: "sl-estado sl-estado--" + tipo, style }, children != null ? children : PALABRA[tipo]);
  }

  // ../consolidado/project/components/contenido/Ficha.jsx
  function Ficha({ activa, onClick, children, style }) {
    return /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "sl-ficha", "aria-pressed": activa ? "true" : "false", onClick, style }, children);
  }

  // ../consolidado/project/components/contenido/Seccion.jsx
  function Seccion({ tema = "claro", alterna = false, id, children, style, className = "" }) {
    return /* @__PURE__ */ react_default.createElement(
      "section",
      {
        id,
        className: ("sl-seccion " + className).trim(),
        "data-theme": tema === "oscuro" ? "dark" : void 0,
        style: { ...alterna && tema !== "oscuro" ? { background: "var(--fondo-alterno)" } : null, ...style }
      },
      /* @__PURE__ */ react_default.createElement("div", { className: "sl-contenedor" }, children)
    );
  }

  // ../consolidado/project/components/contenido/Tarjeta.jsx
  function Tarjeta({ icono, antetitulo, titulo, children, pie, href, variante = "borde", style, className = "" }) {
    const Tag = href ? "a" : "div";
    return /* @__PURE__ */ react_default.createElement(Tag, { href, className: ["sl-tarjeta", variante === "hundida" ? "sl-tarjeta--hundida" : "", className].join(" ").trim(), style }, icono && /* @__PURE__ */ react_default.createElement("span", { className: "sl-tarjeta__icono" }, /* @__PURE__ */ react_default.createElement(Icono, { nombre: icono, tamano: 40 })), antetitulo && /* @__PURE__ */ react_default.createElement("span", { className: "sl-etiqueta", style: { color: "var(--texto-suave)" } }, antetitulo), titulo && /* @__PURE__ */ react_default.createElement("h3", { className: "sl-titulo-3", style: { margin: 0 } }, titulo), children && /* @__PURE__ */ react_default.createElement("div", { className: "sl-cuerpo", style: { color: "var(--texto-suave)" } }, children), pie && /* @__PURE__ */ react_default.createElement("div", { style: { marginTop: "auto", paddingTop: "var(--space-2)" } }, pie));
  }

  // ../consolidado/project/components/contenido/Titulo.jsx
  var CLASE = { display: "sl-display", 1: "sl-titulo-1", 2: "sl-titulo-2", 3: "sl-titulo-3" };
  function Titulo({ nivel = 2, tamano, firma = true, antetitulo, bajada, children, style, className = "" }) {
    const Tag = "h" + Math.min(Math.max(nivel, 1), 6);
    const cls = [CLASE[tamano != null ? tamano : nivel] || "sl-titulo-3", firma ? "sl-titulo" : "", className].join(" ").trim();
    return /* @__PURE__ */ react_default.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-4)", ...style } }, antetitulo && /* @__PURE__ */ react_default.createElement("span", { className: "sl-etiqueta", style: { color: "var(--texto-suave)" } }, antetitulo), react_default.createElement(Tag, { className: cls, style: { margin: 0 } }, firma && typeof children === "string" ? [react_default.createElement("span", { key: 0, className: "sl-firma" }, children.charAt(0)), children.slice(1)] : children), bajada && /* @__PURE__ */ react_default.createElement("p", { className: "sl-subtitulo sl-medida", style: { color: "var(--texto-suave)", marginTop: "var(--space-2)" } }, bajada));
  }

  // ../consolidado/project/components/formularios/Campo.jsx
  function Campo({ etiqueta, ayuda, error, multilinea, id, type = "text", style, ...rest }) {
    const auto = react_default.useId ? react_default.useId() : "c";
    const fid = id || "campo-" + auto;
    const C = multilinea ? "textarea" : "input";
    return /* @__PURE__ */ react_default.createElement("div", { className: "sl-campo" + (error ? " sl-campo--error" : ""), style }, etiqueta && /* @__PURE__ */ react_default.createElement("label", { className: "sl-campo__label", htmlFor: fid }, etiqueta), /* @__PURE__ */ react_default.createElement(C, { id: fid, className: "sl-campo__control", type: multilinea ? void 0 : type, "aria-invalid": error ? "true" : void 0, "aria-describedby": error || ayuda ? fid + "-d" : void 0, ...rest }), error ? /* @__PURE__ */ react_default.createElement("span", { id: fid + "-d", className: "sl-campo__error" }, "Error: ", error) : ayuda && /* @__PURE__ */ react_default.createElement("span", { id: fid + "-d", className: "sl-campo__ayuda" }, ayuda));
  }

  // ../consolidado/project/components/formularios/Casilla.jsx
  function Casilla({ etiqueta, tipo = "checkbox", style, ...rest }) {
    return /* @__PURE__ */ react_default.createElement("label", { className: "sl-check", style }, /* @__PURE__ */ react_default.createElement("input", { type: tipo, ...rest }), /* @__PURE__ */ react_default.createElement("span", null, etiqueta));
  }

  // ../consolidado/project/components/formularios/Interruptor.jsx
  function Interruptor({ etiqueta, style, ...rest }) {
    return /* @__PURE__ */ react_default.createElement("label", { className: "sl-interruptor", style }, /* @__PURE__ */ react_default.createElement("input", { type: "checkbox", role: "switch", ...rest }), /* @__PURE__ */ react_default.createElement("span", null, etiqueta));
  }

  // ../consolidado/project/components/formularios/Selector.jsx
  function Selector({ etiqueta, opciones = [], ayuda, id, style, ...rest }) {
    const auto = react_default.useId ? react_default.useId() : "s";
    const fid = id || "sel-" + auto;
    return /* @__PURE__ */ react_default.createElement("div", { className: "sl-campo", style }, etiqueta && /* @__PURE__ */ react_default.createElement("label", { className: "sl-campo__label", htmlFor: fid }, etiqueta), /* @__PURE__ */ react_default.createElement("select", { id: fid, className: "sl-campo__control sl-selector", ...rest }, opciones.map((o) => {
      const v = typeof o === "string" ? { valor: o, texto: o } : o;
      return /* @__PURE__ */ react_default.createElement("option", { key: v.valor, value: v.valor }, v.texto);
    })), ayuda && /* @__PURE__ */ react_default.createElement("span", { className: "sl-campo__ayuda" }, ayuda));
  }

  // ../consolidado/project/components/marca/logos-data.js
  var LOGO = { viewBox: "0 -2.53 713.23 296.27", paths: ["M75.99 184.23C89.28 183.14 101.64 178.89 109.97 172.54C118.49 166.05 123.63 159.99 127.34 152.06C135.03 135.6 133.55 114.71 123.81 102.18C116.16 92.34 107.8 87.1 89.3 80.54C86.03 79.38 76.05 76.23 74.71 75.93C74.37 75.86 73.33 75.56 72.39 75.26C71.45 74.97 69.91 74.5 68.97 74.22C68.03 73.95 66.16 73.31 64.82 72.8C63.48 72.29 60.89 71.34 59.08 70.67C49.94 67.32 43.55 62.86 40.66 57.79C37.94 53.03 38.13 44.28 41.09 38.58C43.14 34.6 45.64 32.36 50.29 30.33C57.62 27.12 68.53 27.35 76.32 30.89C84.11 34.42 89.54 41.7 89.54 48.59L89.54 49.68L109.87 49.68C124.97 49.68 130.2 49.65 130.2 49.55C130.2 45.21 127.83 35.28 125.66 30.52C118.35 14.47 106.2 5.1 85.77 -0.25C80.59 -1.61 78.29 -1.89 69.15 -2.33C47.63 -3.35 28.37 2.48 16.23 13.69C13.16 16.52 11.31 18.61 9.06 21.79C8.53 22.53 5.62 27.56 5.03 28.75C3.49 31.84 1.19 40.07 0.85 43.7C0.11 51.65 0.65 59.74 2.32 65.59C2.92 67.71 4.6 72 5.28 73.19C6.08 74.55 8.38 78.07 8.89 78.68C17.59 89.27 25.33 93.87 45.96 100.7C52.82 102.97 55.71 103.87 59.02 104.75C68.32 107.22 78.9 111.15 82.7 113.56C90.89 118.73 94.3 124.22 94.3 132.22C94.3 142.29 88.16 150.23 78.21 153.02C74.22 154.13 71.65 154.48 67.44 154.46C61.39 154.43 58.91 154.06 54.79 152.54C46.03 149.32 38.98 139.4 39.52 131.09L39.58 130.14L19.9 130.14L0.21 130.14L0.13 130.71C-0.88 138.03 3.93 152.87 9.6 159.94C10.93 161.61 13.97 165.14 14.54 165.69C21.28 172.18 28.33 176.41 38.48 180.03C45.56 182.55 54.73 184.24 62.62 184.46C69.24 184.65 71.23 184.62 75.99 184.23ZM186.5 0H223.1V182.3H186.5ZM281.5 0H318.1V153.2H378.2V182.3H281.5ZM424.3 0H530.1V29.7H461.3V75.2H522V104.4H461.3V152.7H530.1V182.3H424.3ZM656.97 184.23C670.26 183.14 682.62 178.89 690.95 172.54C699.47 166.05 704.61 159.99 708.32 152.06C716.01 135.6 714.53 114.71 704.79 102.18C697.14 92.34 688.78 87.1 670.28 80.54C667.01 79.38 657.03 76.23 655.69 75.93C655.35 75.86 654.31 75.56 653.37 75.26C652.43 74.97 650.89 74.5 649.95 74.22C649.01 73.95 647.14 73.31 645.8 72.8C644.46 72.29 641.87 71.34 640.06 70.67C630.92 67.32 624.53 62.86 621.64 57.79C618.92 53.03 619.11 44.28 622.07 38.58C624.12 34.6 626.62 32.36 631.27 30.33C638.6 27.12 649.51 27.35 657.3 30.89C665.09 34.42 670.52 41.7 670.52 48.59L670.52 49.68L690.85 49.68C705.95 49.68 711.18 49.65 711.18 49.55C711.18 45.21 708.81 35.28 706.64 30.52C699.33 14.47 687.18 5.1 666.75 -0.25C661.57 -1.61 659.27 -1.89 650.13 -2.33C628.61 -3.35 609.35 2.48 597.21 13.69C594.14 16.52 592.29 18.61 590.04 21.79C589.51 22.53 586.6 27.56 586.01 28.75C584.47 31.84 582.17 40.07 581.83 43.7C581.09 51.65 581.63 59.74 583.3 65.59C583.9 67.71 585.58 72 586.26 73.19C587.06 74.55 589.36 78.07 589.87 78.68C598.57 89.27 606.31 93.87 626.94 100.7C633.8 102.97 636.69 103.87 640 104.75C649.3 107.22 659.88 111.15 663.68 113.56C671.87 118.73 675.28 124.22 675.28 132.22C675.28 142.29 669.14 150.23 659.19 153.02C655.2 154.13 652.63 154.48 648.42 154.46C642.37 154.43 639.89 154.06 635.77 152.54C627.01 149.32 619.96 139.4 620.5 131.09L620.56 130.14L600.88 130.14L581.19 130.14L581.11 130.71C580.1 138.03 584.91 152.87 590.58 159.94C591.91 161.61 594.95 165.14 595.52 165.69C602.26 172.18 609.31 176.41 619.46 180.03C626.54 182.55 635.71 184.24 643.6 184.46C650.22 184.65 652.21 184.62 656.97 184.23Z", "M0 255.74H132.25V293.74H0Z", "M207.71 280.42Q208.05 280.42 208.3 280.7L209.94 282.46Q208.07 284.62 205.41 285.83Q202.74 287.04 198.97 287.04Q195.7 287.04 193.03 285.9Q190.36 284.77 188.47 282.72Q186.58 280.68 185.54 277.81Q184.5 274.95 184.5 271.51Q184.5 268.07 185.58 265.21Q186.66 262.35 188.63 260.29Q190.59 258.23 193.33 257.1Q196.06 255.96 199.37 255.96Q202.62 255.96 205.1 257Q207.58 258.04 209.47 259.82L208.11 261.71Q207.98 261.92 207.78 262.06Q207.58 262.2 207.24 262.2Q206.86 262.2 206.31 261.78Q205.76 261.37 204.87 260.86Q203.97 260.35 202.64 259.94Q201.3 259.52 199.35 259.52Q197 259.52 195.04 260.34Q193.09 261.16 191.68 262.71Q190.27 264.26 189.49 266.48Q188.7 268.71 188.7 271.51Q188.7 274.35 189.52 276.58Q190.33 278.81 191.74 280.35Q193.16 281.88 195.08 282.69Q197 283.5 199.22 283.5Q200.58 283.5 201.67 283.34Q202.77 283.18 203.69 282.84Q204.61 282.5 205.41 281.98Q206.2 281.46 206.99 280.74Q207.35 280.42 207.71 280.42ZM260.41 271.51Q260.41 274.93 259.33 277.78Q258.25 280.63 256.28 282.69Q254.31 284.75 251.54 285.88Q248.77 287.02 245.42 287.02Q242.06 287.02 239.31 285.88Q236.55 284.75 234.58 282.69Q232.6 280.63 231.52 277.78Q230.44 274.93 230.44 271.51Q230.44 268.1 231.52 265.24Q232.6 262.39 234.58 260.32Q236.55 258.25 239.31 257.11Q242.06 255.96 245.42 255.96Q248.77 255.96 251.54 257.11Q254.31 258.25 256.28 260.32Q258.25 262.39 259.33 265.24Q260.41 268.1 260.41 271.51ZM256.19 271.51Q256.19 268.71 255.43 266.48Q254.67 264.26 253.27 262.72Q251.87 261.18 249.87 260.35Q247.88 259.52 245.42 259.52Q242.98 259.52 240.98 260.35Q238.99 261.18 237.58 262.72Q236.17 264.26 235.4 266.48Q234.64 268.71 234.64 271.51Q234.64 274.31 235.4 276.53Q236.17 278.74 237.58 280.28Q238.99 281.82 240.98 282.64Q242.98 283.45 245.42 283.45Q247.88 283.45 249.87 282.64Q251.87 281.82 253.27 280.28Q254.67 278.74 255.43 276.53Q256.19 274.31 256.19 271.51ZM315.54 256.3V286.7H311.93V264.36Q311.93 263.92 311.97 263.41Q312 262.9 312.04 262.37L301.6 281.38Q301.11 282.33 300.12 282.33H299.52Q298.53 282.33 298.04 281.38L287.39 262.28Q287.52 263.41 287.52 264.36V286.7H283.91V256.3H286.94Q287.49 256.3 287.79 256.41Q288.09 256.51 288.36 257L298.87 275.71Q299.12 276.22 299.36 276.77Q299.61 277.32 299.82 277.9Q300.03 277.32 300.27 276.76Q300.5 276.2 300.77 275.69L311.08 257Q311.34 256.51 311.65 256.41Q311.95 256.3 312.51 256.3ZM352.65 283.43Q354.54 283.43 356.03 282.8Q357.51 282.16 358.54 281.01Q359.57 279.87 360.11 278.28Q360.65 276.69 360.65 274.78V256.3H364.75V274.78Q364.75 277.41 363.91 279.66Q363.07 281.91 361.51 283.55Q359.95 285.19 357.7 286.13Q355.45 287.06 352.65 287.06Q349.85 287.06 347.6 286.13Q345.36 285.19 343.79 283.55Q342.22 281.91 341.38 279.66Q340.54 277.41 340.54 274.78V256.3H344.63V274.76Q344.63 276.67 345.18 278.26Q345.72 279.85 346.75 280.99Q347.77 282.14 349.27 282.79Q350.77 283.43 352.65 283.43ZM414.38 256.3V286.7H412.32Q411.83 286.7 411.5 286.53Q411.17 286.36 410.85 285.96L393.27 263.05Q393.31 263.58 393.33 264.09Q393.35 264.59 393.35 265.04V286.7H389.75V256.3H391.87Q392.14 256.3 392.33 256.33Q392.53 256.36 392.67 256.44Q392.82 256.51 392.97 256.65Q393.12 256.79 393.29 257L410.88 279.89Q410.83 279.34 410.8 278.82Q410.77 278.3 410.77 277.83V256.3ZM443.87 286.7H439.76V256.3H443.87ZM490.6 280.42Q490.94 280.42 491.19 280.7L492.83 282.46Q490.96 284.62 488.3 285.83Q485.63 287.04 481.86 287.04Q478.59 287.04 475.92 285.9Q473.25 284.77 471.36 282.72Q469.47 280.68 468.43 277.81Q467.39 274.95 467.39 271.51Q467.39 268.07 468.47 265.21Q469.55 262.35 471.52 260.29Q473.48 258.23 476.22 257.1Q478.95 255.96 482.26 255.96Q485.51 255.96 487.99 257Q490.47 258.04 492.36 259.82L491 261.71Q490.87 261.92 490.67 262.06Q490.47 262.2 490.13 262.2Q489.75 262.2 489.2 261.78Q488.65 261.37 487.76 260.86Q486.86 260.35 485.53 259.94Q484.19 259.52 482.24 259.52Q479.89 259.52 477.93 260.34Q475.98 261.16 474.57 262.71Q473.16 264.26 472.38 266.48Q471.59 268.71 471.59 271.51Q471.59 274.35 472.41 276.58Q473.22 278.81 474.63 280.35Q476.05 281.88 477.97 282.69Q479.89 283.5 482.11 283.5Q483.47 283.5 484.56 283.34Q485.66 283.18 486.58 282.84Q487.5 282.5 488.3 281.98Q489.09 281.46 489.88 280.74Q490.24 280.42 490.6 280.42ZM531.36 275.41 526.59 263.05Q526.38 262.49 526.14 261.76Q525.91 261.03 525.7 260.2Q525.25 261.92 524.79 263.07L520.01 275.41ZM539.93 286.7H536.75Q536.2 286.7 535.86 286.42Q535.52 286.15 535.35 285.72L532.51 278.38H518.87L516.02 285.72Q515.9 286.11 515.54 286.4Q515.17 286.7 514.64 286.7H511.46L523.62 256.3H527.78ZM582.9 280.42Q583.24 280.42 583.5 280.7L585.13 282.46Q583.26 284.62 580.6 285.83Q577.94 287.04 574.16 287.04Q570.89 287.04 568.22 285.9Q565.55 284.77 563.66 282.72Q561.77 280.68 560.73 277.81Q559.69 274.95 559.69 271.51Q559.69 268.07 560.77 265.21Q561.86 262.35 563.82 260.29Q565.78 258.23 568.52 257.1Q571.25 255.96 574.56 255.96Q577.81 255.96 580.29 257Q582.77 258.04 584.66 259.82L583.3 261.71Q583.18 261.92 582.98 262.06Q582.77 262.2 582.43 262.2Q582.05 262.2 581.5 261.78Q580.95 261.37 580.06 260.86Q579.17 260.35 577.83 259.94Q576.49 259.52 574.54 259.52Q572.19 259.52 570.24 260.34Q568.28 261.16 566.87 262.71Q565.46 264.26 564.68 266.48Q563.89 268.71 563.89 271.51Q563.89 274.35 564.71 276.58Q565.53 278.81 566.94 280.35Q568.35 281.88 570.27 282.69Q572.19 283.5 574.42 283.5Q575.77 283.5 576.87 283.34Q577.96 283.18 578.88 282.84Q579.8 282.5 580.6 281.98Q581.39 281.46 582.18 280.74Q582.54 280.42 582.9 280.42ZM611.64 286.7H607.52V256.3H611.64ZM665.11 271.51Q665.11 274.93 664.02 277.78Q662.94 280.63 660.97 282.69Q659 284.75 656.23 285.88Q653.46 287.02 650.11 287.02Q646.76 287.02 644 285.88Q641.24 284.75 639.27 282.69Q637.29 280.63 636.21 277.78Q635.13 274.93 635.13 271.51Q635.13 268.1 636.21 265.24Q637.29 262.39 639.27 260.32Q641.24 258.25 644 257.11Q646.76 255.96 650.11 255.96Q653.46 255.96 656.23 257.11Q659 258.25 660.97 260.32Q662.94 262.39 664.02 265.24Q665.11 268.1 665.11 271.51ZM660.88 271.51Q660.88 268.71 660.12 266.48Q659.36 264.26 657.96 262.72Q656.56 261.18 654.56 260.35Q652.57 259.52 650.11 259.52Q647.67 259.52 645.67 260.35Q643.68 261.18 642.27 262.72Q640.86 264.26 640.09 266.48Q639.33 268.71 639.33 271.51Q639.33 274.31 640.09 276.53Q640.86 278.74 642.27 280.28Q643.68 281.82 645.67 282.64Q647.67 283.45 650.11 283.45Q652.57 283.45 654.56 282.64Q656.56 281.82 657.96 280.28Q659.36 278.74 660.12 276.53Q660.88 274.31 660.88 271.51ZM658.17 247.41 651.25 253.48Q650.93 253.78 650.64 253.84Q650.34 253.9 649.92 253.9H647.2L652.1 248.09Q652.46 247.62 652.83 247.52Q653.2 247.41 653.9 247.41ZM713.23 256.3V286.7H711.17Q710.68 286.7 710.36 286.53Q710.03 286.36 709.71 285.96L692.12 263.05Q692.16 263.58 692.19 264.09Q692.21 264.59 692.21 265.04V286.7H688.6V256.3H690.72Q691 256.3 691.19 256.33Q691.38 256.36 691.53 256.44Q691.68 256.51 691.82 256.65Q691.97 256.79 692.14 257L709.73 279.89Q709.69 279.34 709.66 278.82Q709.62 278.3 709.62 277.83V256.3Z"] };
  var ISOTIPO = { viewBox: "0 0 180.54 405.2", paths: ["M103.74 254.95C121.88 253.46 138.75 247.66 150.12 239C161.75 230.14 168.77 221.86 173.83 211.03C184.33 188.56 182.32 160.05 169.02 142.95C158.57 129.51 147.17 122.36 121.9 113.4C117.44 111.81 103.81 107.51 101.99 107.11C101.53 107.01 100.1 106.6 98.82 106.2C97.54 105.8 95.44 105.16 94.15 104.78C92.87 104.4 90.32 103.53 88.49 102.84C86.65 102.15 83.13 100.84 80.65 99.93C68.17 95.36 59.45 89.26 55.51 82.35C51.79 75.84 52.06 63.9 56.09 56.11C58.9 50.69 62.3 47.63 68.65 44.86C78.66 40.48 93.56 40.8 104.19 45.62C114.82 50.44 122.24 60.38 122.24 69.79L122.24 71.28L149.99 71.28C170.61 71.28 177.74 71.23 177.74 71.09C177.74 65.17 174.5 51.61 171.54 45.11C161.56 23.2 144.98 10.41 117.08 3.11C110.01 1.26 106.88 0.87 94.4 0.28C65.02 -1.12 38.73 6.84 22.15 22.14C17.97 26 15.44 28.86 12.37 33.2C11.65 34.21 7.67 41.07 6.86 42.7C4.76 46.92 1.62 58.15 1.16 63.11C0.15 73.96 0.89 85.01 3.16 93C3.99 95.89 6.27 101.74 7.21 103.36C8.29 105.22 11.44 110.02 12.13 110.86C24.01 125.32 34.58 131.6 62.74 140.92C72.11 144.03 76.06 145.25 80.57 146.45C93.27 149.82 107.71 155.2 112.9 158.48C124.08 165.54 128.74 173.03 128.74 183.95C128.74 197.7 120.35 208.54 106.76 212.34C101.32 213.87 97.81 214.33 92.07 214.31C83.81 214.28 80.42 213.76 74.8 211.69C62.84 207.29 53.21 193.75 53.95 182.4L54.04 181.11L27.16 181.11L0.28 181.11L0.18 181.89C-1.19 191.89 5.37 212.15 13.1 221.8C14.92 224.07 19.07 228.89 19.85 229.64C29.05 238.51 38.68 244.27 52.54 249.22C62.2 252.66 74.72 254.96 85.49 255.27C94.52 255.53 97.24 255.48 103.74 254.95Z", "M0 352.1H180.54V405.2H0Z"] };

  // ../consolidado/project/components/marca/Logo.jsx
  var T = "#1E2020";
  var V = "#008C99";
  var B = "#FFFFFF";
  var VARIANTES = { color: [T, V, T], tinta: [T, T, T], verde: [V, T, V], blanco: [B, V, B], "blanco-pleno": [B, B, B] };
  function Logo({ tipo = "completo", variante = "color", alto, titulo, style, ...rest }) {
    const d = tipo === "isotipo" ? ISOTIPO : LOGO;
    const c = VARIANTES[variante] || VARIANTES.color;
    const h = alto != null ? alto : tipo === "isotipo" ? 48 : 40;
    return /* @__PURE__ */ react_default.createElement("svg", { viewBox: d.viewBox, height: h, role: "img", "aria-label": titulo || (tipo === "isotipo" ? "Siles" : "Siles Comunicaci\xF3n"), style: { display: "block", width: "auto", height: h, ...style }, ...rest }, d.paths.map((p, i) => react_default.createElement("path", { key: i, d: p, fill: c[i] })));
  }

  // ../consolidado/project/components/marca/Patron.jsx
  function rng(seed) {
    let s = seed >>> 0 || 1;
    return () => {
      s = s * 1664525 + 1013904223 >>> 0;
      return s / 4294967296;
    };
  }
  function red(seed, cols, rows) {
    const r = rng(seed), n = [];
    for (let y = 0; y <= rows; y++) for (let x = 0; x <= cols; x++) {
      if (r() < 0.28) continue;
      n.push({ x: (x + (r() - 0.5) * 0.7) / cols * 100, y: (y + (r() - 0.5) * 0.7) / rows * 100 });
    }
    const e = [];
    n.forEach((a, i) => {
      const d = n.map((b, j) => ({ j, d: Math.hypot((a.x - b.x) / 100 * cols, (a.y - b.y) / 100 * rows) })).filter((o) => o.j > i && o.d < 1.6).sort((p, q) => p.d - q.d).slice(0, 2);
      d.forEach((o) => e.push([i, o.j]));
    });
    const acento = Math.floor(r() * n.length);
    return { n, e, acento };
  }
  function Patron({ semilla = 7, densidad = 12, tema = "claro", alto = 480, bloque = true, alineacion = "inicio", children, style, className = "" }) {
    const rows = Math.max(3, Math.round(densidad * alto / 1120));
    const { n, e, acento } = react_default.useMemo(() => red(semilla, densidad, rows), [semilla, densidad, rows]);
    const oscuro = tema === "oscuro";
    const linea = oscuro ? "#3A3E3E" : "#BFC3C3", nodo = oscuro ? "#555A5A" : "#8A8F8F";
    return /* @__PURE__ */ react_default.createElement("div", { className: "sl-patron " + className, "data-theme": oscuro ? "dark" : void 0, style: { minHeight: alto, display: "flex", alignItems: "center", justifyContent: alineacion === "centro" ? "center" : "flex-start", padding: "var(--space-12)", ...style } }, /* @__PURE__ */ react_default.createElement("svg", { className: "sl-patron__svg", viewBox: "0 0 100 100", preserveAspectRatio: "none", "aria-hidden": "true" }, e.map(([a, b], i) => /* @__PURE__ */ react_default.createElement("line", { key: i, x1: n[a].x, y1: n[a].y, x2: n[b].x, y2: n[b].y, stroke: linea, strokeWidth: "1", vectorEffect: "non-scaling-stroke" }))), /* @__PURE__ */ react_default.createElement("svg", { className: "sl-patron__svg", "aria-hidden": "true" }, n.map((p, i) => {
      const s = i === acento ? 12 : 5;
      return /* @__PURE__ */ react_default.createElement("rect", { key: i, x: `calc(${p.x}% - ${s / 2}px)`, y: `calc(${p.y}% - ${s / 2}px)`, width: s, height: s, fill: i === acento ? "#00D1B1" : nodo });
    })), children != null && (bloque ? /* @__PURE__ */ react_default.createElement("div", { className: "sl-patron__bloque" }, children) : /* @__PURE__ */ react_default.createElement("div", { style: { position: "relative" } }, children)));
  }

  // ../consolidado/project/components/marca/Franja.jsx
  function Franja({ fondo = "marca", alto = 320, children, style, className = "" }) {
    return /* @__PURE__ */ react_default.createElement("section", { className: ["sl-franja", "sl-franja--" + fondo, className].join(" ").trim(), style: { minHeight: alto, ...style } }, children != null && /* @__PURE__ */ react_default.createElement("div", { className: "sl-franja__bloque", "data-theme": fondo === "profundo" ? "dark" : void 0 }, children));
  }

  // ../consolidado/project/components/marca/Imagen.jsx
  function Imagen({ src, alt = "", tratamiento = "duotono", proporcion = "4 / 5", pie, style, className = "" }) {
    return /* @__PURE__ */ react_default.createElement("figure", { className: ["sl-imagen", "sl-imagen--" + tratamiento, className].join(" ").trim(), style: { margin: 0, ...style } }, /* @__PURE__ */ react_default.createElement("div", { className: "sl-imagen__marco", style: { aspectRatio: proporcion } }, /* @__PURE__ */ react_default.createElement("img", { src, alt })), pie && /* @__PURE__ */ react_default.createElement("figcaption", { className: "sl-nota sl-imagen__pie" }, pie));
  }

  // ../consolidado/project/components/navegacion/Menu.jsx
  function Menu({ disparador, opciones = [], abierto, style }) {
    const [open, setOpen] = react_default.useState(!!abierto);
    const ref = react_default.useRef(null);
    react_default.useEffect(() => {
      const h = (e) => {
        if (ref.current && !ref.current.contains(e.target)) setOpen(false);
      };
      document.addEventListener("mousedown", h);
      return () => document.removeEventListener("mousedown", h);
    }, []);
    return /* @__PURE__ */ react_default.createElement("div", { className: "sl-menu", ref, style }, /* @__PURE__ */ react_default.createElement("span", { onClick: () => setOpen((o) => !o) }, disparador), open && /* @__PURE__ */ react_default.createElement("ul", { className: "sl-menu__lista", role: "menu" }, opciones.map((o, i) => /* @__PURE__ */ react_default.createElement("li", { key: i }, /* @__PURE__ */ react_default.createElement("button", { role: "menuitem", className: "sl-menu__item", onClick: () => {
      setOpen(false);
      o.alElegir && o.alElegir();
    } }, o.icono && /* @__PURE__ */ react_default.createElement(Icono, { nombre: o.icono, tamano: 20 }), o.texto)))));
  }

  // ../consolidado/project/components/navegacion/Pestanas.jsx
  function Pestanas({ pestanas = [], activa, alCambiar, style }) {
    const [int, setInt] = react_default.useState(activa != null ? activa : pestanas[0] && pestanas[0].id);
    const act = activa != null ? activa : int;
    return /* @__PURE__ */ react_default.createElement("div", { role: "tablist", className: "sl-pestanas", style }, pestanas.map((p) => /* @__PURE__ */ react_default.createElement("button", { key: p.id, role: "tab", "aria-selected": p.id === act ? "true" : "false", className: "sl-pestana", onClick: () => {
      setInt(p.id);
      alCambiar && alCambiar(p.id);
    } }, p.texto)));
  }

  // ../consolidado/project/components/retroalimentacion/Aviso.jsx
  var PALABRA2 = { exito: "Listo", alerta: "Atenci\xF3n", error: "Error", info: "Nota" };
  function Aviso({ tipo = "info", estado, children, style }) {
    return /* @__PURE__ */ react_default.createElement("div", { role: tipo === "error" ? "alert" : "status", className: "sl-aviso sl-aviso--" + tipo, style }, /* @__PURE__ */ react_default.createElement("span", { className: "sl-aviso__estado" }, estado != null ? estado : PALABRA2[tipo]), /* @__PURE__ */ react_default.createElement("span", { className: "sl-aviso__texto" }, children));
  }

  // ../consolidado/project/components/retroalimentacion/Ayuda.jsx
  function Ayuda({ texto, children, style }) {
    return /* @__PURE__ */ react_default.createElement("span", { className: "sl-ayuda", style }, children, /* @__PURE__ */ react_default.createElement("span", { role: "tooltip", className: "sl-ayuda__burbuja" }, texto));
  }

  // ../consolidado/project/components/retroalimentacion/Dialogo.jsx
  function Dialogo({ abierto = true, titulo, children, acciones, alCerrar, enLinea, style }) {
    if (!abierto) return null;
    const caja = /* @__PURE__ */ react_default.createElement("div", { role: "dialog", "aria-modal": enLinea ? void 0 : "true", "aria-label": titulo, className: "sl-dialogo", style, onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ react_default.createElement("div", { className: "sl-dialogo__cabecera" }, /* @__PURE__ */ react_default.createElement("h2", { className: "sl-titulo-3", style: { margin: 0 } }, titulo), alCerrar && /* @__PURE__ */ react_default.createElement(BotonIcono, { icono: "cerrar", etiqueta: "Cerrar", tamano: "sm", onClick: alCerrar })), /* @__PURE__ */ react_default.createElement("div", { className: "sl-dialogo__cuerpo" }, children), acciones && /* @__PURE__ */ react_default.createElement("div", { className: "sl-dialogo__pie" }, acciones));
    return enLinea ? caja : /* @__PURE__ */ react_default.createElement("div", { className: "sl-dialogo-fondo", onClick: alCerrar }, caja);
  }

  // ../consolidado/project/components/retroalimentacion/Notificacion.jsx
  var PALABRA3 = { exito: "Listo", alerta: "Atenci\xF3n", error: "Error" };
  function Notificacion({ tipo = "exito", estado, children, accion, style }) {
    return /* @__PURE__ */ react_default.createElement("div", { role: "status", className: "sl-notificacion sl-notificacion--" + tipo, style }, /* @__PURE__ */ react_default.createElement("span", { className: "sl-notificacion__estado" }, estado != null ? estado : PALABRA3[tipo]), /* @__PURE__ */ react_default.createElement("span", { style: { flex: 1 } }, children), accion);
  }

  // ../consolidado/project/components/piezas/HeroWeb.jsx
  function HeroWeb({ antetitulo, titulo, bajada, acciones, visual, fondo = "marca", style }) {
    const oscuro = fondo === "profundo";
    return /* @__PURE__ */ react_default.createElement("section", { className: "sl-hero sl-hero--" + fondo, style }, /* @__PURE__ */ react_default.createElement("div", { className: "sl-hero__grid" }, /* @__PURE__ */ react_default.createElement("div", { className: "sl-hero__bloque", "data-theme": oscuro ? "dark" : void 0 }, /* @__PURE__ */ react_default.createElement(Titulo, { nivel: 1, tamano: "display", antetitulo, bajada }, titulo), acciones && /* @__PURE__ */ react_default.createElement("div", { className: "sl-hero__acciones" }, acciones)), visual && /* @__PURE__ */ react_default.createElement("div", { className: "sl-hero__visual" }, visual)));
  }

  // ../consolidado/project/components/piezas/Diapositiva.jsx
  function Diapositiva({ tema = "claro", numero, titulo, pie, children, style }) {
    return /* @__PURE__ */ react_default.createElement("div", { className: "sl-diapositiva sl-diapositiva--" + tema, style, "data-theme": tema === "oscuro" ? "dark" : void 0 }, /* @__PURE__ */ react_default.createElement("div", { className: "sl-diapositiva__bloque" }, /* @__PURE__ */ react_default.createElement("div", { className: "sl-diapositiva__contenido" }, titulo && /* @__PURE__ */ react_default.createElement("h2", { className: "sl-titulo-1 sl-titulo", style: { margin: 0 } }, titulo), children), /* @__PURE__ */ react_default.createElement("div", { className: "sl-diapositiva__pie" }, /* @__PURE__ */ react_default.createElement(Logo, { tipo: "completo", variante: tema === "oscuro" ? "blanco" : "color", alto: 18 }), /* @__PURE__ */ react_default.createElement("span", { className: "sl-etiqueta" }, pie), numero && /* @__PURE__ */ react_default.createElement("span", { className: "sl-etiqueta" }, numero))));
  }

  // ../consolidado/project/components/piezas/PublicacionRedes.jsx
  function PublicacionRedes({ formato = "cuadrado", fondo = "verde", titulo, texto, firma, style }) {
    return /* @__PURE__ */ react_default.createElement(
      "div",
      {
        className: ["sl-publicacion", "sl-publicacion--" + fondo, formato === "historia" ? "sl-publicacion--historia" : ""].join(" ").trim(),
        style,
        "data-theme": fondo === "tinta" ? "dark" : void 0
      },
      /* @__PURE__ */ react_default.createElement("div", { className: "sl-publicacion__bloque" }, /* @__PURE__ */ react_default.createElement("h2", { className: "sl-titulo-2 sl-titulo", style: { margin: 0 } }, titulo), texto && /* @__PURE__ */ react_default.createElement("p", { className: "sl-cuerpo-ui" }, texto), /* @__PURE__ */ react_default.createElement("div", { className: "sl-publicacion__pie" }, /* @__PURE__ */ react_default.createElement(Logo, { tipo: "isotipo", variante: "color", alto: 34 }), firma && /* @__PURE__ */ react_default.createElement("span", { className: "sl-etiqueta" }, firma)))
    );
  }

  // ../consolidado/project/components/piezas/TarjetaPresentacion.jsx
  function TarjetaPresentacion({ lado = "frente", nombre, cargo, contacto = [], style }) {
    if (lado === "reverso") {
      return /* @__PURE__ */ react_default.createElement("div", { className: "sl-tarjeta-presentacion sl-tarjeta-presentacion--reverso", style }, /* @__PURE__ */ react_default.createElement(Logo, { tipo: "completo", variante: "blanco", alto: 38 }));
    }
    return /* @__PURE__ */ react_default.createElement("div", { className: "sl-tarjeta-presentacion", style }, /* @__PURE__ */ react_default.createElement("div", null, /* @__PURE__ */ react_default.createElement("div", { className: "sl-tp__nombre" }, nombre), /* @__PURE__ */ react_default.createElement("div", { className: "sl-etiqueta sl-tp__cargo" }, cargo), /* @__PURE__ */ react_default.createElement("div", { className: "sl-tp__bajo" })), /* @__PURE__ */ react_default.createElement("ul", { className: "sl-tp__contacto" }, contacto.map((c, i) => /* @__PURE__ */ react_default.createElement("li", { key: i }, c))));
  }

  // ../consolidado/project/components/aplicaciones/Panel.jsx
  function Panel({ navegacion = [], titulo, acciones, children, style }) {
    return /* @__PURE__ */ react_default.createElement("div", { className: "sl-panel", style }, /* @__PURE__ */ react_default.createElement("aside", { className: "sl-panel__lateral" }, /* @__PURE__ */ react_default.createElement(Logo, { tipo: "isotipo", variante: "blanco", alto: 32 }), /* @__PURE__ */ react_default.createElement("nav", { className: "sl-panel__nav" }, navegacion.map((n, i) => /* @__PURE__ */ react_default.createElement("a", { key: i, href: n.href || "#", className: "sl-panel__link" + (n.activo ? " sl-panel__link--activo" : ""), "aria-current": n.activo ? "page" : void 0 }, n.icono && /* @__PURE__ */ react_default.createElement(Icono, { nombre: n.icono, tamano: 18 }), n.texto)))), /* @__PURE__ */ react_default.createElement("div", { className: "sl-panel__principal" }, /* @__PURE__ */ react_default.createElement("header", { className: "sl-panel__cabecera" }, /* @__PURE__ */ react_default.createElement("h2", { className: "sl-titulo-2", style: { margin: 0 } }, titulo), acciones && /* @__PURE__ */ react_default.createElement("div", null, acciones)), /* @__PURE__ */ react_default.createElement("div", { className: "sl-panel__contenido" }, children)));
  }

  // ../consolidado/project/components/aplicaciones/Metrica.jsx
  function Metrica({ etiqueta, valor, cambio, direccion = "sube", nota, style }) {
    return /* @__PURE__ */ react_default.createElement("div", { className: "sl-metrica", style }, /* @__PURE__ */ react_default.createElement("span", { className: "sl-etiqueta", style: { color: "var(--texto-suave)" } }, etiqueta), /* @__PURE__ */ react_default.createElement("span", { className: "sl-metrica__valor" }, valor), cambio && /* @__PURE__ */ react_default.createElement("span", { className: "sl-metrica__cambio sl-metrica__cambio--" + direccion }, direccion === "sube" ? "Sube" : "Baja", " ", cambio), nota && /* @__PURE__ */ react_default.createElement("span", { className: "sl-nota" }, nota));
  }

  // ../consolidado/project/components/aplicaciones/Tabla.jsx
  function Tabla({ columnas = [], filas = [], pie, style }) {
    return /* @__PURE__ */ react_default.createElement("div", { style: { overflowX: "auto", ...style } }, /* @__PURE__ */ react_default.createElement("table", { className: "sl-tabla" }, /* @__PURE__ */ react_default.createElement("thead", null, /* @__PURE__ */ react_default.createElement("tr", null, columnas.map((c) => /* @__PURE__ */ react_default.createElement("th", { key: c.clave, className: c.num ? "num" : void 0 }, c.texto)))), /* @__PURE__ */ react_default.createElement("tbody", null, filas.map((f, i) => /* @__PURE__ */ react_default.createElement("tr", { key: i }, columnas.map((c) => /* @__PURE__ */ react_default.createElement("td", { key: c.clave, className: c.num ? "num" : void 0 }, c.celda ? c.celda(f) : f[c.clave]))))), pie && /* @__PURE__ */ react_default.createElement("tfoot", null, pie)));
  }

  // ../consolidado/project/components/contenido/Pasos.jsx
  function Pasos({ pasos = [], orientacion = "horizontal", activo, style }) {
    return /* @__PURE__ */ react_default.createElement("ol", { className: "sl-pasos sl-pasos--" + orientacion, style }, pasos.map((p, i) => /* @__PURE__ */ react_default.createElement("li", { key: i, className: "sl-paso" + (i === activo ? " sl-paso--activo" : "") }, /* @__PURE__ */ react_default.createElement("span", { className: "sl-paso__marca" }, String(i + 1).padStart(2, "0")), p.etiqueta && /* @__PURE__ */ react_default.createElement("span", { className: "sl-etiqueta", style: { color: "var(--texto-suave)" } }, p.etiqueta), /* @__PURE__ */ react_default.createElement("h3", { className: "sl-titulo-3", style: { margin: 0 } }, p.titulo), p.texto && /* @__PURE__ */ react_default.createElement("p", { className: "sl-cuerpo", style: { color: "var(--texto-suave)", margin: 0 } }, p.texto))));
  }
  return __toCommonJS(entry_exports);
})();
