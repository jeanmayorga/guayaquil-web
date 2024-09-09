import { Metadata } from "next";
import { EventType } from "./types";
import { EventPage } from "./components/EventPage";

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

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const apiUrl = `${process.env.NEXT_PUBLIC_URL}/api/events`;
  const queryParams = new URLSearchParams(searchParams).toString();
  const options: RequestInit = {
    cache: "no-store",
  };
  console.log(`request to ${apiUrl}?${queryParams}`);
  const request = await fetch(`${apiUrl}?${queryParams}`, options);
  const response = await request.json();
  const events: EventType[] = response || [];

  return <EventPage events={events} />;
}
