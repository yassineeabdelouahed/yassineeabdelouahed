import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export class RateLimitError extends Error {}

/** Best-effort client IP from the standard forwarding headers set by Vercel and most reverse proxies. */
export async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return h.get("x-real-ip") ?? "unknown";
}

/**
 * Throws RateLimitError once `key` has been recorded `maxAttempts` times within the
 * trailing `windowMinutes`, otherwise records this attempt and returns normally.
 * Intentionally counts every attempt (not just failures) — simpler, and still an
 * effective brute-force throttle at this scale. Backed by a plain table (no Redis
 * dependency); old rows are opportunistically pruned rather than needing a cron job.
 */
export async function enforceRateLimit(
  key: string,
  { maxAttempts, windowMinutes, message }: { maxAttempts: number; windowMinutes: number; message?: string },
): Promise<void> {
  const since = new Date(Date.now() - windowMinutes * 60_000);
  const count = await prisma.rateLimitAttempt.count({ where: { key, createdAt: { gte: since } } });
  if (count >= maxAttempts) {
    throw new RateLimitError(message ?? "Trop de tentatives. Réessayez dans quelques minutes.");
  }

  await prisma.rateLimitAttempt.create({ data: { key } });

  if (Math.random() < 0.02) {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    prisma.rateLimitAttempt.deleteMany({ where: { createdAt: { lt: cutoff } } }).catch(() => {});
  }
}
