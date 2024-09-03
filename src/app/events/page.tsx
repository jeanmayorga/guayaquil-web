import { supabase } from "@/lib/supabase";
import { EventType } from "./types";
import { Event } from "./components/Event";
import { Button } from "@/components/ui/button";
import { LeftIcon } from "@/components/icons";
import Link from "next/link";
import { Metadata } from "next";

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

export default async function Home() {
  const { data } = await supabase
    .from("events")
    .select("*")
    .order("start_date", { ascending: true });
  const events = data as EventType[];

  return (
    <main className="container mx-auto px-4 ms:px-0 my-8">
      <div className="mb-8">
        <Link href="/">
          <Button variant="outline" className="rounded-full">
            <LeftIcon /> Regresar
          </Button>
        </Link>
      </div>
      <header className="md:flex md:items-end md:justify-between">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Eventos en la ciudad de Guayaquil
          </h1>
          <p className="text-gray-400 mb-8">
            Ultima actualización el{" "}
            {new Date(events[0].last_updated).toLocaleDateString("es-LA", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <p className="text-gray-400 mb-8">{events.length} eventos</p>
      </header>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {events.map((event) => (
          <Event event={event} key={event.slug} fullWidth />
        ))}
      </div>
    </main>
  );
}
