"use server";

import { requireRole } from "@/lib/rbac";
import { lushaSearchSchema } from "@/lib/validations/prospect";
import { lushaEnabled, searchLushaContacts, type LushaCandidate } from "@/lib/lusha";

export type LushaSearchResult =
  | { ok: true; candidates: LushaCandidate[] }
  | { ok: false; error: string };

export async function searchLushaProspectsAction(formData: FormData): Promise<LushaSearchResult> {
  await requireRole("CABINET");

  if (!lushaEnabled) {
    return { ok: false, error: "Recherche de prospects non configurée (LUSHA_API_KEY manquant)." };
  }

  const parsed = lushaSearchSchema.safeParse({
    jobTitle: formData.get("jobTitle") ?? undefined,
    location: formData.get("location") ?? undefined,
    companyName: formData.get("companyName") ?? undefined,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Critères de recherche invalides" };
  }
  const { jobTitle, location, companyName } = parsed.data;
  if (!jobTitle && !location && !companyName) {
    return { ok: false, error: "Renseignez au moins un critère de recherche" };
  }

  try {
    const { candidates } = await searchLushaContacts({ jobTitle, location, companyName });
    return { ok: true, candidates };
  } catch (err) {
    console.error("[lusha:search-failed]", err);
    return { ok: false, error: "La recherche a échoué. Réessayez dans un instant." };
  }
}
