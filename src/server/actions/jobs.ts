"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole, getSessionUser } from "@/lib/rbac";
import { Prisma } from "@/generated/prisma/client";
import { createJobPostingSchema, jobApplicationSchema } from "@/lib/validations/jobs";

export type ActionResult = { ok: true } | { ok: false; error: string };

export type JobFilters = {
  keyword?: string;
  location?: string;
  category?: string;
  contracts?: string[];
  remoteOnly?: boolean;
  sort?: "recent" | "salary";
};

export async function listPublishedJobs(filters: JobFilters = {}) {
  const where: Prisma.JobPostingWhereInput = { status: "PUBLISHED" };

  const and: Prisma.JobPostingWhereInput[] = [];
  if (filters.keyword) {
    and.push({
      OR: [
        { title: { contains: filters.keyword, mode: "insensitive" } },
        { category: { contains: filters.keyword, mode: "insensitive" } },
        { company: { name: { contains: filters.keyword, mode: "insensitive" } } },
      ],
    });
  }
  if (filters.location) {
    and.push({ city: { contains: filters.location, mode: "insensitive" } });
  }
  if (filters.category) {
    and.push({ category: filters.category });
  }
  if (filters.contracts && filters.contracts.length > 0) {
    and.push({ contractType: { in: filters.contracts } });
  }
  if (filters.remoteOnly) {
    and.push({ remoteType: { not: "Sur site" } });
  }
  if (and.length > 0) where.AND = and;

  return prisma.jobPosting.findMany({
    where,
    include: { company: { select: { name: true } } },
    orderBy:
      filters.sort === "salary"
        ? [{ salaryMax: { sort: "desc", nulls: "last" } }]
        : [{ publishedAt: "desc" }],
  });
}

export async function getPublishedJob(jobId: string) {
  return prisma.jobPosting.findFirst({
    where: { id: jobId, status: "PUBLISHED" },
    include: { company: true },
  });
}

export async function listSimilarJobs(category: string | null, excludeId: string) {
  if (!category) return [];
  return prisma.jobPosting.findMany({
    where: { status: "PUBLISHED", category, id: { not: excludeId } },
    include: { company: { select: { name: true } } },
    take: 3,
    orderBy: { publishedAt: "desc" },
  });
}

export async function createJobPostingAction(formData: FormData): Promise<ActionResult> {
  const user = await requireRole("CLIENT");
  if (!user.companyId) return { ok: false, error: "Profil entreprise introuvable" };

  const parsed = createJobPostingSchema.safeParse({
    title: formData.get("title"),
    city: formData.get("city") ?? undefined,
    contractType: formData.get("contractType"),
    category: formData.get("category"),
    remoteType: formData.get("remoteType") ?? undefined,
    salaryMin: formData.get("salaryMin") || undefined,
    salaryMax: formData.get("salaryMax") || undefined,
    description: formData.get("description"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const data = parsed.data;

  await prisma.jobPosting.create({
    data: {
      companyId: user.companyId,
      postedByUserId: user.id,
      title: data.title,
      description: data.description,
      city: data.city || null,
      contractType: data.contractType,
      category: data.category,
      remoteType: data.remoteType || "Sur site",
      salaryMin: data.salaryMin ?? null,
      salaryMax: data.salaryMax ?? null,
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  revalidatePath("/");
  revalidatePath("/results");
  revalidatePath("/client/jobs");
  return { ok: true };
}

export async function listJobPostingsForClient() {
  const user = await requireRole("CLIENT");
  return prisma.jobPosting.findMany({
    where: { companyId: user.companyId! },
    orderBy: { createdAt: "desc" },
    include: { applications: { select: { id: true } } },
  });
}

export async function applyToJobAction(jobId: string, formData: FormData): Promise<ActionResult> {
  const user = await requireRole("CANDIDATE");
  if (!user.candidateId) return { ok: false, error: "Profil candidat introuvable" };

  const job = await prisma.jobPosting.findFirst({ where: { id: jobId, status: "PUBLISHED" } });
  if (!job) return { ok: false, error: "Offre introuvable" };

  const existing = await prisma.jobApplication.findUnique({
    where: { jobPostingId_candidateId: { jobPostingId: jobId, candidateId: user.candidateId } },
  });
  if (existing) return { ok: false, error: "Vous avez déjà postulé à cette offre" };

  const parsed = jobApplicationSchema.safeParse({ coverNote: formData.get("coverNote") ?? undefined });
  if (!parsed.success) return { ok: false, error: "Formulaire invalide" };

  await prisma.jobApplication.create({
    data: { jobPostingId: jobId, candidateId: user.candidateId, coverNote: parsed.data.coverNote || null },
  });

  revalidatePath(`/jobs/${jobId}`);
  revalidatePath("/candidate/applications");
  return { ok: true };
}

export async function hasCandidateApplied(jobId: string): Promise<boolean> {
  const user = await getSessionUser();
  if (!user || user.role !== "CANDIDATE" || !user.candidateId) return false;
  const existing = await prisma.jobApplication.findUnique({
    where: { jobPostingId_candidateId: { jobPostingId: jobId, candidateId: user.candidateId } },
  });
  return !!existing;
}

export async function listCandidateApplications() {
  const user = await requireRole("CANDIDATE");
  if (!user.candidateId) return [];
  return prisma.jobApplication.findMany({
    where: { candidateId: user.candidateId },
    include: { jobPosting: { include: { company: { select: { name: true } } } } },
    orderBy: { createdAt: "desc" },
  });
}
