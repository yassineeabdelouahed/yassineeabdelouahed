"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { saveUploadedFile } from "@/lib/storage";
import { createCandidateSchema, addToShortlistSchema } from "@/lib/validations/candidates";

export type ActionResult = { ok: true } | { ok: false; error: string };
export type CreateCandidateResult = { ok: true; candidateId: string } | { ok: false; error: string };

function splitSkills(raw?: string): string[] {
  if (!raw) return [];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

export async function listCandidates() {
  await requireRole("CABINET");
  return prisma.candidate.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getCandidate(candidateId: string) {
  await requireRole("CABINET");
  return prisma.candidate.findUnique({
    where: { id: candidateId },
    include: {
      applications: {
        include: { mandat: { select: { id: true, reference: true, title: true, companyId: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function createCandidateAction(formData: FormData): Promise<CreateCandidateResult> {
  const user = await requireRole("CABINET");

  const parsed = createCandidateSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone") ?? undefined,
    headline: formData.get("headline") ?? undefined,
    location: formData.get("location") ?? undefined,
    yearsExperience: formData.get("yearsExperience") || undefined,
    skills: formData.get("skills") ?? undefined,
    source: formData.get("source") || "INTERNAL_DB",
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const data = parsed.data;

  let cvUrl: string | null = null;
  const cvFile = formData.get("cv");
  if (cvFile instanceof File && cvFile.size > 0) {
    cvUrl = await saveUploadedFile(cvFile, "cvs");
  }

  const candidate = await prisma.candidate.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || null,
      headline: data.headline || null,
      location: data.location || null,
      yearsExperience: data.yearsExperience ?? null,
      skills: splitSkills(data.skills),
      cvUrl,
      source: data.source,
      createdByUserId: user.id,
    },
  });

  revalidatePath("/cabinet/candidates");
  return { ok: true, candidateId: candidate.id };
}

export async function addCandidateToMandateAction(mandatId: string, formData: FormData): Promise<ActionResult> {
  const user = await requireRole("CABINET");

  const mandat = await prisma.mandat.findUnique({ where: { id: mandatId }, select: { status: true } });
  if (!mandat) return { ok: false, error: "Mandat introuvable" };
  if (mandat.status !== "SOURCING") {
    return { ok: false, error: "Le mandat n'est plus en phase de sourcing" };
  }

  const parsed = addToShortlistSchema.safeParse({
    candidateId: formData.get("candidateId"),
    prequalNotes: formData.get("prequalNotes") ?? undefined,
    strengths: formData.get("strengths") ?? undefined,
    watchPoints: formData.get("watchPoints") ?? undefined,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const data = parsed.data;

  const existing = await prisma.mandateApplication.findUnique({
    where: { mandatId_candidateId: { mandatId, candidateId: data.candidateId } },
  });
  if (existing) {
    return { ok: false, error: "Ce candidat est déjà proposé sur ce mandat" };
  }

  await prisma.mandateApplication.create({
    data: {
      mandatId,
      candidateId: data.candidateId,
      addedByUserId: user.id,
      prequalNotes: data.prequalNotes || null,
      strengths: data.strengths || null,
      watchPoints: data.watchPoints || null,
      status: "PROPOSED",
    },
  });

  revalidatePath(`/cabinet/mandats/${mandatId}`);
  return { ok: true };
}

export async function removeCandidateFromMandateAction(applicationId: string): Promise<ActionResult> {
  await requireRole("CABINET");

  const application = await prisma.mandateApplication.findUnique({
    where: { id: applicationId },
    select: { mandatId: true, status: true },
  });
  if (!application) return { ok: false, error: "Candidature introuvable" };
  if (application.status !== "PROPOSED") {
    return { ok: false, error: "Impossible de retirer un candidat déjà publié" };
  }

  await prisma.mandateApplication.delete({ where: { id: applicationId } });
  revalidatePath(`/cabinet/mandats/${application.mandatId}`);
  return { ok: true };
}
