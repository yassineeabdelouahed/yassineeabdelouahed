"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/rbac";
import { checkHealth, type HealthStatus } from "@/lib/health";

export async function getMonitoringOverview(): Promise<{
  health: HealthStatus;
  recentErrors: { id: string; message: string; routePath: string | null; method: string | null; createdAt: Date }[];
  errorCountLast24h: number;
}> {
  await requireAdmin();

  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const [health, recentErrors, errorCountLast24h] = await Promise.all([
    checkHealth(),
    prisma.errorLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      select: { id: true, message: true, routePath: true, method: true, createdAt: true },
    }),
    prisma.errorLog.count({ where: { createdAt: { gte: since24h } } }),
  ]);

  return { health, recentErrors, errorCountLast24h };
}
