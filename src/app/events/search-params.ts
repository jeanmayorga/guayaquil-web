import {
  createSearchParamsCache,
  createSerializer,
  parseAsString,
} from "nuqs/server";

export const renderingOptions = ["server", "client"] as const;
export type RenderingOptions = (typeof renderingOptions)[number];

export const searchParams = {
  search: parseAsString.withDefault(""),
  tab: parseAsString.withDefault("today"),
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serialize = createSerializer(searchParams);
