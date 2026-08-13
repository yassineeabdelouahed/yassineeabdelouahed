import { notFound } from "next/navigation";
import { getMandatForClient } from "@/server/actions/mandats";
import { MandatSummary } from "@/components/mandats/MandatSummary";
import { MandatTimeline } from "@/components/mandats/Timeline";
import { MessageThread } from "@/components/mandats/MessageThread";
import { Card } from "@/components/ui/Card";
import { MandatStatusTag } from "@/components/mandats/StatusTag";

export default async function ClientMandatDetailPage({
  params,
}: {
  params: Promise<{ mandatId: string }>;
}) {
  const { mandatId } = await params;
  const mandat = await getMandatForClient(mandatId);
  if (!mandat) notFound();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-7">
      <div className="flex flex-col gap-6">
        <MandatSummary
          title={mandat.title}
          reference={mandat.reference}
          skillsRequired={mandat.skillsRequired}
          experienceLevel={mandat.experienceLevel}
          salaryMin={mandat.salaryMin}
          salaryMax={mandat.salaryMax}
          currency={mandat.currency}
          location={mandat.location}
          remotePolicy={mandat.remotePolicy}
        />

        <Card className="p-6">
          <div className="font-heading font-extrabold text-base text-ink-900 mb-4">
            Échanges avec le cabinet
          </div>
          <MessageThread mandatId={mandat.id} messages={mandat.messages} />
        </Card>
      </div>

      <div className="flex flex-col gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-heading font-extrabold text-base text-ink-900">Statut</div>
            <MandatStatusTag status={mandat.status} />
          </div>
          <MandatTimeline status={mandat.status} />
        </Card>

        {mandat.assignedConsultant && (
          <Card className="p-6">
            <div className="text-xs text-ink-300">Consultant en charge</div>
            <div className="text-sm font-semibold text-ink-900 mt-1">
              {mandat.assignedConsultant.user.name}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
