"use server";

import { EventType, GetEventSearchParams } from "./types";

const apiUrl = `${process.env.NEXT_PUBLIC_URL}/api`;

export interface GetEventResult {
  event: EventType;
  lastCacheUpdate: string;
}
export async function getEvent(options: GetEventSearchParams) {
  const optionsSearchParams = options as unknown as Record<string, string>;
  const searchParams = new URLSearchParams(optionsSearchParams).toString();

  const fetchUrl = `${apiUrl}/event${searchParams ? `?${searchParams}` : ""}`;

  const request = await fetch(fetchUrl);
  const response = await request.json();

  const result: GetEventResult = {
    event: response?.event,
    lastCacheUpdate: response?.lastCacheUpdate,
  };

  console.log(`Client fetch -> ${searchParams} -> log ${options.log}`);

  return result;
}
