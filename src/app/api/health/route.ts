import { NextResponse } from "next/server";
import { checkHealth } from "@/lib/health";

/**
 * Unauthenticated health-check endpoint for uptime monitors (UptimeRobot, Vercel/host
 * health checks, etc.). Returns 503 when the database is unreachable so monitors can alert.
 */
export async function GET() {
  const health = await checkHealth();
  return NextResponse.json(health, { status: health.status === "ok" ? 200 : 503 });
}
