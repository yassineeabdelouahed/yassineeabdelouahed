"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/rbac";
import { z } from "zod";

const createInviteSchema = z.object({
  email: z.string().trim().toLowerCase().email("Adresse email invalide"),
  isAdmin: z.boolean(),
});

export type ActionResult = { ok: true } | { ok: false; error: string };

const INVITE_TTL_DAYS = 14;

export async function createInviteAction(formData: FormData): Promise<ActionResult> {
  const admin = await requireAdmin();

  const parsed = createInviteSchema.safeParse({
    email: String(formData.get("email") ?? ""),
    isAdmin: formData.get("isAdmin") === "on",
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const { email, isAdmin } = parsed.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { ok: false, error: "Un compte existe déjà avec cet email" };
  }

  const pendingInvite = await prisma.cabinetInvite.findFirst({
    where: { email, acceptedAt: null, expiresAt: { gt: new Date() } },
  });
  if (pendingInvite) {
    return { ok: false, error: "Une invitation est déjà en attente pour cet email" };
  }

  const token = randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + INVITE_TTL_DAYS * 24 * 60 * 60 * 1000);

  await prisma.cabinetInvite.create({
    data: { email, token, isAdmin, expiresAt, invitedByUserId: admin.id },
  });

  revalidatePath("/cabinet/admin/invites");
  return { ok: true };
}

export async function listInvites() {
  await requireAdmin();
  return prisma.cabinetInvite.findMany({
    orderBy: { createdAt: "desc" },
    include: { invitedBy: { select: { name: true } } },
  });
}
