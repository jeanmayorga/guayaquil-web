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
];

export function getPlace(slug: string): Place | undefined {
  return places.find((p) => p.slug === slug);
}
