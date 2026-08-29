"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/rbac";
import { notifyUser } from "@/lib/notify";
import type { JobPosting } from "@/generated/prisma/client";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function createJobAlertAction(formData: FormData): Promise<ActionResult> {
  const user = await getSessionUser();
  if (!user) return { ok: false, error: "Connectez-vous pour créer une alerte" };

  const keyword = String(formData.get("keyword") ?? "").trim() || null;
  const location = String(formData.get("location") ?? "").trim() || null;
  const category = String(formData.get("category") ?? "").trim() || null;

  if (!keyword && !location && !category) {
    return { ok: false, error: "Ajoutez au moins un critère de recherche" };
  }

  const existing = await prisma.jobAlert.findFirst({ where: { userId: user.id, keyword, location, category } });
  if (existing) return { ok: false, error: "Vous avez déjà une alerte identique" };

  await prisma.jobAlert.create({ data: { userId: user.id, keyword, location, category } });

  revalidatePath("/results");
  return { ok: true };
}

export async function listMyJobAlerts() {
  const user = await getSessionUser();
  if (!user) return [];
  return prisma.jobAlert.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });
}

export async function deleteJobAlertAction(alertId: string): Promise<ActionResult> {
  const user = await getSessionUser();
  if (!user) return { ok: false, error: "Non authentifié" };

  const alert = await prisma.jobAlert.findUnique({ where: { id: alertId } });
  if (!alert || alert.userId !== user.id) return { ok: false, error: "Alerte introuvable" };

  await prisma.jobAlert.delete({ where: { id: alertId } });
  revalidatePath("/candidate/alerts");
  return { ok: true };
}

/** Notifies every alert whose set criteria all match the newly published job. Called right after a JobPosting goes live. */
export async function notifyMatchingAlerts(job: JobPosting) {
  const alerts = await prisma.jobAlert.findMany();

  const matching = alerts.filter((alert) => {
    if (alert.keyword) {
      const kw = alert.keyword.toLowerCase();
      const inTitle = job.title.toLowerCase().includes(kw);
      const inCategory = job.category?.toLowerCase().includes(kw) ?? false;
      if (!inTitle && !inCategory) return false;
    }
    if (alert.location) {
      if (!job.city || !job.city.toLowerCase().includes(alert.location.toLowerCase())) return false;
    }
    if (alert.category) {
      if (job.category !== alert.category) return false;
    }
    return true;
  });

  await Promise.all(
    matching.map((alert) =>
      notifyUser(alert.userId, {
        type: "job_alert_match",
        title: "Nouvelle offre correspondant à votre alerte",
        body: job.title,
        link: `/jobs/${job.id}`,
      }),
    ),
  );
}
