import { Metadata } from "next";
import { EventPage } from "../components/EventPage";
import { getEvents } from "../services";
import { DEFAULT_EVENTS_LIMIT } from "../utils";

interface Props {
  searchParams: Record<string, string>;
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Buscar eventos y shows en Guayaquil";

  return {
    title,
    description:
      "Descubre los eventos y shows más destacados en Guayaquil. Mantente al tanto de los próximos conciertos, exposiciones, festivales y más, organizados cronológicamente para que no te pierdas nada.",
    keywords: [
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
      siteName: "Eventos en Guayaquil",
      title,
      description:
        "Explora los eventos y shows más importantes en Guayaquil. Encuentra lo que está sucediendo en la ciudad y planifica tu próxima salida.",
      url: "https://guayaquil.app/eventos",
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
  };
}

export default async function Home({ searchParams }: Props) {
  const tab = "all";
  const query = searchParams.query;
  const limit = DEFAULT_EVENTS_LIMIT;
  const page = 1;
  const response = await getEvents({ tab, page, limit, query });

  return (
    <EventPage
      lastCacheUpdate={response.lastCacheUpdate}
      events={response.events}
      tab={tab}
    />
  );
}
