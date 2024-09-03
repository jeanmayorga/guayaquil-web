import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { EventType } from "./types";

export default async function Page() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("start_date", { ascending: true });

  const events = data as EventType[];

  return (
    <main className="m-80">
      <h2 className=" font-semibold text-2xl mb-4">Upcoming Events</h2>
      <div className="overflow-x-auto gap-8 grid grid-cols-4">
        {events?.map((event) => (
          <a key={event.slug} href={event.url} target="_blank">
            <div className="gap-8">
              <div className="relative h-[190px] overflow-hidden rounded-lg mb-4 bg-black">
                <img
                  src={event.cover_image}
                  alt={event.name}
                  className="rounded-md w-full absolute top-1/2 -translate-y-1/2"
                />
              </div>
              <div>
                <p className="text-sm text-cyan-700 font-semibold mb-1">
                  {new Date(event.start_date).toLocaleDateString("es-LA", {
                    month: "long",
                    day: "2-digit",
                  })}
                </p>
                <h3 className="font-semibold">{event.name}</h3>
                <p className="text-sm text-gray-500">{event.location_name}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
