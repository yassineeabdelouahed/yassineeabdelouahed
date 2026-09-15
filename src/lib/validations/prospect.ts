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

/** One business record as exported by google-maps-scraper-kit (github.com/Mahanaicoach/google-maps-scraper-kit). */
export const googleMapsScrapedEntrySchema = z.object({
  title: z.string().trim().min(1),
  category: z.string().trim().optional(),
  categories: z.array(z.string()).optional(),
  address: z.string().trim().optional(),
  complete_address: z
    .object({
      city: z.string().trim().optional(),
    })
    .partial()
    .optional(),
  phone: z.string().trim().optional(),
  emails: z.array(z.string().trim()).optional(),
  web_site: z.string().trim().optional(),
});

export const googleMapsImportSchema = z.array(googleMapsScrapedEntrySchema).min(1).max(200);

export type GoogleMapsScrapedEntry = z.infer<typeof googleMapsScrapedEntrySchema>;
