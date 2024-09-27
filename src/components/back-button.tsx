"use client";

import { Link, useTransitionRouter } from "next-view-transitions";
import { Button } from "./ui/button";
import { LeftArrowIcon } from "./icons";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  url?: string;
  text?: string;
}

export function BackButton({ url, text }: Props) {
  const router = useTransitionRouter();

  async function goBack() {
    router.back();
    await new Promise((r) => setTimeout(r, 100));
    const savedScrollPosition = localStorage.getItem("scrollPosition");
    if (savedScrollPosition) {
      window.scrollTo({
        top: parseInt(savedScrollPosition, 10),
        behavior: "smooth",
      });
      localStorage.removeItem("scrollPosition");
    }
  }

  if (!url) {
    return (
      <div
        className="my-6 md:my-12"
        // style={{ viewTransitionName: `title` }}
      >
        <Button variant="ghost" className="rounded-full" onClick={goBack}>
          <LeftArrowIcon className="h-4 w-4 mr-2" /> {text || "Regresar"}
        </Button>
      </div>
    );
  }

  return (
    <div
      className="my-6 md:my-12"
      // style={{ viewTransitionName: `title` }}
    >
      <Link href={url || "/"}>
        <Button variant="ghost" className="rounded-full">
          <LeftArrowIcon className="h-4 w-4 mr-2" /> {text || "Regresar"}
        </Button>
      </Link>
    </div>
  );
}
