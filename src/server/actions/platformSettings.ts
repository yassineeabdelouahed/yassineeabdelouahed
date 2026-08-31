"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/rbac";
import { revalidatePath } from "next/cache";

export async function getPlatformSettings() {
  return prisma.platformSettings.upsert({
    where: { id: "singleton" },
    create: { id: "singleton" },
    update: {},
  });
}

type ActionResult = { ok: true } | { ok: false; error: string };

export async function updatePlatformSettingsAction(formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const legalName = String(formData.get("legalName") ?? "").trim();
  const ice = String(formData.get("ice") ?? "").trim();
  const rc = String(formData.get("rc") ?? "").trim();
  const identifiantFiscal = String(formData.get("identifiantFiscal") ?? "").trim();
  const patente = String(formData.get("patente") ?? "").trim();
  const cnss = String(formData.get("cnss") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const tvaRatePercentRaw = String(formData.get("tvaRatePercent") ?? "").trim();

  if (!legalName) {
    return { ok: false, error: "La raison sociale est obligatoire." };
  }

  const tvaRatePercent = Number(tvaRatePercentRaw);
  if (!Number.isFinite(tvaRatePercent) || tvaRatePercent < 0 || tvaRatePercent > 100) {
    return { ok: false, error: "Le taux de TVA doit être un nombre entre 0 et 100." };
  }

  await prisma.platformSettings.upsert({
    where: { id: "singleton" },
    create: {
      id: "singleton",
      legalName,
      ice: ice || null,
      rc: rc || null,
      identifiantFiscal: identifiantFiscal || null,
      patente: patente || null,
      cnss: cnss || null,
      address: address || null,
      tvaRatePercent,
    },
    update: {
      legalName,
      ice: ice || null,
      rc: rc || null,
      identifiantFiscal: identifiantFiscal || null,
      patente: patente || null,
      cnss: cnss || null,
      address: address || null,
      tvaRatePercent,
    },
  });

  revalidatePath("/cabinet/admin/facturation");
  return { ok: true };
}
