export const dynamic = "force-dynamic"; // static by default, unless reading the request

import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import scrapMeet2Go from "../../../scripts/scrap-meet2go-events";
import scrapTicketShow from "../../../scripts/scrap-ticketshow-events";
import cleanEvents from "../../../scripts/clean-events";

export async function GET(request: Request) {
  try {
    console.log("start scrap");
    await scrapMeet2Go();
    await scrapTicketShow();
    console.log("close scrap");

    // await cleanEvents();
    // console.log("events cleaned.");

    // revalidatePath("/");
    // revalidatePath("/events");

    revalidateTag("events");

    return new Response(`Hello from ${process.env.VERCEL_REGION}`);
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json({ ok: false });
  }
}
