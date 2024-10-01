import type { MetadataRoute } from "next";
import { getEvents } from "./events/services";

export const revalidate = 3600;

export const tabs = [
  {
    name: "Pasados",
    pathname: "/events/past",
  },
  {
    name: "Todos",
    pathname: "/events/all",
  },
  {
    name: "Hoy",
    pathname: "/events/today",
  },
  {
    name: "Esta semana",
    pathname: "/events/this-week",
  },
  {
    name: "Este mes",
    pathname: "/events/this-month",
  },
  {
    name: "Siguiente mes",
    pathname: "/events/next-month",
  },
];

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
