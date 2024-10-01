import type { MetadataRoute } from "next";
import { getEvents } from "./events/services";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = "https://www.guayaquil.app";

  const eventsResponse = await getEvents({ limit: 200, log: "sitemap" });

  const eventPages: MetadataRoute.Sitemap = eventsResponse.events.map(
    (event) => ({
      url: `${domain}/events/${event.slug}`,
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
    {
      url: `${domain}/events`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...eventPages,
  ];
}
