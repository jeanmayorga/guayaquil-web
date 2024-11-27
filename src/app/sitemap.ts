import type { MetadataRoute } from "next";
import { getEvents } from "./events/actions";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = "https://www.guayaquil.app";

  const events = await getEvents({ limit: 200 });

  const eventPages: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${domain}/events/${event.slug}`,
    lastModified: event.last_updated,
    changeFrequency: "daily",
    priority: 1,
  }));

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
