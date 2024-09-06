"use client";

import { ArrowPath } from "@/components/icons";
import { EventItemSkeleton } from "./components/EventItemSkeleton";

export default async function Loading() {
  return (
    <>
      <section className="my-8 flex justify-center items-center">
        <span className="text-gray-400 text-sm flex items-center">
          <ArrowPath className="w-4 h-4 mr-1 animate-spin" />
          Actualizando
        </span>
      </section>

      <section>
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
          {[...Array(9).keys()].map((item) => (
            <EventItemSkeleton key={item} />
          ))}
        </div>
      </section>
    </>
  );
}
