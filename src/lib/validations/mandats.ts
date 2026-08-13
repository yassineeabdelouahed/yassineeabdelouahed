import { z } from "zod";

export const createMandatSchema = z.object({
  title: z.string().trim().min(3, "Intitulé trop court"),
  skillsRequired: z.string().trim().optional(), // comma-separated in the form, split before saving
  experienceLevel: z.string().trim().optional(),
  salaryMin: z.coerce.number().int().nonnegative().optional(),
  salaryMax: z.coerce.number().int().nonnegative().optional(),
  location: z.string().trim().optional(),
  remotePolicy: z.string().trim().optional(),
  urgency: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export type CreateMandatInput = z.infer<typeof createMandatSchema>;

export const mandatMessageSchema = z.object({
  body: z.string().trim().min(1, "Message vide"),
});
