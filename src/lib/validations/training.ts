import { z } from "zod";

export const DOMAINS = ["MARKETING_DIGITAL", "FINANCE", "RH"] as const;

export const DOMAIN_LABEL: Record<(typeof DOMAINS)[number], string> = {
  MARKETING_DIGITAL: "Marketing digital",
  FINANCE: "Finance",
  RH: "RH",
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export { slugify };

export const createCourseSchema = z.object({
  title: z.string().trim().min(3, "Titre trop court"),
  domain: z.enum(DOMAINS),
  description: z.string().trim().min(10, "Description trop courte"),
  durationHours: z.coerce.number().int().positive().optional(),
});

export const createSessionSchema = z.object({
  startDate: z.string().min(1, "Date de début requise"),
  endDate: z.string().trim().optional(),
  schedule: z.string().trim().optional(),
  price: z.coerce.number().int().nonnegative(),
  instructorName: z.string().trim().optional(),
  capacity: z.coerce.number().int().positive(),
  location: z.string().trim().optional(),
});

export const enrollSchema = z.object({
  paymentMethod: z.enum(["VIREMENT", "ESPECES", "AUTRE"]),
});
