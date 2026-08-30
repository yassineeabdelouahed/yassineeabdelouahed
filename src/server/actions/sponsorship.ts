"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole, requireAdmin } from "@/lib/rbac";
import { notifyUser } from "@/lib/notify";
import { createInvoice } from "@/lib/invoice";
import { createSponsorshipSchema, priceForDuration } from "@/lib/validations/sponsorship";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function requestSponsorshipAction(jobId: string, formData: FormData): Promise<ActionResult> {
  const user = await requireRole("CLIENT");

  const job = await prisma.jobPosting.findUnique({ where: { id: jobId } });
  if (!job || job.companyId !== user.companyId) return { ok: false, error: "Offre introuvable" };
  if (job.status !== "PUBLISHED") return { ok: false, error: "Seule une offre publiée peut être sponsorisée" };

  const isCurrentlySponsored = job.sponsoredUntil && job.sponsoredUntil > new Date();
  const existingPending = await prisma.jobSponsorship.findFirst({
    where: { jobPostingId: jobId, paymentStatus: "PENDING" },
  });
  if (isCurrentlySponsored) return { ok: false, error: "Cette offre est déjà sponsorisée" };
  if (existingPending) return { ok: false, error: "Une demande de sponsorisation est déjà en attente" };

  const parsed = createSponsorshipSchema.safeParse({
    durationDays: formData.get("durationDays"),
    paymentMethod: formData.get("paymentMethod"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const price = priceForDuration(parsed.data.durationDays);
  if (price === null) return { ok: false, error: "Durée invalide" };

  await prisma.jobSponsorship.create({
    data: {
      jobPostingId: jobId,
      requestedByUserId: user.id,
      durationDays: parsed.data.durationDays,
      price,
      paymentMethod: parsed.data.paymentMethod,
    },
  });

  revalidatePath("/client/jobs");
  revalidatePath("/cabinet/jobs");
  return { ok: true };
}

export async function listSponsorshipsForCabinet() {
  await requireAdmin();
  return prisma.jobSponsorship.findMany({
    where: { paymentStatus: "PENDING" },
    include: { jobPosting: { include: { company: { select: { name: true } } } }, requestedBy: { select: { name: true } } },
    orderBy: { createdAt: "asc" },
  });
}

export async function confirmSponsorshipAction(sponsorshipId: string): Promise<ActionResult> {
  const admin = await requireAdmin();

  const sponsorship = await prisma.jobSponsorship.findUnique({
    where: { id: sponsorshipId },
    include: { jobPosting: { select: { id: true, title: true, companyId: true } } },
  });
  if (!sponsorship) return { ok: false, error: "Demande introuvable" };
  if (sponsorship.paymentStatus !== "PENDING") return { ok: false, error: "Cette demande a déjà été traitée" };

  const startAt = new Date();
  const endAt = new Date(startAt.getTime() + sponsorship.durationDays * 86400000);

  await prisma.$transaction(async (tx) => {
    await tx.jobSponsorship.update({
      where: { id: sponsorshipId },
      data: { paymentStatus: "CONFIRMED", startAt, endAt, confirmedAt: new Date(), confirmedByUserId: admin.id },
    });
    await tx.jobPosting.update({ where: { id: sponsorship.jobPostingId }, data: { sponsoredUntil: endAt } });
    await createInvoice(tx, {
      sourceType: "SPONSORSHIP",
      sourceId: sponsorshipId,
      companyId: sponsorship.jobPosting.companyId,
      userId: sponsorship.requestedByUserId,
      description: `Sponsorisation de l'offre "${sponsorship.jobPosting.title}" — ${sponsorship.durationDays} jours`,
      amount: sponsorship.price,
      currency: sponsorship.currency,
    });
  });

  await notifyUser(sponsorship.requestedByUserId, {
    type: "sponsorship_confirmed",
    title: "Sponsorisation confirmée",
    body: `"${sponsorship.jobPosting.title}" est maintenant mise en avant pour ${sponsorship.durationDays} jours.`,
    link: "/client/jobs",
  });

  revalidatePath("/cabinet/jobs");
  revalidatePath("/client/jobs");
  revalidatePath("/");
  revalidatePath("/results");
  return { ok: true };
}

export async function cancelSponsorshipAction(sponsorshipId: string): Promise<ActionResult> {
  await requireAdmin();

  const sponsorship = await prisma.jobSponsorship.findUnique({ where: { id: sponsorshipId } });
  if (!sponsorship) return { ok: false, error: "Demande introuvable" };

  await prisma.jobSponsorship.update({ where: { id: sponsorshipId }, data: { paymentStatus: "CANCELLED" } });

  revalidatePath("/cabinet/jobs");
  revalidatePath("/client/jobs");
  return { ok: true };
}
