import { Metadata } from "next";
import { EventsPage } from "../components/EventsPage";
import { getEvents } from "../services";
import { DEFAULT_EVENTS_LIMIT, metadata } from "../utils";
import { EventTab } from "../types";

const tab: EventTab = "all";

export function generateMetadata(): Metadata {
  const title = "Todos los eventos y shows en Guayaquil";

  return metadata({ title, tab });
}

export default async function Page() {
  const response = await getEvents({
    tab,
    page: 1,
    limit: DEFAULT_EVENTS_LIMIT,
    query: undefined,
  });

  return (
    <EventsPage
      lastCacheUpdate={response.lastCacheUpdate}
      events={response.events}
      tab={tab}
    />
  );
}
