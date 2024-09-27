export const dynamic = "force-dynamic"; // static by default, unless reading the request

import { NextResponse } from "next/server";
import scrapMeet2Go from "../../../../scripts/scrap-meet2go-events";
import scrapTicketShow from "../../../../scripts/scrap-ticketshow-events";
import cleanEvents from "../../../../scripts/clean-events";
import { revalidateTag } from "next/cache";

const notifyGoogleAboutSitemapChange = async () => {
  const sitemapUrl = "https://www.guayaquil.app/sitemap.xml";

  try {
    await fetch(sitemapUrl);
    const response = await fetch(
      `https://www.google.com/ping?sitemap=${sitemapUrl}`
    );

    if (response.ok) {
      console.log("Sitemap submitted successfully.");
    } else {
      console.log(`Failed to submit sitemap. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error submitting sitemap:", error);
  }
};

export async function GET() {
  try {
    const meet2GoEvents = await scrapMeet2Go();
    const ticketShowEvents = await scrapTicketShow();

    await cleanEvents();

    revalidateTag("events");

    await notifyGoogleAboutSitemapChange();

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
