import { BackButton } from "@/components/back-button";
import { Title } from "@/components/title";
import { Suspense } from "react";
import { EventSearch } from "./components/EventSearch";
import { EventTab } from "./components/EventsTab";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <main className="container mx-auto max-w-5xl px-4 ms:px-0 my-8">
      <BackButton />
      <Title title="Shows en Guayaquil" />

      <Suspense fallback={<>Cargando..</>}>
        <EventSearch />
      </Suspense>

      <EventTab />
      {children}
    </main>
  );
}
