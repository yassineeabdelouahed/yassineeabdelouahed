"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin, getSessionUser } from "@/lib/rbac";
import { notifyUser } from "@/lib/notify";
import { createInvoice } from "@/lib/invoice";
import { createCourseSchema, createSessionSchema, enrollSchema, slugify } from "@/lib/validations/training";
import type { TrainingDomain } from "@/generated/prisma/enums";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function listPublishedCourses(domain?: TrainingDomain) {
  return prisma.trainingCourse.findMany({
    where: { status: "PUBLISHED", ...(domain ? { domain } : {}) },
    include: { sessions: { where: { status: { in: ["OPEN", "FULL"] } }, orderBy: { startDate: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCourseBySlug(slug: string) {
  return prisma.trainingCourse.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: {
      sessions: {
        orderBy: { startDate: "asc" },
        include: { enrollments: { where: { paymentStatus: { not: "CANCELLED" } }, select: { id: true, userId: true } } },
      },
    },
  });
}

export async function listAllCoursesForCabinet() {
  await requireAdmin();
  return prisma.trainingCourse.findMany({
    include: { sessions: { include: { enrollments: { select: { id: true } } } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function createCourseAction(formData: FormData): Promise<ActionResult> {
  const user = await requireAdmin();

  const parsed = createCourseSchema.safeParse({
    title: formData.get("title"),
    domain: formData.get("domain"),
    description: formData.get("description"),
    durationHours: formData.get("durationHours") || undefined,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const data = parsed.data;

  const baseSlug = slugify(data.title);
  let slug = baseSlug;
  let suffix = 1;
  while (await prisma.trainingCourse.findUnique({ where: { slug } })) {
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }

  await prisma.trainingCourse.create({
    data: {
      slug,
      title: data.title,
      domain: data.domain,
      description: data.description,
      durationHours: data.durationHours ?? null,
      status: "PUBLISHED",
      createdByUserId: user.id,
    },
  });

  revalidatePath("/trainings");
  revalidatePath("/cabinet/training/courses");
  return { ok: true };
}

export async function createSessionAction(courseId: string, formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const parsed = createSessionSchema.safeParse({
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") ?? undefined,
    schedule: formData.get("schedule") ?? undefined,
    price: formData.get("price"),
    instructorName: formData.get("instructorName") ?? undefined,
    capacity: formData.get("capacity"),
    location: formData.get("location") ?? undefined,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const data = parsed.data;

  const startDate = new Date(data.startDate);
  const endDate = data.endDate ? new Date(data.endDate) : null;
  if (Number.isNaN(startDate.getTime())) return { ok: false, error: "Date de début invalide" };

  await prisma.trainingSession.create({
    data: {
      courseId,
      startDate,
      endDate,
      schedule: data.schedule || null,
      price: data.price,
      instructorName: data.instructorName || null,
      capacity: data.capacity,
      location: data.location || null,
      status: "OPEN",
    },
  });

  revalidatePath("/trainings");
  revalidatePath("/cabinet/training/courses");
  return { ok: true };
}

export async function enrollAction(sessionId: string, formData: FormData): Promise<ActionResult> {
  const user = await getSessionUser();
  if (!user) return { ok: false, error: "Connectez-vous pour vous inscrire" };

  const parsed = enrollSchema.safeParse({ paymentMethod: formData.get("paymentMethod") });
  if (!parsed.success) return { ok: false, error: "Formulaire invalide" };

  const session = await prisma.trainingSession.findUnique({
    where: { id: sessionId },
    include: { enrollments: { where: { paymentStatus: { not: "CANCELLED" } } } },
  });
  if (!session) return { ok: false, error: "Session introuvable" };
  if (session.status !== "OPEN") return { ok: false, error: "Cette session n'accepte plus d'inscriptions" };
  if (session.enrollments.length >= session.capacity) return { ok: false, error: "Session complète" };

  const existing = await prisma.enrollment.findUnique({
    where: { sessionId_userId: { sessionId, userId: user.id } },
  });
  if (existing) return { ok: false, error: "Vous êtes déjà inscrit(e) à cette session" };

  await prisma.enrollment.create({
    data: {
      sessionId,
      userId: user.id,
      candidateId: user.candidateId,
      paymentMethod: parsed.data.paymentMethod,
      amount: session.price,
      currency: session.currency,
    },
  });

  if (session.enrollments.length + 1 >= session.capacity) {
    await prisma.trainingSession.update({ where: { id: sessionId }, data: { status: "FULL" } });
  }

  revalidatePath(`/trainings`);
  return { ok: true };
}

export async function getSessionForCabinet(sessionId: string) {
  await requireAdmin();
  return prisma.trainingSession.findUnique({
    where: { id: sessionId },
    include: { course: { select: { title: true, domain: true } } },
  });
}

export async function listEnrollmentsForSession(sessionId: string) {
  await requireAdmin();
  return prisma.enrollment.findMany({
    where: { sessionId },
    include: { user: { select: { name: true, email: true } } },
    orderBy: { enrolledAt: "asc" },
  });
}

export async function confirmEnrollmentAction(enrollmentId: string): Promise<ActionResult> {
  const admin = await requireAdmin();

  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
    include: { session: { include: { course: { select: { title: true } } } } },
  });
  if (!enrollment) return { ok: false, error: "Inscription introuvable" };
  if (enrollment.paymentStatus !== "PENDING") return { ok: false, error: "Cette inscription a déjà été traitée" };

  await prisma.$transaction(async (tx) => {
    await tx.enrollment.update({
      where: { id: enrollmentId },
      data: { paymentStatus: "CONFIRMED", confirmedAt: new Date(), confirmedByUserId: admin.id },
    });
    await createInvoice(tx, {
      sourceType: "ENROLLMENT",
      sourceId: enrollmentId,
      userId: enrollment.userId,
      description: `Inscription à la formation "${enrollment.session.course.title}"`,
      amount: enrollment.amount,
      currency: enrollment.currency,
    });
  });

  await notifyUser(enrollment.userId, {
    type: "enrollment_confirmed",
    title: "Inscription confirmée",
    body: `Votre inscription à "${enrollment.session.course.title}" est confirmée.`,
    link: "/candidate/trainings",
  });

  revalidatePath(`/cabinet/training/sessions/${enrollment.sessionId}/enrollments`);
  return { ok: true };
}

export async function cancelEnrollmentAction(enrollmentId: string): Promise<ActionResult> {
  await requireAdmin();

  const enrollment = await prisma.enrollment.findUnique({ where: { id: enrollmentId } });
  if (!enrollment) return { ok: false, error: "Inscription introuvable" };

  await prisma.$transaction([
    prisma.enrollment.update({ where: { id: enrollmentId }, data: { paymentStatus: "CANCELLED" } }),
    prisma.trainingSession.update({ where: { id: enrollment.sessionId }, data: { status: "OPEN" } }),
  ]);

  revalidatePath(`/cabinet/training/sessions/${enrollment.sessionId}/enrollments`);
  return { ok: true };
}

export async function listMyEnrollments() {
  const user = await getSessionUser();
  if (!user) return [];
  return prisma.enrollment.findMany({
    where: { userId: user.id },
    include: { session: { include: { course: true } } },
    orderBy: { enrolledAt: "desc" },
  });
}
