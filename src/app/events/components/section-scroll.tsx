"use client";

import { useRef } from "react";
import { EventType } from "../types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LeftIcon, RightIcon } from "@/components/icons";
import { EventItem } from "./EventItem";

interface Props {
  events: EventType[];
}
export function EventsSectionScroll({ events }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Eventos en tendencia
          </h2>

          <p className="text-gray-400 text-xs">
            Ultima actualización el{" "}
            {new Date(events[0].last_updated).toLocaleDateString("es-EC", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
        </div>
        <div>
          <Link href="/events">
            <Button variant="outline" className=" rounded-full">
              Ver todos
            </Button>
          </Link>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {events.map((event) => (
          <EventItem event={event} key={event.slug} className="w-[350px]" />
        ))}
      </div>
      <div className="flex justify-end my-4">
        <div>
          <button
            className="bg-black bg-opacity-50 text-white p-2 z-10 rounded-full mr-2"
            onClick={() => scroll(-336)}
          >
            <LeftIcon />
          </button>
          <button
            className="bg-black bg-opacity-50 text-white p-2 z-10 rounded-full"
            onClick={() => scroll(336)}
          >
            <RightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
