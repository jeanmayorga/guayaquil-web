import { Metadata } from "next";
import { EventPage } from "../components/EventPage";
import { getEvents } from "../services";
import { DEFAULT_EVENTS_LIMIT, tabs } from "../utils";

interface Props {
  params: {
    tab: string;
  };
  searchParams: Record<string, string>;
}

export function generateMetadata({ params }: Props): Metadata {
  const tab = params.tab;

  let title = "Eventos y shows en Guayaquil";
  if (tab === "all") {
    title = "Todos los eventos y shows en Guayaquil";
  }
  if (tab === "past") {
    title = "Los eventos y shows pasados en Guayaquil";
  }
  if (tab === "today") {
    title = "Eventos y shows de hoy en Guayaquil ";
  }
  if (tab === "tomorrow") {
    title = "Eventos y shows de mañana en Guayaquil";
  }
  if (tab === "this_week") {
    title = "Los eventos de esta semana en Guayaquil";
  }
  if (tab === "next_week") {
    title = "Siguiente semana, eventos y shows en Guayaquil";
  }
  if (tab === "this_month") {
    title = "Este mes, eventos y shows en Guayaquil";
  }

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
  };
}

export function generateStaticParams() {
  return tabs;
}

export default async function Home({ params }: Props) {
  const tab = params.tab;
  const query = undefined;
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
