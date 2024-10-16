"use client";

import { LeftArrowIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function EventBackButton() {
  const searchParams = useSearchParams();
  const searchParamsStringify = searchParams.toString();
  const searchParamsSaved = localStorage.getItem("searchParams");

  useEffect(() => {
    if (searchParamsStringify) {
      localStorage.setItem("searchParams", searchParamsStringify);
    }
  }, [searchParamsStringify]);

  return (
    <Link
      href={`/events${searchParamsSaved ? `?${searchParamsSaved}` : ""}`}
      // style={{ viewTransitionName: `title` }}
    >
      <Button variant="secondary" className="rounded-full">
        <LeftArrowIcon className="h-4 w-4 mr-2" /> Regresar
      </Button>
    </Link>
  );
}
