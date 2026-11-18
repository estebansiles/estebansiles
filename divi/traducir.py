#!/usr/bin/env python3
"""Traducciones a mano del sitio: extrae los textos del contenido en español, aplica las traducciones y las sube a WPML.

Archivos:
  divi/traducciones/es/<id>-<nombre>.json         Original descargado de la API del tema (siles/v1/contenido).
  divi/traducciones/textos/<id>-<nombre>.json     Textos por traducir: lista de {"es", "en", "pt-br", "fr"} y los datos
                                                  de la página (título, slug y SEO) por idioma.

Uso:
  python3 divi/traducir.py extraer [nombre…]       Crea o completa los archivos de textos (no borra traducciones hechas).
  python3 divi/traducir.py revisar [nombre…]       Lista lo que falta traducir.
  python3 divi/traducir.py aplicar <nombre> <idioma> Escribe el contenido traducido en divi/traducciones/salida/.
  python3 divi/traducir.py subir <base> <nombre> <idioma|todos>
                                                  Sube la traducción a WPML (la API agrega la autenticación del entorno).
"""
import glob
import json
import os
import re
import sys
import urllib.parse
import urllib.request

AQUI = os.path.dirname(os.path.abspath(__file__))
DIR = os.path.join(AQUI, "traducciones")
IDIOMAS = ["en", "pt-br", "fr"]

# Rutas del sitio en cada idioma (sin la carpeta del idioma). Lo que no esté acá conserva su ruta.
RUTAS = {
    "/": {"en": "/", "pt-br": "/", "fr": "/"},
    "/servicios/": {"en": "/services/", "pt-br": "/servicos/", "fr": "/services/"},
    "/cotizacion/": {"en": "/quote/", "pt-br": "/orcamento/", "fr": "/devis/"},
    "/contacto/": {"en": "/contact/", "pt-br": "/contato/", "fr": "/contact/"},
    "/conversemos/": {"en": "/lets-talk/", "pt-br": "/vamos-conversar/", "fr": "/parlons/"},
    "/terminos-y-condiciones/": {"en": "/terms-and-conditions/", "pt-br": "/termos-e-condicoes/", "fr": "/conditions-generales/"},
    "/politica-de-privacidad/": {"en": "/privacy-policy/", "pt-br": "/politica-de-privacidade/", "fr": "/politique-de-confidentialite/"},
    "/opt-out/": {"en": "/opt-out/", "pt-br": "/opt-out/", "fr": "/opt-out/"},
    "/esteban/": {"en": "/esteban/", "pt-br": "/esteban/", "fr": "/esteban/"},
    "/portafolio/": {"en": "/portafolio/", "pt-br": "/portafolio/", "fr": "/portafolio/"},
}
# El blog queda en español: sus enlaces no llevan carpeta de idioma.
SIN_TRADUCIR = ("/blog/", "/category/", "/wp-content/")

ATRIBUTOS_DIVI = ("button_text", "button_one_text", "button_two_text", "alt", "title_text", "title", "field_title",
                  "submit_button_text", "success_message", "placeholder")
ATRIBUTOS_OPCIONES = ("select_options", "checkbox_options", "radio_options")
ATRIBUTOS_HTML = ("alt", "title", "aria-label", "placeholder")
BLOQUES = r"p|h[1-6]|li|ul|ol|div|figure|figcaption|blockquote|dl|dt|dd|table|thead|tbody|tr|td|th|nav|section|article|header|footer|label|button|form|fieldset|legend|select|option|br|hr|img|iframe|input|textarea"
CORTE = re.compile(
    r"(<script\b.*?</script>|<style\b.*?</style>|<svg\b.*?</svg>"     # bloques que no se traducen
    r"|\[/?[a-z_]+(?:\s[^\]]*)?\]"                                    # shortcodes
    r"|</?(?:" + BLOQUES + r")\b[^>]*>"                               # etiquetas de bloque
    r"|\|\|et_pb_line_break_holder\|\||<!--.*?-->)", re.S | re.I)


def tiene_texto(s):
    limpio = re.sub(r"<[^>]+>|&[a-z#0-9]+;|%[a-z]+%", " ", s)
    return re.search(r"[A-Za-zÁÉÍÓÚÑáéíóúñ]{2,}", limpio) is not None


def decodificar(v):
    return v.replace("%22", '"').replace("%91", "[").replace("%93", "]")


def codificar(v):
    return v.replace('"', "%22").replace("[", "%91").replace("]", "%93")


def recorrer(contenido, traducir):
    """Recorre el contenido y llama traducir(texto) en cada texto visible. Devuelve el contenido con los reemplazos."""
    def atributos_divi(m):
        etiqueta = m.group(0)

        def attr(a):
            nombre, valor = a.group(1), a.group(2)
            if nombre in ATRIBUTOS_DIVI and tiene_texto(valor):
                return f'{nombre}="{traducir(valor)}"'
            if nombre in ATRIBUTOS_OPCIONES and valor:
                try:
                    opciones = json.loads(decodificar(valor))
                except ValueError:
                    return a.group(0)
                for o in opciones:
                    if isinstance(o, dict) and tiene_texto(o.get("value", "")):
                        o["value"] = traducir(o["value"])
                return f'{nombre}="{codificar(json.dumps(opciones, ensure_ascii=False, separators=(",", ":")))}"'
            return a.group(0)
        return re.sub(r'\b(\w+)="([^"]*)"', attr, etiqueta)

    def atributos_html(m):
        def attr(a):
            if tiene_texto(a.group(2)):
                return f'{a.group(1)}="{traducir(a.group(2))}"'
            return a.group(0)
        return re.sub(r'\b(' + "|".join(ATRIBUTOS_HTML) + r')="([^"]*)"', attr, m.group(0))

    partes = CORTE.split(contenido)
    salida = []
    for i, parte in enumerate(partes):
        if i % 2 == 1:  # separador
            if parte.startswith("["):
                salida.append(atributos_divi(re.match(r".*", parte, re.S)))
            elif parte.startswith("<") and not re.match(r"<(script|style|svg|!--)", parte, re.I):
                salida.append(atributos_html(re.match(r".*", parte, re.S)))
            else:
                salida.append(parte)
            continue
        if not tiene_texto(parte):
            salida.append(parte)
            continue
        inicio = len(parte) - len(parte.lstrip())
        fin = len(parte.rstrip())
        nucleo = parte[inicio:fin]
        # Atributos de etiquetas en línea (enlaces con title o aria-label) dentro del texto.
        salida.append(parte[:inicio] + traducir(nucleo) + parte[fin:])
    return "".join(salida)


def enlaces(contenido, idioma):
    """Cambia las rutas internas a las del idioma: /servicios/ pasa a /en/services/."""
    def cambiar(m):
        comillas, url = m.group(1), m.group(2)
        ruta = re.sub(r"^https?://(?:www\.)?(?:staging\d*\.)?siles\.cr", "", url)
        if not ruta.startswith("/") or ruta.startswith(SIN_TRADUCIR) or ruta.startswith("//"):
            return m.group(0)
        base, _, resto = ruta.partition("#")
        destino = None
        for es, trad in RUTAS.items():
            if base == es:
                destino = trad[idioma]
            elif es != "/" and base.startswith(es):
                destino = trad[idioma] + base[len(es):]
            if destino:
                break
        if not destino:
            return m.group(0)
        nueva = f"/{idioma}{destino}" + (f"#{resto}" if resto else "")
        return f"{comillas}{nueva}{comillas}"
    return re.sub(r'(")(/[^"\s]*|https?://(?:www\.)?(?:staging\d*\.)?siles\.cr/[^"\s]*)\1', cambiar, contenido)


def archivos(nombres):
    todos = sorted(glob.glob(os.path.join(DIR, "es", "*.json")))
    if not nombres:
        return todos
    return [f for f in todos if any(os.path.basename(f)[:-5].split("-", 1)[1] == n or os.path.basename(f).startswith(n + "-") for n in nombres)]


def ruta_textos(original):
    return os.path.join(DIR, "textos", os.path.basename(original))


def extraer(nombres):
    os.makedirs(os.path.join(DIR, "textos"), exist_ok=True)
    for f in archivos(nombres):
        orig = json.load(open(f, encoding="utf-8"))
        vistos = []
        recorrer(orig["contenido"], lambda t: (vistos.append(t) if t not in vistos else None) or t)
        destino = ruta_textos(f)
        previo = json.load(open(destino, encoding="utf-8")) if os.path.exists(destino) else {"pagina": {}, "textos": []}
        hechos = {t["es"]: t for t in previo["textos"]}
        textos = [hechos.get(t, {"es": t, **{i: "" for i in IDIOMAS}}) for t in vistos]
        pagina = previo.get("pagina") or {}
        for campo, valor in (("titulo", orig["titulo"]), ("slug", orig["slug"]),
                             ("yoast_titulo", orig["yoast"]["titulo"]), ("yoast_descripcion", orig["yoast"]["descripcion"])):
            pagina.setdefault(campo, {"es": valor, **{i: "" for i in IDIOMAS}})
            pagina[campo]["es"] = valor
        json.dump({"pagina": pagina, "textos": textos}, open(destino, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        print(f"{os.path.basename(f)}: {len(textos)} textos, {sum(len(t['es'].split()) for t in textos)} palabras")


def faltantes(datos, idioma):
    falta = [t["es"] for t in datos["textos"] if not t.get(idioma)]
    falta += [f"(página) {k}" for k, v in datos["pagina"].items() if v.get("es") and not v.get(idioma)]
    return falta


def revisar(nombres):
    for f in archivos(nombres):
        datos = json.load(open(ruta_textos(f), encoding="utf-8"))
        print(os.path.basename(f), {i: len(faltantes(datos, i)) for i in IDIOMAS})


def palabras(frase):
    """Manifiesto animado: una palabra por <span>; lo que va después de "|" lleva el acento."""
    normal, _, acento = frase.partition("|")
    salida, i = [], 0
    for grupo, clase in ((normal, "p"), (acento, "p p--acento")):
        for palabra in grupo.split():
            salida.append(f'<span class="{clase}" style="--i: {i}">{palabra}</span>')
            i += 1
    return " ".join(salida)


def construir(f, idioma):
    orig = json.load(open(f, encoding="utf-8"))
    datos = json.load(open(ruta_textos(f), encoding="utf-8"))
    falta = faltantes(datos, idioma)
    if falta:
        raise SystemExit(f"Faltan {len(falta)} traducciones al {idioma} en {os.path.basename(f)}: {falta[:3]}")
    tabla = {}
    errores = []
    for t in datos["textos"]:
        trad = t[idioma]
        if trad.startswith("@palabras:"):
            trad = palabras(trad[len("@palabras:"):])
        elif sorted(re.findall(r"<[^>]+>", t["es"])) != sorted(re.findall(r"<[^>]+>", trad)):
            errores.append(t["es"][:80])
        tabla[t["es"]] = trad
    if errores:
        raise SystemExit(f"Las etiquetas no coinciden en {len(errores)} textos al {idioma} de {os.path.basename(f)}: {errores[:3]}")
    contenido = recorrer(orig["contenido"], lambda t: tabla[t])
    contenido = enlaces(contenido, idioma)
    if "calendar.google.com" in contenido:
        hl = {"en": "en", "pt-br": "pt-BR", "fr": "fr"}[idioma]
        contenido = re.sub(r"(calendar\.google\.com/calendar/appointments/schedules/[^\"\s?]+\?gv=true)(?:&amp;hl=[\w-]+|&hl=[\w-]+)?",
                           rf"\1&hl={hl}", contenido)
    pagina = {k: v[idioma] for k, v in datos["pagina"].items()}
    return orig, contenido, pagina


def aplicar(nombre, idioma):
    for f in archivos([nombre]):
        orig, contenido, pagina = construir(f, idioma)
        os.makedirs(os.path.join(DIR, "salida"), exist_ok=True)
        salida = os.path.join(DIR, "salida", f"{os.path.basename(f)[:-5]}.{idioma}.txt")
        open(salida, "w", encoding="utf-8").write(contenido)
        restos = [t for t in re.findall(r"[A-Za-zÁÉÍÓÚÑáéíóúñ]+", re.sub(r"\[[^\]]*\]|<[^>]+>", " ", contenido)) if t in ("Agendá", "querés", "vos", "Contame", "Escribime")]
        print(salida, pagina.get("titulo"), "| voseo restante:", restos[:5])


def subir(base, nombre, idiomas):
    for f in archivos([nombre]):
        for idioma in idiomas:
            orig, contenido, pagina = construir(f, idioma)
            cuerpo = {"original": orig["id"], "idioma": idioma, "titulo": pagina["titulo"], "contenido": contenido,
                      "slug": pagina.get("slug") or orig["slug"]}
            if pagina.get("yoast_titulo"):
                cuerpo["yoast_titulo"] = pagina["yoast_titulo"]
            if pagina.get("yoast_descripcion"):
                cuerpo["yoast_descripcion"] = pagina["yoast_descripcion"]
            terminos = os.path.join(DIR, "terminos.json")
            if orig["terminos"] and os.path.exists(terminos):
                mapa = json.load(open(terminos, encoding="utf-8"))
                cuerpo["terminos"] = {tax: [mapa[tax][str(t)][idioma] for t in ids if str(t) in mapa.get(tax, {})]
                                      for tax, ids in orig["terminos"].items()}
            req = urllib.request.Request(base.rstrip("/") + "/wp-json/siles/v1/traduccion", data=json.dumps(cuerpo).encode(),
                                         method="POST", headers={"Content-Type": "application/json", "User-Agent": "siles-divi-publicar"})
            with urllib.request.urlopen(req) as r:
                res = json.load(r)
            print(f"{os.path.basename(f)} {idioma}: id {res['id']} {res['enlace']}")


def llenar(nombre, parche):
    """Carga traducciones desde un JSON {"pagina": {campo: [en, pt-br, fr]}, "textos": {indice: [en, pt-br, fr]}}."""
    for f in archivos([nombre]):
        destino = ruta_textos(f)
        datos = json.load(open(destino, encoding="utf-8"))
        p = json.load(open(parche, encoding="utf-8"))
        for campo, trads in p.get("pagina", {}).items():
            datos["pagina"].setdefault(campo, {"es": ""})
            datos["pagina"][campo].update(dict(zip(IDIOMAS, trads)))
        for indice, trads in p.get("textos", {}).items():
            datos["textos"][int(indice)].update(dict(zip(IDIOMAS, trads)))
        json.dump(datos, open(destino, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        print(os.path.basename(destino), {i: len(faltantes(datos, i)) for i in IDIOMAS})


if __name__ == "__main__":
    accion, args = sys.argv[1], sys.argv[2:]
    if accion == "extraer":
        extraer(args)
    elif accion == "revisar":
        revisar(args)
    elif accion == "aplicar":
        aplicar(args[0], args[1])
    elif accion == "llenar":
        llenar(args[0], args[1])
    elif accion == "subir":
        subir(args[0], args[1], IDIOMAS if args[2] == "todos" else [args[2]])
