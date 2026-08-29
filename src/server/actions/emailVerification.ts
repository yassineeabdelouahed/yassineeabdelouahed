"use server";

import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/rbac";
import { sendEmail, emailLayout } from "@/lib/email";
import { enforceRateLimit, RateLimitError } from "@/lib/rateLimit";

const TOKEN_TTL_HOURS = 24;

export type EmailVerificationResult = { ok: true } | { ok: false; error: string };

/** Invalidates any pending token for the user before issuing a new one, so old links stop working. */
export async function sendVerificationEmail(userId: string, email: string, name: string): Promise<void> {
  await prisma.emailVerificationToken.deleteMany({ where: { userId, usedAt: null } });

  const token = randomBytes(32).toString("hex");
  await prisma.emailVerificationToken.create({
    data: { userId, token, expiresAt: new Date(Date.now() + TOKEN_TTL_HOURS * 60 * 60 * 1000) },
  });

  const appUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const link = `${appUrl}/verify-email?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Confirmez votre adresse e-mail — Talentis Connect",
    html: emailLayout(`
      <p style="margin:0 0 16px;font-weight:700;font-size:17px;">Bonjour ${name},</p>
      <p style="margin:0 0 20px;color:#334155;">Merci de confirmer votre adresse e-mail pour activer pleinement votre compte Talentis Connect.</p>
      <a href="${link}" style="display:inline-block;background:#0b2545;color:#ffffff;text-decoration:none;padding:10px 20px;border-radius:8px;font-weight:600;">Confirmer mon e-mail</a>
      <p style="margin:20px 0 0;color:#94a3b8;font-size:13px;">Ce lien expire dans 24 heures.</p>
    `),
  });
}

export async function verifyEmailAction(token: string): Promise<EmailVerificationResult> {
  if (!token) return { ok: false, error: "Lien de confirmation invalide." };

  const record = await prisma.emailVerificationToken.findUnique({ where: { token } });
  if (!record) return { ok: false, error: "Lien de confirmation invalide ou déjà utilisé." };
  if (record.usedAt) return { ok: false, error: "Ce lien a déjà été utilisé." };
  if (record.expiresAt < new Date()) {
    return { ok: false, error: "Ce lien a expiré. Demandez-en un nouveau depuis votre tableau de bord." };
  }

  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { emailVerified: new Date() } }),
    prisma.emailVerificationToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
  ]);

  return { ok: true };
}

export async function resendVerificationEmailAction(): Promise<EmailVerificationResult> {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return { ok: false, error: "Non authentifié." };

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: { email: true, name: true, emailVerified: true },
  });
  if (!user) return { ok: false, error: "Compte introuvable." };
  if (user.emailVerified) return { ok: false, error: "Votre e-mail est déjà vérifié." };

  try {
    await enforceRateLimit(`resend-verification:${sessionUser.id}`, {
      maxAttempts: 3,
      windowMinutes: 15,
      message: "Trop de demandes. Réessayez dans quelques minutes.",
    });
  } catch (err) {
    if (err instanceof RateLimitError) return { ok: false, error: err.message };
    throw err;
  }

  await sendVerificationEmail(sessionUser.id, user.email, user.name);
  return { ok: true };
}
