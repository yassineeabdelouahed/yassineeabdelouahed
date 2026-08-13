import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { ScheduleForm } from "@/components/cabinet/ScheduleForm";
import type { InterviewStatus, InterviewFeedbackOutcome } from "@/generated/prisma/enums";

const OUTCOME_LABEL: Record<InterviewFeedbackOutcome, string> = {
  VALIDATED: "Validé",
  RESERVED: "Réserve",
  REFUSED: "Refusé",
};

const MODE_LABEL: Record<string, string> = {
  ONSITE: "Sur site",
  VIDEO: "Visioconférence",
  PHONE: "Téléphone",
};

type Interview = {
  id: string;
  status: InterviewStatus;
  scheduledAt: Date | null;
  mode: string | null;
  clientFeedbackOutcome: InterviewFeedbackOutcome | null;
  clientFeedbackComment: string | null;
  candidate: { firstName: string; lastName: string; headline: string | null };
  slots: { id: string; startAt: Date; endAt: Date }[];
};

export function CabinetInterviewsPanel({ interviews }: { interviews: Interview[] }) {
  if (interviews.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {interviews.map((iv) => (
        <Card key={iv.id} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-ink-900">
                {iv.candidate.firstName} {iv.candidate.lastName}
              </div>
              {iv.candidate.headline && <div className="text-xs text-ink-500">{iv.candidate.headline}</div>}
            </div>
          </div>

          {iv.status === "SLOT_PROPOSED" && iv.slots.length === 0 && (
            <p className="text-xs text-ink-500 mt-2">En attente des disponibilités du client.</p>
          )}

          {iv.status === "SLOT_PROPOSED" && iv.slots.length > 0 && (
            <ScheduleForm interviewId={iv.id} slots={iv.slots} />
          )}

          {iv.status === "SCHEDULED" && iv.scheduledAt && (
            <p className="text-sm text-ink-900 mt-2">
              Planifié le {iv.scheduledAt.toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })}
              {iv.mode ? ` · ${MODE_LABEL[iv.mode]}` : ""} · en attente du retour client
            </p>
          )}

          {iv.status === "COMPLETED" && iv.clientFeedbackOutcome && (
            <div className="mt-2">
              <Tag tone={iv.clientFeedbackOutcome === "REFUSED" ? "danger" : "success"}>
                {OUTCOME_LABEL[iv.clientFeedbackOutcome]}
              </Tag>
              {iv.clientFeedbackComment && (
                <p className="text-xs text-ink-500 mt-1">{iv.clientFeedbackComment}</p>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
