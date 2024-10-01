"use server";
import { revalidateTag } from "next/cache";

export async function revalidateBySlug(slug: string) {
  revalidateTag(slug);
}

export async function revalidateEvents() {
  revalidateTag("events");
}
