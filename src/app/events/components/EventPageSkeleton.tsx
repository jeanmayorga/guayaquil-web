import { ArrowPath } from "@/components/icons";
import { EventItemSkeleton } from "./EventItemSkeleton";

export function EventPageSkeleton() {
  return (
    <>
      <section className="my-8">
        <span className="text-gray-400 text-xs flex items-center">
          <ArrowPath className="w-4 h-4 mr-1 animate-spin" />
          Actualizando
        </span>
      </section>
      <section>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {[...Array(6).keys()].map((item) => (
            <EventItemSkeleton key={item} />
          ))}
        </div>
      </section>
    </>
  );
}
