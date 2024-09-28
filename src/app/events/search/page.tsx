import { Metadata } from "next";
import { EventsPage } from "../components/EventsPage";
import { getEvents } from "../services";
import { DEFAULT_EVENTS_LIMIT, metadata } from "../utils";
import { EventTab } from "../types";

const tab: EventTab = "all";

interface Props {
  searchParams: Record<string, string>;
}

export function generateMetadata(): Metadata {
  const title = "Buscar eventos y shows en Guayaquil";

  return metadata({ title, tab });
}

export default async function Home({ searchParams }: Props) {
  const response = await getEvents({
    tab,
    page: 1,
    limit: DEFAULT_EVENTS_LIMIT,
    query: searchParams.query,
  });

  return (
    <EventsPage
      lastCacheUpdate={response.lastCacheUpdate}
      events={response.events}
      tab={tab}
    />
  );
}
