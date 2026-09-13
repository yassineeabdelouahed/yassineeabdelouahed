import type { JobPosting, Company } from "@/generated/prisma/client";

/**
 * France Travail (ex-Pôle Emploi) est la seule des quatre plateformes
 * demandées à exposer un vrai portail développeur self-service
 * (francetravail.io) — Indeed, LinkedIn Jobs et Welcome to the Jungle
 * n'ont pas d'API de publication ouverte à un tiers sans partenariat
 * commercial négocié (voir README pour le détail par plateforme).
 *
 * Suit le même patron que googleEnabled/linkedinEnabled (auth.ts) et
 * emailEnabled (email.ts) : désactivé proprement si les identifiants ne
 * sont pas renseignés, jamais d'exception qui casse le flux de
 * publication d'offre.
 */
export const franceTravailEnabled = !!(
  process.env.FRANCE_TRAVAIL_CLIENT_ID && process.env.FRANCE_TRAVAIL_CLIENT_SECRET
);

const TOKEN_URL =
  "https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=/partenaire";

// Scope de lecture (recherche d'offres), stable et documenté publiquement sur
// francetravail.io. Le scope d'ÉCRITURE (dépôt d'offre) n'est communiqué par
// France Travail qu'après validation du dossier d'accréditation "diffuseur
// d'offres" — à ajouter ici une fois reçu (ex: "api_offresdemploiv2 o2dsoffre
// api_offresdemploi-declarationv1 ...", le nom exact dépend de ce que
// l'accréditation accorde).
const READ_SCOPE = "api_offresdemploiv2 o2dsoffre";

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.value;

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.FRANCE_TRAVAIL_CLIENT_ID!,
    client_secret: process.env.FRANCE_TRAVAIL_CLIENT_SECRET!,
    scope: process.env.FRANCE_TRAVAIL_WRITE_SCOPE || READ_SCOPE,
  });

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    throw new Error(`France Travail: échec d'authentification OAuth2 (${res.status})`);
  }
  const json = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = { value: json.access_token, expiresAt: Date.now() + (json.expires_in - 30) * 1000 };
  return cachedToken.value;
}

export type FranceTravailSyncResult =
  | { ok: true; externalId: string }
  | { ok: false; error: string };

/**
 * Publie une offre sur France Travail.
 *
 * IMPORTANT : l'endpoint de dépôt d'offre (contrairement à la recherche,
 * qui est publique et stable) n'est communiqué par France Travail qu'après
 * accréditation comme "diffuseur d'offres" — voir
 * https://francetravail.io puis la démarche de demande d'habilitation.
 * Sans ces informations, écrire ici une URL et un schéma de payload
 * inventés produirait une intégration qui a l'air de marcher mais échoue
 * silencieusement (ou pire, réussit contre le mauvais endpoint) — donc on
 * s'arrête volontairement ici tant que l'accréditation n'a pas fourni la
 * spec exacte. Une fois reçue : renseigner FRANCE_TRAVAIL_WRITE_ENDPOINT et
 * FRANCE_TRAVAIL_WRITE_SCOPE, puis compléter le payload ci-dessous avec les
 * champs exacts demandés par la documentation d'accréditation.
 */
export async function publishToFranceTravail(
  job: JobPosting,
  company: Company
): Promise<FranceTravailSyncResult> {
  if (!franceTravailEnabled) {
    return { ok: false, error: "France Travail non configuré (FRANCE_TRAVAIL_CLIENT_ID/SECRET absents)" };
  }

  const writeEndpoint = process.env.FRANCE_TRAVAIL_WRITE_ENDPOINT;
  if (!writeEndpoint) {
    return {
      ok: false,
      error:
        "Endpoint de dépôt d'offre non configuré — nécessite l'accréditation « diffuseur d'offres » " +
        "de France Travail, qui fournit l'URL et le schéma exacts. Voir francetravail.io.",
    };
  }

  try {
    const token = await getAccessToken();
    const res = await fetch(writeEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // Champs de base couverts par la doc publique du modèle d'offre France
      // Travail ; à ajuster/compléter selon le schéma exact renvoyé par
      // l'accréditation (ex: codes ROME, natureContrat, etc.).
      body: JSON.stringify({
        intitule: job.title,
        description: job.description,
        entreprise: { nom: company.name },
        lieuTravail: job.city ? { libelle: job.city } : undefined,
        typeContrat: job.contractType,
        salaire:
          job.salaryMin || job.salaryMax
            ? { libelle: `${job.salaryMin ?? ""}-${job.salaryMax ?? ""} MAD` }
            : undefined,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: `France Travail a refusé le dépôt (${res.status}): ${text.slice(0, 300)}` };
    }

    const json = (await res.json()) as { id?: string; reference?: string };
    const externalId = json.id ?? json.reference ?? "unknown";
    return { ok: true, externalId };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}
