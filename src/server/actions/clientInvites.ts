"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole, homeForRole } from "@/lib/rbac";

const createInviteSchema = z.object({
  email: z.string().trim().toLowerCase().email("Adresse email invalide"),
});

export type ActionResult = { ok: true } | { ok: false; error: string };
export type RegisterResult = { ok: true; redirectTo: string } | { ok: false; error: string };

const INVITE_TTL_DAYS = 14;

export async function createClientInviteAction(formData: FormData): Promise<ActionResult> {
  const user = await requireRole("CLIENT");
  if (!user.companyId) return { ok: false, error: "Profil entreprise introuvable" };

  const parsed = createInviteSchema.safeParse({ email: String(formData.get("email") ?? "") });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const { email } = parsed.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return { ok: false, error: "Un compte existe déjà avec cet email" };

  const pendingInvite = await prisma.clientInvite.findFirst({
    where: { email, companyId: user.companyId, acceptedAt: null, expiresAt: { gt: new Date() } },
  });
  if (pendingInvite) return { ok: false, error: "Une invitation est déjà en attente pour cet email" };

  const token = randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + INVITE_TTL_DAYS * 24 * 60 * 60 * 1000);

  await prisma.clientInvite.create({
    data: { email, companyId: user.companyId, token, expiresAt, invitedByUserId: user.id },
  });

  revalidatePath("/client/team");
  return { ok: true };
}

export async function listClientTeam() {
  const user = await requireRole("CLIENT");
  if (!user.companyId) return { members: [], invites: [] };

  const [members, invites] = await Promise.all([
    prisma.clientProfile.findMany({
      where: { companyId: user.companyId },
      include: { user: { select: { name: true, email: true } } },
      orderBy: { id: "asc" },
    }),
    prisma.clientInvite.findMany({
      where: { companyId: user.companyId },
      include: { invitedBy: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return { members, invites };
}

const registerClientTeamSchema = z.object({
  token: z.string().min(1),
  name: z.string().trim().min(2, "Nom trop court"),
  password: z.string().min(8, "8 caractères minimum"),
});

export async function registerClientTeamAction(formData: FormData): Promise<RegisterResult> {
  const parsed = registerClientTeamSchema.safeParse({
    token: String(formData.get("token") ?? ""),
    name: String(formData.get("name") ?? ""),
    password: String(formData.get("password") ?? ""),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const data = parsed.data;

  const invite = await prisma.clientInvite.findUnique({ where: { token: data.token } });
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
        role: "CLIENT",
        // Joined via an invite sent by a colleague — email already implicitly trusted.
        emailVerified: new Date(),
        clientProfile: { create: { companyId: invite.companyId } },
      },
    }),
    prisma.clientInvite.update({ where: { id: invite.id }, data: { acceptedAt: new Date() } }),
  ]);

  return { ok: true, redirectTo: homeForRole("CLIENT") };
}
