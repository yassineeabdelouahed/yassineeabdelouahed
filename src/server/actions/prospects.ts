"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { createProspectSchema, prospectStageNoteSchema } from "@/lib/validations/prospect";
import {
  transitionProspect,
  canTransitionProspect,
  InvalidProspectTransitionError,
} from "@/server/services/prospectStateMachine";
import type { ProspectStage } from "@/generated/prisma/enums";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function createProspectAction(formData: FormData): Promise<ActionResult> {
  const user = await requireRole("CABINET");

  const parsed = createProspectSchema.safeParse({
    companyName: formData.get("companyName"),
    sector: formData.get("sector") ?? undefined,
    city: formData.get("city") ?? undefined,
    contactName: formData.get("contactName") ?? undefined,
    contactEmail: formData.get("contactEmail") ?? undefined,
    contactPhone: formData.get("contactPhone") ?? undefined,
    urgency: formData.get("urgency"),
    estimatedBudget: formData.get("estimatedBudget") || undefined,
    notes: formData.get("notes") ?? undefined,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const data = parsed.data;

  await prisma.$transaction(async (tx) => {
    const prospect = await tx.prospect.create({
      data: {
        companyName: data.companyName,
        sector: data.sector || null,
        city: data.city || null,
        contactName: data.contactName || null,
        contactEmail: data.contactEmail || null,
        contactPhone: data.contactPhone || null,
        urgency: data.urgency,
        estimatedBudget: data.estimatedBudget ?? null,
        notes: data.notes || null,
        createdByUserId: user.id,
      },
    });
    await tx.prospectStageEvent.create({
      data: { prospectId: prospect.id, fromStage: null, toStage: "PROSPECT", actorUserId: user.id },
    });
  });

  revalidatePath("/cabinet/prospects");
  return { ok: true };
}

export async function listProspects() {
  await requireRole("CABINET");
  return prisma.prospect.findMany({
    where: { stage: { notIn: ["WON", "LOST"] } },
    orderBy: { updatedAt: "desc" },
  });
}

export async function listClosedProspects() {
  await requireRole("CABINET");
  return prisma.prospect.findMany({
    where: { stage: { in: ["WON", "LOST"] } },
    orderBy: { updatedAt: "desc" },
    take: 30,
  });
}

export async function getProspect(prospectId: string) {
  await requireRole("CABINET");
  return prisma.prospect.findUnique({
    where: { id: prospectId },
    include: {
      createdBy: { select: { name: true } },
      stageEvents: { orderBy: { createdAt: "desc" }, include: { actor: { select: { name: true } } } },
    },
  });
}

export async function advanceProspectAction(
  prospectId: string,
  toStage: ProspectStage,
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireRole("CABINET");

  const parsed = prospectStageNoteSchema.safeParse({ note: formData.get("note") ?? undefined });
  const note = parsed.success ? parsed.data.note : undefined;

  const prospect = await prisma.prospect.findUnique({ where: { id: prospectId }, select: { stage: true } });
  if (!prospect) return { ok: false, error: "Prospect introuvable" };
  if (!canTransitionProspect(prospect.stage, toStage)) {
    return { ok: false, error: "Transition invalide" };
  }

  try {
    await transitionProspect({ prospectId, toStage, actorUserId: user.id, note: note || undefined });
  } catch (err) {
    if (err instanceof InvalidProspectTransitionError) return { ok: false, error: err.message };
    throw err;
  }

  revalidatePath("/cabinet/prospects");
  revalidatePath(`/cabinet/prospects/${prospectId}`);
  return { ok: true };
}
