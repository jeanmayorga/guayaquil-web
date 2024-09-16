export const dynamic = "force-dynamic"; // static by default, unless reading the request

import { NextResponse } from "next/server";
import scrapMeet2Go from "../../../../scripts/scrap-meet2go-events";
import scrapTicketShow from "../../../../scripts/scrap-ticketshow-events";
import { revalidateTag } from "next/cache";

export async function GET() {
  try {
    const meet2GoEvents = await scrapMeet2Go();
    const ticketShowEvents = await scrapTicketShow();

    revalidateTag("events");

    return Response.json({
      ok: true,
      total: meet2GoEvents + ticketShowEvents,
      region: process.env.VERCEL_REGION,
    });
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json({ ok: false });
  }
}
