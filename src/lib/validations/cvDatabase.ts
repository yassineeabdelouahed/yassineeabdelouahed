import { z } from "zod";

// Pricing to validate with the business before launch — placeholder tiers for the MVP.
export const CV_ACCESS_TIERS = [
  { durationDays: 30, price: 2000 },
  { durationDays: 90, price: 5000 },
  { durationDays: 365, price: 15000 },
] as const;

export function priceForCvAccessDuration(durationDays: number): number | null {
  return CV_ACCESS_TIERS.find((t) => t.durationDays === durationDays)?.price ?? null;
}

export const requestCvAccessSchema = z.object({
  durationDays: z.coerce.number().int().refine((d) => CV_ACCESS_TIERS.some((t) => t.durationDays === d), {
    message: "Durée invalide",
  }),
  paymentMethod: z.enum(["VIREMENT", "ESPECES", "AUTRE"]),
});

export const searchCandidatesSchema = z.object({
  keyword: z.string().trim().optional(),
  location: z.string().trim().optional(),
  minExperience: z.coerce.number().int().min(0).optional(),
});
