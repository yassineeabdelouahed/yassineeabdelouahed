"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/rbac";
import { runRetentionPurge, type RetentionPurgeResult } from "@/lib/retention";
import { revalidatePath } from "next/cache";

export async function listRetentionHistory() {
  await requireAdmin();
  return prisma.retentionPurgeLog.findMany({ orderBy: { ranAt: "desc" }, take: 20 });
}

export async function runRetentionPurgeAction(): Promise<{ ok: true; results: RetentionPurgeResult[] } | { ok: false; error: string }> {
  const user = await requireAdmin();
  const results = await runRetentionPurge(user.email);
  revalidatePath("/cabinet/admin/retention");
  return { ok: true, results };
}
