import { Tag } from "@/components/ui/Tag";

type BoardSync = { board: string; status: string };

const BOARD_LABELS: Record<string, string> = {
  france_travail: "France Travail",
  indeed: "Indeed",
  linkedin: "LinkedIn",
  wttj: "Welcome to the Jungle",
};

const BOARD_HINTS: Record<string, string> = {
  indeed: "Diffusée via le flux XML public (à soumettre une fois sur votre compte employeur Indeed)",
  linkedin: "Pas d'API de publication tierce disponible — visibilité via les données structurées de l'offre",
  wttj: "Nécessite un partenariat commercial direct avec Welcome to the Jungle",
};

/**
 * Statut de diffusion externe par plateforme sur une offre. "UNAVAILABLE"
 * n'est pas une erreur — voir BOARD_HINTS et src/server/services/jobBoardSync.ts
 * pour ce que chaque plateforme permet réellement en libre-service.
 */
export function JobBoardBadges({ boardSyncs }: { boardSyncs: BoardSync[] }) {
  if (boardSyncs.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {boardSyncs.map((sync) => {
        const label = BOARD_LABELS[sync.board] ?? sync.board;
        const hint = BOARD_HINTS[sync.board];
        const tone = sync.status === "SYNCED" ? "success" : sync.status === "FAILED" ? "danger" : "neutral";
        const text =
          sync.status === "SYNCED" ? `${label} ✓` : sync.status === "FAILED" ? `${label} — échec` : label;
        return (
          <span key={sync.board} title={hint}>
            <Tag tone={tone}>{text}</Tag>
          </span>
        );
      })}
    </div>
  );
}
