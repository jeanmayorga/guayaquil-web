"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { EllipsisVertical, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { revalidateBySlug } from "../actions";
import { sleep } from "@/lib/sleep";

interface Props {
  slug: string;
  last_updated: string;
  last_cached: string;
  created_at: string;
}
export function EventActionsButton({
  slug,
  last_cached,
  last_updated,
  created_at,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  async function onRevalidate() {
    setIsLoading(true);
    await revalidateBySlug(slug);
    await sleep(1000);
    setIsLoading(false);
    location.reload();
  }

  return (
    <Menubar className="rounded-full">
      <MenubarMenu>
        <MenubarTrigger
          className="rounded-full p-1"
          aria-label="Menu"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoaderCircle className="w-4 h-4 animate-spin" />
          ) : (
            <EllipsisVertical className="w-4 h-4" />
          )}
        </MenubarTrigger>
        <MenubarContent align="end">
          <MenubarItem onClick={onRevalidate}>Actualizar</MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>
            Updated at{" "}
            {new Intl.DateTimeFormat("es-EC", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
              timeZone: "America/Guayaquil",
            }).format(new Date(last_updated))}
          </MenubarItem>
          <MenubarItem disabled>
            Cached at{" "}
            {new Intl.DateTimeFormat("es-EC", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
              timeZone: "America/Guayaquil",
            }).format(new Date(last_cached))}
          </MenubarItem>
          <MenubarItem disabled>
            Created at{" "}
            {new Intl.DateTimeFormat("es-EC", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
              timeZone: "America/Guayaquil",
            }).format(new Date(created_at))}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
