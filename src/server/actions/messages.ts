"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/rbac";
import { notifyUser } from "@/lib/notify";
import { enforceRateLimit, RateLimitError } from "@/lib/rateLimit";

export type ActionResult = { ok: true } | { ok: false; error: string };

async function loadApplicationDetail(applicationId: string) {
  return prisma.jobApplication.findUnique({
    where: { id: applicationId },
    include: {
      candidate: { select: { id: true, firstName: true, lastName: true, userId: true } },
      jobPosting: { select: { id: true, title: true, companyId: true, postedByUserId: true } },
      messages: { orderBy: { createdAt: "asc" }, include: { sender: { select: { name: true, role: true } } } },
    },
  });
}

export type ApplicationDetail = NonNullable<Awaited<ReturnType<typeof loadApplicationDetail>>>;

/** Loads a job application for either the Client who owns the job posting or the Candidate who applied. */
async function loadApplicationForParticipant(applicationId: string) {
  const user = await getSessionUser();
  if (!user) return { user: null, application: null } as const;

  const application = await loadApplicationDetail(applicationId);
  if (!application) return { user, application: null } as const;

  if (user.role === "CLIENT" && application.jobPosting.companyId !== user.companyId) {
    return { user, application: null } as const;
  }
  if (user.role === "CANDIDATE" && application.candidateId !== user.candidateId) {
    return { user, application: null } as const;
  }
  if (user.role === "CABINET") {
    return { user, application: null } as const;
  }

  return { user, application } as const;
}

export async function getApplicationForClient(applicationId: string): Promise<ApplicationDetail | null> {
  const { user, application } = await loadApplicationForParticipant(applicationId);
  if (!user || user.role !== "CLIENT" || !application) return null;
  return application;
}

export async function getApplicationForCandidate(applicationId: string): Promise<ApplicationDetail | null> {
  const { user, application } = await loadApplicationForParticipant(applicationId);
  if (!user || user.role !== "CANDIDATE" || !application) return null;
  return application;
}

export async function sendDirectMessageAction(applicationId: string, formData: FormData): Promise<ActionResult> {
  const { user, application } = await loadApplicationForParticipant(applicationId);
  if (!user) return { ok: false, error: "Non authentifié" };
  if (!application) return { ok: false, error: "Candidature introuvable" };

  const body = String(formData.get("body") ?? "").trim();
  if (!body) return { ok: false, error: "Message vide" };

  try {
    await enforceRateLimit(`message:${user.id}`, {
      maxAttempts: 60,
      windowMinutes: 60,
      message: "Trop de messages envoyés. Réessayez dans un moment.",
    });
  } catch (err) {
    if (err instanceof RateLimitError) return { ok: false, error: err.message };
    throw err;
  }

  await prisma.directMessage.create({
    data: { jobApplicationId: applicationId, senderUserId: user.id, body },
  });

  const recipientUserId = user.role === "CLIENT" ? application.candidate.userId : application.jobPosting.postedByUserId;
  if (recipientUserId) {
    await notifyUser(recipientUserId, {
      type: "direct_message",
      title: "Nouveau message",
      body: `${application.jobPosting.title} — ${body.slice(0, 80)}`,
      link:
        user.role === "CLIENT"
          ? `/candidate/applications/${applicationId}`
          : `/client/jobs/${application.jobPosting.id}/applicants/${applicationId}`,
    });
  }

  revalidatePath(`/client/jobs/${application.jobPosting.id}/applicants/${applicationId}`);
  revalidatePath(`/candidate/applications/${applicationId}`);
  return { ok: true };
}
