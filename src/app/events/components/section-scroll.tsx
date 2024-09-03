"use client";

import { useRef } from "react";
import { EventType } from "../types";

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
      />
    </svg>
  );
}

function RightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}

function LeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  );
}

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
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {events.map((event) => (
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            key={event.slug}
            className="flex-none w-96 border border-gray-200 rounded-2xl overflow-hidden hover:bg-slate-100 transition-all"
          >
            <div className="relative aspect-video overflow-hidden bg-black flex items-center justify-center">
              <img
                src={event.cover_image}
                alt={event.name}
                className="w-full"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center text-violet-700 mb-2 text-sm gap-2">
                <CalendarIcon />
                {event.start_date === event.end_date ? (
                  new Date(event.start_date).toLocaleDateString("es-LA", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                ) : (
                  <>
                    {new Date(event.start_date).toLocaleDateString("es-LA", {
                      day: "2-digit",
                      month: "long",
                    })}{" "}
                    hasta{" "}
                    {new Date(event.end_date).toLocaleDateString("es-LA", {
                      day: "2-digit",
                      month: "long",
                    })}
                  </>
                )}
              </div>
              <div className="font-semibold text-lg truncate">{event.name}</div>
              <div className="flex items-center text-gray-700 text-sm">
                {event.location_name}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
