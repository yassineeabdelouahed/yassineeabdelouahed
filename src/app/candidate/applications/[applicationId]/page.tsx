import { notFound } from "next/navigation";
import Link from "next/link";
import { getApplicationForCandidate } from "@/server/actions/messages";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { DirectMessageThread } from "@/components/jobs/DirectMessageThread";

export default async function CandidateApplicationDetailPage({
  params,
}: {
  params: Promise<{ applicationId: string }>;
}) {
  const { applicationId } = await params;
  const application = await getApplicationForCandidate(applicationId);
  if (!application) notFound();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-7">
      <div>
        <Link href="/candidate/applications" className="text-sm font-semibold text-teal hover:text-teal-hover">
          ‹ Retour à mes candidatures
        </Link>

        <Card className="p-6 mt-4">
          <div className="font-heading font-extrabold text-base text-ink-900 mb-4">Conversation avec le recruteur</div>
          <DirectMessageThread applicationId={application.id} messages={application.messages} />
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <Card className="p-6">
          <div className="text-xs text-ink-300">Offre</div>
          <Link
            href={`/jobs/${application.jobPosting.id}`}
            className="text-sm font-semibold text-teal hover:text-teal-hover mt-1 block mb-2"
          >
            {application.jobPosting.title}
          </Link>
          <Tag tone="neutral">{application.status}</Tag>
        </Card>
      </div>
    </div>
  );
}
