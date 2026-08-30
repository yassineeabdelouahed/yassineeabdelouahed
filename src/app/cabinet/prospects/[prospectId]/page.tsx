import { notFound } from "next/navigation";
import { requireRole } from "@/lib/rbac";
import { getProspect } from "@/server/actions/prospects";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { ProspectStageTag, STAGE_ORDER } from "@/components/prospects/ProspectStageTag";
import { ProspectStageActions } from "@/components/prospects/ProspectStageActions";

const URGENCY_LABEL: Record<string, string> = { LOW: "Faible", MEDIUM: "Moyenne", HIGH: "Élevée" };

export default async function ProspectDetailPage({
  params,
}: {
  params: Promise<{ prospectId: string }>;
}) {
  await requireRole("CABINET");
  const { prospectId } = await params;
  const prospect = await getProspect(prospectId);
  if (!prospect) notFound();

  const isClosed = prospect.stage === "WON" || prospect.stage === "LOST";
  const currentIndex = STAGE_ORDER.indexOf(prospect.stage);
  const nextStage = !isClosed && currentIndex >= 0 && currentIndex < STAGE_ORDER.length - 1
    ? STAGE_ORDER[currentIndex + 1]
    : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-7">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="font-heading font-extrabold text-2xl text-ink-900">{prospect.companyName}</h1>
          <ProspectStageTag stage={prospect.stage} />
        </div>
        <p className="text-ink-500 mb-6">
          {prospect.sector}
          {prospect.sector && prospect.city ? " · " : ""}
          {prospect.city}
        </p>

        <Card className="p-6 mb-6">
          <div className="font-heading font-extrabold text-base text-ink-900 mb-3">Contact</div>
          <div className="text-sm text-ink-700 flex flex-col gap-1">
            {prospect.contactName && <span>{prospect.contactName}</span>}
            {prospect.contactEmail && <span>{prospect.contactEmail}</span>}
            {prospect.contactPhone && <span>{prospect.contactPhone}</span>}
            {!prospect.contactName && !prospect.contactEmail && !prospect.contactPhone && (
              <span className="text-ink-300">Aucun contact renseigné.</span>
            )}
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <div className="font-heading font-extrabold text-base text-ink-900 mb-3">Qualification</div>
          <div className="flex gap-2 mb-3">
            <Tag tone={prospect.urgency === "HIGH" ? "danger" : "neutral"}>
              Urgence : {URGENCY_LABEL[prospect.urgency]}
            </Tag>
            {prospect.estimatedBudget != null && (
              <Tag tone="neutral">Budget estimé : {prospect.estimatedBudget.toLocaleString("fr-FR")} MAD</Tag>
            )}
          </div>
          {prospect.notes && <p className="text-sm text-ink-700 whitespace-pre-wrap">{prospect.notes}</p>}
        </Card>

        {!isClosed && (
          <Card className="p-6">
            <div className="font-heading font-extrabold text-base text-ink-900 mb-3">Faire avancer</div>
            <ProspectStageActions prospectId={prospect.id} nextStage={nextStage} />
          </Card>
        )}
      </div>

      <div>
        <Card className="p-6">
          <div className="font-heading font-extrabold text-base text-ink-900 mb-3">Historique</div>
          <div className="flex flex-col gap-3">
            {prospect.stageEvents.map((event) => (
              <div key={event.id} className="text-sm">
                <div className="flex items-center gap-2">
                  <ProspectStageTag stage={event.toStage} />
                  <span className="text-xs text-ink-300">
                    {event.createdAt.toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <div className="text-xs text-ink-500 mt-1">par {event.actor.name}</div>
                {event.note && <p className="text-xs text-ink-700 mt-1">{event.note}</p>}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
