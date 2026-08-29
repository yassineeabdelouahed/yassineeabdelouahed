import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/lib/auth.config";
import { enforceRateLimit, RateLimitError } from "@/lib/rateLimit";

export const googleEnabled = !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
export const linkedinEnabled = !!(process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET);

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (typeof email !== "string" || typeof password !== "string") return null;
        const normalizedEmail = email.toLowerCase();

        try {
          // 10 attempts / 15 min per e-mail — deliberately indistinguishable from a
          // wrong-password failure below, so a lockout never reveals account state.
          await enforceRateLimit(`login:${normalizedEmail}`, { maxAttempts: 10, windowMinutes: 15 });
        } catch (err) {
          if (err instanceof RateLimitError) return null;
          throw err;
        }

        const user = await prisma.user.findUnique({
          where: { email: normalizedEmail },
          include: {
            clientProfile: true,
            cabinetProfile: true,
            candidate: true,
          },
        });
        if (!user) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          companyId: user.clientProfile?.companyId ?? null,
          candidateId: user.candidate?.id ?? null,
          cabinetProfileId: user.cabinetProfile?.id ?? null,
          isAdmin: user.cabinetProfile?.isAdmin ?? false,
        };
      },
    }),
    ...(googleEnabled
      ? [Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET })]
      : []),
    ...(linkedinEnabled
      ? [LinkedIn({ clientId: process.env.LINKEDIN_CLIENT_ID, clientSecret: process.env.LINKEDIN_CLIENT_SECRET })]
      : []),
  ],
  callbacks: {
    ...authConfig.callbacks,
    /**
     * Google/LinkedIn are candidate-only in this version (mirrors Indeed/LinkedIn's own
     * "sign in to apply" pattern — recruiter/cabinet accounts stay Credentials-only).
     * On first sign-in this creates the User + Candidate row; the shared jwt callback then
     * picks up the role/candidateId fields we set on `user` here, same as the Credentials path.
     */
    async signIn({ user, account }) {
      if (account?.provider !== "google" && account?.provider !== "linkedin") return true;
      if (!user.email) return false;

      let dbUser = await prisma.user.findUnique({
        where: { email: user.email },
        include: { clientProfile: true, cabinetProfile: true, candidate: true },
      });

      if (!dbUser) {
        const name = user.name || user.email.split("@")[0];
        const passwordHash = await bcrypt.hash(randomBytes(24).toString("hex"), 10);
        dbUser = await prisma.user.create({
          data: {
            email: user.email,
            name,
            passwordHash,
            role: "CANDIDATE",
            candidate: {
              create: {
                firstName: name.split(" ")[0] || name,
                lastName: name.split(" ").slice(1).join(" ") || name,
                email: user.email,
                source: "SELF_REGISTERED",
              },
            },
          },
          include: { clientProfile: true, cabinetProfile: true, candidate: true },
        });
      }

      if (dbUser.role !== "CANDIDATE") {
        // Recruiter/cabinet accounts must use email + password — avoids silently
        // repurposing an existing non-candidate account via a social login click.
        return false;
      }

      user.id = dbUser.id;
      user.role = dbUser.role;
      user.companyId = dbUser.clientProfile?.companyId ?? null;
      user.candidateId = dbUser.candidate?.id ?? null;
      user.cabinetProfileId = dbUser.cabinetProfile?.id ?? null;
      user.isAdmin = dbUser.cabinetProfile?.isAdmin ?? false;
      return true;
    },
  },
});
