import { Suspense } from "react";
import { EventSearch } from "./EventSearch";
import { EventTabs } from "./EventsTabs";
import { BackButton } from "@/components/back-button";
import { ActionsButton } from "./EventActionButton";
import { Title } from "@/components/title";

export function EventsPageHeader() {
  return (
    <>
      <div className="flex items-center justify-between">
        <BackButton to="/" />
        <ActionsButton />
      </div>
      <Title title="Eventos" />
      <Suspense fallback={<>Cargando..</>}>
        <EventSearch />
      </Suspense>
      <EventTabs />
    </>
  );
}
