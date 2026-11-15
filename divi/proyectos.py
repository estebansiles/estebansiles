"""Contenido de los proyectos del portafolio.

Sale de las plantillas por proyecto que tenía el Theme Builder del sitio actual (staging3, noviembre 2026).
Los textos se conservan; solo se corrigieron erratas. Las imágenes son las de la biblioteca de medios.
"""

U = "/wp-content/uploads"

PROYECTOS = [
    {
        "id": 1869,
        "slug": "sitio-web-para-doctor",
        "titulo": "Sitio web para doctor",
        "sector": "Salud",
        "tipo": "Diseño web",
        "anio": "2021",
        "url": "https://www.drvargaskelsh.com/",
        "bajada": "Un sitio de marca personal con una landing page para la cirugía de pterigión, pensado para conseguir citas.",
        "cliente": "Dr. Gabriel Vargas Kelsh, oftalmólogo costarricense",
        "servicios": ["Desarrollo de sitio web para marca personal", "Copywriting", "Diseño UX"],
        "creditos": ["Branding: Level", "Fotografía: David Durán", "Video: From Tiquicia Films"],
        "captura": f"{U}/2023/08/Sitio-web-para-Doctor-Gabriel-Vargas-Kelsh.png",
        "reto": [
            "El doctor Vargas Kelsh enfrentaba dificultades para llegar a un público más amplio. Su capacidad para informar a los pacientes sobre sus servicios y experiencia estaba limitada principalmente a consultas personales y referencias de boca a boca.",
            "Esto limitaba su alcance y dificultaba que los pacientes potenciales conocieran su experiencia y las soluciones que podía ofrecer para problemas oculares y su especialidad, la operación de pterigión.",
        ],
        "solucion": [
            "Con la creación de su sitio web, el doctor pudo superar sus desafíos de comunicación de manera efectiva. El sitio, junto con una estrategia de contenidos consistente, le permitió obtener alcance más allá de su ámbito local.",
            "Ahora puede llegar a pacientes potenciales en todo el mundo, lo que aumenta significativamente su posibilidad de ayudar mediante información detallada y contenido de valor.",
        ],
        "entregable": "Sitio web y landing page de pterigión",
        "entregable_texto": [
            "La tarea original era crear un sitio web que permitiera conseguir citas con el doctor. Posteriormente, el proyecto requirió agregar una landing page exclusiva para la cirugía de pterigión, su servicio principal.",
            "Uno de los retos más grandes fue unir un sitio de marca personal con un sitio informativo acerca de los servicios profesionales. Esto derivó en una landing page principal y una secundaria para un servicio específico.",
        ],
        "incluyo": ["Desarrollo en WordPress con Divi", "Dos landing pages adaptables a cualquier pantalla", "Información de servicios",
                    "Horarios y lugares de atención", "Información de contacto", "Agenda de citas"],
        "galeria": [f"{U}/2023/08/Landing-Page-Pterigion-scaled.jpg", f"{U}/2023/08/Diseno-Sitio-Web-de-Doctor.jpg"],
    },
    {
        "id": 2670,
        "slug": "landing-page-para-empresa-agroindustrial",
        "titulo": "Landing page para empresa agroindustrial",
        "sector": "Agroindustria",
        "tipo": "Experiencia de usuario",
        "anio": "2024",
        "url": "https://www.earthcropcr.com/",
        "bajada": "Una landing page que explica con claridad los servicios de comercio internacional de EarthCrop.",
        "cliente": "EarthCrop",
        "servicios": ["Dirección de proyecto", "Copywriting", "Mock-ups"],
        "creditos": ["Branding: Uniko", "Gestión: Esteban Siles", "Desarrollo: Emanuel Borbón"],
        "captura": f"{U}/2024/03/Sitio-web-para-Empresa-de-Logistica.png",
        "reto": [
            "En el competitivo mundo del comercio internacional de productos agroindustriales, EarthCrop enfrentaba el desafío de destacar y comunicar la complejidad y el valor único de sus servicios.",
            "La industria requiere no solo presentar productos, sino explicar procesos, certificaciones y logística, aspectos fundamentales para construir confianza con clientes potenciales.",
        ],
        "solucion": [
            "Una landing page centrada en desglosar y presentar sus servicios de manera clara y atractiva, que muestra cómo la empresa facilita soluciones integrales en el comercio internacional agroindustrial.",
            "Se usaron visuales, testimonios, casos de estudio y explicaciones simplificadas, junto con una estrategia SEO para mejorar la visibilidad y convertir visitas en relaciones comerciales.",
        ],
        "entregable": "Landing page de servicios",
        "entregable_texto": [
            "Una página diseñada para el comercio internacional agroindustrial, con navegación intuitiva e información clave presentada de forma visual.",
            "Incorpora testimonios, infografías y llamados a la acción que guían a los visitantes por las soluciones de EarthCrop.",
        ],
        "incluyo": ["Dirección del proyecto", "Copywriting", "Mock-ups", "Estrategia SEO"],
        "galeria": [f"{U}/2024/03/Earthcrop-Diseno-Web-1-scaled.webp"],
    },
    {
        "id": 1921,
        "slug": "landing-page-para-empresa-de-logistica",
        "titulo": "Landing page para empresa de logística internacional",
        "sector": "Comercio",
        "tipo": "Diseño web",
        "anio": "2021",
        "url": "https://www.globalchemicalgroup.com/",
        "bajada": "La primera presencia en línea de Global Chemical Group, pensada para que la encuentren en buscadores.",
        "cliente": "Global Chemical Group",
        "servicios": ["Gestión de proyecto", "Desarrollo en WordPress", "Diseño web", "Copywriting"],
        "creditos": ["Branding: Uniko", "Desarrollo: Emanuel Borbón"],
        "captura": f"{U}/2023/09/Global-Chemical-Group.png",
        "reto": [
            "Una empresa de logística que asesora a otras empresas necesitaba una landing page para posicionarse en las búsquedas y mostrar sus servicios a clientes potenciales.",
            "Sin sitio web, dependía del boca a boca entre profesionales del gremio para generar credibilidad y confianza, y necesitaba los motores de búsqueda para tener alcance global.",
        ],
        "solucion": [
            "Un sitio que atrae clientes potenciales con información sobre sus servicios, su experiencia y sus capacidades. Con optimización para buscadores llega a un público más amplio y aumenta el conocimiento de la marca.",
            "Es el primer paso de su presencia en línea; a mediano plazo se prevé un sitio transaccional para dar seguimiento a pedidos, pedir cotizaciones y contactar al servicio al cliente.",
        ],
        "entregable": "Diseño de landing page",
        "entregable_texto": [
            "Global Chemical Group es una empresa de soluciones logísticas: transporte, almacenamiento, distribución y gestión de inventarios.",
        ],
        "incluyo": ["Prototipo en Figma", "Diseño web", "Copywriting", "Traducción con WPML", "Configuración SEO con Yoast"],
        "galeria": [f"{U}/2023/09/Inicio-Global-Chemical-Group.pdf-scaled.jpg"],
    },
    {
        "id": 2653,
        "slug": "tienda-en-linea-para-los-toros-del-norte",
        "titulo": "Tienda en línea para los Toros del Norte",
        "sector": "Comercio",
        "tipo": "Comercio electrónico",
        "anio": "2018",
        "url": "https://www.torosdelnorte.com",
        "bajada": "El sitio oficial del equipo, con tienda de mercancía, como parte del relanzamiento de su marca.",
        "cliente": "Asociación Deportiva San Carlos",
        "servicios": ["Dirección del desarrollo de comercio electrónico", "Coordinación de la estrategia de relanzamiento de marca"],
        "creditos": ["Dirección ejecutiva: Roberto Siles", "Dirección creativa: Eduardo Arce", "Diseño: Eduardo Arce y Kevin Arias",
                     "Desarrollo: Kevin Arias y Arjun Kushwah"],
        "captura": f"{U}/2022/01/Toros-del-Norte.png",
        "reto": [
            "La renovación de marca de los Toros del Norte implicaba posicionar al equipo en el mundo digital sin un sitio web oficial.",
            "Había que crear una presencia en línea desde cero que sirviera de carta de presentación y permitiera vender sus productos, en un mercado competitivo y con una afición cada vez más cerca del comercio electrónico.",
        ],
        "solucion": [
            "Lideré el desarrollo de una plataforma de comercio electrónico que refleja los valores y la nueva imagen del equipo, con una compra fluida de mercancía oficial para la afición.",
            "El lanzamiento incluyó campañas de marketing digital para generar tráfico y ventas desde el primer día.",
        ],
        "entregable": "Sitio web con tienda en línea",
        "entregable_texto": [
            "El sitio es la piedra angular de la presencia digital del equipo: noticias, calendario de partidos, perfiles de jugadores y la tienda oficial.",
        ],
        "incluyo": ["Interfaz pensada para la afición", "Tienda en línea con pago seguro y envíos",
                    "Noticias, galerías y videos", "SEO, redes sociales y correo para el lanzamiento"],
        "galeria": [f"{U}/2024/03/Caso-de-Exito-Toros-Del-Norte-scaled.webp"],
    },
]
