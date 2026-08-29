import { z } from "zod";

export const submitCompanyReviewSchema = z.object({
  rating: z.coerce.number().int().min(1, "Note requise").max(5, "Note invalide"),
  comment: z.string().trim().max(2000, "2000 caractères maximum").optional(),
});
