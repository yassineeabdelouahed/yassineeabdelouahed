import { prisma } from "@/lib/prisma";

export type HealthStatus = {
  status: "ok" | "degraded";
  db: "ok" | "error";
  uptimeSeconds: number;
  timestamp: string;
};

/** Cheap connectivity probe — SELECT 1 fails fast if the database is unreachable. */
export async function checkHealth(): Promise<HealthStatus> {
  let db: "ok" | "error" = "ok";
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    db = "error";
  }

  return {
    status: db === "ok" ? "ok" : "degraded",
    db,
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  };
}
