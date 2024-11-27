"use client";

import { useEffect } from "react";
import { EventsSearch } from "./components/EventsSearch";
import { EventsTabs } from "./components/EventsTabs";
import { Container } from "@/components/container";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getEvents } from "./actions";
import { EventItem } from "./components/EventItem";
import { EventItemSkeleton } from "./components/EventItemSkeleton";
import { useObserver } from "@/hooks/useObserver";
import { Title } from "@/components/title";

const DEFAULT_LIMIT = 9;
const DEFAULT_TAB = "today";

interface Props {
  searchParams: Record<string, string>;
}

export default function Page({ searchParams }: Props) {
  const { tab = DEFAULT_TAB, query } = searchParams;

  const { data, isFetching, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: ["events"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      return getEvents({ tab, page: pageParam, limit: DEFAULT_LIMIT, query });
    },
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) return undefined;
      return lastPageParam + 1;
    },
  });

  const { isIntersecting, ref } = useObserver({
    threshold: 0.5,
  });

  useEffect(() => {
    if (isIntersecting) fetchNextPage();
  }, [isIntersecting, fetchNextPage]);

  useEffect(() => {
    refetch();
  }, [tab, query, refetch]);

  return (
    <Container>
      {/* <div className="bg-black/20 w-full h-[400px] rounded-3xl mb-8"></div> */}

      <Title title="Eventos" />

      <EventsSearch />
      <EventsTabs tab={tab} />

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mb-8">
        {data?.pages.map((page) => {
          return page.map((event, idx) => (
            <EventItem event={event} key={event.slug} idx={idx} />
          ));
        })}
        {isFetching &&
          [...Array(DEFAULT_LIMIT).keys()].map((item) => (
            <EventItemSkeleton key={item} />
          ))}
      </div>

      <div ref={ref} />
    </Container>
  );
}
