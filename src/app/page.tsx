import { supabase } from "@/lib/supabase";
import { EventType } from "./events/types";
import { EventsSectionScroll } from "./events/components/section-scroll";
import { Metadata } from "next";
import { getEvents } from "./events/services";
import { Title } from "@/components/title";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Ciudad de Guayaquil",
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
    url: "https://guayaquil.app",
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
  const response = await getEvents({
    tab: "all",
    limit: 7,
  });

  return (
    <>
      {/* <main className="container mx-auto max-w-5xl px-4 ms:px-0 mb-10"> */}
      <div>
        <EventsSectionScroll events={response.events} />
      </div>
      {/* </main> */}
    </>
  );

  // return (
  //   <main className="container mx-auto px-4 ms:px-0 my-8">
  //     <section className="rounded-2xl relative overflow-hidden h-[220px] md:h-[300px] lg:h-[600px] mb-8">
  //       <img
  //         src="./block2.jpg"
  //         className="w-full absolute top-1/2 -translate-y-1/2"
  //         alt="Guayaquil"
  //       />
  //       <div className="z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
  //         <h1 className="font-bold drop-shadow-md text-4xl lg:text-8xl lg:mb-8 text-white">
  //           Guayaquil
  //         </h1>
  //         <p className="font-light drop-shadow-xl hidden lg:block lg:text-base text-gray-50">
  //           Conocida como la Perla del Pacífico, esta metrópolis costera se
  //           encuentra a orillas del imponente río Guayas, siendo el principal
  //           puerto del país y un centro económico clave en la región
  //         </p>
  //       </div>
  //       <div className="z-10 bg-black/50 absolute top-0 left-0 w-full h-full" />
  //     </section>
  //     <section>
  //       <EventsSectionScroll events={events} />
  //     </section>
  //   </main>
  // );
}
