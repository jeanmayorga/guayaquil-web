import { ArrowPath } from "@/components/icons";
import { EventItemSkeleton } from "./EventItemSkeleton";
import { BackButton } from "@/components/back-button";
import { Title } from "@/components/title";
import { EventsSearch } from "./EventsSearch";
import { EventsTab } from "./EventsNav";

export function EventListSkeleton() {
  return (
    <>
      <BackButton />
      <Title title="Shows en Guayaquil" />
      <EventsSearch />
      <EventsTab />

      <section className="my-8 flex justify-center items-center">
        <span className="text-gray-400 text-xs flex items-center">
          <ArrowPath className="w-4 h-4 mr-1 animate-spin" />
          Actualizando
        </span>
      </section>

      <section>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {[...Array(9).keys()].map((item) => (
            <EventItemSkeleton key={item} />
          ))}
        </div>
      </section>
    </>
  );
}
