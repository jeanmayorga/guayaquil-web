import { getEvent } from "@/app/events/services";
import { Container } from "@/components/container";
import { ArrowRight, CalendarIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { EventBackButton } from "../components/EvemtGoBackButton";
import { Suspense } from "react";
import { EventNewBadge } from "../components/EventNewBadge";
import { TodayBadge, DurationBadge, EndedBadge } from "../components/EventItem";
import { getEvents } from "../actions";

// Estático en build (generateStaticParams) + ISR: refresca el contenido y
// genera on-demand los eventos nuevos del cron sin necesidad de redeploy.
export const revalidate = 3600;

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
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
    description: event.description,
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
      images: [
        {
          url: event.cover_image,
          width: 1120,
          height: 753,
          alt: event?.name,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const events = await getEvents({ limit: 200 });
  return events.map((event) => ({ slug: event.slug }));
}

export default async function Page(props: Props) {
  const params = await props.params;
  const slug = params.slug;
  const response = await getEvent({ slug, log: "Page" });
  const event = response.event;

  if (!event) {
    return notFound();
  }

  const startAt = event.start_at;
  const endAt = event.end_at;
  const createdAt = event.created_at;

  return (
    <>
      <Container>
        <section className="md:grid md:grid-cols-2 md:gap-12 mb-8">
          <Image
            src={event.cover_image}
            alt="cover"
            height={390}
            width={450}
            quality={90}
            className="w-full rounded-3xl transition-all relative md:sticky top-8 mb-12 md:mb-0"
            style={{ viewTransitionName: `event-image-${event.slug}` }}
          />
          <div className="pt-8 md:px-6">
            <div
              className="font-semibold text-balance text-center text-5xl text-foreground mb-4"
              style={{ viewTransitionName: `event-name-${event.slug}` }}
            >
              {event.name}
            </div>
            <div
              className="text-gray-500 whitespace-pre-wrap text-balance text-center text-xs mb-3"
              dangerouslySetInnerHTML={{
                __html: (event.information || "").replace(
                  /<p\b([^>]*)>/g,
                  '<p class="mb-1">'
                ),
              }}
            />

            <div className="flex justify-center overflow-x-auto gap-2 mb-12">
              <Suspense>
                <EventNewBadge createdAt={createdAt} />
                <TodayBadge startAt={startAt} endAt={endAt} />
                <DurationBadge startAt={startAt} endAt={endAt} />
                <EndedBadge endAt={endAt} />
              </Suspense>
            </div>

            {event.start_at && event.end_at && (
              <section className="mb-12 gap-8">
                <div className="font-semibold text-sm uppercase tracking-tight mb-2 text-[#0397b0]">
                  Fecha:
                </div>

                <div className="flex items-start gap-1 text-gray-600 dark:text-gray-300 text-sm">
                  <CalendarIcon className="w-4 h-4 mt-[2px]" />
                  Empieza el{" "}
                  {format(startAt, "d 'de' LLLL 'del' yyyy H:mm bbbb", {
                    locale: es,
                  })}
                </div>
                <div className="flex items-start gap-1 text-gray-600 dark:text-gray-300 text-sm">
                  <CalendarIcon className="w-4 h-4 mt-[2px]" />
                  Termina el{" "}
                  {format(endAt, "d 'de' LLLL 'del' yyyy H:mm bbbb", {
                    locale: es,
                  })}
                </div>
              </section>
            )}

            {event.description && (
              <section className="mb-12 gap-8">
                <div className="font-semibold text-sm uppercase tracking-tight mb-2 text-[#0397b0]">
                  Descripción
                </div>
                <div
                  className="text-gray-600 dark:text-gray-300 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: event.description
                      .replace(/<p\b([^>]*)>/g, '<p class="mb-4">')
                      .replace(/<\/?span[^>]*>/g, ""),
                  }}
                />
              </section>
            )}

            {event.location_name && (
              <section className="mb-12 gap-8">
                <div className="font-semibold text-sm uppercase tracking-tight mb-2 text-[#0397b0]">
                  Lugar
                </div>

                <div className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {event.location_name}
                </div>
                <iframe
                  title={`Mapa de ${event.location_name}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    event.location_name
                  )}&z=15&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-3xl w-full h-64 border-0 shadow"
                />
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    event.location_name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#0397b0] hover:underline"
                >
                  Cómo llegar
                  <ArrowRight className="w-4 h-4" />
                </a>
              </section>
            )}

            {event.tickets && event.tickets.length > 0 && (
              <section className="mb-12 gap-8">
                <div className="font-semibold text-sm uppercase tracking-tight mb-2 text-[#0397b0]">
                  Tickets
                </div>
                {event.tickets?.map((ticket) => (
                  <a
                    key={`${ticket.title}-${ticket.price}-${ticket.name}`}
                    className="group grid grid-cols-8 bg-white rounded-3xl px-4 lg:px-6 py-4 lg:py-3 mb-2 border border-transparent hover:border hover:border-[#0397b0] dark:bg-black dark:hover:bg-gray-700 transition-all"
                    href={event.url}
                    target="_blank"
                  >
                    <div className="col-span-5 flex items-start justify-center flex-col mb-4 lg:mb-0">
                      <span className="block dark:text-white group-hover:text-[#0397b0] text-black text-bold text-base">
                        {ticket.name}
                      </span>
                      <span className="text-gray-400 text-sm block">
                        {ticket.description}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center lg:justify-end group-hover:text-[#0397b0] dark:text-white text-gray-500">
                      $ {ticket.price.toFixed(2)} USD
                    </div>
                    <div className="flex items-center lg:justify-end">
                      <ArrowRight className="w-6 h-6 group-hover:text-[#0397b0] text-gray-400 dark:text-gray-200 -translate-x-2 group-hover:translate-x-2 transition-all" />
                    </div>
                  </a>
                ))}
              </section>
            )}
          </div>
        </section>
      </Container>
    </>
  );
}
