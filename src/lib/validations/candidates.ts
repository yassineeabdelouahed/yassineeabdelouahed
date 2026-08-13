import { z } from "zod";

export const createCandidateSchema = z.object({
  firstName: z.string().trim().min(1, "Prénom requis"),
  lastName: z.string().trim().min(1, "Nom requis"),
  email: z.string().trim().toLowerCase().email("Adresse email invalide"),
  phone: z.string().trim().optional(),
  headline: z.string().trim().optional(),
  location: z.string().trim().optional(),
  yearsExperience: z.coerce.number().int().nonnegative().optional(),
  skills: z.string().trim().optional(), // comma-separated
  source: z.enum(["INTERNAL_DB", "JOBBOARD", "NETWORK", "COOPTATION"]),
});

export type CreateCandidateInput = z.infer<typeof createCandidateSchema>;

export const addToShortlistSchema = z.object({
  candidateId: z.string().min(1),
  prequalNotes: z.string().trim().optional(),
  strengths: z.string().trim().optional(),
  watchPoints: z.string().trim().optional(),
});
