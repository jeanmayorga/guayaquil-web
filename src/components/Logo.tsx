"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  const theme = useTheme();
  const isDark = theme.theme === "dark";

  return (
    <Image
      src={isDark ? "/gye-logo.png" : "/image_with_cyan_transparent.png"}
      alt="logo"
      width={110}
      height={110}
      className={cn("w-16 h-20 aspect-square", className)}
    />
  );
}
