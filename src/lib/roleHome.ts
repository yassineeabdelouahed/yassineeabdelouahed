import type { Role } from "@/generated/prisma/enums";

const HOME_BY_ROLE: Record<Role, string> = {
  CLIENT: "/client/dashboard",
  CABINET: "/cabinet/dashboard",
  CANDIDATE: "/candidate/dashboard",
};

export function homeForRole(role: Role): string {
  return HOME_BY_ROLE[role];
}
