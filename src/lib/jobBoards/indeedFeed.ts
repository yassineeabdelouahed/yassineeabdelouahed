import { prisma } from "@/lib/prisma";

/**
 * Indeed n'offre pas d'API de publication "push" en libre-service pour un
 * employeur/cabinet tiers (contrairement à ce qu'on pourrait attendre) —
 * la voie self-service réelle est un flux XML public que l'on soumet une
 * fois à Indeed (formulaire employeur) puis qu'Indeed recrawl
 * périodiquement. Ce module génère ce flux, au format XML documenté
 * publiquement par Indeed depuis des années (stable).
 *
 * Étape manuelle restante (ne peut pas être automatisée depuis ce code) :
 * soumettre l'URL de ce flux via le compte employeur Indeed de
 * l'utilisateur — voir README.
 */

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function cdata(value: string): string {
  return `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

export async function buildIndeedFeedXml(): Promise<string> {
  const appUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const jobs = await prisma.jobPosting.findMany({
    where: { status: "PUBLISHED" },
    include: { company: { select: { name: true, city: true } } },
    orderBy: { publishedAt: "desc" },
  });

  const items = jobs
    .map((job) => {
      const city = job.city || job.company.city || "";
      return `
  <job>
    <title>${xmlEscape(job.title)}</title>
    <date>${(job.publishedAt ?? job.createdAt).toUTCString()}</date>
    <referencenumber>${xmlEscape(job.id)}</referencenumber>
    <url>${xmlEscape(`${appUrl}/jobs/${job.id}`)}</url>
    <company>${xmlEscape(job.company.name)}</company>
    <city>${xmlEscape(city)}</city>
    <country>MA</country>
    <description>${cdata(job.description)}</description>
    ${job.contractType ? `<jobtype>${xmlEscape(job.contractType)}</jobtype>` : ""}
  </job>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<source>
  <publisher>Talentis Connect</publisher>
  <publisherurl>${xmlEscape(appUrl)}</publisherurl>${items}
</source>
`;
}
