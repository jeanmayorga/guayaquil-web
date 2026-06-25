import { Metadata } from "next";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Link } from "next-view-transitions";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { getEvents } from "./events/actions";
import { EventItem } from "./events/components/EventItem";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Ciudad de Guayaquil",
  description:
    "Descubre los eventos y shows más destacados en Guayaquil. Conciertos, obras, exposiciones, festivales y más.",
  keywords: [
    "Eventos en Guayaquil",
    "Shows en Guayaquil",
    "Conciertos Guayaquil",
    "Festivales Guayaquil",
    "Exposiciones Guayaquil",
  ],
  authors: [{ name: "Jean Paul Mayorga", url: "https://jeanmayorga.com" }],
  robots: "index, follow",
  openGraph: {
    siteName: "Guayaquil App",
    title: "Eventos y shows en la ciudad de Guayaquil",
    description:
      "Explora los eventos y shows más importantes en Guayaquil y planifica tu próxima salida.",
    url: "https://guayaquil.app",
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
  alternates: { canonical: "/" },
};

export default async function Home() {
  const events = await getEvents({ tab: "all", limit: 6 });

  return (
    <Container>
      <section className="relative mb-12 h-[300px] overflow-hidden rounded-3xl md:h-[400px]">
        <img
          src="/block2.jpg"
          alt="Guayaquil"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
        <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-12">
          <span className="mb-3 flex items-center gap-2 text-sm font-medium text-cyan-300">
            <MapPin className="h-4 w-4" />
            Guayaquil, Ecuador
          </span>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Qué hacer en la ciudad
          </h1>
          <p className="mb-6 max-w-xl text-balance text-gray-100 md:text-lg">
            Los mejores conciertos, obras, exposiciones y shows de Guayaquil,
            en un solo lugar.
          </p>
          <div>
            <Link href="/events">
              <Button size="lg" className="rounded-full">
                <CalendarDays className="mr-2 h-4 w-4" />
                Ver eventos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Próximos eventos
          </h2>
          <Link
            href="/events"
            className="flex items-center gap-1 text-sm font-medium text-cyan-600 transition-colors hover:text-cyan-700 dark:text-cyan-400"
          >
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, idx) => (
            <EventItem key={event.slug} event={event} idx={idx} />
          ))}
        </div>
      </section>
    </Container>
  );
}
