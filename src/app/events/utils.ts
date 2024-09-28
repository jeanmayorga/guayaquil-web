import { Metadata } from "next";

export const DEFAULT_EVENTS_LIMIT = 9;

export function metadata({
  title,
  tab,
}: {
  title: string;
  tab: string;
}): Metadata {
  return {
    title,
    description:
      "Descubre los eventos y shows más destacados en Guayaquil. Mantente al tanto de los próximos conciertos, exposiciones, festivales y más, organizados cronológicamente para que no te pierdas nada.",
    keywords: [
      "shows",
      "eventos",
      "conciertos",
      "teatro",
      "obras",
      "Eventos en Guayaquil",
      "Shows en Guayaquil",
      "Conciertos Guayaquil",
      "Festivales Guayaquil",
      "Exposiciones Guayaquil",
    ],
    authors: [
      {
        name: "Jean Paul Mayorga",
        url: "https://jeanmayorga.com",
      },
    ],
    robots: "index, follow",
    openGraph: {
      siteName: "Eventos y shows en Guayaquil",
      title,
      description:
        "Explora los eventos y shows en Guayaquil. Encuentra lo que está sucediendo en la ciudad y planifica tu próxima salida.",
      url: `https://guayaquil.app/events/${tab}`,
      type: "website",
      images: [
        {
          url: "https://guayaquil.app/banner.webp",
          width: 1120,
          height: 753,
          alt: title,
        },
      ],
    },
    alternates: {
      canonical: `/events/${tab}`,
    },
  };
}
