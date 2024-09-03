import { supabase } from "@/lib/supabase";
import { EventType } from "./events/types";
import { EventsSectionScroll } from "./events/components/section-scroll";

export default async function Home() {
  const { data } = await supabase
    .from("events")
    .select("*")
    .limit(9)
    .order("start_date", { ascending: true });
  const events = data as EventType[];

  return (
    <main className="container mx-auto px-4 ms:px-0 my-8">
      <section className="rounded-2xl relative overflow-hidden h-[220px] md:h-[300px] lg:h-[600px] mb-8">
        <img
          src="./block3.webp"
          className="w-full absolute top-1/2 -translate-y-1/2"
        />
        <div className="z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="font-bold drop-shadow-md text-4xl lg:text-8xl lg:mb-8 text-white">
            Guayaquil
          </h1>
          <p className="font-light drop-shadow-md hidden lg:block lg:text-base text-gray-100">
            Conocida como la Perla del Pacífico, esta metrópolis costera se
            encuentra a orillas del imponente río Guayas, siendo el principal
            puerto del país y un centro económico clave en la región
          </p>
        </div>
        <div className="z-10 bg-black/50 absolute top-0 left-0 w-full h-full" />
      </section>
      <section>
        <EventsSectionScroll events={events} />
      </section>
    </main>
  );
}
