"use client";

import { EllipsisIcon } from "@/components/icons";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

export function ActionsButton() {
  async function onRefresh() {
    await onScrap();
    await onRevalidate();
  }
  async function onRevalidate() {
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/events/revalidate`);
    location.reload();
  }

  async function onScrap() {
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/events/cron`);
  }

  return (
    <div className="flex justify-end">
      <Menubar className="rounded-full">
        <MenubarMenu>
          <MenubarTrigger className="rounded-full p-1">
            <EllipsisIcon className="w-5 h-5" />
          </MenubarTrigger>
          <MenubarContent align="end">
            <MenubarItem onClick={onRefresh}>Actualizar</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={onRevalidate}>Revalidar</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={onScrap}>Rescrap</MenubarItem>
            {/* <MenubarSeparator />
            <MenubarItem>App Store</MenubarItem>
            <MenubarItem>Play Store</MenubarItem> */}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
