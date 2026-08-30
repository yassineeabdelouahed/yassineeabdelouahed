import { z } from "zod";

export const createProspectSchema = z.object({
  companyName: z.string().trim().min(2, "Nom d'entreprise requis"),
  sector: z.string().trim().optional(),
  city: z.string().trim().optional(),
  contactName: z.string().trim().optional(),
  contactEmail: z.string().trim().email("Adresse email invalide").optional().or(z.literal("")),
  contactPhone: z.string().trim().optional(),
  urgency: z.enum(["LOW", "MEDIUM", "HIGH"]),
  estimatedBudget: z.coerce.number().int().nonnegative().optional(),
  notes: z.string().trim().optional(),
});

export type CreateProspectInput = z.infer<typeof createProspectSchema>;

export const prospectStageNoteSchema = z.object({
  note: z.string().trim().optional(),
});
