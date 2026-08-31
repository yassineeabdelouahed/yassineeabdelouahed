import type { Instrumentation } from "next";

/**
 * Minimal self-hosted error monitoring: every server-side error (Server Components,
 * Route Handlers, Server Actions) is logged to the console (structured, for the host's
 * log aggregation) and persisted to ErrorLog so the cabinet admin can review recent
 * failures from /cabinet/admin/monitoring without wiring up a third-party provider.
 */
export const onRequestError: Instrumentation.onRequestError = async (err, request, context) => {
  const message = err instanceof Error ? err.message : String(err);
  const digest = typeof err === "object" && err !== null && "digest" in err ? String(err.digest) : undefined;

  console.error(
    JSON.stringify({
      level: "error",
      message,
      digest,
      path: request.path,
      method: request.method,
      routeType: context.routeType,
      timestamp: new Date().toISOString(),
    }),
  );

  try {
    const { prisma } = await import("@/lib/prisma");
    await prisma.errorLog.create({
      data: {
        message: message.slice(0, 2000),
        digest,
        routePath: context.routePath,
        routeType: context.routeType,
        method: request.method,
      },
    });
  } catch {
    // Best-effort — never let logging itself take down error handling.
  }
};
