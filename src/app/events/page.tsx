"use client";

import { useEffect } from "react";
import { Link } from "next-view-transitions";
import { CalendarX2, CalendarRange, LayoutGrid } from "lucide-react";
import { EventsSearch } from "./components/EventsSearch";
import { EventsTabs } from "./components/EventsTabs";
import { Container } from "@/components/container";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getEvents } from "./actions";
import { EventItem } from "./components/EventItem";
import { EventItemSkeleton } from "./components/EventItemSkeleton";
import { useObserver } from "@/hooks/useObserver";
import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const WHEN: Record<string, string> = {
  today: "para hoy",
  "this-week": "para esta semana",
  "this-month": "para este mes",
  "next-month": "para el próximo mes",
  all: "disponibles",
  past: "en el pasado",
};

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

  const totalEvents =
    data?.pages.reduce((acc, page) => acc + page.length, 0) ?? 0;
  const isEmpty = !isFetching && totalEvents === 0;
  const whenText = WHEN[tab] ?? "para este filtro";

  return (
    <Container>
      {/* <div className="bg-black/20 w-full h-[400px] rounded-3xl mb-8"></div> */}

      <Title title="Eventos" />

      <EventsSearch />
      <div className="lg:hidden">
        <EventsTabs tab={tab} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mb-8">
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

      {isEmpty && (
        <Empty className="mb-8 bg-white/50 dark:bg-gray-900/40">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CalendarX2 />
            </EmptyMedia>
            <EmptyTitle>No hay eventos {whenText}</EmptyTitle>
            <EmptyDescription>
              {query
                ? `No encontramos resultados para “${query}”.`
                : "Prueba con otro rango de fechas o explora la semana."}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            {tab !== "this-week" ? (
              <Link href="/events?tab=this-week">
                <Button className="rounded-full">
                  <CalendarRange className="w-4 h-4 mr-2" />
                  Ver eventos de esta semana
                </Button>
              </Link>
            ) : (
              <Link href="/events?tab=all">
                <Button className="rounded-full">
                  <LayoutGrid className="w-4 h-4 mr-2" />
                  Ver todos los eventos
                </Button>
              </Link>
            )}
          </EmptyContent>
        </Empty>
      )}

      <div ref={ref} />
    </Container>
  );
}
