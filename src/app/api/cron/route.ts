import { NextResponse } from "next/server";
import scrapMeet2Go from "../../../scripts/scrap-meet2go-events";
import scrapTicketShow from "../../../scripts/scrap-ticketshow-events";

export async function GET() {
  try {
    console.log("start scrap");
    await scrapMeet2Go();
    await scrapTicketShow();
    console.log("close scrap");

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json({ ok: false });
  }
}
