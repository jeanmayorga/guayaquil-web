"use server";

import { EventSearchParams, EventType } from "./types";

export interface GetEventsResult {
  events: EventType[];
  lastCacheUpdate: string;
  lastEventUpdate: string;
}

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
    cache: "no-cache",
    // next: {
    //   revalidate: false,
    //   tags: ["events"],
    // },
  };

  const request = await fetch(fetchUrl, fetchOptions);
  const response = (await request.json()) as GetEventsResult;

  const result: GetEventsResult = {
    events: response?.events || [],
    lastCacheUpdate: response?.lastCacheUpdate,
    lastEventUpdate: response?.lastEventUpdate,
  };

  // console.log(
  //   `Client fetch -> ${searchParams} -> count ${response.events.length}`
  // );

  return result;
}
