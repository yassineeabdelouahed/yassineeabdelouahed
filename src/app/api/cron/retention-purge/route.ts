import { NextResponse } from "next/server";
import { runRetentionPurge } from "@/lib/retention";

/**
 * Hook for an external scheduler (Vercel Cron, GitHub Actions on a schedule, a
 * server-side crontab hitting this URL with curl, etc.) to run the retention purge
 * automatically. Requires RETENTION_PURGE_SECRET to be set — unset means disabled,
 * never a silent bypass.
 */
export async function POST(request: Request) {
  const secret = process.env.RETENTION_PURGE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "RETENTION_PURGE_SECRET n'est pas configuré." }, { status: 503 });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const results = await runRetentionPurge("cron");
  return NextResponse.json({ ok: true, results });
}
