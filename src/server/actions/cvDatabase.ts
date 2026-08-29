"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole, requireAdmin } from "@/lib/rbac";
import { notifyUser } from "@/lib/notify";
import { Prisma } from "@/generated/prisma/client";
import {
  requestCvAccessSchema,
  searchCandidatesSchema,
  priceForCvAccessDuration,
} from "@/lib/validations/cvDatabase";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function getCvDatabaseAccessStatus(): Promise<{ unlocked: boolean; expiresAt: Date | null; hasPending: boolean }> {
  const user = await requireRole("CLIENT");
  if (!user.companyId) return { unlocked: false, expiresAt: null, hasPending: false };

  const active = await prisma.cvDatabaseAccess.findFirst({
    where: { companyId: user.companyId, paymentStatus: "CONFIRMED", endAt: { gt: new Date() } },
    orderBy: { endAt: "desc" },
  });
  const pending = await prisma.cvDatabaseAccess.findFirst({
    where: { companyId: user.companyId, paymentStatus: "PENDING" },
  });

  return { unlocked: !!active, expiresAt: active?.endAt ?? null, hasPending: !!pending };
}

export async function requestCvAccessAction(formData: FormData): Promise<ActionResult> {
  const user = await requireRole("CLIENT");
  if (!user.companyId) return { ok: false, error: "Profil entreprise introuvable" };

  const status = await getCvDatabaseAccessStatus();
  if (status.unlocked) return { ok: false, error: "Vous avez déjà accès à la CVthèque" };
  if (status.hasPending) return { ok: false, error: "Une demande est déjà en attente" };

  const parsed = requestCvAccessSchema.safeParse({
    durationDays: formData.get("durationDays"),
    paymentMethod: formData.get("paymentMethod"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const price = priceForCvAccessDuration(parsed.data.durationDays);
  if (price === null) return { ok: false, error: "Durée invalide" };

  await prisma.cvDatabaseAccess.create({
    data: {
      companyId: user.companyId,
      requestedByUserId: user.id,
      durationDays: parsed.data.durationDays,
      price,
      paymentMethod: parsed.data.paymentMethod,
    },
  });

  revalidatePath("/client/cv-database");
  revalidatePath("/cabinet/admin/cv-access");
  return { ok: true };
}

export async function listCvAccessRequestsForCabinet() {
  await requireAdmin();
  return prisma.cvDatabaseAccess.findMany({
    where: { paymentStatus: "PENDING" },
    include: { company: { select: { name: true } }, requestedBy: { select: { name: true } } },
    orderBy: { createdAt: "asc" },
  });
}

export async function confirmCvAccessAction(requestId: string): Promise<ActionResult> {
  const admin = await requireAdmin();

  const request = await prisma.cvDatabaseAccess.findUnique({ where: { id: requestId } });
  if (!request) return { ok: false, error: "Demande introuvable" };
  if (request.paymentStatus !== "PENDING") return { ok: false, error: "Cette demande a déjà été traitée" };

  const startAt = new Date();
  const endAt = new Date(startAt.getTime() + request.durationDays * 86400000);

  await prisma.cvDatabaseAccess.update({
    where: { id: requestId },
    data: { paymentStatus: "CONFIRMED", startAt, endAt, confirmedAt: new Date(), confirmedByUserId: admin.id },
  });

  await notifyUser(request.requestedByUserId, {
    type: "cv_access_confirmed",
    title: "Accès à la CVthèque confirmé",
    body: `Votre accès est actif jusqu'au ${endAt.toLocaleDateString("fr-FR")}.`,
    link: "/client/cv-database",
  });

  revalidatePath("/cabinet/admin/cv-access");
  revalidatePath("/client/cv-database");
  return { ok: true };
}

export async function cancelCvAccessAction(requestId: string): Promise<ActionResult> {
  await requireAdmin();

  const request = await prisma.cvDatabaseAccess.findUnique({ where: { id: requestId } });
  if (!request) return { ok: false, error: "Demande introuvable" };

  await prisma.cvDatabaseAccess.update({ where: { id: requestId }, data: { paymentStatus: "CANCELLED" } });

  revalidatePath("/cabinet/admin/cv-access");
  return { ok: true };
}

export type CandidateSearchResult =
  | { locked: true; teaser: { headline: string | null; location: string | null; yearsExperience: number | null; skills: string[] }[] }
  | {
      locked: false;
      results: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string | null;
        headline: string | null;
        location: string | null;
        yearsExperience: number | null;
        skills: string[];
        cvUrl: string | null;
      }[];
    };

export async function searchCandidatesForClient(formData: FormData): Promise<CandidateSearchResult> {
  await requireRole("CLIENT");

  const parsed = searchCandidatesSchema.safeParse({
    keyword: formData.get("keyword") ?? undefined,
    location: formData.get("location") ?? undefined,
    minExperience: formData.get("minExperience") || undefined,
  });
  const filters = parsed.success ? parsed.data : {};

  const where: Prisma.CandidateWhereInput = {};
  const and: Prisma.CandidateWhereInput[] = [];
  if (filters.keyword) {
    and.push({
      OR: [
        { headline: { contains: filters.keyword, mode: "insensitive" } },
        { skills: { has: filters.keyword } },
        { firstName: { contains: filters.keyword, mode: "insensitive" } },
        { lastName: { contains: filters.keyword, mode: "insensitive" } },
      ],
    });
  }
  if (filters.location) and.push({ location: { contains: filters.location, mode: "insensitive" } });
  if (filters.minExperience != null) and.push({ yearsExperience: { gte: filters.minExperience } });
  if (and.length > 0) where.AND = and;

  const status = await getCvDatabaseAccessStatus();

  const candidates = await prisma.candidate.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  if (!status.unlocked) {
    return {
      locked: true,
      teaser: candidates.map((c) => ({
        headline: c.headline,
        location: c.location,
        yearsExperience: c.yearsExperience,
        skills: c.skills,
      })),
    };
  }

  return {
    locked: false,
    results: candidates.map((c) => ({
      id: c.id,
      firstName: c.firstName,
      lastName: c.lastName,
      email: c.email,
      phone: c.phone,
      headline: c.headline,
      location: c.location,
      yearsExperience: c.yearsExperience,
      skills: c.skills,
      cvUrl: c.cvUrl,
    })),
  };
}
