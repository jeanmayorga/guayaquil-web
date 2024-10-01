"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { revalidateEvents } from "../actions";
import { useState } from "react";
import { EllipsisVertical, LoaderCircle } from "lucide-react";
import { sleep } from "@/lib/sleep";

export function EventsActionsButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function onRevalidate() {
    setIsLoading(true);
    await revalidateEvents();
    await sleep(1000);
    setIsLoading(false);
    location.reload();
  }

  return (
    <div className="flex justify-end">
      <Menubar className="rounded-full">
        <MenubarMenu>
          <MenubarTrigger
            className="rounded-full p-1"
            aria-label="Opciones"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircle className="w-4 h-4 animate-spin" />
            ) : (
              <EllipsisVertical className="w-4 h-4" />
            )}
          </MenubarTrigger>
          <MenubarContent align="end">
            {/* <MenubarItem onClick={onRefresh}>Actualizar</MenubarItem> */}
            {/* <MenubarSeparator /> */}
            <MenubarItem onClick={onRevalidate}>Actualizar</MenubarItem>
            {/* <MenubarSeparator /> */}
            {/* <MenubarItem onClick={onScrap}>Rescrap</MenubarItem> */}
            {/* <MenubarSeparator />
            <MenubarItem>App Store</MenubarItem>
            <MenubarItem>Play Store</MenubarItem> */}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
