import { notFound } from "next/navigation";
import { getMandatForClient, listMandateApplicationsForClient } from "@/server/actions/mandats";
import { MandatSummary } from "@/components/mandats/MandatSummary";
import { MandatTimeline } from "@/components/mandats/Timeline";
import { MessageThread } from "@/components/mandats/MessageThread";
import { ShortlistSelection } from "@/components/client/ShortlistSelection";
import { ApplicationList } from "@/components/mandats/ApplicationList";
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

  const applications = await listMandateApplicationsForClient(mandatId);
  const publishedNotYetDecided = applications.filter((a) => a.status === "PUBLISHED_TO_CLIENT");

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

        {mandat.status === "SHORTLIST_SENT" && publishedNotYetDecided.length > 0 && (
          <Card className="p-6">
            <div className="font-heading font-extrabold text-base text-ink-900 mb-3">
              Short-list du cabinet
            </div>
            <ShortlistSelection mandatId={mandat.id} applications={publishedNotYetDecided} />
          </Card>
        )}

        {applications.length > 0 && mandat.status !== "SHORTLIST_SENT" && (
          <Card className="p-6">
            <div className="font-heading font-extrabold text-base text-ink-900 mb-4">
              Candidats
            </div>
            <ApplicationList applications={applications} />
          </Card>
        )}

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
