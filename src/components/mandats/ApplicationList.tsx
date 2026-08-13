import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import type { MandateApplicationStatus } from "@/generated/prisma/enums";

const STATUS_LABEL: Record<MandateApplicationStatus, string> = {
  PROPOSED: "Proposé",
  PUBLISHED_TO_CLIENT: "Publié au client",
  SELECTED_BY_CLIENT: "Sélectionné",
  REJECTED_BY_CLIENT: "Non retenu",
  INTERVIEWING: "Entretien en cours",
  VALIDATED: "Validé",
  RESERVED: "Réservé",
  REFUSED: "Refusé",
  HIRED: "Recruté",
};

const STATUS_TONE: Record<MandateApplicationStatus, "teal" | "orange" | "neutral" | "success" | "warning" | "danger"> = {
  PROPOSED: "neutral",
  PUBLISHED_TO_CLIENT: "teal",
  SELECTED_BY_CLIENT: "teal",
  REJECTED_BY_CLIENT: "neutral",
  INTERVIEWING: "warning",
  VALIDATED: "success",
  RESERVED: "warning",
  REFUSED: "danger",
  HIRED: "success",
};

type Application = {
  id: string;
  status: MandateApplicationStatus;
  prequalNotes: string | null;
  strengths: string | null;
  watchPoints: string | null;
  candidate: { firstName: string; lastName: string; headline: string | null };
};

export function ApplicationList({ applications }: { applications: Application[] }) {
  if (applications.length === 0) {
    return <p className="text-sm text-ink-500">Aucun candidat pour l&apos;instant.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {applications.map((app) => (
        <Card key={app.id} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-ink-900">
                {app.candidate.firstName} {app.candidate.lastName}
              </div>
              {app.candidate.headline && <div className="text-xs text-ink-500">{app.candidate.headline}</div>}
            </div>
            <Tag tone={STATUS_TONE[app.status]}>{STATUS_LABEL[app.status]}</Tag>
          </div>
          {app.prequalNotes && <p className="text-xs text-ink-700 mt-2">{app.prequalNotes}</p>}
          <div className="flex gap-4 mt-2">
            {app.strengths && (
              <span className="text-xs text-success-text">✓ {app.strengths}</span>
            )}
            {app.watchPoints && <span className="text-xs text-warning-text">⚠ {app.watchPoints}</span>}
          </div>
        </Card>
      ))}
    </div>
  );
}
