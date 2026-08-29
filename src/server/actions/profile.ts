"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole, getSessionUser } from "@/lib/rbac";
import { saveUploadedFile, FileValidationError } from "@/lib/storage";
import { updateProfileSchema } from "@/lib/validations/profile";

export type ActionResult = { ok: true } | { ok: false; error: string };

function splitSkills(raw?: string): string[] {
  if (!raw) return [];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

/** Non-redirecting check used on public pages (e.g. job detail) to nudge candidates without a CV. */
export async function currentCandidateHasCv(): Promise<boolean> {
  const user = await getSessionUser();
  if (!user || user.role !== "CANDIDATE" || !user.candidateId) return false;
  const candidate = await prisma.candidate.findUnique({
    where: { id: user.candidateId },
    select: { cvUrl: true },
  });
  return !!candidate?.cvUrl;
}

export async function getMyCandidateProfile() {
  const user = await requireRole("CANDIDATE");
  if (!user.candidateId) return null;
  return prisma.candidate.findUnique({ where: { id: user.candidateId } });
}

export async function updateProfileAction(formData: FormData): Promise<ActionResult> {
  const user = await requireRole("CANDIDATE");
  if (!user.candidateId) return { ok: false, error: "Profil candidat introuvable" };

  const parsed = updateProfileSchema.safeParse({
    headline: formData.get("headline") ?? undefined,
    location: formData.get("location") ?? undefined,
    phone: formData.get("phone") ?? undefined,
    yearsExperience: formData.get("yearsExperience") || undefined,
    skills: formData.get("skills") ?? undefined,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const data = parsed.data;

  let cvUrl: string | undefined;
  const cvFile = formData.get("cv");
  if (cvFile instanceof File && cvFile.size > 0) {
    try {
      cvUrl = await saveUploadedFile(cvFile, "cvs");
    } catch (err) {
      if (err instanceof FileValidationError) return { ok: false, error: err.message };
      throw err;
    }
  }

  await prisma.candidate.update({
    where: { id: user.candidateId },
    data: {
      headline: data.headline || null,
      location: data.location || null,
      phone: data.phone || null,
      yearsExperience: data.yearsExperience ?? null,
      skills: splitSkills(data.skills),
      ...(cvUrl ? { cvUrl } : {}),
    },
  });

  revalidatePath("/candidate/profile");
  return { ok: true };
}
