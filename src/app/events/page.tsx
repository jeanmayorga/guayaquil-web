import { Container } from "@/components/container";
import { Title } from "@/components/title";
import { getEvents } from "./actions";
import { EventsTimeline } from "./components/EventsTimeline";
import { SECTIONS, PAGE_SIZE, InitialEvents } from "./sections";

// SSR del primer lote de cada sección + ISR: el crawler ve eventos reales y
// el contenido se refresca cada hora (los cambios diarios entran solos).
export const revalidate = 3600;

export default async function Page() {
  const entries = await Promise.all(
    SECTIONS.map(async (s) => {
      const events = await getEvents({ tab: s.key, page: 1, limit: PAGE_SIZE });
      return [s.key, events] as const;
    })
  );
  const initial: InitialEvents = Object.fromEntries(entries);

  return (
    <Container>
      <Title title="Eventos" subtitle="Descubre qué hacer en Guayaquil" />
      <EventsTimeline initial={initial} />
    </Container>
  );
}
