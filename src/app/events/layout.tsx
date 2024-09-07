import { LeftArrowIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EventsSearch } from "./components/EventsSearch";
import { EventsTab } from "./components/EventsNav";
import { Title } from "@/components/title";

interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <main className="container mx-auto max-w-5xl px-4 ms:px-0 my-8">
      <div className="my-16">
        <Link href="/">
          <Button variant="outline" className="rounded-full">
            <LeftArrowIcon className="h-4 w-4 mr-2" /> Regresar
          </Button>
        </Link>
      </div>

      <Title title="Shows en Guayaquil" />

      <EventsSearch />
      <EventsTab />

      <section>{children}</section>
    </main>
  );
}
