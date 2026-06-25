import { Container } from "@/components/container";
import { Title } from "@/components/title";
import { EventsTimeline } from "./components/EventsTimeline";

export default function Page() {
  return (
    <Container>
      <Title title="Eventos" subtitle="Descubre qué hacer en Guayaquil" />
      <EventsTimeline />
    </Container>
  );
}
