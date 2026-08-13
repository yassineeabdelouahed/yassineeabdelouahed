import { z } from "zod";

export const CATEGORIES = ["Tech", "Santé", "BTP", "Finance", "RH", "Commerce"] as const;
export const CONTRACT_TYPES = ["CDI", "CDD", "Stage", "Alternance"] as const;

export const createJobPostingSchema = z.object({
  title: z.string().trim().min(3, "Intitulé trop court"),
  city: z.string().trim().optional(),
  contractType: z.string().trim().min(1, "Type de contrat requis"),
  category: z.string().trim().min(1, "Catégorie requise"),
  remoteType: z.string().trim().optional(),
  salaryMin: z.coerce.number().int().nonnegative().optional(),
  salaryMax: z.coerce.number().int().nonnegative().optional(),
  description: z.string().trim().min(10, "Description trop courte"),
});

export const jobApplicationSchema = z.object({
  coverNote: z.string().trim().optional(),
});
