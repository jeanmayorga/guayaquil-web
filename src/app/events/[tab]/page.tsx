import { Metadata } from "next";
import { EventPage } from "../components/EventPage";
import { getEvents } from "../services";

interface Props {
  params: {
    tab: string;
  };
  searchParams: Record<string, string>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tab = params.tab;
  let title = "Eventos y shows en Guayaquil";

  if (tab === "today") {
    title = "Hoy, eventos y shows en Guayaquil";
  }
  if (tab === "tomorrow") {
    title = "Mañana, ventos y shows en Guayaquil";
  }
  if (tab === "this_week") {
    title = "Esta semana, eventos y shows en Guayaquil";
  }
  if (tab === "next_week") {
    title = "Siguiente semana, eventos y shows en Guayaquil";
  }
  if (tab === "this_month") {
    title = "Este mes, eventos y shows en Guayaquil";
  }
  if (tab === "next_month") {
    title = "Siguiente mes, eventos y shows en Guayaquil";
  }

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
          url: "https://guayaquil.app/block2.jpg",
          width: 1120,
          height: 753,
          alt: title,
        },
      ],
    },
  };
}

export default async function Home({ params, searchParams }: Props) {
  const tab = params.tab;
  const query = searchParams.query;
  const events = await getEvents({ tab, query });

  return <EventPage events={events} />;
}