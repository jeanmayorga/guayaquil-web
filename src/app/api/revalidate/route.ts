export const dynamic = "force-dynamic"; // static by default, unless reading the request

import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(request: Request) {
  try {
    revalidateTag("events");
    return new Response(`revalidated`);
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json({ ok: false });
  }
}
