const LUSHA_API_URL = "https://api.lusha.com/prospecting/contact/search";

export const lushaEnabled = !!process.env.LUSHA_API_KEY;

export type LushaSearchFilters = {
  jobTitle?: string;
  location?: string;
  companyName?: string;
};

export type LushaCandidate = {
  contactId: string;
  fullName: string;
  jobTitle: string | null;
  companyName: string | null;
  location: string | null;
  email: string | null;
  phone: string | null;
};

type LushaSearchResponse = {
  requestId: string;
  data: Array<Record<string, unknown>>;
};

/**
 * Searches Lusha's Prospecting API for contacts (title/location/company filters).
 * Field names for `filters.contacts` follow Lusha's documented Contact Filters
 * (jobTitles, countries, location, names under filters.companies) — response field
 * names below are best-effort and should be checked against a live response before
 * relying on them, since docs.lusha.com wasn't reachable to confirm exactly.
 */
export async function searchLushaContacts(
  filters: LushaSearchFilters,
  page = 0,
): Promise<{ candidates: LushaCandidate[]; requestId: string }> {
  if (!lushaEnabled) {
    throw new Error("Lusha n'est pas configuré (LUSHA_API_KEY manquant)");
  }

  const body = {
    pages: { page, size: 10 },
    filters: {
      contacts: filters.jobTitle ? { jobTitles: [filters.jobTitle] } : undefined,
      companies: filters.companyName ? { names: [filters.companyName] } : undefined,
      location: filters.location ? { include: [filters.location] } : undefined,
    },
  };

  const res = await fetch(LUSHA_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      api_key: process.env.LUSHA_API_KEY!,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Recherche Lusha échouée (${res.status})`);
  }

  const json = (await res.json()) as LushaSearchResponse;

  const candidates: LushaCandidate[] = (json.data ?? []).map((c) => ({
    contactId: String(c.contactId ?? c.id ?? ""),
    fullName: String(c.fullName ?? c.name ?? "").trim(),
    jobTitle: (c.jobTitle as string) ?? null,
    companyName: (c.companyName as string) ?? null,
    location: (c.location as string) ?? null,
    email: (c.email as string) ?? null,
    phone: (c.phone as string) ?? null,
  }));

  return { candidates, requestId: json.requestId };
}
