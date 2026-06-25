export const dynamic = "force-dynamic"; // static by default, unless reading the request

import { NextResponse } from "next/server";
import scrapMeet2Go from "../../../../scripts/scrap-meet2go-events";
import scrapTicketShow from "../../../../scripts/scrap-ticketshow-events";
import cleanEvents from "../../../../scripts/clean-events";

export async function GET() {
  try {
    const meet2GoEvents = await scrapMeet2Go();
    const ticketShowEvents = await scrapTicketShow();

    //await cleanEvents();

    // El detalle usa ISR (revalidate) y el listado consulta Supabase en vivo,
    // así que no hace falta invalidar tags manualmente tras el scrape.

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
