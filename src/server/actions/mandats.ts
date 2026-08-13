"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole, getSessionUser } from "@/lib/rbac";
import { createMandatSchema, mandatMessageSchema } from "@/lib/validations/mandats";
import { transitionMandat, generateMandatReference, InvalidMandatTransitionError } from "@/server/services/mandatStateMachine";

export type ActionResult = { ok: true } | { ok: false; error: string };

function splitSkills(raw?: string): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function createMandatAction(formData: FormData): Promise<ActionResult> {
  const user = await requireRole("CLIENT");
  if (!user.companyId) return { ok: false, error: "Profil entreprise introuvable" };

  const parsed = createMandatSchema.safeParse({
    title: formData.get("title"),
    skillsRequired: formData.get("skillsRequired") ?? undefined,
    experienceLevel: formData.get("experienceLevel") ?? undefined,
    salaryMin: formData.get("salaryMin") || undefined,
    salaryMax: formData.get("salaryMax") || undefined,
    location: formData.get("location") ?? undefined,
    remotePolicy: formData.get("remotePolicy") ?? undefined,
    urgency: formData.get("urgency"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const data = parsed.data;

  const reference = await generateMandatReference();

  const mandat = await prisma.mandat.create({
    data: {
      reference,
      companyId: user.companyId,
      createdByUserId: user.id,
      title: data.title,
      skillsRequired: splitSkills(data.skillsRequired),
      experienceLevel: data.experienceLevel || null,
      salaryMin: data.salaryMin ?? null,
      salaryMax: data.salaryMax ?? null,
      location: data.location || null,
      remotePolicy: data.remotePolicy || null,
      urgency: data.urgency,
      status: "NEW",
    },
  });

  await prisma.mandatStatusEvent.create({
    data: { mandatId: mandat.id, fromStatus: null, toStatus: "NEW", actorUserId: user.id },
  });

  revalidatePath("/client/mandats");
  revalidatePath("/cabinet/mandats");
  return { ok: true };
}

export async function listMandatsForClient() {
  const user = await requireRole("CLIENT");
  return prisma.mandat.findMany({
    where: { companyId: user.companyId! },
    orderBy: { createdAt: "desc" },
  });
}

export async function listMandatsForCabinet() {
  await requireRole("CABINET");
  return prisma.mandat.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      company: { select: { name: true } },
      assignedConsultant: { include: { user: { select: { name: true } } } },
    },
  });
}

async function loadMandatDetail(mandatId: string) {
  return prisma.mandat.findUnique({
    where: { id: mandatId },
    include: {
      company: true,
      messages: { orderBy: { createdAt: "asc" }, include: { author: { select: { name: true, role: true } } } },
      events: { orderBy: { createdAt: "asc" } },
      assignedConsultant: { include: { user: { select: { name: true } } } },
    },
  });
}

export type MandatDetail = NonNullable<Awaited<ReturnType<typeof loadMandatDetail>>>;

export async function getMandatForClient(mandatId: string): Promise<MandatDetail | null> {
  const user = await requireRole("CLIENT");
  const mandat = await loadMandatDetail(mandatId);
  if (!mandat || mandat.companyId !== user.companyId) return null;
  return mandat;
}

export async function getMandatForCabinet(mandatId: string): Promise<MandatDetail | null> {
  await requireRole("CABINET");
  return loadMandatDetail(mandatId);
}

/** Loads a mandate for either a Client (own company only) or Cabinet staff (any mandate). */
async function loadMandatForParticipant(mandatId: string) {
  const user = await getSessionUser();
  if (!user) return { user: null, mandat: null } as const;

  const mandat = await loadMandatDetail(mandatId);
  if (!mandat) return { user, mandat: null } as const;

  if (user.role === "CLIENT" && mandat.companyId !== user.companyId) {
    return { user, mandat: null } as const;
  }
  if (user.role === "CANDIDATE") {
    return { user, mandat: null } as const;
  }

  return { user, mandat } as const;
}

export async function sendMandatMessageAction(mandatId: string, formData: FormData): Promise<ActionResult> {
  const { user, mandat } = await loadMandatForParticipant(mandatId);
  if (!user) return { ok: false, error: "Non authentifié" };
  if (!mandat) return { ok: false, error: "Mandat introuvable" };

  const parsed = mandatMessageSchema.safeParse({ body: formData.get("body") });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Message invalide" };
  }

  await prisma.mandatMessage.create({
    data: { mandatId, authorUserId: user.id, body: parsed.data.body },
  });

  revalidatePath(`/client/mandats/${mandatId}`);
  revalidatePath(`/cabinet/mandats/${mandatId}`);
  return { ok: true };
}

/** Cabinet validates a NEW mandate's intake, optionally assigning themselves as consultant, moving it to SOURCING. */
export async function validateIntakeAction(mandatId: string): Promise<ActionResult> {
  const user = await requireRole("CABINET");
  if (!user.cabinetProfileId) return { ok: false, error: "Profil cabinet introuvable" };

  const mandat = await prisma.mandat.findUnique({ where: { id: mandatId }, select: { assignedConsultantId: true } });
  if (!mandat) return { ok: false, error: "Mandat introuvable" };

  if (!mandat.assignedConsultantId) {
    await prisma.mandat.update({
      where: { id: mandatId },
      data: { assignedConsultantId: user.cabinetProfileId },
    });
  }

  try {
    await transitionMandat({ mandatId, toStatus: "SOURCING", actorUserId: user.id });
  } catch (err) {
    if (err instanceof InvalidMandatTransitionError) {
      return { ok: false, error: err.message };
    }
    throw err;
  }

  revalidatePath(`/client/mandats/${mandatId}`);
  revalidatePath(`/cabinet/mandats/${mandatId}`);
  revalidatePath("/cabinet/mandats");
  return { ok: true };
}

export async function cancelMandatAction(mandatId: string, note?: string): Promise<ActionResult> {
  const { user, mandat } = await loadMandatForParticipant(mandatId);
  if (!user) return { ok: false, error: "Non authentifié" };
  if (!mandat) return { ok: false, error: "Mandat introuvable" };

  try {
    await transitionMandat({ mandatId, toStatus: "CANCELLED", actorUserId: user.id, note });
  } catch (err) {
    if (err instanceof InvalidMandatTransitionError) {
      return { ok: false, error: err.message };
    }
    throw err;
  }

  revalidatePath(`/client/mandats/${mandatId}`);
  revalidatePath(`/cabinet/mandats/${mandatId}`);
  revalidatePath("/cabinet/mandats");
  revalidatePath("/client/mandats");
  return { ok: true };
}

export async function listMandateApplicationsForCabinet(mandatId: string) {
  await requireRole("CABINET");
  return prisma.mandateApplication.findMany({
    where: { mandatId },
    include: { candidate: true },
    orderBy: { createdAt: "asc" },
  });
}

export async function listMandateApplicationsForClient(mandatId: string) {
  const user = await requireRole("CLIENT");
  const mandat = await prisma.mandat.findUnique({ where: { id: mandatId }, select: { companyId: true } });
  if (!mandat || mandat.companyId !== user.companyId) return [];

  return prisma.mandateApplication.findMany({
    where: {
      mandatId,
      status: { not: "PROPOSED" }, // client never sees candidates the cabinet hasn't published yet
    },
    include: { candidate: true },
    orderBy: { createdAt: "asc" },
  });
}

/** Cabinet publishes all PROPOSED candidates as the mandate's short-list, moving SOURCING -> SHORTLIST_SENT. */
export async function publishShortlistAction(mandatId: string): Promise<ActionResult> {
  const user = await requireRole("CABINET");

  const proposed = await prisma.mandateApplication.findMany({ where: { mandatId, status: "PROPOSED" } });
  if (proposed.length === 0) {
    return { ok: false, error: "Ajoutez au moins un candidat avant de publier la short-list" };
  }

  await prisma.mandateApplication.updateMany({
    where: { mandatId, status: "PROPOSED" },
    data: { status: "PUBLISHED_TO_CLIENT", publishedAt: new Date() },
  });

  try {
    await transitionMandat({ mandatId, toStatus: "SHORTLIST_SENT", actorUserId: user.id });
  } catch (err) {
    if (err instanceof InvalidMandatTransitionError) return { ok: false, error: err.message };
    throw err;
  }

  revalidatePath(`/cabinet/mandats/${mandatId}`);
  revalidatePath(`/client/mandats/${mandatId}`);
  return { ok: true };
}

/** Client picks which shortlisted candidates to meet, moving SHORTLIST_SENT -> CLIENT_SELECTING. */
export async function selectShortlistCandidatesAction(
  mandatId: string,
  selectedApplicationIds: string[],
): Promise<ActionResult> {
  const user = await requireRole("CLIENT");

  const mandat = await prisma.mandat.findUnique({ where: { id: mandatId }, select: { companyId: true } });
  if (!mandat || mandat.companyId !== user.companyId) return { ok: false, error: "Mandat introuvable" };
  if (selectedApplicationIds.length === 0) {
    return { ok: false, error: "Sélectionnez au moins un candidat à rencontrer" };
  }

  const applications = await prisma.mandateApplication.findMany({
    where: { mandatId, status: "PUBLISHED_TO_CLIENT" },
  });
  const validIds = new Set(applications.map((a) => a.id));
  if (selectedApplicationIds.some((id) => !validIds.has(id))) {
    return { ok: false, error: "Sélection invalide" };
  }

  const selectedApplications = applications.filter((a) => selectedApplicationIds.includes(a.id));
  const rejectedIds = applications.map((a) => a.id).filter((id) => !selectedApplicationIds.includes(id));

  await prisma.$transaction([
    prisma.mandateApplication.updateMany({
      where: { id: { in: selectedApplicationIds } },
      data: { status: "SELECTED_BY_CLIENT", selectedAt: new Date() },
    }),
    ...(rejectedIds.length > 0
      ? [
          prisma.mandateApplication.updateMany({
            where: { id: { in: rejectedIds } },
            data: { status: "REJECTED_BY_CLIENT" },
          }),
        ]
      : []),
    // Stub interviews so the client can start proposing availability slots (step 6).
    prisma.interview.createMany({
      data: selectedApplications.map((a) => ({
        mandatId,
        mandateApplicationId: a.id,
        candidateId: a.candidateId,
        status: "SLOT_PROPOSED" as const,
      })),
    }),
  ]);

  try {
    await transitionMandat({ mandatId, toStatus: "CLIENT_SELECTING", actorUserId: user.id });
  } catch (err) {
    if (err instanceof InvalidMandatTransitionError) return { ok: false, error: err.message };
    throw err;
  }

  revalidatePath(`/client/mandats/${mandatId}`);
  revalidatePath(`/cabinet/mandats/${mandatId}`);
  return { ok: true };
}

/** Cabinet formalizes an offer to a validated candidate, moving INTERVIEWING -> OFFER (step 8, part 1). */
export async function formalizeOfferAction(mandatId: string, applicationId: string): Promise<ActionResult> {
  const user = await requireRole("CABINET");

  const application = await prisma.mandateApplication.findUnique({
    where: { id: applicationId },
    select: { mandatId: true, candidateId: true, status: true },
  });
  if (!application || application.mandatId !== mandatId) {
    return { ok: false, error: "Candidature introuvable" };
  }
  if (application.status !== "VALIDATED") {
    return { ok: false, error: "Ce candidat n'a pas encore été validé par le client" };
  }

  await prisma.mandat.update({ where: { id: mandatId }, data: { wonCandidateId: application.candidateId } });

  try {
    await transitionMandat({ mandatId, toStatus: "OFFER", actorUserId: user.id });
  } catch (err) {
    if (err instanceof InvalidMandatTransitionError) return { ok: false, error: err.message };
    throw err;
  }

  revalidatePath(`/cabinet/mandats/${mandatId}`);
  revalidatePath(`/client/mandats/${mandatId}`);
  return { ok: true };
}

/** Cabinet confirms the hire, moving OFFER -> WON and closing the mandate (step 8, part 2 — no invoicing, see plan). */
export async function closeMandatWonAction(mandatId: string): Promise<ActionResult> {
  const user = await requireRole("CABINET");

  const mandat = await prisma.mandat.findUnique({ where: { id: mandatId }, select: { wonCandidateId: true } });
  if (!mandat?.wonCandidateId) {
    return { ok: false, error: "Aucun candidat retenu pour ce mandat" };
  }

  try {
    await transitionMandat({ mandatId, toStatus: "WON", actorUserId: user.id });
  } catch (err) {
    if (err instanceof InvalidMandatTransitionError) return { ok: false, error: err.message };
    throw err;
  }

  await prisma.mandateApplication.updateMany({
    where: { mandatId, candidateId: mandat.wonCandidateId },
    data: { status: "HIRED" },
  });

  revalidatePath(`/cabinet/mandats/${mandatId}`);
  revalidatePath(`/client/mandats/${mandatId}`);
  revalidatePath("/cabinet/mandats");
  revalidatePath("/client/mandats");
  return { ok: true };
}
