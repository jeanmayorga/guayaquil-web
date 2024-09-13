"use server";

import { EventSearchParams, EventType } from "./types";

export async function getEvents(options: EventSearchParams) {
  const apiUrl = `${process.env.NEXT_PUBLIC_URL}/api/events`;

  const optionsSearchParams = options as unknown as Record<string, string>;
  Object.keys(optionsSearchParams).forEach((key) =>
    optionsSearchParams[key] === undefined
      ? delete optionsSearchParams[key]
      : {}
  );
  const searchParams = new URLSearchParams(optionsSearchParams).toString();

  const fetchUrl = `${apiUrl}${searchParams ? `?${searchParams}` : ""}`;
  const fetchOptions: RequestInit = {
    // cache: "no-cache",
    next: {
      revalidate: false,
      tags: ["events"],
    },
  };

  const request = await fetch(fetchUrl, fetchOptions);
  const response = await request.json();
  const events: EventType[] = response || [];

  console.log(`request to ${fetchUrl}, response ${events.length} events`);

  return events;
}
