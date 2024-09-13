export const dynamic = "force-dynamic"; // static by default, unless reading the request

import { NextResponse } from "next/server";
import scrapMeet2Go from "../../../../scripts/scrap-meet2go-events";
import scrapTicketShow from "../../../../scripts/scrap-ticketshow-events";
import { revalidateTag } from "next/cache";

export async function GET() {
  try {
    console.log("start scrap");
    await scrapMeet2Go();
    await scrapTicketShow();
    console.log("close scrap");

    revalidateTag("events");

    return Response.json({
      ok: true,
      data: `Hello from ${process.env.VERCEL_REGION}`,
    });
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json({ ok: false });
  }
}