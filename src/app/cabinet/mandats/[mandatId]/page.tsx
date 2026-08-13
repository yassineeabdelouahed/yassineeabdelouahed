import { notFound } from "next/navigation";
import { getMandatForCabinet, listMandateApplicationsForCabinet } from "@/server/actions/mandats";
import { listCandidates } from "@/server/actions/candidates";
import { MandatSummary } from "@/components/mandats/MandatSummary";
import { MandatTimeline } from "@/components/mandats/Timeline";
import { MessageThread } from "@/components/mandats/MessageThread";
import { IntakeActions } from "@/components/cabinet/IntakeActions";
import { SourcingPanel } from "@/components/cabinet/SourcingPanel";
import { ApplicationList } from "@/components/mandats/ApplicationList";
import { Card } from "@/components/ui/Card";
import { MandatStatusTag } from "@/components/mandats/StatusTag";

export default async function CabinetMandatDetailPage({
  params,
}: {
  params: Promise<{ mandatId: string }>;
}) {
  const { mandatId } = await params;
  const mandat = await getMandatForCabinet(mandatId);
  if (!mandat) notFound();

  const applications = await listMandateApplicationsForCabinet(mandatId);
  const candidates = mandat.status === "SOURCING" ? await listCandidates() : [];
  const proposed = applications.filter((a) => a.status === "PROPOSED");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-7">
      <div className="flex flex-col gap-6">
        <div>
          <div className="text-sm text-ink-500 mb-1">{mandat.company.name}</div>
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
        </div>

        {mandat.status === "NEW" && (
          <Card className="p-6">
            <div className="font-heading font-extrabold text-base text-ink-900 mb-3">
              Validation du besoin
            </div>
            <IntakeActions mandatId={mandat.id} />
          </Card>
        )}

        {mandat.status === "SOURCING" && (
          <Card className="p-6">
            <div className="font-heading font-extrabold text-base text-ink-900 mb-3">
              Sourcing et pré-qualification
            </div>
            <SourcingPanel mandatId={mandat.id} candidates={candidates} proposed={proposed} />
          </Card>
        )}

        {applications.length > 0 && mandat.status !== "SOURCING" && (
          <Card className="p-6">
            <div className="font-heading font-extrabold text-base text-ink-900 mb-4">
              Short-list
            </div>
            <ApplicationList applications={applications} />
          </Card>
        )}

        <Card className="p-6">
          <div className="font-heading font-extrabold text-base text-ink-900 mb-4">
            Échanges avec le client
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
