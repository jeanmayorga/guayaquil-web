import { BackButton } from "@/components/back-button";
import { supabase } from "@/lib/supabase";
import { EventType } from "../types";
import { CalendarIcon } from "@/components/icons";
import { EventDateFormat } from "../components/EventDateFormat";
import { Button } from "@/components/ui/button";

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const result = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single();
  const event = result.data as EventType;

  return (
    <>
      <BackButton url="/events" />

      <section className="grid grid-cols-2 gap-4">
        <div className="flex justify-center items-center">
          <div
            className="overflow-hidden bg-black rounded-xl"
            style={{ viewTransitionName: `event-image-${event?.slug}` }}
          >
            <img
              src={event?.cover_image}
              alt={event?.name}
              className="aspect-video"
            />
          </div>
        </div>
        <div>
          <div
            className="font-medium text-4xl text-gray-600"
            style={{ viewTransitionName: `event-name-${event.slug}` }}
          >
            {event.name}
          </div>
          <div
            className="flex items-center text-gray-400 text-xl mb-4"
            style={{ viewTransitionName: `event-location-${event.slug}` }}
          >
            {event.location_name}
          </div>

          <div
            className="flex items-center text-cyan-500 font-medium mb-8 text-base gap-2"
            style={{ viewTransitionName: `event-calendar-${event.slug}` }}
          >
            <CalendarIcon />
            <EventDateFormat
              startDate={event.start_date}
              endDate={event.end_date}
            />
          </div>

          <Button variant="outline" className="rounded-full w-full">
            Comprar entradas
          </Button>
        </div>
      </section>
    </>
  );
}
