"use server";

import {
  EventType,
  GetEventEventsOptions,
  GetEventSearchParams,
} from "./types";

const apiUrl = `${process.env.NEXT_PUBLIC_URL}/api`;

export interface GetEventsResult {
  events: EventType[];
  lastCacheUpdate: string;
}

export async function getEvents(options: GetEventEventsOptions) {
  const optionsSearchParams = options as unknown as Record<string, string>;
  Object.keys(optionsSearchParams).forEach((key) =>
    optionsSearchParams[key] === undefined
      ? delete optionsSearchParams[key]
      : {}
  );
  const searchParams = new URLSearchParams(optionsSearchParams).toString();

  const fetchUrl = `${apiUrl}/events${searchParams ? `?${searchParams}` : ""}`;
  const fetchOptions: RequestInit = {
    // cache: "no-cache",
    next: {
      revalidate: false,
      tags: ["events"],
    },
  };

  const request = await fetch(fetchUrl, fetchOptions);
  const response = await request.json();

  // await new Promise((r) => setTimeout(r, 2000));

  const result: GetEventsResult = {
    events: response?.events || [],
    lastCacheUpdate: response?.lastCacheUpdate,
  };

  console.log(
    `Client fetch -> ${searchParams} -> count ${result.events.length} -> log ${options.log}`
  );

  return result;
}

export interface GetEventResult {
  event: EventType;
  lastCacheUpdate: string;
}
export async function getEvent(options: GetEventSearchParams) {
  const optionsSearchParams = options as unknown as Record<string, string>;
  const searchParams = new URLSearchParams(optionsSearchParams).toString();

  const fetchUrl = `${apiUrl}/event${searchParams ? `?${searchParams}` : ""}`;
  const fetchOptions: RequestInit = {
    // cache: "no-cache",
    next: {
      revalidate: false,
      tags: ["events", options.slug],
    },
  };

  const request = await fetch(fetchUrl, fetchOptions);
  const response = await request.json();
  // await new Promise((r) => setTimeout(r, 2000));

  const result: GetEventResult = {
    event: response?.event,
    lastCacheUpdate: response?.lastCacheUpdate,
  };

  console.log(`Client fetch -> ${searchParams} -> log ${options.log}`);

  return result;
}
