import { supabase } from "@/lib/supabase";
import { EventType } from "./types";
import { CheckCircle, ExclamationCircle } from "@/components/icons";
import { Metadata } from "next";
import { EventItem } from "./components/EventItem";
import { DEFAULT_TAB } from "./constants";
import { searchParamsCache } from "./search-params";

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

interface Props {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function Home({ searchParams }: Props) {
  console.log({ searchParams });
  const { search, tab } = searchParamsCache.parse(searchParams);

  let client = supabase.from("events").select("*");

  if (search) client = client.ilike("name", `%${search}%`);

  const { data } = await client.order("start_date", { ascending: true });
  const events = data as EventType[];

  await new Promise((r) => setTimeout(r, 1000));

  return (
    <>
      <section className="my-8 flex justify-center items-center">
        <span className="text-gray-400 text-sm flex items-center">
          {events.length === 0 ? (
            <>
              <ExclamationCircle className="w-5 h-5 mr-1" />
              No hay shows o eventos.
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 mr-1" />
              Actualizado{" "}
              {new Date(events[0]?.last_updated).toLocaleDateString("es-EC", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </>
          )}
        </span>
      </section>
      <section>
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
          {events.map((event) => (
            <EventItem event={event} key={event.slug} />
          ))}
        </div>
      </section>
    </>
  );
}
