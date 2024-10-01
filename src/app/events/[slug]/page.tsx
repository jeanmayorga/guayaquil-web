import { getEvent, getEvents } from "@/app/events/services";
import { BackButton } from "@/components/back-button";
import { Container } from "@/components/container";
import { LeftArrowIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { CheckCircle, MapPin, TimerIcon } from "lucide-react";
import { Metadata } from "next";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const response = await getEvent({ slug, log: "generateMetadata" });
  const event = response.event;

  if (!event) {
    return notFound();
  }

  return {
    title: event?.name,
    description: `${event?.name}, ${event.location_name}`,
    keywords: [
      event?.name,
      event.location_name,
      event.slug,
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
      siteName: `${event?.name} en Guayaquil`,
      title: event?.name,
      description: `${event?.name}, ${event.location_name}`,
      url: `https://guayaquil.app/events/${event.slug}`,
      type: "website",
      images: [
        {
          url: event.cover_image,
          width: 1120,
          height: 753,
          alt: event?.name,
        },
      ],
    },
    alternates: {
      canonical: `https://guayaquil.app/events/${event.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const response = await getEvents({ limit: 200 });
  const events = response.events;

  return events.map((event) => ({ slug: event.slug }));
}

export default async function Page({ params }: Props) {
  const slug = params.slug;
  const response = await getEvent({ slug, log: "Page" });
  const event = response.event;

  if (!event) {
    return notFound();
  }

  return (
    <>
      <section className="relative w-full p-12 bg-cyan-500 overflow-hidden">
        <Image
          src={event.cover_image}
          alt="cover blur"
          height={190}
          width={250}
          quality={40}
          className="blur-xl scale-150 absolute top-0 left-0 w-full h-full transition-all"
        />
        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex items-center justify-start">
              <Image
                src={event.cover_image}
                alt="cover"
                height={190}
                width={250}
                quality={40}
                className="shadow shadow-black rounded-lg w-2/3"
                style={{ viewTransitionName: `event-image-${event.slug}` }}
              />
            </div>
            <div className="flex items-start justify-center flex-col lg:pt-0 pt-8">
              <div
                className="font-medium text-4xl text-white drop-shadow-lg"
                style={{ viewTransitionName: `event-name-${event.slug}` }}
              >
                {event.name}
              </div>

              <div>
                <div className="flex items-center text-gray-100 text-xs gap-2 transition-all mb-1">
                  <MapPin className="w-4 h-4" />
                  {event.location_name}
                </div>
              </div>

              <a href={event.url} target="_blank" className="w-full my-8">
                <Button className="rounded-full w-full" variant="secondary">
                  Comprar entradas
                </Button>
              </a>

              <div className="flex text-xs text-gray-200">
                <TimerIcon className="w-4 h-4 mr-1" />
                Ultima actualización:
                {new Intl.DateTimeFormat("es-EC", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  timeZone: "America/Guayaquil",
                }).format(new Date(response.lastCacheUpdate))}
              </div>
              <div className="flex text-xs text-gray-200">
                <TimerIcon className="w-4 h-4 mr-1" />
                Ultimo cambio:
                {new Intl.DateTimeFormat("es-EC", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  timeZone: "America/Guayaquil",
                }).format(new Date(response.event.last_updated))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <BackButton to="/events" />
        <section className="mt-8 gap-8">
          {(event.tickets || [])?.length > 0 && (
            <div className="scroll-m-20 font-semibold tracking-tight text-3xl mb-4 block">
              Tickets
            </div>
          )}
          {event.tickets?.map((ticket) => (
            <a
              key={`${ticket.title}-${ticket.price}-${ticket.name}`}
              className="grid grid-cols-1 lg:grid-cols-6 border border-gray-100 dark:border-gray-700 rounded-lg lg:rounded-3xl px-4 lg:px-6 py-4 lg:py-2 mb-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              href={event.url}
              target="_blank"
            >
              <div className="flex items-center justify-start text-gray-400 text-sm">
                {ticket.title}
              </div>
              <div className="col-span-4 flex items-start justify-center flex-col">
                <span className="block dark:text-white text-black text-bold text-base">
                  {ticket.name}
                </span>
                <span className="text-gray-400 text-sm block">
                  {ticket.description}
                </span>
              </div>
              <div className="flex items-center lg:justify-end dark:text-white text-gray-800 text-sm">
                $ {ticket.price.toFixed(2)} USD
              </div>
            </a>
          ))}
        </section>
      </Container>
    </>
  );
}
