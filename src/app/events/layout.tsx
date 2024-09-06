import { LeftArrowIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EventsSearch } from "./components/EventsSearch";
import { EventsTab } from "./components/EventsNav";

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
      <header className="mb-4">
        <h1 className="scroll-m-20 font-semibold tracking-tight text-5xl mb-4 block">
          Shows en Guayaquil
        </h1>
      </header>

      <EventsSearch />
      <EventsTab />

      <section>{children}</section>
    </main>
  );
}
