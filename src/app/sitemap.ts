import type { MetadataRoute } from "next";
import { getEvents } from "./events/actions";
import { places } from "./sobre-guayaquil/places";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = "https://guayaquil.app";

  const events = await getEvents({ limit: 200 });

  const placePages: MetadataRoute.Sitemap = places.map((place) => ({
    url: `${domain}/sobre-guayaquil/${place.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

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
    {
      url: `${domain}/sobre-guayaquil`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...placePages,
    ...eventPages,
  ];
}
