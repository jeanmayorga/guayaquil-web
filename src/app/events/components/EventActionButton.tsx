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
import { useTheme } from "next-themes";

export function ActionsButton() {
  const { setTheme } = useTheme();

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

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

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
            <MenubarSeparator />
            <MenubarItem onClick={() => setTheme("light")}>Light</MenubarItem>
            <MenubarItem onClick={() => setTheme("dark")}>Dark</MenubarItem>
            <MenubarItem onClick={() => setTheme("system")}>System</MenubarItem>
            {/* <MenubarSeparator />
            <MenubarItem>App Store</MenubarItem>
            <MenubarItem>Play Store</MenubarItem> */}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
