import type { MetadataRoute } from "next";
import { tabs } from "./events/utils";
import { getEvents } from "./events/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = "https://www.guayaquil.app";

  const tabsPages: MetadataRoute.Sitemap = tabs.map((tab) => ({
    url: `${domain}/events/${tab.key}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  }));

  const eventsResponse = await getEvents({ limit: 200 });

  const eventPages: MetadataRoute.Sitemap = eventsResponse.events.map(
    (event) => ({
      url: `${domain}/event/${event.slug}`,
      lastModified: event.last_updated,
      changeFrequency: "daily",
      priority: 1,
    })
  );

  return [
    {
      url: domain,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...tabsPages,
    ...eventPages,
  ];
}
