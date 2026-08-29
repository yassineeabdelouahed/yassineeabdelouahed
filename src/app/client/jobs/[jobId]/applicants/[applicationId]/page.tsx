import { notFound } from "next/navigation";
import Link from "next/link";
import { getApplicationForClient } from "@/server/actions/messages";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { DirectMessageThread } from "@/components/jobs/DirectMessageThread";

export default async function ClientApplicantDetailPage({
  params,
}: {
  params: Promise<{ jobId: string; applicationId: string }>;
}) {
  const { jobId, applicationId } = await params;
  const application = await getApplicationForClient(applicationId);
  if (!application || application.jobPosting.id !== jobId) notFound();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-7">
      <div>
        <Link href={`/client/jobs/${jobId}/applicants`} className="text-sm font-semibold text-teal hover:text-teal-hover">
          ‹ Retour aux candidatures
        </Link>

        <Card className="p-6 mt-4">
          <div className="font-heading font-extrabold text-base text-ink-900 mb-4">Conversation</div>
          <DirectMessageThread applicationId={application.id} messages={application.messages} />
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <Card className="p-6">
          <div className="text-xs text-ink-300">Candidat</div>
          <div className="font-bold text-[16px] text-ink-900 mt-1">
            {application.candidate.firstName} {application.candidate.lastName}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-xs text-ink-300">Offre</div>
          <div className="text-sm font-semibold text-ink-900 mt-1 mb-2">{application.jobPosting.title}</div>
          <Tag tone="neutral">{application.status}</Tag>
        </Card>
      </div>
    </div>
  );
}
