// Eventos de la IER San Sebastián tomados de su TikTok (@iersansebastian) y su Facebook.
// Solo eventos: no se incluyen cumpleaños, flyers ni invitaciones.
//
// Para agregar un evento:
//   1. Crea public/media/eventos/<id>/ con las fotos 01.webp, 02.webp… (la 01 es la portada)
//      y sus miniaturas (unos 560 px) con los mismos nombres en public/media/eventos/<id>/mini/.
//   2. Añade un objeto a la lista `datos` con el mismo <id> y el número de fotos.
//   3. Si tiene videos de TikTok, pon sus números en `videos` y su portada en
//      public/media/eventos/<id>/video-<número>.webp.

export const categorias = ['Cultura', 'Académico', 'Campo', 'Medio ambiente', 'Emprendimiento', 'Deportes', 'Comunidad', 'Gobierno escolar']

// Clases completas (no armadas por partes) para que Tailwind las incluya.
const COLORES = {
  Cultura: 'bg-oro-400 text-cielo-950',
  Académico: 'bg-cielo-500 text-white',
  Campo: 'bg-monte-600 text-white',
  'Medio ambiente': 'bg-monte-300 text-monte-800',
  Emprendimiento: 'bg-amber-500 text-cielo-950',
  Deportes: 'bg-cielo-800 text-white',
  Comunidad: 'bg-white text-cielo-800',
  'Gobierno escolar': 'bg-cielo-950 text-oro-300',
}
export const colorCategoria = (c) => COLORES[c] || 'bg-white text-cielo-900'

const fechaCorta = new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })
const fechaLarga = new Intl.DateTimeFormat('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
export function formatoFecha(iso, largo = false) {
  const [a, m, d] = iso.split('-').map(Number)
  const texto = (largo ? fechaLarga : fechaCorta).format(new Date(a, m - 1, d))
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

const datos = [
  {
    id: 'diversidad-etnica-cultural',
    titulo: 'Día de la Diversidad Étnica y Cultural',
    fecha: '2026-10-12',
    categoria: 'Cultura',
    sede: 'Sede Maracaibo',
    resumen: 'Danzas, coplas, comidas típicas y un viaje en el tiempo hasta 1492, desde primera infancia hasta grado once.',
    descripcion:
      'Así vivimos el Día de la Diversidad Étnica y Cultural: danzas, coplas, comidas típicas y hasta un viaje en el tiempo hasta 1492. Desde primera infancia hasta once, todos pusieron un pedacito de Colombia en la cancha de Maracaibo. Somos muchas voces, muchos colores y una sola nación.',
    fotos: 15,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/photo/7701124339332042004',
    ],
  },
  {
    id: 'festival-danzas-intercolegiadas',
    titulo: 'XI Festival de Danzas Intercolegiadas',
    fecha: '2026-10-06',
    categoria: 'Cultura',
    sede: 'Sede Laureles',
    resumen: 'La Sede Laureles llevó su talento y tradición al festival, fruto de los Centros de Interés en Danza, Artes Plásticas y Música.',
    descripcion:
      'La IER San Sebastián – Sede Laureles estuvo presente con todo su talento y tradición en el XI Festival de Danzas Intercolegiadas. Esta participación es fruto de nuestros Centros de Interés en Danza, Artes Plásticas y Música, espacios que fortalecen el talento artístico, la cultura y el rescate de nuestras tradiciones.',
    fotos: 7,
    videos: ['7693579988527893780'],
    videoPrimero: true,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/video/7693579988527893780',
    ],
  },
  {
    id: 'feria-agropecuaria',
    titulo: 'Feria Agropecuaria en el Colegio San Miguel',
    fecha: '2026-09-27',
    categoria: 'Campo',
    resumen: 'La Media Técnica en Sistemas Agropecuarios Ecológicos compartió sus proyectos productivos y el talento que nace del campo.',
    descripcion:
      'Nuestros estudiantes de la Media Técnica en Sistemas Agropecuarios Ecológicos compartieron sus proyectos productivos, conocimientos y el talento que nace desde el campo. Gracias a la Institución Educativa Colegio San Miguel por la invitación y por permitirnos vivir este espacio de aprendizaje e intercambio de experiencias. ¡Seguimos demostrando que el campo también construye futuro!',
    fotos: 20,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/photo/7690308282673679637',
    ],
  },
  {
    id: 'reinado-del-reciclaje',
    titulo: 'Reinado del Reciclaje 2026',
    fecha: '2026-09-25',
    categoria: 'Medio ambiente',
    resumen: 'Participamos en las categorías juvenil e infantil, ¡y nuestra representante se coronó Reina Juvenil del Reciclaje 2026!',
    descripcion:
      'Nuestra institución participó con representantes en las categorías juvenil e infantil, demostrando talento, creatividad y compromiso con el cuidado del planeta. ¡Orgullo San Sebastián! Nuestra representante juvenil se coronó como Reina Juvenil del Reciclaje 2026. Gracias a todos quienes hicieron posible esta participación.',
    fotos: 13,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/photo/7689526544238185749',
    ],
  },
  {
    id: 'feria-de-emprendimiento',
    titulo: 'Feria de Emprendimiento',
    fecha: '2026-09-25',
    categoria: 'Emprendimiento',
    resumen: 'Helados, café, bebidas y muchas ideas: nuestros estudiantes demostraron que las ideas también se convierten en oportunidades.',
    descripcion:
      '¡Así vivimos nuestra Feria de Emprendimiento! Nuestros estudiantes demostraron que las ideas también se convierten en oportunidades. Creatividad, trabajo en equipo y mucho talento en una jornada de aprender haciendo. ¡Felicitaciones a todos nuestros emprendedores!',
    fotos: 16,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/photo/7689492942955760917',
    ],
  },
  {
    id: 'english-day',
    titulo: 'English Day',
    fecha: '2026-09-03',
    categoria: 'Académico',
    resumen: 'Los estudiantes representaron países de habla inglesa con música, arte, danza y mucho talento.',
    descripcion:
      'El 3 de septiembre nuestra I.E. Rural San Sebastián se llenó de cultura, música, arte y mucho talento. Nuestros estudiantes representaron diferentes países de habla inglesa y demostraron que aprender inglés también es conocer el mundo. ¡Una jornada llena de aprendizaje, creatividad y diversión!',
    fotos: 7,
    videos: ['7685071201877691668'],
    videoPrimero: true,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/video/7685071201877691668',
    ],
  },
  {
    id: 'apicultura-montana-dorada',
    titulo: 'Apicultura en Montaña Dorada',
    fecha: '2026-08-28',
    categoria: 'Campo',
    resumen: 'Grado décimo visitó Montaña Dorada para conocer de cerca la apicultura y darle forma a una nueva idea de emprendimiento.',
    descripcion:
      'Nos fuimos hasta Montaña Dorada para conocer de cerca el mundo de la apicultura y empezar a darle forma a una nueva idea de emprendimiento con nuestros estudiantes de grado décimo. Del aprendizaje nace el emprendimiento.',
    fotos: 7,
    videos: ['7678953094184488213'],
    videoPrimero: true,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/video/7678953094184488213',
    ],
  },
  {
    id: 'conmemoracion-7-de-agosto',
    titulo: 'Conmemoración del 7 de agosto',
    fecha: '2026-08-07',
    categoria: 'Cultura',
    resumen: 'Nuestros estudiantes cuentan por qué la Batalla de Boyacá es una fecha importante para Colombia.',
    descripcion:
      'Nuestra historia, nuestra voz. Nuestros estudiantes nos cuentan, a través de este video, por qué el 7 de agosto es una fecha importante para Colombia y qué significa hoy recordar nuestra historia. Una conmemoración hecha desde nuestras aulas, con nuestros estudiantes como protagonistas.',
    fotos: 5,
    videos: ['7674123370333555988'],
    videoPrimero: true,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/video/7674123370333555988',
    ],
  },
  {
    id: 'jornada-de-porcicultura',
    titulo: 'Jornada de porcicultura',
    fecha: '2026-07-30',
    categoria: 'Campo',
    resumen: 'Grado 11 aprendió sobre evaluación sanitaria, condición corporal y manejo de los cerdos junto a una futura médica veterinaria.',
    descripcion:
      '¡Así se vive el aprendizaje en el campo! Nuestros estudiantes de grado 11 llevaron la teoría a la práctica en una jornada de porcicultura, aprendiendo sobre evaluación sanitaria, condición corporal y manejo de los cerdos junto a una futura médica veterinaria. Formar técnicos agropecuarios también es brindar experiencias reales que preparan para los retos del campo.',
    fotos: 6,
    videos: ['7668355106978467093'],
    videoPrimero: true,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/video/7668355106978467093',
    ],
  },
  {
    id: 'preparacion-saber-11',
    titulo: 'Preparación para las Pruebas Saber 11',
    fecha: '2026-07-24',
    categoria: 'Académico',
    resumen: 'Grado 11 aprovechó las 24 horas de clases gratuitas del Grupo 500 para llegar preparado a las Pruebas Saber.',
    descripcion:
      'Nuestros estudiantes de grado 11 aprovecharon una jornada intensiva de preparación con las 24 horas de clases gratuitas del Grupo 500, reforzando conocimientos para dar lo mejor en las Pruebas Saber 11. ¡Muchos éxitos, promoción 2026! Estamos orgullosos de ustedes.',
    fotos: 9,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/photo/7666090434543815957',
    ],
  },
  {
    id: 'dia-de-la-independencia',
    titulo: 'Día de la Independencia de Colombia',
    fecha: '2026-07-20',
    categoria: 'Cultura',
    sede: 'Sede principal',
    resumen: 'Historia, cultura y orgullo colombiano en una jornada que nos recordó que el futuro del país se construye desde la educación.',
    descripcion:
      'Así vivimos el Día de la Independencia de Colombia en la sede principal de la I.E.R. San Sebastián. Historia, cultura y orgullo colombiano en una jornada que nos recordó que el futuro de nuestro país se construye desde la educación. ¡Que viva Colombia!',
    fotos: 6,
    videos: ['7665815761335717140'],
    videoPrimero: true,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/video/7665815761335717140',
    ],
  },
  {
    id: 'competencias-deportivas',
    titulo: 'Competencias deportivas',
    fecha: '2026-07-14',
    categoria: 'Deportes',
    resumen: 'Nuestros deportistas lo dieron todo en cada competencia y dejaron en alto el nombre de la institución.',
    descripcion:
      'Nuestros estudiantes lo dieron todo en cada competencia, demostrando talento, disciplina y el verdadero orgullo de ser IER San Sebastián. ¡Felicitaciones a todos nuestros deportistas por dejar en alto el nombre de nuestra institución!',
    fotos: 21,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/photo/7662454522173820180',
    ],
  },
  {
    id: 'encuentro-por-la-educacion',
    titulo: 'Encuentro por la educación del Catatumbo',
    fecha: '2026-07-08',
    categoria: 'Comunidad',
    resumen: 'Presentes junto a instituciones educativas, líderes y organizaciones del territorio construyendo futuro para el Catatumbo.',
    descripcion:
      'La IER San Sebastián estuvo presente en este importante encuentro por la educación, junto a instituciones educativas, líderes y organizaciones del territorio. ¡Seguimos construyendo un mejor futuro para el Catatumbo!',
    fotos: 7,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/photo/7660029755667860757',
    ],
  },
  {
    id: 'regreso-a-clases',
    titulo: 'Regreso a clases: segundo semestre',
    fecha: '2026-07-06',
    categoria: 'Comunidad',
    resumen: 'Un nuevo semestre comienza, lleno de aprendizajes, sueños y nuevas oportunidades en todas nuestras sedes.',
    descripcion:
      'Un nuevo semestre comienza, lleno de aprendizajes, sueños y nuevas oportunidades. Así recibimos a nuestros estudiantes en el regreso a clases.',
    fotos: 18,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/photo/7661740321625083157',
    ],
  },
  {
    id: 'laboratorio-de-suelos',
    titulo: 'Laboratorio de análisis de suelos',
    fecha: '2026-06-10',
    categoria: 'Campo',
    resumen: 'La Media Técnica Agropecuaria llevó la teoría a la práctica con un laboratorio de análisis de suelo.',
    descripcion:
      'Ciencia para transformar el campo. La teoría cobra vida cuando se lleva a la práctica: los estudiantes de la Media Técnica Agropecuaria realizaron un laboratorio de análisis de suelo, fortaleciendo sus conocimientos a través de experiencias que conectan el aprendizaje con las necesidades del territorio.',
    fotos: 7,
    videos: ['7649782711032433941'],
    videoPrimero: true,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/video/7649782711032433941',
    ],
  },
  {
    id: 'olimpiadas-matematicas-uis',
    titulo: 'Olimpiadas Matemáticas UIS: fase final',
    fecha: '2026-06-09',
    categoria: 'Académico',
    sede: 'Sede Los Laureles',
    resumen: 'Dos estudiantes de la Sede Los Laureles llegaron a la fase final entre más de 20.000 participantes de todo el país.',
    descripcion:
      '¡Hacarí presente en la fase final de las Olimpiadas Matemáticas UIS! Sharith Valeria Galvis Trigos y Emmanuel Josué Contreras García, de la sede Los Laureles, representaron con orgullo a nuestro municipio tras destacarse entre más de 20.000 participantes de 359 instituciones y 115 municipios del país. El talento rural no tiene límites.',
    fotos: 7,
    videos: ['7649281902095961364'],
    videoPrimero: true,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/video/7649281902095961364',
      'https://www.tiktok.com/@iersansebastian/photo/7637561001897921812',
    ],
  },
  {
    id: 'dia-de-la-afrocolombianidad',
    titulo: 'Día de la Afrocolombianidad',
    fecha: '2026-06-03',
    categoria: 'Cultura',
    resumen: 'Ocho municipios del Catatumbo, gastronomía típica, danzas, muestras culturales y saberes de nuestra región.',
    descripcion:
      'Así celebramos el Día de la Afrocolombianidad en la I.E. Rural San Sebastián de Hacarí: 8 municipios del Catatumbo, gastronomía típica, danzas y muestras culturales, y los saberes e historia de nuestra región. Orgullosos de nuestras raíces y nuestra identidad.',
    fotos: 7,
    videos: ['7647257004024663316'],
    videoPrimero: true,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/video/7647257004024663316',
    ],
  },
  {
    id: 'dia-del-maestro',
    titulo: 'Día del Maestro',
    fecha: '2026-05-15',
    categoria: 'Comunidad',
    resumen: 'Nos sumamos al #AbrazaATuProfe para celebrar a los maestros que enseñan con el corazón.',
    descripcion:
      'Un abrazo puede decir «gracias» por cada enseñanza, consejo y momento compartido. La Institución Educativa Rural San Sebastián celebró a esos maestros que enseñan con el corazón y dejan huellas para toda la vida. Detrás de cada clase hay esfuerzo, compromiso y muchas ganas de construir un mejor futuro.',
    fotos: 10,
    videos: ['7640127731518262549', '7641737565799714068'],
    videoPrimero: true,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/video/7640127731518262549',
      'https://www.tiktok.com/@iersansebastian/video/7641737565799714068',
    ],
  },
  {
    id: 'vacunacion-porcina',
    titulo: 'Jornada de vacunación porcina',
    fecha: '2026-05-13',
    categoria: 'Campo',
    sede: 'Vereda Maracaibito',
    resumen: 'Grado 11 participó en una jornada de vacunación porcina junto a Porkcolombia y el ICA.',
    descripcion:
      'Estudiantes de grado 11 participaron en una jornada de vacunación porcina en la vereda Maracaibito, junto a Porkcolombia e ICA: la sanidad animal y el trabajo en las porcícolas de la zona rural, vividos en primera persona.',
    fotos: 6,
    videos: ['7639501606677040404'],
    videoPrimero: true,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/video/7639501606677040404',
    ],
  },
  {
    id: 'salida-pedagogica-ufps-ocana',
    titulo: 'Salida pedagógica a la UFPS Ocaña',
    fecha: '2026-05-05',
    categoria: 'Académico',
    resumen: 'Tres días conociendo la oferta académica, la granja, los laboratorios y el centro histórico de Ocaña.',
    descripcion:
      'Nuestros estudiantes visitaron la UFPS en Ocaña durante tres días: conocieron su oferta académica, la granja y los laboratorios, recorrieron el centro histórico y compartieron actividades de bienestar y trabajo en equipo. Una experiencia de aprendizaje y proyección.',
    fotos: 16,
    videos: ['7636420145149267220', '7636818012984642836', '7637298345974746389'],
    videoPrimero: true,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/video/7636420145149267220',
      'https://www.tiktok.com/@iersansebastian/video/7636818012984642836',
      'https://www.tiktok.com/@iersansebastian/video/7637298345974746389',
    ],
  },
  {
    id: 'dia-de-la-tierra-y-del-arbol',
    titulo: 'Día de la Tierra y Día del Árbol',
    fecha: '2026-04-29',
    categoria: 'Medio ambiente',
    resumen: 'Cuidar el agua, sembrar árboles y trabajar en equipo: acciones reales para cuidar nuestro planeta.',
    descripcion:
      'Cuidar la Tierra también es sembrar vida. Unimos el Día del Árbol y el Día de la Tierra con acciones reales: cuidar el agua, sembrar árboles, no contaminar y trabajar en equipo por nuestro entorno. Porque el cambio empieza con lo que haces hoy.',
    fotos: 21,
    videos: ['7634630443526032661'],
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/photo/7634636961453526293',
      'https://www.tiktok.com/@iersansebastian/video/7634630443526032661',
    ],
  },
  {
    id: 'dia-del-nino',
    titulo: 'Día del Niño en nuestras sedes',
    fecha: '2026-04-25',
    categoria: 'Comunidad',
    resumen: 'Alegría, juegos y comunidad para celebrar a los niños en cada una de nuestras sedes.',
    descripcion:
      'Día del Niño en nuestras sedes: alegría, juegos y comunidad. Hoy celebramos sonrisas, sueños y mucha imaginación, porque cada niño merece un futuro brillante. En San Sebastián educamos con amor.',
    fotos: 22,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/photo/7636070731725540615',
    ],
  },
  {
    id: 'cierre-primer-periodo',
    titulo: 'Cierre del primer período y Escuela de Padres',
    fecha: '2026-04-25',
    categoria: 'Comunidad',
    resumen: 'Entrega de boletines, Escuela de Padres y trabajo en equipo: familia y escuela, un mismo camino.',
    descripcion:
      'Cierre del primer período: entrega de boletines, Escuela de Padres y trabajo en equipo por nuestros estudiantes. Familia y escuela, un mismo camino.',
    fotos: 23,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/photo/7632491328739298568',
    ],
  },
  {
    id: 'dia-del-idioma',
    titulo: 'Día del Idioma en nuestras 19 sedes',
    fecha: '2026-04-23',
    categoria: 'Cultura',
    sede: '19 sedes',
    resumen: 'Lengua, cultura y talento en cada rincón: presentaciones, puertas decoradas y mucho orgullo por nuestra lengua.',
    descripcion:
      'Así se vivió el Día del Idioma en nuestras 19 sedes educativas: lengua, cultura y talento en cada rincón. Celebramos el poder de las palabras, la lectura, la comunicación y nuestra identidad con presentaciones y el concurso de decoración de puertas por grado. Nuestra lengua nos une.',
    fotos: 49,
    videos: ['7632095830509440277'],
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/photo/7632489091673689362',
      'https://www.tiktok.com/@iersansebastian/photo/7632347877221633301',
      'https://www.tiktok.com/@iersansebastian/video/7632095830509440277',
    ],
  },
  {
    id: 'del-grano-a-la-taza',
    titulo: 'Del grano a la taza: salida pedagógica del café',
    fecha: '2026-04-19',
    categoria: 'Campo',
    sede: 'Santa Marta (Maracaibo)',
    resumen: 'Aprendimos el proceso del café —recolección, despulpado y secado— y el uso de residuos con lombriz roja californiana.',
    descripcion:
      'Vivimos una salida pedagógica en Santa Marta (Maracaibo) para aprender el proceso del café: recolección, despulpado y secado, y el aprovechamiento de residuos con lombriz roja californiana. Aprender en el campo se vive diferente.',
    fotos: 7,
    videos: ['7630484645401890068'],
    videoPrimero: true,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/video/7630484645401890068',
    ],
  },
  {
    id: 'educar-para-la-paz',
    titulo: 'Educar para la paz: Día de la Memoria',
    fecha: '2026-04-09',
    categoria: 'Comunidad',
    sede: '19 sedes',
    resumen: 'Con iniciativas como «Un lápiz para la memoria y la paz», nuestras 19 sedes reflexionaron sobre memoria y paz.',
    descripcion:
      'En el marco del Día Nacional de la Memoria y Solidaridad con las Víctimas, nuestras 19 sedes desarrollaron actividades para fortalecer la memoria y la construcción de paz. Con iniciativas como «Un lápiz para la memoria y la paz», los estudiantes expresaron sus reflexiones y compromisos. Formamos estudiantes como gestores de paz en sus hogares, las aulas y el territorio.',
    fotos: 17,
    videos: ['7626864964317334805'],
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/photo/7627224895293787399',
      'https://www.tiktok.com/@iersansebastian/video/7626864964317334805',
    ],
  },
  {
    id: 'jornada-ambiental',
    titulo: 'Jornada ambiental: clima, dengue y residuos',
    fecha: '2026-04-08',
    categoria: 'Medio ambiente',
    resumen: 'Hablamos de cambio climático y prevención del dengue, y cerramos con una recolección de residuos.',
    descripcion:
      'Hablamos de cambio climático, prevención del dengue y cuidado del entorno, y cerramos con una recolección de residuos. ¡Así construimos comunidad!',
    fotos: 11,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/photo/7626450353139043604',
    ],
  },
  {
    id: 'media-rural-con-futuro',
    titulo: 'Media Rural con Futuro',
    fecha: '2026-03-19',
    categoria: 'Emprendimiento',
    resumen: 'Con la Universidad de La Salle, los estudiantes fortalecieron su liderazgo y crearon ideas de emprendimiento.',
    descripcion:
      'Estudiantes fortalecen su liderazgo y crean ideas de emprendimiento para transformar sus comunidades, en articulación con la Universidad de La Salle. ¡La educación rural construye futuro!',
    fotos: 9,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/photo/7619079041982811400',
    ],
  },
  {
    id: 'dia-del-hombre',
    titulo: 'Día del Hombre',
    fecha: '2026-03-19',
    categoria: 'Comunidad',
    resumen: 'Celebramos a los hombres de nuestra comunidad educativa: estudiantes, docentes y padres.',
    descripcion:
      'Celebramos a los hombres de nuestra comunidad educativa —estudiantes, docentes y padres— que con esfuerzo y compromiso construyen comunidad. Respeto, valores y compromiso.',
    fotos: 24,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/photo/7622446769409887506',
    ],
  },
  {
    id: 'posesion-gobierno-escolar',
    titulo: 'Posesión de Personera y Contralor Estudiantil',
    fecha: '2026-03-10',
    categoria: 'Gobierno escolar',
    sede: 'Sede Maracaibo',
    resumen: 'Nuestros representantes asumieron oficialmente su responsabilidad con toda la comunidad estudiantil.',
    descripcion:
      'Así vivimos la posesión de la Personera y el Contralor Estudiantil 2026 en la sede Maracaibo: un acto lleno de compromiso, liderazgo y participación, donde nuestros estudiantes asumieron oficialmente su responsabilidad de representar a toda la comunidad estudiantil.',
    fotos: 13,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/photo/7615721409301499157',
    ],
  },
  {
    id: 'dia-de-la-mujer',
    titulo: 'Día de la Mujer',
    fecha: '2026-03-08',
    categoria: 'Comunidad',
    resumen: 'Un homenaje a las mujeres que inspiran, educan y transforman nuestra comunidad educativa.',
    descripcion:
      'Un homenaje a las mujeres que inspiran, educan y transforman nuestra comunidad educativa. Reconocemos la dedicación y el compromiso de quienes, desde sus diferentes roles, fortalecen nuestra institución.',
    fotos: 22,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/photo/7616512500346948885',
    ],
  },
  {
    id: 'rendicion-de-cuentas',
    titulo: 'Rendición de Cuentas 2025',
    fecha: '2026-02-26',
    categoria: 'Gobierno escolar',
    sede: 'Sede Laureles',
    resumen: 'Compartimos avances y resultados de la gestión escolar en un espacio de transparencia y participación.',
    descripcion:
      'El 26 de febrero realizamos la Rendición de Cuentas en la sede Laureles. Compartimos avances y resultados de nuestra gestión escolar en un espacio de transparencia y participación. Gracias por acompañarnos presencialmente y por Facebook Live.',
    fotos: 7,
    videos: ['7613425273077288213'],
    videoPrimero: true,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/video/7613425273077288213',
    ],
  },
  {
    id: 'elecciones-escolares-2026',
    titulo: 'Elecciones escolares 2026',
    fecha: '2026-02-25',
    categoria: 'Gobierno escolar',
    resumen: 'Debates, votación en cada sede con resultados digitales y la elección de Personero y Contralor Estudiantil.',
    descripcion:
      'La democracia se vive en la IER San Sebastián. Conocimos a los candidatos y sus propuestas en los debates, y el 25 de febrero los estudiantes votaron presencialmente en sus sedes, con resultados digitales a través de GNOSOFT Académico. Felicitamos a los estudiantes elegidos para liderar y representar a nuestra institución con compromiso y responsabilidad.',
    fotos: 15,
    videos: ['7612366094711491861', '7610635098156813589', '7613035345256484117'],
    videoPrimero: true,
    enlaces: [
      'https://www.tiktok.com/@iersansebastian/video/7612366094711491861',
      'https://www.tiktok.com/@iersansebastian/video/7610635098156813589',
      'https://www.tiktok.com/@iersansebastian/video/7613035345256484117',
    ],
  },
]

const dos = (n) => String(n).padStart(2, '0')

function prepararEvento(e) {
  const base = `/media/eventos/${e.id}`
  const fotos = Array.from({ length: e.fotos }, (_, i) => ({
    tipo: 'foto',
    src: `${base}/${dos(i + 1)}.webp`,
    mini: `${base}/mini/${dos(i + 1)}.webp`,
    alt: `${e.titulo} — foto ${i + 1} de ${e.fotos}`,
  }))
  const videos = (e.videos || []).map((id) => ({ tipo: 'video', tiktok: id, poster: `${base}/video-${id}.webp` }))
  // En los eventos que se publicaron como video, el video va primero; si no, al final.
  const medios = e.videoPrimero ? [fotos[0], ...videos, ...fotos.slice(1)] : [...fotos, ...videos]
  return { ...e, enlaces: e.enlaces || [], medios, portada: fotos[0] }
}

export const eventos = datos.map(prepararEvento).sort((a, b) => b.fecha.localeCompare(a.fecha))

// Fotos del slider de la portada (dónde se ve la sede).
export const slider = [
  { src: '/media/sede/01.webp', movil: '/media/sede/01-movil.webp', alt: 'Estudiantes en el patio de la Sede Laureles, rodeados de montañas', posicion: 'center 40%' },
  { src: '/media/sede/02.webp', movil: '/media/sede/02-movil.webp', alt: 'Desfile con la pancarta de la institución: Sabiduría, Virtud y Trabajo', posicion: 'center 55%' },
  { src: '/media/sede/03.webp', movil: '/media/sede/03-movil.webp', alt: 'Niños de una de nuestras sedes con las montañas de Hacarí al fondo', posicion: 'center 60%' },
  { src: '/media/sede/04.webp', movil: '/media/sede/04-movil.webp', alt: 'Cancha cubierta de la sede Maracaibo en el Día de la Diversidad', posicion: 'center 55%' },
  { src: '/media/sede/05.webp', movil: '/media/sede/05-movil.webp', alt: 'Equipo docente frente a la sede', posicion: 'center 45%' },
  { src: '/media/sede/06.webp', movil: '/media/sede/06-movil.webp', alt: 'Danzas típicas en la cancha durante el Día del Idioma', posicion: 'center 55%' },
  { src: '/media/sede/07.webp', movil: '/media/sede/07-movil.webp', alt: 'Fachada de una de nuestras sedes educativas', posicion: 'center 50%' },
  { src: '/media/sede/08.webp', movil: '/media/sede/08-movil.webp', alt: 'Jornada ambiental en la cancha de la sede', posicion: 'center 55%' },
]

export const videoSede = {
  src: '/media/sede/video-sede.mp4',
  poster: '/media/sede/video-sede.webp',
  titulo: 'Así se vive la IER San Sebastián',
}
