import type { ProspectStage } from "@/generated/prisma/enums";
import { Tag } from "@/components/ui/Tag";

export const STAGE_LABEL: Record<ProspectStage, string> = {
  PROSPECT: "Prospect",
  CONTACTED: "Contacté",
  QUALIFIED: "Qualifié",
  MEETING: "RDV",
  NEED_CONFIRMED: "Besoin confirmé",
  PROPOSAL: "Offre",
  NEGOTIATION: "Négociation",
  WON: "Client",
  LOST: "Perdu",
};

const STAGE_TONE: Record<ProspectStage, "teal" | "orange" | "neutral" | "success" | "warning" | "danger"> = {
  PROSPECT: "neutral",
  CONTACTED: "warning",
  QUALIFIED: "teal",
  MEETING: "teal",
  NEED_CONFIRMED: "teal",
  PROPOSAL: "orange",
  NEGOTIATION: "orange",
  WON: "success",
  LOST: "danger",
};

export const STAGE_ORDER: ProspectStage[] = [
  "PROSPECT",
  "CONTACTED",
  "QUALIFIED",
  "MEETING",
  "NEED_CONFIRMED",
  "PROPOSAL",
  "NEGOTIATION",
  "WON",
];

export function ProspectStageTag({ stage }: { stage: ProspectStage }) {
  return <Tag tone={STAGE_TONE[stage]}>{STAGE_LABEL[stage]}</Tag>;
}
