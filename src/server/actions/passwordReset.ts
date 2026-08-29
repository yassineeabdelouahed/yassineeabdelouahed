"use server";

import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendEmail, emailLayout } from "@/lib/email";
import { enforceRateLimit, getClientIp, RateLimitError } from "@/lib/rateLimit";
import { forgotPasswordSchema, resetPasswordSchema } from "@/lib/validations/auth";

const TOKEN_TTL_MINUTES = 60;

export type PasswordResetResult = { ok: true } | { ok: false; error: string };

/**
 * Always returns the same generic success message whether or not the account
 * exists, so this endpoint can't be used to enumerate registered e-mails.
 */
export async function requestPasswordResetAction(formData: FormData): Promise<PasswordResetResult> {
  const parsed = forgotPasswordSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Adresse email invalide" };
  }
  const { email } = parsed.data;

  try {
    await enforceRateLimit(`forgot-password:${await getClientIp()}`, {
      maxAttempts: 5,
      windowMinutes: 60,
      message: "Trop de demandes. Réessayez plus tard.",
    });
  } catch (err) {
    if (err instanceof RateLimitError) return { ok: false, error: err.message };
    throw err;
  }

  const user = await prisma.user.findUnique({ where: { email }, select: { id: true, name: true } });
  if (user) {
    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id, usedAt: null } });

    const token = randomBytes(32).toString("hex");
    await prisma.passwordResetToken.create({
      data: { userId: user.id, token, expiresAt: new Date(Date.now() + TOKEN_TTL_MINUTES * 60 * 1000) },
    });

    const appUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const link = `${appUrl}/reset-password?token=${token}`;

    await sendEmail({
      to: email,
      subject: "Réinitialisation de votre mot de passe — Talentis Connect",
      html: emailLayout(`
        <p style="margin:0 0 16px;font-weight:700;font-size:17px;">Bonjour ${user.name},</p>
        <p style="margin:0 0 20px;color:#334155;">Vous avez demandé la réinitialisation de votre mot de passe. Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail.</p>
        <a href="${link}" style="display:inline-block;background:#0b2545;color:#ffffff;text-decoration:none;padding:10px 20px;border-radius:8px;font-weight:600;">Réinitialiser mon mot de passe</a>
        <p style="margin:20px 0 0;color:#94a3b8;font-size:13px;">Ce lien expire dans 1 heure.</p>
      `),
    });
  }

  return { ok: true };
}

export async function validateResetToken(token: string): Promise<boolean> {
  if (!token) return false;
  const record = await prisma.passwordResetToken.findUnique({ where: { token } });
  return !!record && !record.usedAt && record.expiresAt > new Date();
}

export async function resetPasswordAction(formData: FormData): Promise<PasswordResetResult> {
  const parsed = resetPasswordSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const { token, password } = parsed.data;

  const record = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!record) return { ok: false, error: "Lien invalide ou déjà utilisé." };
  if (record.usedAt) return { ok: false, error: "Ce lien a déjà été utilisé." };
  if (record.expiresAt < new Date()) {
    return { ok: false, error: "Ce lien a expiré. Demandez-en un nouveau." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
    prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
  ]);

  return { ok: true };
}
