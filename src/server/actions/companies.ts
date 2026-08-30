"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/rbac";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function listCompaniesForCabinet() {
  await requireAdmin();
  return prisma.company.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { jobPostings: true } } },
  });
}

export async function toggleCompanyVerificationAction(companyId: string): Promise<ActionResult> {
  await requireAdmin();

  const company = await prisma.company.findUnique({ where: { id: companyId }, select: { verifiedAt: true } });
  if (!company) return { ok: false, error: "Entreprise introuvable" };

  await prisma.company.update({
    where: { id: companyId },
    data: { verifiedAt: company.verifiedAt ? null : new Date() },
  });

  revalidatePath("/cabinet/admin/companies");
  revalidatePath(`/companies/${companyId}`);
  return { ok: true };
}
