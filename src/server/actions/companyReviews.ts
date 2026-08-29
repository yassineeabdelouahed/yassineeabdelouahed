"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSessionUser, requireRole, requireAdmin } from "@/lib/rbac";
import { submitCompanyReviewSchema } from "@/lib/validations/companyReview";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function getCompanyPublicProfile(companyId: string) {
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    select: { id: true, name: true, city: true, sector: true, verifiedAt: true },
  });
  if (!company) return null;

  const reviews = await prisma.companyReview.findMany({
    where: { companyId, status: "APPROVED" },
    include: { author: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : null;

  return { company, reviews, averageRating };
}

/** A candidate may review a company only after applying to one of its job postings, and only once. */
export async function getReviewEligibility(companyId: string): Promise<{ canReview: boolean; alreadyReviewed: boolean }> {
  const user = await getSessionUser();
  if (!user || user.role !== "CANDIDATE" || !user.candidateId) return { canReview: false, alreadyReviewed: false };

  const [hasApplied, existingReview] = await Promise.all([
    prisma.jobApplication.findFirst({
      where: { candidateId: user.candidateId, jobPosting: { companyId } },
    }),
    prisma.companyReview.findUnique({
      where: { companyId_authorUserId: { companyId, authorUserId: user.id } },
    }),
  ]);

  return { canReview: !!hasApplied && !existingReview, alreadyReviewed: !!existingReview };
}

export async function submitCompanyReviewAction(companyId: string, formData: FormData): Promise<ActionResult> {
  const user = await requireRole("CANDIDATE");

  const eligibility = await getReviewEligibility(companyId);
  if (eligibility.alreadyReviewed) return { ok: false, error: "Vous avez déjà laissé un avis sur cette entreprise" };
  if (!eligibility.canReview) {
    return { ok: false, error: "Vous devez avoir postulé à une offre de cette entreprise pour laisser un avis" };
  }

  const parsed = submitCompanyReviewSchema.safeParse({
    rating: formData.get("rating"),
    comment: formData.get("comment") ?? undefined,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }

  await prisma.companyReview.create({
    data: {
      companyId,
      authorUserId: user.id,
      rating: parsed.data.rating,
      comment: parsed.data.comment || null,
    },
  });

  revalidatePath(`/companies/${companyId}`);
  revalidatePath("/cabinet/admin/reviews");
  return { ok: true };
}

export async function listPendingReviewsForCabinet() {
  await requireAdmin();
  return prisma.companyReview.findMany({
    where: { status: "PENDING" },
    include: { company: { select: { name: true } }, author: { select: { name: true } } },
    orderBy: { createdAt: "asc" },
  });
}

export async function moderateReviewAction(reviewId: string, decision: "APPROVED" | "REJECTED"): Promise<ActionResult> {
  await requireAdmin();

  const review = await prisma.companyReview.findUnique({ where: { id: reviewId } });
  if (!review) return { ok: false, error: "Avis introuvable" };
  if (review.status !== "PENDING") return { ok: false, error: "Cet avis a déjà été traité" };

  await prisma.companyReview.update({
    where: { id: reviewId },
    data: { status: decision, moderatedAt: new Date() },
  });

  revalidatePath("/cabinet/admin/reviews");
  revalidatePath(`/companies/${review.companyId}`);
  return { ok: true };
}
