import { Metadata } from "next";
import EventsList from "./components/EventList";
import { supabase } from "@/lib/supabase";
import { EventType } from "./types";

export const metadata: Metadata = {
  title: "Eventos y shows en la ciudad de Guayaquil",
  description:
    "Descubre los eventos y shows más destacados en Guayaquil. Mantente al tanto de los próximos conciertos, exposiciones, festivales y más, organizados cronológicamente para que no te pierdas nada.",
  keywords: [
    "Eventos en Guayaquil",
    "Shows en Guayaquil",
    "Conciertos Guayaquil",
    "Festivales Guayaquil",
    "Exposiciones Guayaquil",
  ],
  authors: [
    {
      name: "Jean Paul Mayorga",
      url: "https://jeanmayorga.com",
    },
  ],
  robots: "index, follow",
  openGraph: {
    siteName: "Guayaquil App",
    title: "Eventos y shows en la ciudad de Guayaquil",
    description:
      "Explora los eventos y shows más importantes en Guayaquil. Encuentra lo que está sucediendo en la ciudad y planifica tu próxima salida.",
    url: "https://guayaquil.app/eventos",
    type: "website",
    images: [
      {
        url: "https://guayaquil.app/block2.jpg",
        width: 1120,
        height: 753,
        alt: "Eventos en Guayaquil",
      },
    ],
  },
};

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let client = supabase.from("events").select("*");

  if (searchParams?.search) {
    client = client.ilike("name", `%${searchParams.search}%`);
  }

  const tab = searchParams?.tab;
  const today = new Date();

  if (tab === "today") {
    client = client.lte("start_date", today.toISOString());
    client = client.gte("end_date", today.toISOString());
  }

  if (tab === "thisWeek") {
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startOfWeekString = startOfWeek.toISOString().split("T")[0];
    const endOfWeekString = endOfWeek.toISOString().split("T")[0];

    client = client
      .gte("end_date", startOfWeekString)
      .lte("start_date", endOfWeekString);
  }

  if (tab === "thisMonth") {
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    client = client
      .gte("start_date", startOfMonth.toISOString())
      .lte("end_date", endOfMonth.toISOString());
  }

  const { data } = await client.order("start_date", { ascending: true });

  const events = (data || []) as EventType[];

  return <EventsList events={events} />;
}
