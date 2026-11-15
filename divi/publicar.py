#!/usr/bin/env python3
"""Sube las páginas de divi/paginas/ al WordPress por la API REST, con el constructor de Divi activo.

Uso:  python3 divi/publicar.py https://staging3.siles.cr inicio contacto
La autenticación (contraseña de aplicación) la agrega el entorno; este script no maneja credenciales.
Si la página ya existe (mismo slug), la actualiza; si no, la crea publicada.
"""
import json
import os
import sys
import urllib.request

AQUI = os.path.dirname(os.path.abspath(__file__))
# slug en divi/paginas/ -> (slug en WordPress, título)
PAGINAS = {
    "inicio": ("inicio-nuevo", "Inicio"),
    "contacto": ("contacto", "Contacto"),
}


def api(base, metodo, ruta, datos=None):
    cuerpo = json.dumps(datos).encode() if datos is not None else None
    req = urllib.request.Request(base + "/wp-json/wp/v2" + ruta, data=cuerpo, method=metodo,
                                 headers={"Content-Type": "application/json", "User-Agent": "siles-divi-publicar"})
    with urllib.request.urlopen(req) as r:
        return json.load(r)


def main():
    base = sys.argv[1].rstrip("/")
    for clave in sys.argv[2:]:
        slug, titulo = PAGINAS[clave]
        with open(os.path.join(AQUI, "paginas", clave + ".txt"), encoding="utf-8") as f:
            contenido = f.read()
        datos = {"title": titulo, "slug": slug, "status": "publish", "content": contenido,
                 "meta": {"_et_pb_use_builder": "on", "_et_pb_old_content": ""}}
        existentes = api(base, "GET", f"/pages?slug={slug}&status=publish,draft,private&context=edit&_fields=id")
        if existentes:
            p = api(base, "POST", f"/pages/{existentes[0]['id']}", datos)
            accion = "actualizada"
        else:
            p = api(base, "POST", "/pages", datos)
            accion = "creada"
        print(f"{clave}: {accion} id={p['id']} {p['link']}")


if __name__ == "__main__":
    main()
