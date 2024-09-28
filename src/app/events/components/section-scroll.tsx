"use client";

import { useRef } from "react";
import { EventType } from "../types";
import { Button } from "@/components/ui/button";
import { LeftIcon, RightIcon } from "@/components/icons";
import { EventItem } from "./EventItem";
import { Link } from "next-view-transitions";

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
    <div className="my-24">
      <div className="mb-4 flex items-center justify-between container mx-auto max-w-5xl px-4">
        <div>
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Eventos en tendencia
          </h2>
        </div>
        <div>
          <Link href="/events/this-week">
            <Button variant="outline" className=" rounded-full">
              Ver todos
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <div
          ref={scrollRef}
          className="flex space-x-4 p-4 overflow-x-auto no-scrollbar"
          style={{ scrollBehavior: "smooth" }}
        >
          {events.map((event) => (
            <EventItem event={event} key={event.slug} className="w-[350px]" />
          ))}
        </div>
      </div>
      <div className="container mx-auto max-w-5xl flex justify-end my-4">
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
