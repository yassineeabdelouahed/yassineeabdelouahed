"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { googleMapsImportSchema, type GoogleMapsScrapedEntry } from "@/lib/validations/prospect";

export type ImportProspectsResult =
  | { ok: true; imported: number; skipped: number }
  | { ok: false; error: string };

function toProspectData(entry: GoogleMapsScrapedEntry, createdByUserId: string) {
  const sector = entry.category ?? entry.categories?.[0] ?? null;
  const notes = [
    "Importé depuis Google Maps",
    entry.web_site ? `Site : ${entry.web_site}` : null,
    entry.address ? `Adresse : ${entry.address}` : null,
  ]
    .filter(Boolean)
    .join(" — ");

  return {
    companyName: entry.title.trim(),
    sector,
    city: entry.complete_address?.city ?? null,
    contactEmail: entry.emails?.[0] ?? null,
    contactPhone: entry.phone ?? null,
    urgency: "MEDIUM" as const,
    notes,
    createdByUserId,
  };
}

/**
 * Imports business leads exported as JSON by google-maps-scraper-kit
 * (github.com/Mahanaicoach/google-maps-scraper-kit) as new prospects.
 * Entries whose company name already exists in the prospect list are skipped.
 */
export async function importProspectsFromGoogleMapsAction(formData: FormData): Promise<ImportProspectsResult> {
  const user = await requireRole("CABINET");

  const raw = formData.get("payload");
  if (typeof raw !== "string" || !raw.trim()) {
    return { ok: false, error: "Collez le JSON exporté par le scraper." };
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return { ok: false, error: "JSON invalide." };
  }

  const parsed = googleMapsImportSchema.safeParse(Array.isArray(json) ? json : [json]);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Format de données invalide." };
  }

  const existing = await prisma.prospect.findMany({ select: { companyName: true } });
  const seen = new Set(existing.map((p) => p.companyName.trim().toLowerCase()));

  let imported = 0;
  let skipped = 0;

  for (const entry of parsed.data) {
    const key = entry.title.trim().toLowerCase();
    if (seen.has(key)) {
      skipped++;
      continue;
    }
    seen.add(key);

    await prisma.$transaction(async (tx) => {
      const prospect = await tx.prospect.create({ data: toProspectData(entry, user.id) });
      await tx.prospectStageEvent.create({
        data: { prospectId: prospect.id, fromStage: null, toStage: "PROSPECT", actorUserId: user.id },
      });
    });
    imported++;
  }

  revalidatePath("/cabinet/prospects");
  return { ok: true, imported, skipped };
}
