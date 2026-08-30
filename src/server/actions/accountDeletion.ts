"use server";

import { randomUUID, randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/rbac";
import { deleteUploadedFile } from "@/lib/storage";

export type ActionResult = { ok: true } | { ok: false; error: string };

/**
 * Right-to-erasure: the User row is kept (rather than hard-deleted) because it's
 * referenced as author/actor across many tables — mandates, messages, reviews,
 * postings — for historical/audit purposes. Personal fields are overwritten
 * instead, and role-specific personal data is scrubbed or removed outright.
 */
export async function deleteAccountAction(): Promise<ActionResult> {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return { ok: false, error: "Non authentifié." };

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    include: { candidate: true, clientProfile: true, cabinetProfile: true },
  });
  if (!user) return { ok: false, error: "Compte introuvable." };

  if (user.cabinetProfile?.isAdmin) {
    const otherAdmins = await prisma.cabinetProfile.count({
      where: { isAdmin: true, userId: { not: user.id } },
    });
    if (otherAdmins === 0) {
      return {
        ok: false,
        error: "Vous êtes le seul administrateur cabinet. Invitez un remplaçant avant de supprimer votre compte.",
      };
    }
  }

  const anonymizedEmail = `deleted-${randomUUID()}@deleted.talentisconnect.local`;
  const unusablePasswordHash = await bcrypt.hash(randomBytes(32).toString("hex"), 10);

  if (user.candidate?.cvUrl) {
    await deleteUploadedFile(user.candidate.cvUrl);
  }

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: user.id },
      data: {
        name: "Utilisateur supprimé",
        email: anonymizedEmail,
        passwordHash: unusablePasswordHash,
        emailVerified: null,
      },
    });

    if (user.candidate) {
      await tx.candidate.update({
        where: { id: user.candidate.id },
        data: {
          firstName: "Candidat",
          lastName: "supprimé",
          email: anonymizedEmail,
          phone: null,
          headline: null,
          location: null,
          skills: [],
          cvUrl: null,
        },
      });
      await tx.jobAlert.deleteMany({ where: { userId: user.id } });
    }

    if (user.clientProfile) {
      await tx.clientProfile.update({
        where: { id: user.clientProfile.id },
        data: { jobTitle: null, phone: null },
      });
    }

    if (user.cabinetProfile) {
      await tx.cabinetProfile.update({
        where: { id: user.cabinetProfile.id },
        data: { title: null, phone: null },
      });
    }

    await tx.notification.deleteMany({ where: { userId: user.id } });
    await tx.emailVerificationToken.deleteMany({ where: { userId: user.id } });
    await tx.passwordResetToken.deleteMany({ where: { userId: user.id } });
  });

  return { ok: true };
}
