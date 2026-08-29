import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Role } from "@/generated/prisma/enums";
import { homeForRole } from "@/lib/roleHome";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  companyId: string | null;
  candidateId: string | null;
  cabinetProfileId: string | null;
  isAdmin: boolean;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await auth();
  if (!session?.user) return null;
  return session.user as unknown as SessionUser;
}

/** Redirects unauthenticated users to /login, and mismatched roles to their own home. */
export async function requireRole(role: Role): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(homeForRole(role))}`);
  }
  if (user.role !== role) {
    redirect(homeForRole(user.role));
  }
  return user;
}

/** Cabinet route access that additionally requires the admin flag. */
export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireRole("CABINET");
  if (!user.isAdmin) {
    redirect("/cabinet/dashboard");
  }
  return user;
}

/**
 * Fetched fresh from the DB rather than the JWT session, since verification
 * can happen mid-session (user follows the e-mail link in another tab) and
 * NextAuth doesn't refresh the token until the next sign-in.
 */
export async function getEmailVerified(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { emailVerified: true } });
  return !!user?.emailVerified;
}

export { homeForRole };
