import { NextResponse } from "next/server";
import { buildIndeedFeedXml } from "@/lib/jobBoards/indeedFeed";

/**
 * Flux XML public des offres publiées, au format attendu par Indeed pour
 * l'indexation organique (feed employeur). Non authentifié par nature —
 * c'est un flux public, comme le sitemap. À soumettre une fois via le
 * compte employeur Indeed de l'utilisateur pour être recrawlé
 * périodiquement (voir README).
 */
export async function GET() {
  const xml = await buildIndeedFeedXml();
  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
