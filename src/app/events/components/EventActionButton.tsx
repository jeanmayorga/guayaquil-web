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
  async function onRevalidate() {
    const apiUrl = `${process.env.NEXT_PUBLIC_URL}/api/revalidate`;
    await fetch(apiUrl);
    location.reload();
  }
  async function onScrap() {
    const apiUrl = `${process.env.NEXT_PUBLIC_URL}/api/cron`;
    await fetch(apiUrl);
    await onRevalidate();
  }

  return (
    <div className="flex justify-end">
      <Menubar className="rounded-full">
        <MenubarMenu>
          <MenubarTrigger className="rounded-full p-1">
            <EllipsisIcon className="w-5 h-5" />
          </MenubarTrigger>
          <MenubarContent align="end">
            <MenubarItem onClick={onScrap}>Scrap</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={onRevalidate}>Limpiar cache</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>App Store</MenubarItem>
            <MenubarItem>Play Store</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
