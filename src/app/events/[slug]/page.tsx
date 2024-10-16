import { getEvent, getEvents } from "@/app/events/services";
import { BackButton } from "@/components/back-button";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { EventActionsButton } from "../components/EventActionsButton";
import { EventBestImage } from "../components/EventBestImage";
import { cn } from "@/lib/utils";
import { differenceInDays, format, isPast } from "date-fns";
import { es } from "date-fns/locale/es";
import { EventBackButton } from "../components/EvemtGoBackButton";
import {
  DurationBadge,
  EndedBadge,
  NewBadge,
  TodayBadge,
} from "../components/EventItem";
import { TZDate } from "@date-fns/tz";

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

  const title = `Guayaquil | ${event.name}`;

  return {
    title,
    applicationName: "Guayaquil",
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
      siteName: "Guayaquil",
      title: title,
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

  const today = new TZDate(new Date(), "America/Guayaquil");
  const startAt = event.start_at;
  const endAt = event.end_at;
  const createdAt = event.created_at;

  return (
    <>
      <section className="relative w-full p-12 bg-gray-800 overflow-hidden mb-16">
        <Image
          src={event.cover_image}
          alt="cover blur"
          height={190}
          width={250}
          quality={40}
          className="blur-xl scale-150 absolute top-0 left-0 w-full h-full transition-all"
        />
        <Container className="relative">
          <div className="flex items-center justify-between mb-12">
            <EventBackButton />

            <EventActionsButton
              slug={slug}
              last_updated={event.last_updated}
              last_cached={response.lastCacheUpdate}
              created_at={event.created_at}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex items-center justify-start">
              <EventBestImage
                src={event.cover_image}
                style={{ viewTransitionName: `event-image-${event.slug}` }}
              />
            </div>
            <div className="flex items-start justify-center flex-col lg:pt-0 pt-8">
              <div
                className="font-medium text-4xl text-white drop-shadow-lg mb-4"
                style={{ viewTransitionName: `event-name-${event.slug}` }}
              >
                {event.name}
              </div>
              <div
                className="text-gray-100 whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: (event.information || "").replace(
                    /<p\b([^>]*)>/g,
                    '<p class="mb-4">'
                  ),
                }}
              />

              <a href={event.url} target="_blank" className="w-full mt-8">
                <Button className="rounded-full w-full" variant="secondary">
                  Comprar entradas
                </Button>
              </a>
            </div>
          </div>
          <div className="flex overflow-x-auto gap-2 mt-8">
            <NewBadge createdAt={createdAt} today={today} />
            <TodayBadge startAt={startAt} endAt={endAt} today={today} />
            <DurationBadge startAt={startAt} endAt={endAt} today={today} />
            <EndedBadge endAt={endAt} />
          </div>
        </Container>
      </section>

      <Container>
        {event.start_at && event.end_at && (
          <section className="mb-12 gap-8">
            <div className="scroll-m-20 font-semibold tracking-tight text-3xl mb-4 block">
              Fecha
            </div>

            <div className={"flex items-center gap-2"}>
              <CalendarIcon className="w-4 h-4" />
              Empieza el{" "}
              {format(startAt, "d 'de' LLLL 'del' yyyy H:mm bbbb", {
                locale: es,
              })}
            </div>
            <div className={"flex items-center gap-2"}>
              <CalendarIcon className="w-4 h-4" />
              Termina el{" "}
              {format(endAt, "d 'de' LLLL 'del' yyyy H:mm bbbb", {
                locale: es,
              })}
            </div>
          </section>
        )}

        {event.description && (
          <section className="mb-12 gap-8">
            <div className="scroll-m-20 font-semibold tracking-tight text-3xl mb-4 block">
              Descripción
            </div>
            <div
              className="text-gray-500 dark:text-gray-300"
              dangerouslySetInnerHTML={{
                __html: event.description
                  .replace(/<p\b([^>]*)>/g, '<p class="mb-4">')
                  .replace(/<\/?span[^>]*>/g, ""),
              }}
            />
          </section>
        )}

        {event.tickets && event.tickets.length > 0 && (
          <section className="mb-12 gap-8">
            <div className="scroll-m-20 font-semibold tracking-tight text-3xl mb-4 block">
              Tickets
            </div>
            {event.tickets?.map((ticket) => (
              <a
                key={`${ticket.title}-${ticket.price}-${ticket.name}`}
                className="group grid grid-cols-1 lg:grid-cols-8 border border-gray-100 dark:border-gray-700 rounded-lg lg:rounded-3xl px-4 lg:px-6 py-4 lg:py-3 mb-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                href={event.url}
                target="_blank"
              >
                <div className="flex items-center justify-start text-gray-400 text-sm mb-4 lg:mb-0">
                  {ticket.title}
                </div>
                <div className="col-span-5 flex items-start justify-center flex-col mb-4 lg:mb-0">
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
                <div className="flex items-center lg:justify-end">
                  <span className="text-xs mr-3 text-gray-400 dark:text-gray-200 -translate-x-2 group-hover:translate-x-2 transition-all">
                    Comprar
                  </span>
                  <ArrowRight className="w-6 h-6 text-gray-400 dark:text-gray-200 -translate-x-2 group-hover:translate-x-2 transition-all" />
                </div>
              </a>
            ))}
          </section>
        )}

        {event.location_name && (
          <section className="gap-8">
            <div className="scroll-m-20 font-semibold tracking-tight text-3xl mb-4 block">
              Lugar
            </div>

            <div className="text-gray-500 dark:text-gray-400 mb-4">
              {event.location_name}
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${event.location_name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?size=640x400&zoom=14&maptype=roadmap\&markers=size:mid%7Ccolor:red%7C${event.location_name}&key=AIzaSyBn6Gu0M2bZgVZ-NioKAVtrrGc1yKraYk0`}
                className="rounded-2xl w-full lg:w-auto shadow"
              />
            </a>
          </section>
        )}
        <div className="h-[100px] w-full" />
      </Container>
    </>
  );
}
