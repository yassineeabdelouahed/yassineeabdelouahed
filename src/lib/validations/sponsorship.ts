import { z } from "zod";

export const SPONSORSHIP_TIERS = [
  { durationDays: 7, price: 500 },
  { durationDays: 14, price: 900 },
  { durationDays: 30, price: 1500 },
] as const;

export function priceForDuration(durationDays: number): number | null {
  return SPONSORSHIP_TIERS.find((t) => t.durationDays === durationDays)?.price ?? null;
}

export const createSponsorshipSchema = z.object({
  durationDays: z.coerce.number().int().refine((d) => SPONSORSHIP_TIERS.some((t) => t.durationDays === d), {
    message: "Durée invalide",
  }),
  paymentMethod: z.enum(["VIREMENT", "ESPECES", "AUTRE"]),
});
