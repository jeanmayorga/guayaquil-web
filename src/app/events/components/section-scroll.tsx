"use client";

import { useRef } from "react";
import { EventType } from "../types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LeftIcon, RightIcon } from "@/components/icons";
import { Event } from "./Event";

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
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Eventos en tendencia
        </h2>
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
          <Event event={event} key={event.slug} />
        ))}
      </div>
      <div className="flex justify-end my-4">
        <div>
          <button
            className="bg-black bg-opacity-50 text-white p-2 z-10 rounded-full mr-2"
            onClick={() => scroll(-400)}
          >
            <LeftIcon />
          </button>
          <button
            className="bg-black bg-opacity-50 text-white p-2 z-10 rounded-full"
            onClick={() => scroll(400)}
          >
            <RightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
