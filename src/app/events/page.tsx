import { Metadata } from "next";
import { Suspense } from "react";
import { EventsSearch } from "./components/EventsSearch";
import { EventsTabs } from "./components/EventsTabs";
import { Container } from "@/components/container";
import { Title } from "@/components/title";
import { EventsActionsButton } from "./components/EventsActionsButton";
import { EventBackButton } from "./components/EvemtGoBackButton";
import { EventsListItems } from "./components/EventsListItems";

interface Props {
  searchParams: Record<string, string>;
}

export function generateMetadata(): Metadata {
  const title = "Eventos, shows y conciertos en Guayaquil";

  return {
    title,
    applicationName: "Guayaquil",
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
      siteName: "Guayaquil",
      title,
      description:
        "Explora los eventos y shows en Guayaquil. Encuentra lo que está sucediendo en la ciudad y planifica tu próxima salida.",
      url: `https://guayaquil.app/events`,
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
    alternates: {
      canonical: `https://guayaquil.app/events`,
    },
  };
}

export default async function Page({ searchParams }: Props) {
  // const options: GetEventEventsOptions = {
  //   tab: (searchParams.tab as EventTab) || DEFAULT_EVENTS_TAB,
  //   query: (searchParams.query as string) || undefined,
  //   page: 1,
  //   limit: DEFAULT_EVENTS_LIMIT,
  //   log: "EventList",
  // };

  return (
    <Container>
      <div className="flex items-center justify-between my-8">
        <EventBackButton />
        <EventsActionsButton />
      </div>

      <Title title="Eventos" />

      <Suspense fallback={<>Cargando..</>}>
        <EventsSearch />
        <EventsTabs />
      </Suspense>

      {/* <Suspense key={JSON.stringify(options)} fallback={<EventsListSkeleton />}> */}
      <EventsListItems />
      {/* </Suspense> */}
    </Container>
  );
}
