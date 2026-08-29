import type { Role } from "@/generated/prisma/enums";

declare module "next-auth" {
  interface User {
    // Optional here: Credentials' authorize() and the OAuth signIn() callback both set
    // these before the shared jwt callback runs, but a raw OAuth profile (id/name/email
    // only) doesn't have them yet.
    role?: Role;
    companyId?: string | null;
    candidateId?: string | null;
    cabinetProfileId?: string | null;
    isAdmin?: boolean;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: Role;
      companyId: string | null;
      candidateId: string | null;
      cabinetProfileId: string | null;
      isAdmin: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    companyId: string | null;
    candidateId: string | null;
    cabinetProfileId: string | null;
    isAdmin: boolean;
  }
}
