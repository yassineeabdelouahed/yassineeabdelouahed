import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import type { Role } from "@/generated/prisma/enums";

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

const HOME_BY_ROLE: Record<Role, string> = {
  CLIENT: "/client/dashboard",
  CABINET: "/cabinet/dashboard",
  CANDIDATE: "/candidate/dashboard",
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
    redirect(`/login?callbackUrl=${encodeURIComponent(HOME_BY_ROLE[role])}`);
  }
  if (user.role !== role) {
    redirect(HOME_BY_ROLE[user.role]);
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

export function homeForRole(role: Role): string {
  return HOME_BY_ROLE[role];
}
