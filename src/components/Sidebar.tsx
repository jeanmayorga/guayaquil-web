"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Calendar } from "lucide-react";
import { Logo } from "./Logo";
import { ModeToggle } from "./mode-toggle";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-white dark:bg-black"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed z-20 top-0 left-0 h-full w-64 bg-white dark:bg-black p-4 flex flex-col gap-4 transition-transform transform",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <Link href="/">
            <Logo />
          </Link>
          <button
            className="md:hidden p-2"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          <Link href="/events" className="flex items-center gap-2 font-medium hover:underline">
            <Calendar className="w-4 h-4" /> Eventos
          </Link>
        </nav>
        <div className="mt-auto">
          <ModeToggle />
        </div>
      </aside>
    </>
  );
}
