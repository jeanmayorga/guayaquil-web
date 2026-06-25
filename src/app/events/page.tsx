import { Container } from "@/components/container";
import { Title } from "@/components/title";
import { getEvents } from "./actions";
import { EventsTimeline, TimelineSection } from "./components/EventsTimeline";

// SSR con ISR: el contenido se prerenderiza y refresca cada 5 min.
export const revalidate = 300;

const SECTIONS: { key: string; label: string; limit: number }[] = [
  { key: "today", label: "Hoy", limit: 50 },
  { key: "this-week", label: "Esta semana", limit: 50 },
  { key: "this-month", label: "Este mes", limit: 50 },
  { key: "next-month", label: "Próximo mes", limit: 50 },
  { key: "past", label: "Pasados", limit: 12 },
];

export default async function Page() {
  const sections: TimelineSection[] = await Promise.all(
    SECTIONS.map(async ({ key, label, limit }) => ({
      key,
      label,
      events: await getEvents({ tab: key, limit }),
    }))
  );

  return (
    <Container>
      <Title title="Eventos" subtitle="Descubre qué hacer en Guayaquil" />
      <EventsTimeline sections={sections} />
    </Container>
  );
}
