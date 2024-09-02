import { NextResponse } from "next/server";
import scrapMeet2Go from "../../../scripts/scrap-meet2go-events";
import scrapTicketShow from "../../../scripts/scrap-ticketshow-events";

export async function GET() {
  await scrapMeet2Go();
  await scrapTicketShow();

  return NextResponse.json({ ok: true });
}
