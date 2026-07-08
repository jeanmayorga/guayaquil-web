export interface Place {
  slug: string;
  name: string;
  tagline: string;
  /** Resumen corto para las tarjetas y meta description. */
  summary: string;
  /** Párrafos del cuerpo del artículo. */
  paragraphs: string[];
  /** Dirección o ubicación de referencia. */
  address: string;
  /** Consulta para Google Maps (nombre del lugar + ciudad). */
  mapsQuery: string;
  /** Cómo llegar: opciones de transporte. */
  howToGet: string[];
}

export const places: Place[] = [
  {
    slug: "malecon-2000",
    name: "Malecón 2000",
    tagline: "El paseo a orillas del río Guayas",
    summary:
      "El paseo más emblemático de Guayaquil: 2,5 km de jardines, monumentos, museos y miradores junto al río Guayas.",
    paragraphs: [
      "El Malecón 2000 (Malecón Simón Bolívar) es el corazón turístico de Guayaquil. Se extiende por unos 2,5 km a orillas del río Guayas e integra jardines, fuentes, monumentos históricos, restaurantes, museos y miradores.",
      "Entre sus puntos destacados están La Rotonda —el monumento al encuentro de Bolívar y San Martín—, la Torre Morisca, el Museo Antropológico y de Arte Contemporáneo (MAAC) y una gran rueda panorámica. Es ideal para caminar al atardecer.",
    ],
    address: "Malecón Simón Bolívar, centro de Guayaquil",
    mapsQuery: "Malecón 2000, Guayaquil, Ecuador",
    howToGet: [
      "A pie: está en pleno centro; se recorre fácilmente caminando desde cualquier punto del casco histórico.",
      "Metrovía: las estaciones de la zona centro (Troncal 1) dejan a pocas cuadras.",
      "Taxi o app de transporte: pide como destino “Malecón 2000”.",
    ],
  },
  {
    slug: "las-penas-cerro-santa-ana",
    name: "Las Peñas y el Cerro Santa Ana",
    tagline: "El barrio más antiguo y su mirador",
    summary:
      "El barrio fundacional de Guayaquil, con casas coloridas, calles empedradas y los 444 escalones del Cerro Santa Ana hasta el faro.",
    paragraphs: [
      "Las Peñas es el barrio más antiguo de Guayaquil, declarado Patrimonio Cultural. Sus casas de colores, galerías de arte y calles empedradas conservan el espíritu de la ciudad de inicios del siglo XX.",
      "Desde aquí parten los 444 escalones del Cerro Santa Ana, jalonados de cafés y tiendas, que llevan hasta un faro y una capilla con una vista panorámica del río Guayas y la ciudad. Es uno de los miradores más bonitos de Guayaquil.",
    ],
    address: "Barrio Las Peñas, extremo norte del Malecón 2000",
    mapsQuery: "Cerro Santa Ana, Las Peñas, Guayaquil, Ecuador",
    howToGet: [
      "A pie: se llega caminando desde el extremo norte del Malecón 2000.",
      "Taxi o app: indica “Las Peñas” o “Cerro Santa Ana”.",
      "Lleva calzado cómodo: el ascenso es por escalones.",
    ],
  },
  {
    slug: "parque-seminario-iguanas",
    name: "Parque Seminario (de las Iguanas)",
    tagline: "Iguanas en pleno centro",
    summary:
      "Un parque en el centro de Guayaquil donde decenas de iguanas conviven con los visitantes, frente a la Catedral Metropolitana.",
    paragraphs: [
      "El Parque Seminario —conocido popularmente como el Parque de las Iguanas— es famoso por las decenas de iguanas que habitan libremente entre sus árboles y senderos, ante la mirada curiosa de los visitantes.",
      "En el centro del parque está la estatua ecuestre de Simón Bolívar y, justo enfrente, la imponente Catedral Metropolitana de estilo neogótico. Es una parada obligada y gratuita en el casco histórico.",
    ],
    address: "Entre las calles Chile, Clemente Ballén, Chimborazo y 10 de Agosto",
    mapsQuery: "Parque Seminario, Guayaquil, Ecuador",
    howToGet: [
      "A pie: en el centro, frente a la Catedral Metropolitana.",
      "Metrovía: estaciones de la Troncal 1 por el centro.",
      "Taxi o app: pide “Parque de las Iguanas” o “Parque Seminario”.",
    ],
  },
  {
    slug: "parque-historico",
    name: "Parque Histórico Guayaquil",
    tagline: "La Guayaquil de antaño",
    summary:
      "Un parque que recrea la Guayaquil tradicional con fauna nativa, arquitectura de época y zonas verdes; ideal en familia.",
    paragraphs: [
      "El Parque Histórico Guayaquil es un espacio cultural y natural dividido en tres zonas: la de vida silvestre (con fauna nativa como monos, aves y un oso perezoso), la urbano-arquitectónica (que recrea el Guayaquil de inicios del siglo XX) y la de tradiciones.",
      "Está rodeado de manglar y senderos, por lo que es un plan perfecto para ir en familia y aprender sobre la historia y la naturaleza de la región. La entrada suele ser gratuita.",
    ],
    address: "Vía a Samborondón, sector Entre Ríos",
    mapsQuery: "Parque Histórico Guayaquil, Ecuador",
    howToGet: [
      "Taxi o app: a unos 15–20 min del centro, en la Vía a Samborondón.",
      "Auto propio: hay parqueo en el sitio.",
      "Consulta los días de apertura antes de ir (suele abrir de miércoles a domingo).",
    ],
  },
  {
    slug: "isla-santay",
    name: "Isla Santay",
    tagline: "Naturaleza frente a la ciudad",
    summary:
      "Área natural protegida frente a Guayaquil, ideal para caminar o pedalear entre manglares y avistar aves.",
    paragraphs: [
      "La Isla Santay es un Área Nacional de Recreación y humedal Ramsar ubicado en medio del río Guayas, frente a la ciudad. Sus senderos y ciclovías de madera atraviesan manglares donde se pueden observar aves, cangrejos y una comunidad local.",
      "Cuenta con un criadero de cocodrilos (La Ecoaldea) y miradores. Es uno de los mejores planes al aire libre cerca del centro, perfecto para ir en bicicleta.",
    ],
    address: "Río Guayas, acceso por el puente peatonal desde el sur de Guayaquil",
    mapsQuery: "Isla Santay, Guayaquil, Ecuador",
    howToGet: [
      "A pie o en bici: por el puente peatonal y ciclístico desde el sur de Guayaquil (sector El Oro / barrio Centenario).",
      "En lancha: también hay acceso desde Durán.",
      "Lleva agua, gorra y protector solar; hay poca sombra en el recorrido.",
    ],
  },
  {
    slug: "malecon-del-salado-aerovia",
    name: "Malecón del Salado y la Aerovía",
    tagline: "El estero y el teleférico",
    summary:
      "Un malecón sobre el estero Salado y la Aerovía, el teleférico que cruza el río Guayas con vistas únicas de la ciudad.",
    paragraphs: [
      "El Malecón del Salado es un paseo a orillas del estero Salado, con puentes, restaurantes, fuentes y paseos en bote. Es un punto de encuentro más tranquilo y local que el Malecón 2000.",
      "Muy cerca opera la Aerovía, el teleférico urbano que conecta Guayaquil con Durán cruzando el río Guayas. El recorrido ofrece una de las mejores vistas aéreas de la ciudad, especialmente al atardecer.",
    ],
    address: "Estero Salado, oeste del centro de Guayaquil",
    mapsQuery: "Malecón del Salado, Guayaquil, Ecuador",
    howToGet: [
      "Taxi o app: pide “Malecón del Salado” o la estación de la Aerovía “Parque Centenario”.",
      "Aerovía: la estación Parque Centenario está en el centro; el teleférico cruza hacia Durán.",
      "A pie: accesible desde la zona de la Universidad de Guayaquil.",
    ],
  },
  {
    slug: "puerto-santa-ana",
    name: "Puerto Santa Ana",
    tagline: "El paseo moderno junto al río",
    summary:
      "Un paseo ribereño con plazas, museos, cafés y edificios modernos al pie del cerro Santa Ana, ideal para el atardecer.",
    paragraphs: [
      "Puerto Santa Ana es la extensión moderna del malecón: un paseo peatonal junto al río Guayas, al pie del cerro Santa Ana, rodeado de edificios residenciales, plazas, cafés y restaurantes. Es una de las zonas más fotogénicas de la ciudad, especialmente al atardecer.",
      "En su recorrido encontrarás espacios culturales como el museo dedicado a la música popular guayaquileña y a Julio Jaramillo, además de vistas privilegiadas del río. Conecta directamente con Las Peñas, así que es fácil combinar ambos en una sola caminata.",
    ],
    address: "Junto al río Guayas, al norte de Las Peñas",
    mapsQuery: "Puerto Santa Ana, Guayaquil, Ecuador",
    howToGet: [
      "A pie: continúa desde el extremo norte del Malecón 2000, pasando Las Peñas.",
      "Taxi o app: pide “Puerto Santa Ana”.",
      "Ideal combinarlo con Las Peñas y el Cerro Santa Ana en un mismo paseo.",
    ],
  },
  {
    slug: "mercado-del-rio",
    name: "Mercado del Río",
    tagline: "El food hall del Malecón",
    summary:
      "Un mercado gastronómico frente al río Guayas con decenas de locales de comida ecuatoriana e internacional, dentro del Malecón 2000.",
    paragraphs: [
      "El Mercado del Río es un gran mercado gastronómico ubicado en el Malecón 2000, frente al río Guayas. Reúne bajo un mismo techo decenas de propuestas: comida típica guayaquileña, cocina de autor, opciones internacionales, postres y cafés.",
      "Es una parada perfecta para almorzar durante un recorrido por el malecón: pruebas varios platos en un solo lugar, con aire acondicionado y vista al río. Suele estar animado los fines de semana.",
    ],
    address: "Malecón Simón Bolívar, sector norte del Malecón 2000",
    mapsQuery: "Mercado del Río, Malecón 2000, Guayaquil, Ecuador",
    howToGet: [
      "A pie: dentro del propio Malecón 2000, en su tramo norte, cerca de Las Peñas.",
      "Metrovía: estaciones del centro (Troncal 1) a pocas cuadras.",
      "Taxi o app: pide “Mercado del Río, Malecón”.",
    ],
  },
  {
    slug: "cementerio-patrimonial",
    name: "Cementerio Patrimonial",
    tagline: "La Ciudad Blanca",
    summary:
      "Uno de los cementerios más bellos de Sudamérica: mausoleos de mármol, historia republicana y la tumba de Julio Jaramillo.",
    paragraphs: [
      "El Cementerio General de Guayaquil, conocido como el Cementerio Patrimonial o la “Ciudad Blanca”, es considerado uno de los más hermosos de Sudamérica. Sus avenidas reúnen mausoleos y esculturas de mármol de estilo neoclásico que cuentan la historia de la ciudad y del país.",
      "Aquí descansan expresidentes y personajes ilustres, además de Julio Jaramillo, el “Ruiseñor de América”, cuya tumba sigue recibiendo visitantes. La mejor forma de conocerlo es en una visita guiada o ruta patrimonial, que suelen organizarse los fines de semana.",
    ],
    address: "Av. Pedro Menéndez Gilbert y Julián Coronel, junto al cerro del Carmen",
    mapsQuery: "Cementerio General de Guayaquil, Ecuador",
    howToGet: [
      "Taxi o app: pide “Cementerio Patrimonial” o “Cementerio General”.",
      "Se recomienda ir en horario diurno y, de preferencia, en visita guiada.",
      "Está cerca del centro, junto al cerro del Carmen.",
    ],
  },
  {
    slug: "jardin-botanico",
    name: "Jardín Botánico de Guayaquil",
    tagline: "Orquídeas y mariposas sobre la ciudad",
    summary:
      "Un jardín en lo alto del norte de la ciudad con colecciones de orquídeas, mariposario, aves y vistas panorámicas de Guayaquil.",
    paragraphs: [
      "El Jardín Botánico de Guayaquil, ubicado en una colina del norte de la ciudad, reúne cientos de especies de plantas nativas y exóticas, con su colección de orquídeas como gran protagonista. Sus senderos incluyen un mariposario y zonas donde se observan aves e iguanas.",
      "Por su ubicación elevada ofrece, además, vistas panorámicas de la ciudad. Es un plan tranquilo de media mañana, ideal para amantes de la naturaleza y la fotografía.",
    ],
    address: "Urbanización Las Orquídeas, norte de Guayaquil",
    mapsQuery: "Jardín Botánico de Guayaquil, Ecuador",
    howToGet: [
      "Taxi o app: a unos 20–30 min del centro, según el tráfico.",
      "Auto propio: hay parqueo en el lugar.",
      "Lleva repelente y agua; el recorrido es al aire libre.",
    ],
  },
  {
    slug: "cerro-blanco",
    name: "Bosque Protector Cerro Blanco",
    tagline: "Bosque seco a minutos de la ciudad",
    summary:
      "Reserva de bosque seco tropical en la vía a la Costa, hogar del papagayo de Guayaquil, con senderos y avistamiento de fauna.",
    paragraphs: [
      "El Bosque Protector Cerro Blanco es una reserva de bosque seco tropical a pocos kilómetros de la ciudad, por la vía a la Costa. Protege una gran diversidad de flora y fauna, incluido el papagayo de Guayaquil (guacamayo verde mayor), emblema de la ciudad y especie en peligro.",
      "Cuenta con senderos de distintos niveles que se recorren con guías locales, ideales para el avistamiento de aves y para desconectarse de la ciudad por unas horas. Conviene ir temprano en la mañana y consultar disponibilidad antes de la visita.",
    ],
    address: "Km 16 de la vía a la Costa, Guayaquil",
    mapsQuery: "Bosque Protector Cerro Blanco, Guayaquil, Ecuador",
    howToGet: [
      "Auto propio o taxi/app: por la vía a la Costa, a unos 20–30 min del centro.",
      "Ve temprano: las primeras horas son las mejores para ver fauna.",
      "Lleva zapatos de trekking, agua, gorra y repelente.",
    ],
  },
  {
    slug: "urdesa",
    name: "Urdesa",
    tagline: "El barrio gastronómico clásico",
    summary:
      "Uno de los barrios tradicionales de Guayaquil, con la avenida Víctor Emilio Estrada como eje de restaurantes, cafés y cangrejales.",
    paragraphs: [
      "Urdesa es uno de los barrios residenciales tradicionales de Guayaquil y, para muchos, su zona gastronómica por excelencia. Su eje es la avenida Víctor Emilio Estrada, repleta de restaurantes, cafés, heladerías y tiendas que se animan especialmente por las noches.",
      "Aquí están varios de los cangrejales más conocidos de la ciudad, donde se vive uno de los rituales guayacos por excelencia: la cangrejada. Es el lugar para cenar después de un día de turismo por el centro.",
    ],
    address: "Av. Víctor Emilio Estrada, Urdesa, al noroeste del centro",
    mapsQuery: "Urdesa, Guayaquil, Ecuador",
    howToGet: [
      "Taxi o app: a unos 10–15 min del centro; pide “Urdesa, Víctor Emilio Estrada”.",
      "La avenida principal se recorre bien a pie una vez ahí.",
      "Reserva en los cangrejales más populares los fines de semana.",
    ],
  },
];

export function getPlace(slug: string): Place | undefined {
  return places.find((p) => p.slug === slug);
}
