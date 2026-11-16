#!/usr/bin/env python3
"""Genera los diseños de Divi 4 del sitio de Siles a partir del prototipo (sitio-web/app.js).

Uso, desde la raíz del repositorio:  python3 divi/generar.py
Escribe en divi/:
  encabezado.json, pie.json   Para importar en el Theme Builder (Portabilidad › Importar) dentro de cada plantilla.
  paginas/<slug>.txt          Contenido de cada página en shortcodes de Divi; publicar.py lo sube por la API REST.

Las rutas a recursos son relativas a la raíz del sitio (/wp-content/themes/...) para que sirvan igual en staging y en producción.
"""
import json
import os

VERSION = "4.27.9"
TEMA = "/wp-content/themes/divi-child-siles/assets"
MENU_PRINCIPAL = "579983389"  # "Principal Siles", creado en el staging por la API
CORREO = "contact@siles.cr"
WHATSAPP = "8865 9046"
WHATSAPP_URL = "https://wa.me/50688659046"

AQUI = os.path.dirname(os.path.abspath(__file__))


# ---------- Piezas de shortcode ----------

def attrs(d):
    partes = []
    for k, v in d.items():
        if v is None or v == "":
            continue
        v = str(v).replace('"', "%22").replace("[", "%91").replace("]", "%93")
        partes.append(f'{k}="{v}"')
    return " ".join(partes)


def sc(nombre, contenido="", **a):
    a.setdefault("_builder_version", VERSION)
    return f"[{nombre} {attrs(a)}]{contenido}[/{nombre}]"


def seccion(*filas, clase="", **a):
    return sc("et_pb_section", "".join(filas), fb_built="1", module_class=clase, **a)


def fila(estructura, *columnas, clase="", **a):
    return sc("et_pb_row", "".join(columnas), column_structure=estructura, module_class=clase, **a)


def columna(tipo, *modulos, clase="", **a):
    return sc("et_pb_column", "".join(modulos), type=tipo, module_class=clase, **a)


def texto(html, clase="", **a):
    return sc("et_pb_text", html, module_class=clase, **a)


def boton(textob, url, clase="", **a):
    return sc("et_pb_button", "", button_url=url, button_text=textob, module_class=clase, **a)


def imagen(src, alt, url="", clase="", **a):
    return sc("et_pb_image", "", src=src, alt=alt, title_text=alt, url=url, module_class=clase, **a)


def anuncio(titulo, cuerpo, icono, url="", antetitulo="", clase="siles-tarjeta siles-revela"):
    html = (f'<p class="siles-antetitulo">{antetitulo}</p>' if antetitulo else "") + f"<p>{cuerpo}</p>"
    return sc("et_pb_blurb", html, title=titulo, url=url, image=f"{TEMA}/iconos/{icono}.svg", alt=titulo,
              icon_placement="top", image_max_width="40px", text_orientation="left", animation="off", module_class=clase)


def icono(nombre, tamano=24):
    return f'[siles_icono nombre="{nombre}" tamano="{tamano}"]'


def antetitulo(t):
    return f'<p class="siles-antetitulo">{t}</p>'


# ---------- Encabezado y pie (Theme Builder) ----------

def encabezado():
    return seccion(
        fila("1_4,1_2,1_4",
             columna("1_4", imagen(f"{TEMA}/marca/logo-color.svg", "Siles Comunicación, inicio", url="/", clase="siles-logo")),
             columna("1_2", sc("et_pb_menu", "", menu_id=MENU_PRINCIPAL, menu_style="left_aligned",
                                 submenu_direction="downwards", fullwidth_menu="off",
                                 background_color="rgba(0,0,0,0)", active_link_color="#1E2020")),
             columna("1_4", boton("Agendá una llamada", "/contacto/", clase="siles-boton--secundario siles-boton--sm")),
             clase="siles-cabecera"),
        custom_padding="0px||0px||false|false", sticky_position="top", admin_label="Encabezado Siles",
    )


def pie():
    sitio = [("Servicios", "/servicios/"), ("Proyectos", "/portafolio/"), ("Blog", "/blog/"),
             ("Cotización", "/cotizacion/"), ("Contacto", "/contacto/")]
    return seccion(
        fila("1_2,1_4,1_4",
             columna("1_2",
                     imagen(f"{TEMA}/marca/logo-blanco.svg", "Siles Comunicación", url="/", clase="siles-logo"),
                     texto('<p style="max-width: 36ch; color: var(--texto-suave)">Todo se puede transformar digitalmente, no hay excusas.</p>')),
             columna("1_4", texto(
                 antetitulo("Contacto")
                 + f'<p>{icono("correo", 20)}<a href="mailto:{CORREO}">{CORREO}</a></p>'
                 + f'<p>{icono("mensaje", 20)}<a href="{WHATSAPP_URL}" target="_blank" rel="noopener">WhatsApp {WHATSAPP}</a></p>'
                 + f'<p>{icono("ubicacion", 20)}San José, Costa Rica</p>', clase="siles-lista")),
             columna("1_4", texto(
                 antetitulo("Sitio") + "".join(f'<p><a href="{u}">{t}</a></p>' for t, u in sitio), clase="siles-lista"))),
        fila("4_4", columna("4_4", texto(
            '<p>© 2026 Siles Comunicación</p><p><a href="/politica-de-privacidad/">Privacidad</a><a href="/terminos-y-condiciones/">Términos y condiciones</a></p>',
            clase="siles-pie-legal"))),
        clase="siles-oscuro", custom_padding="64px||32px||false|false", admin_label="Pie Siles",
    )


# ---------- Páginas ----------

SERVICIOS = [
    ("transformacion-digital", "Transformación digital", "Ordeno tus procesos y elijo con vos las herramientas que sí vas a usar."),
    ("automatizacion", "Automatización", "Casi todo se puede automatizar. Empiezo por lo que más tiempo te quita."),
    ("marketing", "Marketing digital", "Estrategia, contenido y medición para que cada colón invertido rinda."),
    ("experiencia-usuario", "Experiencia de usuario", "Diseño sitios y aplicaciones pensando en quien los usa."),
    ("factura-electronica", "Factura electrónica", "Integro la facturación con tu contabilidad y tu sistema de ventas."),
    ("agente-ia", "Agentes de IA", "Asistentes que responden, agendan y dan seguimiento por vos."),
]
PROCESO = [
    ("investigar", "Investigo", "Entiendo tu negocio y a tus clientes."),
    ("planear", "Planeo", "Defino prioridades, costos y plazos."),
    ("desarrollo", "Implemento", "Construyo y conecto las herramientas."),
    ("mejorar", "Mejoro", "Mido resultados y ajusto."),
]
TEMAS = ["Transformación digital", "Automatización", "Agentes de IA", "Factura electrónica 4.4",
         "Integración SINPE Móvil", "Firma digital", "Ley 8968", "Experiencia de usuario"]


def franja_cierre(titulo, bajada, textob, url):
    return seccion(
        fila("4_4", columna("4_4",
                            texto(f"<h2>{titulo}</h2>", clase="siles-firma siles-titulo-1"),
                            texto(f"<p>{bajada}</p>", clase="siles-subtitulo siles-medida"),
                            boton(textob, url, clase="siles-boton--flecha"),
                            clase="siles-bloque siles-revela")),
        clase="siles-franja",
    )


def inicio():
    portada = seccion(
        fila("4_4", columna("4_4",
                            texto(antetitulo("Comunicación estratégica"), clase="siles-entra"),
                            texto("<h1>Todo se puede transformar</h1>", clase="siles-firma siles-display siles-entra siles-retraso-1"),
                            texto("<p>Hola, soy Esteban. Me dedico a la comunicación estratégica y a la transformación digital. No hay excusas.</p>",
                                  clase="siles-subtitulo siles-entra siles-retraso-2"),
                            boton("Agendá una llamada", "/contacto/", clase="siles-boton--flecha siles-entra siles-retraso-3"),
                            boton("Escribime por WhatsApp", WHATSAPP_URL, url_new_window="on", clase="siles-boton--secundario siles-boton--mensaje siles-entra siles-retraso-3"),
                            clase="siles-bloque siles-botones")),
        clase="siles-portada", background_image=f"{TEMA}/marca/patron-11.svg", background_size="cover",
        admin_label="Portada",
    )
    items = "".join(f"<span>{t}</span>" for t in TEMAS + TEMAS)
    cinta = seccion(
        fila("4_4", columna("4_4", sc("et_pb_code", f'<div class="siles-cinta" aria-hidden="true"><div class="siles-cinta__pista">{items}</div></div>')),
             clase="siles-fila-completa"),
        custom_padding="0px||0px||false|false", admin_label="Cinta de temas",
    )
    tarjetas = [anuncio(t, c, i, url="/servicios/") for i, t, c in SERVICIOS]
    servicios = seccion(
        fila("3_5,2_5",
             columna("3_5", texto(antetitulo("Servicios") + "<h2>Lo que hago</h2>", clase="siles-firma siles-revela")),
             columna("2_5", texto("<p>Te acompaño desde la estrategia hasta la implementación.</p>", clase="siles-cuerpo-lg siles-revela")),
             clase="siles-fila-abajo"),
        fila("1_3,1_3,1_3", *[columna("1_3", t) for t in tarjetas[:3]], make_equal="on"),
        fila("1_3,1_3,1_3", *[columna("1_3", t) for t in tarjetas[3:]], make_equal="on"),
        admin_label="Servicios",
    )
    pasos = [texto(f'<div class="siles-paso-cabeza"><span class="siles-antetitulo">Paso {n}</span>{icono(i, 32)}</div>'
                   f'<h3>{t}</h3><p style="color: var(--texto-suave)">{c}</p>', clase="siles-traza siles-revela")
             for n, (i, t, c) in enumerate(PROCESO, 1)]
    proceso = seccion(
        fila("4_4", columna("4_4", texto(antetitulo("Proceso") + "<h2>Cómo trabajo</h2>", clase="siles-firma siles-revela"))),
        fila("1_4,1_4,1_4,1_4", *[columna("1_4", p) for p in pasos]),
        clase="siles-alterna", admin_label="Proceso",
    )
    cierre = franja_cierre("Casi todo se puede automatizar",
                           "Una llamada de 30 minutos basta para encontrar el primer proceso que podés automatizar.",
                           "Agendá una llamada", "/contacto/")
    return portada + cinta + servicios + proceso + cierre


def contacto():
    opciones = [{"value": t, "checked": 0, "dragID": n} for n, (_, t, _) in enumerate(SERVICIOS)]
    consentimiento = [{"value": "Acepto que Siles Comunicación use estos datos solo para responderme, según la Ley 8968.", "checked": 0, "dragID": 0}]
    campos = "".join([
        sc("et_pb_contact_field", "", field_id="nombre", field_title="Nombre", field_type="input", fullwidth_field="off", required_mark="on"),
        sc("et_pb_contact_field", "", field_id="correo", field_title="Correo", field_type="email", fullwidth_field="off", required_mark="on"),
        sc("et_pb_contact_field", "", field_id="empresa", field_title="Empresa (opcional)", field_type="input", fullwidth_field="on", required_mark="off"),
        sc("et_pb_contact_field", "", field_id="interes", field_title="¿Qué te interesa?", field_type="select",
           select_options=json.dumps(opciones, ensure_ascii=False, separators=(",", ":")), fullwidth_field="on", required_mark="off"),
        sc("et_pb_contact_field", "", field_id="proyecto", field_title="Contame tu proyecto", field_type="text", fullwidth_field="on", required_mark="off"),
        sc("et_pb_contact_field", "", field_id="consentimiento", field_title="Consentimiento", field_type="checkbox",
           checkbox_options=json.dumps(consentimiento, ensure_ascii=False, separators=(",", ":")), fullwidth_field="on", required_mark="on"),
    ])
    formulario = sc("et_pb_contact_form", campos, email=CORREO, title="", captcha="on",
                    submit_button_text="Enviá tu mensaje",
                    success_message="Recibí tu mensaje. Te respondo en menos de 24 horas.",
                    module_id="formulario", module_class="siles-entra siles-retraso-4")
    filas = (f'<a href="mailto:{CORREO}">{icono("correo")}{CORREO}</a>'
             f'<a href="{WHATSAPP_URL}" target="_blank" rel="noopener">{icono("mensaje")}WhatsApp: {WHATSAPP}</a>'
             f'<a href="/conversemos/">{icono("calendario")}Agendá una llamada de 30 minutos</a>'
             f'<span class="siles-fila">{icono("ubicacion")}San José, Costa Rica</span>')
    return seccion(
        fila("2_5,3_5",
             columna("2_5",
                     texto(antetitulo("Contacto"), clase="siles-entra"),
                     texto("<h1>Hablemos</h1>", clase="siles-firma siles-entra siles-retraso-1"),
                     texto("<p>Contame qué querés transformar. Te respondo en menos de 24 horas.</p>", clase="siles-subtitulo siles-entra siles-retraso-2"),
                     texto(filas, clase="siles-filas siles-entra siles-retraso-3")),
             columna("3_5", formulario)),
        admin_label="Contacto",
    )


# ---------- Términos y condiciones ----------

def pagina_legal(T):

    def bloque(b):
        if isinstance(b, list):
            items = []
            for i in b:
                etiqueta, _, resto = i.partition(": ")
                items.append(f"<li><strong>{etiqueta}:</strong> {resto}</li>" if resto else f"<li>{i}</li>")
            return '<ul class="siles-legal__lista">' + "".join(items) + "</ul>"
        return f"<p>{b}</p>"

    datos = "".join(f"<div><dt>{k}</dt><dd>{v}</dd></div>" for k, v in T["datos"])
    cuerpo = f'<p class="siles-legal__intro">{T["intro"]}</p>' + "".join(
        f"<h2>{titulo}</h2>" + "".join(bloque(b) for b in bloques) for titulo, bloques in T["secciones"])
    return seccion(
        fila("4_4", columna("4_4",
                            texto(antetitulo("Legal"), clase="siles-entra"),
                            texto(f"<h1>{T['titulo']}</h1>", clase="siles-firma siles-entra siles-retraso-1"),
                            texto(f'<dl class="siles-legal__datos">{datos}</dl>', clase="siles-entra siles-retraso-2"),
                            texto(cuerpo, clase="siles-lectura siles-legal siles-entra siles-retraso-3")),
             clase="siles-fila-angosta"),
        admin_label=T["titulo"],
    )


def terminos():
    from legales import TERMINOS
    return pagina_legal(TERMINOS)


def privacidad():
    from legales import PRIVACIDAD
    return pagina_legal(PRIVACIDAD)


# ---------- Conversemos (agenda) ----------

AGENDA_GOOGLE = ("https://calendar.google.com/calendar/appointments/schedules/"
                 "AcZssZ3eUg16uQIP1KHTJMEyckMF69E27mp1vaxvPcb1a10RtqBnVaNmhOwffirPnZYJaH1ObUAmbO8P?gv=true")


def conversemos():
    agenda = ('<!-- Google Calendar Appointment Scheduling begin -->'
              f'<iframe src="{AGENDA_GOOGLE}" title="Agenda de llamadas con Esteban Siles" style="border: 0;" width="100%" height="1200" frameborder="0" loading="lazy"></iframe>'
              '<!-- end Google Calendar Appointment Scheduling -->')
    temas = ["Qué hace tu negocio hoy y qué querés transformar", "El primer proceso que conviene digitalizar o automatizar",
             "Los siguientes pasos, por fases y a tu ritmo"]
    pasos = [("1", "Elegí un espacio", "Escogé el día y la hora que te queden mejor en la agenda."),
             ("2", "Confirmá tus datos", "Google Calendar te envía la confirmación por correo."),
             ("3", "Conversamos", "30 minutos para entender tu caso y proponerte un primer paso.")]
    otros = (f'<a href="https://wa.me/50688659046" target="_blank" rel="noopener">{icono("mensaje")}WhatsApp: {WHATSAPP}</a>'
             f'<a href="mailto:{CORREO}">{icono("correo")}{CORREO}</a>'
             f'<a href="/contacto/#formulario">{icono("calendario")}Prefiero escribir un mensaje</a>')
    return seccion(
        fila("4_4", columna("4_4",
                            texto(antetitulo("Agenda"), clase="siles-entra"),
                            texto("<h1>Conversemos</h1>", clase="siles-firma siles-entra siles-retraso-1"),
                            texto("<p>Agendá una llamada de 30 minutos. Elegí el espacio que mejor te quede y te llega la confirmación por correo.</p>",
                                  clase="siles-subtitulo siles-medida siles-entra siles-retraso-2"))),
        fila("1_3,2_3",
             columna("1_3",
                     texto(antetitulo("En la llamada vemos") + lista_checks(temas), clase="siles-entra siles-retraso-3"),
                     texto(antetitulo("Cómo funciona") + '<ol class="siles-pasos siles-pasos--vertical">' + "".join(
                         f'<li class="siles-paso"><span class="siles-paso__marca">{n}</span><h3>{t}</h3><p>{c}</p></li>' for n, t, c in pasos) + "</ol>",
                         clase="siles-entra siles-retraso-3"),
                     texto(antetitulo("¿Ningún horario te sirve?") + otros, clase="siles-filas siles-entra siles-retraso-4"),
                     texto('<p>Al agendar, Google Calendar procesa tus datos según su propia política de privacidad. '
                           'Yo los uso solo para coordinar la llamada, según la Ley 8968. <a href="/politica-de-privacidad/">Política de privacidad</a>.</p>',
                           clase="siles-nota siles-entra siles-retraso-4")),
             columna("2_3", sc("et_pb_code", agenda, module_class="siles-agenda siles-papel siles-entra siles-retraso-2"))),
        admin_label="Conversemos",
    )


# ---------- Proyectos ----------

SECTORES_IDS = "579983390,579983391,579983392"  # categorías de proyecto Salud, Agroindustria y Comercio


def lista_checks(items):
    return '<ul class="siles-checks">' + "".join(f"<li>{icono('check')}{i}</li>" for i in items) + "</ul>"


def parrafos(ps, estilo=""):
    return "".join(f'<p{estilo}>{p}</p>' for p in ps)


def ficha(p):
    filas = [("Cliente", p["cliente"], False), ("Año", p["anio"], False), ("Sector", p["sector"], False),
             ("Tipo", p["tipo"], False), ("Servicios", ", ".join(p["servicios"]), True), ("Créditos", "<br>".join(p["creditos"]), True)]
    dl = "".join(('<div class="siles-ficha__ancho">' if ancho else "<div>") + f"<dt>{k}</dt><dd>{v}</dd></div>" for k, v, ancho in filas)
    return texto(f"<dl>{dl}</dl>", clase="siles-ficha siles-entra siles-retraso-3")


def proyecto(p):
    """Contenido de un proyecto (va en la entrada; la plantilla del Theme Builder solo la envuelve)."""
    migas = ('<nav class="siles-migas" aria-label="Migas de pan"><a href="/">Inicio</a><span aria-hidden="true">/</span>'
             f'<a href="/portafolio/">Proyectos</a><span aria-hidden="true">/</span><span aria-current="page">{p["titulo"]}</span></nav>')
    cabecera = seccion(
        fila("4_4", columna("4_4", texto(migas, clase="siles-entra"))),
        fila("3_5,2_5",
             columna("3_5",
                     texto(f'<p class="siles-antetitulo siles-con-estado">{p["sector"]} · {p["tipo"]} <span class="siles-estado siles-estado--exito">En producción</span></p>',
                           clase="siles-entra siles-retraso-1"),
                     texto(f"<h1>{p['titulo']}</h1>", clase="siles-firma siles-entra siles-retraso-1"),
                     texto(f"<p>{p['bajada']}</p>", clase="siles-subtitulo siles-medida siles-entra siles-retraso-2"),
                     boton("Visitá el sitio", p["url"], url_new_window="on", clase="siles-boton--externo siles-entra siles-retraso-3"),
                     boton("Quiero algo así", "/contacto/", clase="siles-boton--secundario siles-entra siles-retraso-3"),
                     clase="siles-botones"),
             columna("2_5", ficha(p))),
        fila("4_4", columna("4_4", imagen(p["captura"], f"Captura del proyecto {p['titulo']}", clase="siles-captura siles-entra siles-retraso-4", animation="off"))),
        admin_label="Cabecera del proyecto",
    )
    caso = seccion(
        fila("4_4", columna("4_4", texto(antetitulo("El caso") + "<h2>Del reto a la solución</h2>", clase="siles-firma siles-revela"))),
        fila("1_2,1_2",
             columna("1_2", texto(f'<div class="siles-paso-cabeza"><span class="siles-antetitulo">Reto</span>{icono("investigar", 32)}</div>'
                                  + parrafos(p["reto"], ' style="color: var(--texto-suave)"'), clase="siles-traza siles-revela")),
             columna("1_2", texto(f'<div class="siles-paso-cabeza"><span class="siles-antetitulo">Solución</span>{icono("desarrollo", 32)}</div>'
                                  + parrafos(p["solucion"], ' style="color: var(--texto-suave)"'), clase="siles-traza siles-revela"))),
        clase="siles-alterna", admin_label="El caso",
    )
    alcance = seccion(
        fila("1_2,1_2",
             columna("1_2",
                     texto(antetitulo("Entregable principal") + f"<h2>{p['entregable']}</h2>", clase="siles-firma siles-revela"),
                     texto(parrafos(p["entregable_texto"]), clase="siles-cuerpo-lg siles-revela"),
                     texto(antetitulo("Lo que incluyó") + lista_checks(p["incluyo"]), clase="siles-revela")),
             columna("1_2", *[imagen(g, f"Vista del proyecto {p['titulo']}", clase="siles-papel siles-revela", animation="off") for g in p["galeria"]])),
        admin_label="Entregable",
    )
    return cabecera + caso + alcance


def plantilla_proyecto():
    """Cuerpo del Theme Builder para todos los proyectos: el contenido de la entrada, otros proyectos y el cierre."""
    contenido = seccion(
        fila("4_4", columna("4_4", sc("et_pb_post_content", "")), clase="siles-fila-completa"),
        custom_padding="0px||0px||false|false", admin_label="Contenido del proyecto",
    )
    otros = seccion(
        fila("4_4", columna("4_4",
                            texto(antetitulo("Otros proyectos"), clase="siles-revela"),
                            sc("et_pb_post_nav", "", in_same_term="off", prev_text="%title", next_text="%title",
                               module_class="siles-otros siles-revela"),
                            texto('<p><a class="siles-enlace" href="/portafolio/">Mirá todos los proyectos</a></p>', clase="siles-revela"))),
        admin_label="Otros proyectos",
    )
    cierre = franja_cierre("Tu proyecto puede ser el siguiente", "Contame qué querés transformar y armamos el plan por fases.",
                           "Pedí una cotización", "/cotizacion/")
    return contenido + otros + cierre


def plantilla_proyectos():
    """Cuerpo del Theme Builder para el archivo /portafolio/."""
    d = next(p for p in __import__("proyectos").PROYECTOS if p["slug"] == "sitio-web-para-doctor")
    cabecera = seccion(
        fila("4_4", columna("4_4",
                            texto(antetitulo("Portafolio"), clase="siles-entra"),
                            texto("<h1>Proyectos</h1>", clase="siles-firma siles-entra siles-retraso-1"),
                            texto("<p>Lo que ya transformé con pymes y empresas de Costa Rica. Cada caso cuenta el reto, lo que hice y el resultado.</p>",
                                  clase="siles-subtitulo siles-medida siles-entra siles-retraso-2"))),
        fila("2_5,3_5",
             columna("2_5", imagen(d["captura"], "Captura del sitio web para doctor", url=f"/portafolio/{d['slug']}/", animation="off"),
                     clase="siles-destacado__imagen", background_image=f"{TEMA}/marca/patron-5.svg", background_size="cover"),
             columna("3_5",
                     texto('<p class="siles-antetitulo siles-con-estado">Caso destacado <span class="siles-estado siles-estado--exito">En producción</span></p>'),
                     texto(f"<h2>{d['titulo']}</h2>"),
                     texto(f"<p>{d['bajada']}</p>", clase="siles-cuerpo-lg siles-medida"),
                     texto('<div class="siles-trio">'
                           '<div class="siles-traza"><p class="siles-antetitulo">Reto</p><p>Llegar a pacientes más allá del boca a boca.</p></div>'
                           '<div class="siles-traza"><p class="siles-antetitulo">Solución</p><p>Sitio de marca personal y landing page de pterigión.</p></div>'
                           '<div class="siles-traza"><p class="siles-antetitulo">Resultado</p><p>Alcance más allá de su ámbito local.</p></div></div>'),
                     texto(f'<p><a class="siles-enlace" href="/portafolio/{d["slug"]}/">Mirá el caso completo</a></p>'),
                     clase="siles-destacado__texto"),
             clase="siles-destacado siles-papel siles-entra siles-retraso-3"),
        admin_label="Cabecera y destacado",
    )
    todos = seccion(
        fila("4_4", columna("4_4", texto(antetitulo("Por sector") + "<h2>Todos los proyectos</h2>", clase="siles-firma siles-revela"))),
        fila("4_4", columna("4_4", sc("et_pb_filterable_portfolio", "", fullwidth="off", posts_number="12",
                                      include_categories=SECTORES_IDS, show_title="on", show_categories="on",
                                      show_pagination="off", module_class="siles-portafolio"))),
        clase="siles-alterna", admin_label="Todos los proyectos",
    )
    cierre = franja_cierre("Tu proyecto puede ser el siguiente", "Contame qué querés transformar y armamos el plan por fases.",
                           "Pedí una cotización", "/cotizacion/")
    return cabecera + todos + cierre


# ---------- Servicios ----------

DETALLE = [
    ("automatizacion", "Automatización", "automatizacion",
     "Reviso tus tareas repetitivas y las convierto en flujos que corren solos: aprobaciones, recordatorios, reportes y conciliaciones.",
     ["Mapa de procesos y priorización", "Integración entre sistemas existentes", "Capacitación para tu equipo"], "4 a 8 semanas"),
    ("marketing", "Marketing digital", "marketing",
     "Defino con vos a quién le hablás, qué le decís y cómo medir si funciona. Sin campañas que nadie revisa.",
     ["Estrategia y calendario de contenido", "Pauta en redes y buscadores", "Tablero de resultados mensual"], "Mensual"),
    ("ux", "Experiencia de usuario", "experiencia-usuario",
     "Investigo cómo usan tus clientes el sitio o la aplicación y rediseño lo que les estorba.",
     ["Entrevistas y pruebas con usuarios", "Prototipos navegables", "Guía de diseño para desarrollo"], "6 a 10 semanas"),
]
FASES = [("Fase 1", "Diagnóstico", "Reviso procesos y datos, y priorizo con vos."),
         ("Fase 2", "Diseño", "Defino la solución, los costos y los plazos."),
         ("Fase 3", "Implementación", "Construyo, conecto y capacito a tu equipo.")]


def servicios():
    pestanas = "".join(
        sc("et_pb_tab",
           f'<div class="siles-servicio"><div class="siles-servicio__principal">{icono(ic, 48)}<h2>{titulo}</h2><p>{txt}</p>{lista_checks(puntos)}</div>'
           f'<aside class="siles-servicio__lateral"><p class="siles-antetitulo">Plazo</p><span class="siles-servicio__plazo">{plazo}</span>'
           f'<p class="siles-antetitulo">Disponibilidad</p><span><span class="siles-estado siles-estado--exito">Abierta</span></span>'
           f'<a class="siles-boton siles-boton--flecha siles-boton--bloque" href="/cotizacion/">Pedí una cotización</a></aside></div>',
           title=titulo)
        for _, titulo, ic, txt, puntos, plazo in DETALLE)
    cabecera = seccion(
        fila("4_4", columna("4_4",
                            texto(antetitulo("Servicios"), clase="siles-entra"),
                            texto("<h1>Servicios</h1>", clase="siles-firma siles-entra siles-retraso-1"),
                            texto("<p>Elegí por dónde empezar. Todo se puede combinar.</p>", clase="siles-subtitulo siles-medida siles-entra siles-retraso-2"),
                            sc("et_pb_tabs", pestanas, module_class="siles-pestanas siles-entra siles-retraso-3"))),
        admin_label="Servicios",
    )
    pasos = "".join(f'<li class="siles-paso{" siles-paso--activo" if n == 1 else ""}"><span class="siles-paso__marca">{n}</span>'
                    f'<span class="siles-antetitulo">{e}</span><h3>{t}</h3><p>{c}</p></li>' for n, (e, t, c) in enumerate(FASES, 1))
    metodo = seccion(
        fila("3_5,2_5",
             columna("3_5", texto(antetitulo("Método") + "<h2>Por fases, sin saltos al vacío</h2>", clase="siles-firma siles-revela")),
             columna("2_5", texto("<p>Cada fase entrega algo que ya podés usar, y decidís si seguimos con la siguiente.</p>", clase="siles-cuerpo-lg siles-revela")),
             clase="siles-fila-abajo"),
        fila("4_4", columna("4_4", texto(f'<ol class="siles-pasos">{pasos}</ol>', clase="siles-revela"))),
        clase="siles-alterna", admin_label="Método",
    )
    cierre = seccion(
        fila("2_3,1_3",
             columna("2_3",
                     texto("<h2>¿No sabés por dónde empezar?</h2>", clase="siles-firma siles-revela"),
                     texto("<p>Contame qué hacés hoy y te digo cuál es el primer paso.</p>", clase="siles-subtitulo siles-medida siles-revela")),
             columna("1_3", texto('<p><a class="siles-enlace" href="/contacto/">Hablemos</a></p>', clase="siles-revela")),
             clase="siles-fila-abajo"),
        admin_label="Cierre",
    )
    return cabecera + metodo + cierre


# ---------- Cotización ----------

CONDICIONES = [("factura-electronica", "Factura electrónica", "Cada pago lleva su comprobante, con el IVA del 13 % en fila aparte."),
               ("pagos", "Pago por fases", "La mitad al iniciar y la otra mitad contra entrega, por transferencia o SINPE Móvil."),
               ("firma-digital", "Firma digital", "Aprobás la propuesta con firma digital certificada, sin imprimir nada.")]


def cotizacion():
    principal = seccion(
        fila("4_4", columna("4_4",
                            texto("<h1>Cotización</h1>", clase="siles-firma siles-entra"),
                            texto("[siles_cotizador]", clase="siles-entra siles-retraso-1"))),
        admin_label="Cotizador",
    )
    condiciones = seccion(
        fila("4_4", columna("4_4", texto(antetitulo("Condiciones") + "<h2>Claro desde el inicio</h2>", clase="siles-firma siles-revela"))),
        fila("1_3,1_3,1_3", *[columna("1_3", texto(f'{icono(i, 40)}<h3 style="margin-top: var(--space-3)">{t}</h3><p style="color: var(--texto-suave)">{c}</p>',
                                                   clase="siles-traza siles-revela")) for i, t, c in CONDICIONES]),
        clase="siles-alterna", admin_label="Condiciones",
    )
    return principal + condiciones


# ---------- Blog ----------

CATEGORIAS_BLOG = [("Estrategia digital", "estrategia-digital"), ("Investigación", "investigacion"), ("Ideas sueltas", "ideas-sueltas"),
                   ("Entrevistas", "entrevista"), ("Marketing político", "marketing-politico")]


def boletin():
    consentimiento = [{"value": "Acepto recibir el boletín por correo, según la Ley 8968. Me puedo dar de baja cuando quiera.", "checked": 0, "dragID": 0}]
    campos = (sc("et_pb_contact_field", "", field_id="correo", field_title="Correo", field_type="email", fullwidth_field="on", required_mark="on")
              + sc("et_pb_contact_field", "", field_id="consentimiento", field_title="Consentimiento", field_type="checkbox",
                   checkbox_options=json.dumps(consentimiento, ensure_ascii=False, separators=(",", ":")), fullwidth_field="on", required_mark="on"))
    formulario = sc("et_pb_contact_form", campos, email=CORREO, title="", captcha="off", submit_button_text="Suscribite",
                    success_message="Quedaste en la lista. Te escribo cuando publique algo nuevo.",
                    custom_message="Suscripción al boletín: %%correo%%", module_class="siles-revela")
    return seccion(
        fila("1_2,1_2",
             columna("1_2", texto(antetitulo("Boletín") + "<h2>Recibí lo nuevo por correo</h2>", clase="siles-firma siles-revela"),
                     texto("<p>Un correo cuando publico algo que vale la pena. Te das de baja cuando querás.</p>", clase="siles-revela", custom_css_main_element="color: var(--texto-suave);")),
             columna("1_2", formulario)),
        admin_label="Boletín",
    )


def plantilla_blog():
    """Cuerpo del Theme Builder para /blog/ y las categorías: usa el listado de la página actual."""
    fichas = '<nav class="siles-fichas" aria-label="Temas"><a href="/blog/">Todos</a>' + "".join(
        f'<a href="/category/{s}/">{n}</a>' for n, s in CATEGORIAS_BLOG) + "</nav>"
    cabecera = seccion(
        fila("4_4", columna("4_4",
                            texto(antetitulo("Blog"), clase="siles-entra"),
                            texto("<h1>Ideas para transformar tu negocio</h1>", clase="siles-firma siles-entra siles-retraso-1"),
                            texto("<p>Escribo corto y al grano sobre estrategia digital, investigación, marketing y lo que voy aprendiendo en el camino.</p>",
                                  clase="siles-subtitulo siles-medida siles-entra siles-retraso-2"),
                            texto(fichas, clase="siles-entra siles-retraso-3"))),
        admin_label="Cabecera del blog",
    )
    listado = seccion(
        fila("4_4", columna("4_4", sc("et_pb_blog", "", fullwidth="off", posts_number="9", use_current_loop="on", show_thumbnail="on",
                                      show_content="off", show_more="on", show_author="off", show_date="on", show_categories="on",
                                      show_comments="off", show_excerpt="on", excerpt_length="160", show_pagination="on",
                                      use_manual_excerpt="on", module_class="siles-blog"))),
        clase="siles-alterna", admin_label="Artículos",
    )
    return cabecera + listado + boletin()


def plantilla_articulo():
    """Cuerpo del Theme Builder para cada entrada del blog."""
    articulo = seccion(
        fila("4_4", columna("4_4",
                            texto('<p><a class="siles-enlace siles-enlace--volver" href="/blog/">Volvé al blog</a></p>'),
                            sc("et_pb_post_title", "", title="on", meta="on", author="off", date="on", categories="on", comments="off",
                               featured_image="on", featured_placement="below", module_class="siles-articulo"),
                            sc("et_pb_post_content", "", module_class="siles-lectura"),
                            texto('<p>¿Querés aplicar esto en tu negocio? Lo vemos en una llamada de 30 minutos.</p>'
                                  '<a class="siles-boton siles-boton--flecha" href="/contacto/">Agendá una llamada</a>', clase="siles-llamado")),
             clase="siles-fila-angosta"),
        admin_label="Artículo",
    )
    return articulo + boletin()


# ---------- Salida ----------

def exportar_layout(nombre, shortcode):
    datos = {"context": "et_builder", "data": {"1": shortcode}, "presets": {}, "global_colors": [], "images": [], "thumbnails": []}
    with open(os.path.join(AQUI, nombre), "w", encoding="utf-8") as f:
        json.dump(datos, f, ensure_ascii=False)


def guardar_pagina(slug, shortcode):
    os.makedirs(os.path.join(AQUI, "paginas"), exist_ok=True)
    with open(os.path.join(AQUI, "paginas", slug + ".txt"), "w", encoding="utf-8") as f:
        f.write(shortcode)


if __name__ == "__main__":
    exportar_layout("encabezado.json", encabezado())
    exportar_layout("pie.json", pie())
    guardar_pagina("inicio", inicio())
    guardar_pagina("contacto", contacto())
    guardar_pagina("servicios", servicios())
    guardar_pagina("conversemos", conversemos())
    guardar_pagina("terminos", terminos())
    guardar_pagina("privacidad", privacidad())
    guardar_pagina("cotizacion", cotizacion())
    exportar_layout("blog.json", plantilla_blog())
    exportar_layout("articulo.json", plantilla_articulo())
    exportar_layout("proyecto.json", plantilla_proyecto())
    exportar_layout("proyectos.json", plantilla_proyectos())
    import proyectos
    for p in proyectos.PROYECTOS:
        guardar_pagina("proyecto-" + p["slug"], proyecto(p))
    print("Listo: encabezado, pie, inicio, contacto, plantillas de proyectos y", len(proyectos.PROYECTOS), "proyectos")
