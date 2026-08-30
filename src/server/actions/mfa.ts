"use server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { enforceRateLimit, RateLimitError } from "@/lib/rateLimit";
import {
  generateTotpSecret,
  generateTotpQrCode,
  verifyTotpToken,
  generateBackupCodes,
} from "@/lib/mfa";

export type MfaResult = { ok: true } | { ok: false; error: string };

/**
 * Used by the login form to know whether to show the TOTP field, before
 * calling next-auth's signIn. Shares the same rate-limit key as the actual
 * login attempt so this can't be used as a separate brute-force channel.
 */
export async function checkRequiresMfa(email: string): Promise<boolean> {
  try {
    await enforceRateLimit(`login:${email.toLowerCase()}`, { maxAttempts: 10, windowMinutes: 15 });
  } catch {
    return false;
  }

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    select: { cabinetProfile: { select: { totpEnabled: true } } },
  });
  return !!user?.cabinetProfile?.totpEnabled;
}

export async function beginMfaEnrollmentAction(): Promise<
  { ok: true; qrCodeDataUrl: string; secret: string } | { ok: false; error: string }
> {
  const user = await requireRole("CABINET");

  const profile = await prisma.cabinetProfile.findUnique({ where: { userId: user.id } });
  if (!profile) return { ok: false, error: "Profil introuvable." };
  if (profile.totpEnabled) return { ok: false, error: "La double authentification est déjà activée." };

  const secret = generateTotpSecret();
  await prisma.cabinetProfile.update({ where: { userId: user.id }, data: { totpSecret: secret } });

  const qrCodeDataUrl = await generateTotpQrCode(user.email, secret);
  return { ok: true, qrCodeDataUrl, secret };
}

export async function confirmMfaEnrollmentAction(
  code: string,
): Promise<{ ok: true; backupCodes: string[] } | { ok: false; error: string }> {
  const user = await requireRole("CABINET");

  const profile = await prisma.cabinetProfile.findUnique({ where: { userId: user.id } });
  if (!profile?.totpSecret) return { ok: false, error: "Aucun enrôlement en cours. Recommencez." };

  if (!verifyTotpToken(code, profile.totpSecret)) {
    return { ok: false, error: "Code invalide. Vérifiez l'heure de votre appareil et réessayez." };
  }

  const { plaintext, hashed } = await generateBackupCodes();
  await prisma.cabinetProfile.update({
    where: { userId: user.id },
    data: { totpEnabled: true, totpBackupCodes: hashed },
  });

  return { ok: true, backupCodes: plaintext };
}

export async function disableMfaAction(code: string): Promise<MfaResult> {
  const user = await requireRole("CABINET");

  try {
    await enforceRateLimit(`mfa-disable:${user.id}`, { maxAttempts: 5, windowMinutes: 15 });
  } catch (err) {
    if (err instanceof RateLimitError) return { ok: false, error: err.message };
    throw err;
  }

  const profile = await prisma.cabinetProfile.findUnique({ where: { userId: user.id } });
  if (!profile?.totpEnabled || !profile.totpSecret) {
    return { ok: false, error: "La double authentification n'est pas activée." };
  }
  if (!verifyTotpToken(code, profile.totpSecret)) {
    return { ok: false, error: "Code invalide." };
  }

  await prisma.cabinetProfile.update({
    where: { userId: user.id },
    data: { totpEnabled: false, totpSecret: null, totpBackupCodes: [] },
  });

  return { ok: true };
}

export async function getMfaStatus(): Promise<boolean> {
  const user = await requireRole("CABINET");
  const profile = await prisma.cabinetProfile.findUnique({
    where: { userId: user.id },
    select: { totpEnabled: true },
  });
  return !!profile?.totpEnabled;
}
