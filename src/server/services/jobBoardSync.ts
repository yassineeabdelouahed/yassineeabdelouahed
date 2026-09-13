import { prisma } from "@/lib/prisma";
import { franceTravailEnabled, publishToFranceTravail } from "@/lib/jobBoards/franceTravail";

/**
 * Diffusion externe d'une offre publiée. Chaque plateforme demandée
 * (Indeed, LinkedIn Jobs, France Travail, Welcome to the Jungle) a un
 * niveau d'intégration réellement possible très différent — voir README
 * pour le détail :
 *
 * - france_travail : vraie API, appelée ici quand configurée.
 * - indeed        : pas d'API push — géré par le flux XML public
 *                   (src/lib/jobBoards/indeedFeed.ts), pas par ce service.
 *                   Enregistré ici comme UNAVAILABLE avec une note pointant
 *                   vers le flux, pour que le statut soit visible dans les
 *                   mêmes tableaux de suivi que les autres.
 * - linkedin      : pas d'API de publication en libre-service pour un
 *                   tiers (nécessite un partenariat "Recruiter System
 *                   Connect"). Les données structurées JobPosting sur la
 *                   page publique de l'offre sont ce qui aide réellement
 *                   à l'indexation organique — pas un appel API.
 * - wttj          : aucune API publique, partenariat commercial direct
 *                   requis avec Welcome to the Jungle.
 */
export async function syncJobToBoards(jobPostingId: string): Promise<void> {
  const job = await prisma.jobPosting.findUnique({
    where: { id: jobPostingId },
    include: { company: true },
  });
  if (!job) return;

  if (franceTravailEnabled) {
    const result = await publishToFranceTravail(job, job.company);
    await prisma.jobBoardSync.upsert({
      where: { jobPostingId_board: { jobPostingId: job.id, board: "france_travail" } },
      create: {
        jobPostingId: job.id,
        board: "france_travail",
        status: result.ok ? "SYNCED" : "FAILED",
        externalId: result.ok ? result.externalId : null,
        error: result.ok ? null : result.error,
        syncedAt: result.ok ? new Date() : null,
      },
      update: {
        status: result.ok ? "SYNCED" : "FAILED",
        externalId: result.ok ? result.externalId : null,
        error: result.ok ? null : result.error,
        syncedAt: result.ok ? new Date() : null,
      },
    });
  }

  await prisma.jobBoardSync.upsert({
    where: { jobPostingId_board: { jobPostingId: job.id, board: "indeed" } },
    create: {
      jobPostingId: job.id,
      board: "indeed",
      status: "UNAVAILABLE",
      error: "Diffusé via le flux XML public (/api/feeds/indeed.xml), pas via API — à soumettre une fois sur le compte employeur Indeed.",
    },
    update: {},
  });

  await prisma.jobBoardSync.upsert({
    where: { jobPostingId_board: { jobPostingId: job.id, board: "linkedin" } },
    create: {
      jobPostingId: job.id,
      board: "linkedin",
      status: "UNAVAILABLE",
      error: "Pas d'API de publication en libre-service (nécessite un partenariat LinkedIn Recruiter System Connect) — visibilité via les données structurées JobPosting de la page publique.",
    },
    update: {},
  });

  await prisma.jobBoardSync.upsert({
    where: { jobPostingId_board: { jobPostingId: job.id, board: "wttj" } },
    create: {
      jobPostingId: job.id,
      board: "wttj",
      status: "UNAVAILABLE",
      error: "Welcome to the Jungle ne propose pas d'API publique — nécessite un partenariat commercial direct avec leurs équipes.",
    },
    update: {},
  });
}
