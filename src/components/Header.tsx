import Link from "next/link";
import { Container } from "./container";
import { Logo } from "./Logo";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";

export function Header() {
  return (
    <Container>
      <header className="dark:bg-black py-2 px-8 flex items-center justify-between relative my-8 bg-white rounded-3xl">
        <Link href="/" className="">
          <Logo />
        </Link>
        <div>
          <Link href="/events">
            <Button className="rounded-full font-medium" variant="secondary">
              <Calendar className="w-4 h-4 mr-0 md:mr-2" />
              <span className="hidden sm:block">Eventos</span>
            </Button>
          </Link>
        </div>
        <ModeToggle />
      </header>
    </Container>
  );
}
