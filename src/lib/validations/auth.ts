import { z } from "zod";

export const registerSchema = z.object({
  role: z.enum(["CLIENT", "CANDIDATE"]),
  name: z.string().trim().min(2, "Nom trop court"),
  email: z.string().trim().toLowerCase().email("Adresse email invalide"),
  password: z.string().min(8, "8 caractères minimum"),
  companyName: z.string().trim().min(2, "Nom d'entreprise requis").optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const cabinetRegisterSchema = z.object({
  token: z.string().min(1),
  name: z.string().trim().min(2, "Nom trop court"),
  password: z.string().min(8, "8 caractères minimum"),
});

export type CabinetRegisterInput = z.infer<typeof cabinetRegisterSchema>;

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Adresse email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

export type LoginInput = z.infer<typeof loginSchema>;
