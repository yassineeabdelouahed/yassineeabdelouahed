import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe config: callbacks + pages only, no Credentials provider (which needs
 * Prisma/bcrypt, both Node-only). Used directly by proxy.ts for middleware auth checks;
 * extended with the real provider in auth.ts for Node runtime use (route handlers, RSC).
 */
export const authConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        Object.assign(token, {
          id: user.id,
          role: user.role,
          companyId: user.companyId,
          candidateId: user.candidateId,
          cabinetProfileId: user.cabinetProfileId,
          isAdmin: user.isAdmin,
        });
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        Object.assign(session.user, {
          id: token.id,
          role: token.role,
          companyId: token.companyId,
          candidateId: token.candidateId,
          cabinetProfileId: token.cabinetProfileId,
          isAdmin: token.isAdmin,
        });
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
