import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET(request: Request) {
  try {
    revalidateTag("events");
    revalidatePath("/api/events");
    return new Response(`revalidated`);
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json({ ok: false });
  }
}
