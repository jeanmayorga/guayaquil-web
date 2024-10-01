"use client";

import { Link, useTransitionRouter } from "next-view-transitions";
import { Button } from "./ui/button";
import { LeftArrowIcon } from "./icons";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface Props {
  to?: string;
  text?: string;
}

export function BackButton({ to, text }: Props) {
  const searchParams = useSearchParams();
  const searchParamsStringify = searchParams.toString();
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

  function goBackUrl() {
    const url = to || "/";
    const searchParams = localStorage.getItem("searchParams");
    if (searchParams) return `${url}?${searchParams}`;
    return url;
  }

  useEffect(() => {
    if (searchParamsStringify) {
      localStorage.setItem("searchParams", searchParamsStringify);
    }
  }, [searchParamsStringify]);

  if (!to) {
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
      // style={{ viewTransitionName: "back-button" }}
    >
      <Link href={goBackUrl()}>
        <Button variant="ghost" className="rounded-full">
          <LeftArrowIcon className="h-4 w-4 mr-2" /> {text || "Regresar"}
        </Button>
      </Link>
    </div>
  );
}
