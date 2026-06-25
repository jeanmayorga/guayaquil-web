import { getEvent } from "@/app/events/services";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarIcon, MapPin } from "lucide-react";
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
  const multiDay = (startAt || "").slice(0, 10) !== (endAt || "").slice(0, 10);

  return (
    <>
      <Container>
        <section className="mx-auto max-w-2xl mb-8">
          <Image
            src={event.cover_image}
            alt="cover"
            height={390}
            width={450}
            quality={90}
            className="w-full rounded-3xl mb-8"
            style={{ viewTransitionName: `event-image-${event.slug}` }}
          />
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <Suspense>
                <EventNewBadge createdAt={createdAt} />
                <TodayBadge startAt={startAt} endAt={endAt} />
                <DurationBadge startAt={startAt} endAt={endAt} />
                <EndedBadge endAt={endAt} />
              </Suspense>
            </div>

            <h1
              className="mb-5 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl"
              style={{ viewTransitionName: `event-name-${event.slug}` }}
            >
              {event.name}
            </h1>

            <div className="mb-8 flex flex-col gap-3">
              {startAt && (
                <div className="flex items-start gap-3">
                  <CalendarIcon className="mt-0.5 h-5 w-5 flex-none text-cyan-500" />
                  <div className="text-sm">
                    <span className="block font-medium text-foreground first-letter:uppercase">
                      {format(startAt, "EEEE d 'de' LLLL 'de' yyyy", {
                        locale: es,
                      })}
                    </span>
                    <span className="text-muted-foreground">
                      {multiDay
                        ? `Hasta el ${format(endAt, "d 'de' LLLL", {
                            locale: es,
                          })} · ${format(startAt, "H:mm bbbb", { locale: es })}`
                        : format(startAt, "H:mm bbbb", { locale: es })}
                    </span>
                  </div>
                </div>
              )}
              {event.location_name && (
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-none text-cyan-500" />
                  <span className="text-sm text-muted-foreground">
                    {event.location_name}
                  </span>
                </div>
              )}
            </div>

            {event.url && (
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-10 block"
              >
                <Button size="lg" className="w-full rounded-full sm:w-auto">
                  Comprar entradas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            )}

            {event.description && (
              <section className="mb-10">
                <h2 className="mb-3 text-lg font-semibold tracking-tight">
                  Descripción
                </h2>
                <div
                  className="text-sm leading-relaxed text-muted-foreground [&_p]:mb-4"
                  dangerouslySetInnerHTML={{
                    __html: event.description
                      .replace(/<p\b([^>]*)>/g, "<p>")
                      .replace(/<\/?span[^>]*>/g, ""),
                  }}
                />
              </section>
            )}

            {event.tickets && event.tickets.length > 0 && (
              <section className="mb-10">
                <h2 className="mb-3 text-lg font-semibold tracking-tight">
                  Entradas
                </h2>
                <div className="flex flex-col gap-2">
                  {event.tickets.map((ticket) => (
                    <a
                      key={`${ticket.title}-${ticket.price}-${ticket.name}`}
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-4 transition-colors hover:border-cyan-500/60"
                    >
                      <div className="min-w-0">
                        <span className="block font-medium group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                          {ticket.name}
                        </span>
                        {ticket.description && (
                          <span className="block text-xs text-muted-foreground">
                            {ticket.description}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-none items-center gap-3">
                        <span className="font-medium">
                          ${ticket.price.toFixed(2)}
                        </span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-cyan-500" />
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {event.location_name && (
              <section className="mb-10">
                <h2 className="mb-3 text-lg font-semibold tracking-tight">
                  Ubicación
                </h2>
                <iframe
                  title={`Mapa de ${event.location_name}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    event.location_name
                  )}&z=15&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full rounded-2xl border border-border"
                />
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    event.location_name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-400"
                >
                  Cómo llegar
                  <ArrowRight className="h-4 w-4" />
                </a>
              </section>
            )}
          </div>
        </section>
      </Container>
    </>
  );
}
