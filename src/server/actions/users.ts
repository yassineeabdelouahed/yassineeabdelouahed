"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema, cabinetRegisterSchema } from "@/lib/validations/auth";
import { homeForRole } from "@/lib/rbac";
import { enforceRateLimit, getClientIp, RateLimitError } from "@/lib/rateLimit";
import { sendVerificationEmail } from "@/server/actions/emailVerification";

export type ActionResult = { ok: true; redirectTo: string } | { ok: false; error: string };

export async function registerAction(formData: FormData): Promise<ActionResult> {
  try {
    // 5 inscriptions / heure / IP — n'empêche pas un usage normal, ralentit la création
    // en masse de faux comptes depuis une même machine.
    await enforceRateLimit(`register:${await getClientIp()}`, {
      maxAttempts: 5,
      windowMinutes: 60,
      message: "Trop de tentatives d'inscription depuis cette connexion. Réessayez plus tard.",
    });
  } catch (err) {
    if (err instanceof RateLimitError) return { ok: false, error: err.message };
    throw err;
  }

  const raw = {
    role: String(formData.get("role") ?? ""),
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    companyName: formData.get("companyName") ? String(formData.get("companyName")) : undefined,
  };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const data = parsed.data;

  if (data.role === "CLIENT" && !data.companyName) {
    return { ok: false, error: "Nom d'entreprise requis" };
  }

  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    return { ok: false, error: "Un compte existe déjà avec cet email" };
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  let userId: string;
  if (data.role === "CLIENT") {
    const created = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        passwordHash,
        role: "CLIENT",
        clientProfile: {
          create: {
            company: { create: { name: data.companyName! } },
          },
        },
      },
    });
    userId = created.id;
  } else {
    const created = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        passwordHash,
        role: "CANDIDATE",
        candidate: {
          create: {
            firstName: data.name.split(" ")[0] ?? data.name,
            lastName: data.name.split(" ").slice(1).join(" ") || data.name,
            email: data.email,
            source: "SELF_REGISTERED",
          },
        },
      },
    });
    userId = created.id;
  }

  await sendVerificationEmail(userId, data.email, data.name);

  return { ok: true, redirectTo: homeForRole(data.role) };
}

export async function registerCabinetAction(formData: FormData): Promise<ActionResult> {
  const raw = {
    token: String(formData.get("token") ?? ""),
    name: String(formData.get("name") ?? ""),
    password: String(formData.get("password") ?? ""),
  };
  const parsed = cabinetRegisterSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const data = parsed.data;

  const invite = await prisma.cabinetInvite.findUnique({ where: { token: data.token } });
  if (!invite) return { ok: false, error: "Invitation introuvable" };
  if (invite.acceptedAt) return { ok: false, error: "Invitation déjà utilisée" };
  if (invite.expiresAt < new Date()) return { ok: false, error: "Invitation expirée" };

  const existing = await prisma.user.findUnique({ where: { email: invite.email } });
  if (existing) return { ok: false, error: "Un compte existe déjà avec cet email" };

  const passwordHash = await bcrypt.hash(data.password, 10);

  await prisma.$transaction([
    prisma.user.create({
      data: {
        email: invite.email,
        name: data.name,
        passwordHash,
        role: "CABINET",
        // Invite-gated flow (email already confirmed by the invite link) — no separate
        // verification loop needed for internal staff.
        emailVerified: new Date(),
        cabinetProfile: { create: { isAdmin: invite.isAdmin } },
      },
    }),
    prisma.cabinetInvite.update({
      where: { id: invite.id },
      data: { acceptedAt: new Date() },
    }),
  ]);

  return { ok: true, redirectTo: homeForRole("CABINET") };
}
