import { z } from "zod";

export const updateProfileSchema = z.object({
  headline: z.string().trim().optional(),
  location: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  yearsExperience: z.coerce.number().int().nonnegative().optional(),
  skills: z.string().trim().optional(), // comma-separated
});
