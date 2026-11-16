"""Contenido de "Sobre mí" (/esteban/).

Sale de la página de Inicio anterior (id 1809, en borrador en el staging). Se conserva el texto; cambios:
mayúsculas a la forma de oración del sistema de diseño, "a su disposición" pasa a voseo ("a tu disposición"),
en los testimonios se corrigieron solo las erratas "Equio" (Equipo) y "plastisina" (plastilina) y los rangos de años usan raya con espacios.
"""

U = "/wp-content/uploads"

INTRO = {
    "antetitulo": "Sobre mí",
    "titulo": "Hola, soy Esteban",
    "bajada": "Consultor en comunicación estratégica. Apoyo a equipos a gestionar procesos de transformación digital centrada en el usuario.",
    "foto": f"{U}/2025/10/Esteban-Siles-2025-Comunicacion-Estrategica.jpg",
}

BIO = [
    'Por más de quince años me he dedicado a la comunicación estratégica. He trabajado marketing y relaciones públicas apoyado en medios digitales para organizaciones como '
    '<a href="http://www.prosic.ucr.ac.cr/" target="_blank" rel="noopener">PROSIC</a>, <a href="https://ciep.ucr.ac.cr/" target="_blank" rel="noopener">CIEP</a>, '
    '<a href="https://www.techo.org/costarica/techo/" target="_blank" rel="noopener">TECHO</a>, <a href="https://www.facebook.com/viacostarricense/" target="_blank" rel="noopener">Entebbe</a>, '
    '<a href="https://www.unikomarcas.com/" target="_blank" rel="noopener">Uniko Branding</a>, partidos políticos y decenas de empresas y organizaciones públicas y privadas.',
    'Soy miembro de <a href="http://www.alice-comunicacionpolitica.com/" target="_blank" rel="noopener">ALICE</a>, '
    '<a href="https://siemprelistos.com/" target="_blank" rel="noopener">Guías y Scouts</a> y socio de la '
    '<a href="https://www.torosdelnorte.com/" target="_blank" rel="noopener">AD San Carlos</a>, el equipo de mis amores, del cual fui Gerente Administrativo entre 2022 y 2023.',
    "Actualmente lidero un talentoso equipo de marketing digital, desarrollo web y aplicación de IA generativa, y tengo mis servicios a tu disposición.",
]

HABILIDADES = [("Transformación digital", 90), ("Design thinking", 100), ("Diseño UX", 85),
               ("SEO y SEM", 75), ("Marketing político", 100), ("Redes sociales", 95)]

CIFRAS = [("+16", "Años de experiencia"), ("16", "Proyectos independientes"), ("28", "Proyectos con agencias")]

VISION = [
    "Las personas y las organizaciones debemos aprovechar las oportunidades que nos ofrecen las tecnologías disruptivas para hacer que nuestro paso por este planeta sea más eficiente, sostenible y significativo.",
    "Mi desarrollo profesional ha coincidido con el auge de las herramientas de comunicación digital, lo cual me ha permitido abrir camino en disciplinas que han ayudado a decenas de organizaciones a digitalizar y automatizar procesos de forma simple, efectiva y enfocada en la gente. Actualmente estoy brindando servicios de integración de herramientas de inteligencia artificial para empresas.",
]
LEMAS = ["Todo se puede transformar digitalmente, no hay excusas", "Casi todo se puede automatizar, no hay motivo para no intentarlo"]

METODO = [
    ("investigar", "Investigar y definir", "Hay que encontrar los <em>insights</em>. Desde el producto hasta el público meta, pasando por la competencia y el mercado."),
    ("planear", "Planear y diseñar", "Poner todo en papel para luego echar a volar la imaginación. Todo ocurre dos veces: cuando lo pensamos y cuando lo hacemos."),
    ("probar", "Probar, probar, probar", "La clave de una buena ejecución está en probar antes de lanzar, da igual si estamos hablando de un sitio web o una campaña de marketing."),
    ("mejorar", "Desarrollar y mejorar", "Una vez que terminamos todo, hay que volverlo a hacer. El buen producto se mantiene en el tiempo porque se adapta a los cambios."),
]

TRAYECTORIA = {
    "Experiencia": [
        ("2023 – actualidad", "Líder de Unidad de Análisis de Datos de Marketing, Coopelesca."),
        ("2022 – 2023", "Gerente Administrativo, Asociación Deportiva San Carlos."),
        ("2017 – 2022", "Director de Proyectos, Uniko Branding Agency."),
        ("2012 – 2017", "Asesor en Comunicación Política, Fundación Costa Rica para el Desarrollo Sostenible."),
        ("2011 – 2012", "Asistente de Investigación, Programa de la Sociedad de la Información y el Conocimiento, Universidad de Costa Rica."),
        ("2010 – 2011", "Asistente de Investigación, Centro de Investigación en Estudios Políticos, Universidad de Costa Rica."),
        ("2009 – 2010", "Community Manager y editor de contenidos, Un Techo para mi país."),
    ],
    "Educación": [
        ("2012", "B.A. Ciencias Políticas, Universidad de Costa Rica."),
        ("DNF", "Comercio Exterior, Universidad de Costa Rica."),
    ],
    "Certificaciones": [
        ("2025", "Transformación Digital con IA Generativa, Instituto Tecnológico de Costa Rica."),
        ("2022", "Gestión Ágil de Proyectos con el marco de trabajo SCRUM, TEC."),
        ("2022", "BluePrint Media Buyer, Meta."),
        ("2022", 'English Certificate 71/100 (C2 Proficient), <a href="https://www.efset.org/cert/tuYc1z" target="_blank" rel="noopener">EF SET</a>.'),
        ("2021", "SEO Fundamentals, LinkedIn Learning."),
        ("2020", "Design Thinking: Innovación Centrada en el Usuario, INCAE."),
        ("2012", "Certificado IHMC, Cmap Tools."),
    ],
    "Otras cosas": [
        ("2026 – actualidad", "Secretario del Tribunal Electoral, COOCIQUE R.L."),
        ("2024 – actualidad", "Delegado de la Asamblea General, COOCIQUE R.L."),
        ("2024", "Postulante a Dirigente Scout."),
        ("2012", "II Congreso Internacional de Comunicación Política y Estrategias de Campaña."),
        ("2007 – 2010", "Voluntario, Un Techo."),
        ("2007", "Premio Mejor Negociador, MOEA."),
        ("2002", "Insignia Guaria Morada, Guías y Scouts de Costa Rica."),
        ("2001", "Seminario Trabajo en Equipo y Liderazgo, CENECOOP R.L."),
    ],
}

TRABAJOS = [
    (f"{U}/2022/01/Global-Chemical-Group.png", "Global Chemical Group", "/portafolio/landing-page-para-empresa-de-logistica/"),
    (f"{U}/2022/01/Toros-del-Norte.png", "Toros del Norte", "/portafolio/tienda-en-linea-para-los-toros-del-norte/"),
    (f"{U}/2022/01/Dr-Gabriel-Vargas-Kelsh.png", "Dr. Gabriel Vargas Kelsh", "/portafolio/sitio-web-para-doctor/"),
    (f"{U}/2022/01/Grupo-Avanpro.png", "Grupo Avanpro", ""),
    (f"{U}/2024/03/Sitio-web-para-Empresa-de-Logistica.png", "EarthCrop", "/portafolio/landing-page-para-empresa-agroindustrial/"),
    (f"{U}/2022/01/Grupo-HM.png", "Grupo HM", ""),
    (f"{U}/2022/01/NST-Freight.png", "NST Freight", ""),
    (f"{U}/2022/01/Probio-Fruits.png", "Probio Fruits", ""),
]

TESTIMONIOS = [
    ("Esteban hizo un aporte muy valioso para la ejecución de las estrategias de comunicación digital en proyectos como Vía Costarricense, el Congreso Nacional de Liberacionista 2015, y formó parte del Equipo de Coordinación Nacional de las Elecciones Municipales 2016 y la Convención Liberacionista 2017.",
     "José María Figueres Olsen", "Expresidente de Costa Rica (1994 – 1998), PLN y Vía Costarricense", f"{U}/2022/01/Jose-Maria-Figueres.jpeg"),
    ("Esteban y el equipo de Uniko jugaron un papel fundamental en la modernización y transformación digital de la Asociación Deportiva San Carlos. Desde el Estadio hasta las formas de comunicación interna y externa se han convertido en un ejemplo para el ámbito costarricense.",
     "Sergio Chávez Acevedo", "Presidente (2015 – 2023), Asociación Deportiva San Carlos", f"{U}/2022/01/Sergio-Chavez-Acevedo.jpeg"),
    ("Esteban diseñó una web enfocada en la rama médica de la oftalmología. Desde el primer contacto materializó todas mis ideas, y las fue mejorando hasta entregar el producto que yo buscaba. Es un profesional conocedor, entregado y apasionado por su trabajo. Uno le entrega una bola de plastilina, y él la convierte en una escultura.",
     "Dr. Gabriel Vargas Kelsh", "Oftalmólogo costarricense", f"{U}/2022/01/DrGabrielVargasKelsh.jpeg"),
]
