"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { notifyUser } from "@/lib/notify";
import {
  submitAvailabilitySchema,
  scheduleInterviewSchema,
  submitFeedbackSchema,
} from "@/lib/validations/interviews";
import { transitionMandat, InvalidMandatTransitionError } from "@/server/services/mandatStateMachine";

export type ActionResult = { ok: true } | { ok: false; error: string };

async function loadInterviewsForMandate(mandatId: string) {
  return prisma.interview.findMany({
    where: { mandatId },
    include: {
      candidate: { select: { firstName: true, lastName: true, headline: true } },
      slots: { orderBy: { startAt: "asc" } },
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function listInterviewsForCabinet(mandatId: string) {
  await requireRole("CABINET");
  return loadInterviewsForMandate(mandatId);
}

export async function listInterviewsForClient(mandatId: string) {
  const user = await requireRole("CLIENT");
  const mandat = await prisma.mandat.findUnique({ where: { id: mandatId }, select: { companyId: true } });
  if (!mandat || mandat.companyId !== user.companyId) return [];
  return loadInterviewsForMandate(mandatId);
}

/** Client proposes availability slots for one interview; kicks off CLIENT_SELECTING -> INTERVIEWING on first submission. */
export async function submitAvailabilityAction(formData: FormData): Promise<ActionResult> {
  const user = await requireRole("CLIENT");

  let rawSlots: unknown;
  try {
    rawSlots = JSON.parse(String(formData.get("slotsJson") ?? "[]"));
  } catch {
    return { ok: false, error: "Créneaux invalides" };
  }

  const parsed = submitAvailabilitySchema.safeParse({
    interviewId: formData.get("interviewId"),
    slots: rawSlots,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const { interviewId, slots } = parsed.data;

  const interview = await prisma.interview.findUnique({
    where: { id: interviewId },
    include: { mandat: { select: { id: true, companyId: true, status: true } } },
  });
  if (!interview || interview.mandat.companyId !== user.companyId) {
    return { ok: false, error: "Entretien introuvable" };
  }
  if (interview.status !== "SLOT_PROPOSED") {
    return { ok: false, error: "Cet entretien n'est plus en attente de créneaux" };
  }

  const parsedSlots = slots.map((s) => ({ startAt: new Date(s.startAt), endAt: new Date(s.endAt) }));
  if (parsedSlots.some((s) => Number.isNaN(s.startAt.getTime()) || Number.isNaN(s.endAt.getTime()) || s.endAt <= s.startAt)) {
    return { ok: false, error: "Créneaux invalides" };
  }

  await prisma.interviewSlot.createMany({
    data: parsedSlots.map((s) => ({
      interviewId,
      proposedByUserId: user.id,
      startAt: s.startAt,
      endAt: s.endAt,
    })),
  });

  if (interview.mandat.status === "CLIENT_SELECTING") {
    try {
      await transitionMandat({ mandatId: interview.mandat.id, toStatus: "INTERVIEWING", actorUserId: user.id });
    } catch (err) {
      if (!(err instanceof InvalidMandatTransitionError)) throw err;
    }
  }

  revalidatePath(`/client/mandats/${interview.mandat.id}`);
  revalidatePath(`/cabinet/mandats/${interview.mandat.id}`);
  return { ok: true };
}

/** Cabinet picks one of the client's proposed slots to confirm the interview. */
export async function scheduleInterviewAction(formData: FormData): Promise<ActionResult> {
  await requireRole("CABINET");

  const parsed = scheduleInterviewSchema.safeParse({
    interviewId: formData.get("interviewId"),
    slotId: formData.get("slotId"),
    mode: formData.get("mode"),
    meetingLink: formData.get("meetingLink") ?? undefined,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const { interviewId, slotId, mode, meetingLink } = parsed.data;

  const interview = await prisma.interview.findUnique({
    where: { id: interviewId },
    include: {
      mandat: { select: { id: true, reference: true, title: true, createdByUserId: true } },
      candidate: { select: { userId: true, firstName: true, lastName: true } },
      slots: true,
    },
  });
  if (!interview) return { ok: false, error: "Entretien introuvable" };
  const slot = interview.slots.find((s) => s.id === slotId);
  if (!slot) return { ok: false, error: "Créneau introuvable" };

  const durationMinutes = Math.round((slot.endAt.getTime() - slot.startAt.getTime()) / 60000);

  await prisma.$transaction([
    prisma.interviewSlot.updateMany({ where: { interviewId }, data: { chosen: false } }),
    prisma.interviewSlot.update({ where: { id: slotId }, data: { chosen: true } }),
    prisma.interview.update({
      where: { id: interviewId },
      data: { status: "SCHEDULED", scheduledAt: slot.startAt, durationMinutes, mode, meetingLink: meetingLink || null },
    }),
    prisma.mandateApplication.update({
      where: { id: interview.mandateApplicationId },
      data: { status: "INTERVIEWING" },
    }),
  ]);

  const when = slot.startAt.toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" });
  await notifyUser(interview.mandat.createdByUserId, {
    type: "interview_scheduled",
    title: "Entretien planifié",
    body: `${interview.candidate.firstName} ${interview.candidate.lastName} — ${when}`,
    link: `/client/mandats/${interview.mandat.id}`,
  });
  if (interview.candidate.userId) {
    await notifyUser(interview.candidate.userId, {
      type: "interview_scheduled",
      title: "Entretien planifié",
      body: `${interview.mandat.title} — ${when}`,
      link: "/candidate/applications",
    });
  }

  revalidatePath(`/cabinet/mandats/${interview.mandat.id}`);
  revalidatePath(`/client/mandats/${interview.mandat.id}`);
  return { ok: true };
}

/** Client records their post-interview decision; propagates to the candidate's shortlist status. */
export async function submitFeedbackAction(formData: FormData): Promise<ActionResult> {
  const user = await requireRole("CLIENT");

  const parsed = submitFeedbackSchema.safeParse({
    interviewId: formData.get("interviewId"),
    outcome: formData.get("outcome"),
    comment: formData.get("comment") ?? undefined,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const { interviewId, outcome, comment } = parsed.data;

  const interview = await prisma.interview.findUnique({
    where: { id: interviewId },
    include: { mandat: { select: { id: true, companyId: true } } },
  });
  if (!interview || interview.mandat.companyId !== user.companyId) {
    return { ok: false, error: "Entretien introuvable" };
  }
  if (interview.status !== "SCHEDULED") {
    return { ok: false, error: "Cet entretien n'est pas planifié" };
  }

  await prisma.$transaction([
    prisma.interview.update({
      where: { id: interviewId },
      data: {
        status: "COMPLETED",
        clientFeedbackOutcome: outcome,
        clientFeedbackComment: comment || null,
        feedbackSubmittedAt: new Date(),
        feedbackByUserId: user.id,
      },
    }),
    prisma.mandateApplication.update({
      where: { id: interview.mandateApplicationId },
      data: { status: outcome },
    }),
  ]);

  revalidatePath(`/client/mandats/${interview.mandat.id}`);
  revalidatePath(`/cabinet/mandats/${interview.mandat.id}`);
  return { ok: true };
}
