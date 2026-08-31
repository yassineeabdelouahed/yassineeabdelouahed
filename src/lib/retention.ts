import { prisma } from "@/lib/prisma";

const DAY_MS = 24 * 60 * 60 * 1000;

function daysAgo(days: number): Date {
  return new Date(Date.now() - days * DAY_MS);
}

/**
 * Data retention policy — durées de conservation par type de donnée (cartographie des
 * critères, section Juridique). Chaque règle a une action réversible (anonymisation) ou
 * une suppression pure pour les données purement techniques/transitoires.
 */
export const RETENTION_RULES = [
  {
    key: "notifications",
    label: "Notifications lues",
    retention: "90 jours après lecture",
    action: "Suppression",
  },
  {
    key: "invites",
    label: "Invitations cabinet/entreprise non acceptées",
    retention: "30 jours après expiration",
    action: "Suppression",
  },
  {
    key: "tokens",
    label: "Jetons de vérification e-mail et de réinitialisation de mot de passe expirés",
    retention: "30 jours après expiration",
    action: "Suppression",
  },
  {
    key: "rejectedApplications",
    label: "CV et notes des candidatures refusées (offres publiques et mandats)",
    retention: "24 mois après le refus",
    action: "Anonymisation (CV et notes supprimés, statut conservé à des fins statistiques)",
  },
  {
    key: "errorLogs",
    label: "Journaux d'erreurs techniques",
    retention: "30 jours",
    action: "Suppression",
  },
] as const;

export type RetentionPurgeResult = { key: string; label: string; count: number };

/** Executes every retention rule, logs an audit row, and returns how many rows each one affected. */
export async function runRetentionPurge(triggeredBy: string): Promise<RetentionPurgeResult[]> {
  const results: RetentionPurgeResult[] = [];

  const notifications = await prisma.notification.deleteMany({
    where: { read: true, createdAt: { lt: daysAgo(90) } },
  });
  results.push({ key: "notifications", label: RETENTION_RULES[0].label, count: notifications.count });

  const cutoffInvites = daysAgo(30);
  const cabinetInvites = await prisma.cabinetInvite.deleteMany({
    where: { acceptedAt: null, expiresAt: { lt: cutoffInvites } },
  });
  const clientInvites = await prisma.clientInvite.deleteMany({
    where: { acceptedAt: null, expiresAt: { lt: cutoffInvites } },
  });
  results.push({ key: "invites", label: RETENTION_RULES[1].label, count: cabinetInvites.count + clientInvites.count });

  const cutoffTokens = daysAgo(30);
  const emailTokens = await prisma.emailVerificationToken.deleteMany({
    where: { expiresAt: { lt: cutoffTokens } },
  });
  const resetTokens = await prisma.passwordResetToken.deleteMany({
    where: { expiresAt: { lt: cutoffTokens } },
  });
  results.push({ key: "tokens", label: RETENTION_RULES[2].label, count: emailTokens.count + resetTokens.count });

  const cutoffRejected = daysAgo(730);
  const jobApplications = await prisma.jobApplication.updateMany({
    where: {
      status: "REJECTED",
      createdAt: { lt: cutoffRejected },
      OR: [{ coverNote: { not: null } }, { cvUrl: { not: null } }],
    },
    data: { coverNote: null, cvUrl: null },
  });
  const mandateApplications = await prisma.mandateApplication.updateMany({
    where: {
      status: { in: ["REFUSED", "REJECTED_BY_CLIENT"] },
      createdAt: { lt: cutoffRejected },
      OR: [{ prequalNotes: { not: null } }, { strengths: { not: null } }, { watchPoints: { not: null } }],
    },
    data: { prequalNotes: null, strengths: null, watchPoints: null },
  });
  results.push({
    key: "rejectedApplications",
    label: RETENTION_RULES[3].label,
    count: jobApplications.count + mandateApplications.count,
  });

  const errorLogs = await prisma.errorLog.deleteMany({ where: { createdAt: { lt: daysAgo(30) } } });
  results.push({ key: "errorLogs", label: RETENTION_RULES[4].label, count: errorLogs.count });

  await prisma.retentionPurgeLog.create({
    data: { triggeredBy, summary: results },
  });

  return results;
}
