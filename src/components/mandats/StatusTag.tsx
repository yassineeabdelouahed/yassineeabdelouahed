import type { MandatStatus } from "@/generated/prisma/enums";
import { Tag } from "@/components/ui/Tag";

const STATUS_LABEL: Record<MandatStatus, string> = {
  NEW: "Nouveau",
  SOURCING: "Sourcing",
  SHORTLIST_SENT: "Short-list envoyée",
  CLIENT_SELECTING: "Sélection client",
  INTERVIEWING: "Entretiens",
  OFFER: "Offre",
  WON: "Gagné",
  CANCELLED: "Annulé",
};

const STATUS_TONE: Record<MandatStatus, "teal" | "orange" | "neutral" | "success" | "warning" | "danger"> = {
  NEW: "warning",
  SOURCING: "teal",
  SHORTLIST_SENT: "teal",
  CLIENT_SELECTING: "teal",
  INTERVIEWING: "teal",
  OFFER: "orange",
  WON: "success",
  CANCELLED: "danger",
};

export function MandatStatusTag({ status }: { status: MandatStatus }) {
  return <Tag tone={STATUS_TONE[status]}>{STATUS_LABEL[status]}</Tag>;
}
