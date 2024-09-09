import { Metadata } from "next";
import { EventPage } from "./components/EventPage";
import { getEvents } from "./services";

interface Props {
  params: {
    tab: string;
  };
  searchParams: Record<string, string | undefined>;
}

export const metadata: Metadata = {
  title: "Eventos y shows en la ciudad de Guayaquil",
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
    siteName: "Guayaquil App",
    title: "Eventos y shows en la ciudad de Guayaquil",
    description:
      "Explora los eventos y shows más importantes en Guayaquil. Encuentra lo que está sucediendo en la ciudad y planifica tu próxima salida.",
    url: "https://guayaquil.app/eventos",
    type: "website",
    images: [
      {
        url: "https://guayaquil.app/block2.jpg",
        width: 1120,
        height: 753,
        alt: "Eventos en Guayaquil",
      },
    ],
  },
};

export default async function Home({ searchParams }: Props) {
  const tab = "today";
  const query = searchParams.query;
  const events = await getEvents({ tab, query });

  return <EventPage events={events} />;
}
