import { BackButton } from "@/components/back-button";
import { supabase } from "@/lib/supabase";
import { EventType } from "../types";
import { CalendarIcon } from "@/components/icons";
import { EventDateFormat } from "../components/EventDateFormat";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/title";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const result = await supabase
    .from("events")
    .select("*")
    .eq("slug", params.slug)
    .single();

  const event = result.data as EventType;

  return {
    title: `Guayaquil Shows | ${event.name}`,
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
      siteName: `Guayaquil Shows | ${event.name}`,
      title: `Evento ${event.name} y shows en la ciudad de Guayaquil`,
      description:
        "Explora los eventos y shows más importantes en Guayaquil. Encuentra lo que está sucediendo en la ciudad y planifica tu próxima salida.",
      url: `https://guayaquil.app/events/${event.slug}`,
      type: "website",
      images: [
        {
          url: event.cover_image,
          alt: `Guayaquil Shows | ${event.name}`,
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const result = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single();

  const event = result.data as EventType;

  return (
    <>
      <BackButton url="/events" text="Shows en Guayaquil" />

      <Title title={event.name} />
      <section className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div className="flex justify-center items-center">
          <div
            className="overflow-hidden bg-black rounded-xl"
            style={{ viewTransitionName: `event-image-${event?.slug}` }}
          >
            <img
              src={event?.cover_image}
              alt={event?.name}
              className="aspect-video"
            />
          </div>
        </div>
        <div>
          <div
            className="font-medium text-4xl text-gray-600"
            style={{ viewTransitionName: `event-name-${event.slug}` }}
          >
            {event.name}
          </div>
          <div
            className="flex items-center text-gray-400 text-xl mb-4"
            style={{ viewTransitionName: `event-location-${event.slug}` }}
          >
            {event.location_name}
          </div>

          <div
            className="flex items-center text-cyan-500 font-medium mb-8 text-base gap-2"
            style={{ viewTransitionName: `event-calendar-${event.slug}` }}
          >
            <CalendarIcon />
            <EventDateFormat
              startDate={event.start_date}
              endDate={event.end_date}
            />
          </div>

          <a href={event.url} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="rounded-full w-full bg-cyan-500 hover:bg-cyan-600 text-white hover:text-white active:active:scale-95 transition-all"
            >
              Comprar entradas
            </Button>
          </a>
        </div>
      </section>
    </>
  );
}
