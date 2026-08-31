import { PDFParse } from "pdf-parse";

/**
 * Curated keyword list rather than NLP/AI extraction — deliberately simple (roadmap
 * defers real parsing/matching to a later phase). Matched case-insensitively as
 * whole words against the CV's raw text.
 */
const SKILL_KEYWORDS = [
  // Tech
  "JavaScript", "TypeScript", "Python", "Java", "PHP", "C#", "C++", "Go", "Ruby",
  "React", "Vue", "Angular", "Next.js", "Node.js", "Express", "Django", "Laravel", "Spring",
  "SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis",
  "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Linux", "Git", "CI/CD",
  "HTML", "CSS", "Tailwind",
  // Data / IA
  "Excel", "Power BI", "Tableau", "SAP", "Python", "R", "Machine Learning",
  // Marketing digital
  "SEO", "SEA", "Google Ads", "Facebook Ads", "Community Management", "Growth Hacking", "CRM",
  // Finance / comptabilité
  "Comptabilité", "Contrôle de gestion", "Audit", "Fiscalité", "IFRS", "Sage",
  // RH
  "Recrutement", "Paie", "Droit du travail", "GPEC", "SIRH",
  // Général
  "Gestion de projet", "Anglais", "Français", "Arabe", "Management", "Négociation",
] as const;

export type CvSuggestions = { skills: string[]; experienceYears: number | null };

const EXPERIENCE_PATTERN = /(\d{1,2})\s*\+?\s*(?:ans|ann[ée]es|years?)\s*(?:d['’]|of\s+)?\s*exp[ée]rience/i;

/**
 * Best-effort suggestions from a CV's raw text — a curated-keyword match, not real
 * NLP. Returns an empty result (never throws) for anything that isn't extractable
 * text (e.g. a scanned/image-only PDF, or a non-PDF file).
 */
export async function extractCvSuggestions(buffer: Buffer, mimeType: string): Promise<CvSuggestions> {
  if (mimeType !== "application/pdf") return { skills: [], experienceYears: null };

  let text: string;
  try {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    text = result.text;
  } catch {
    return { skills: [], experienceYears: null };
  }

  const skills = SKILL_KEYWORDS.filter((keyword) => {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(?:^|[^\\p{L}\\p{N}])${escaped}(?:[^\\p{L}\\p{N}]|$)`, "iu").test(text);
  });

  const experienceMatch = text.match(EXPERIENCE_PATTERN);
  const experienceYears = experienceMatch ? Number(experienceMatch[1]) : null;

  return { skills, experienceYears };
}
