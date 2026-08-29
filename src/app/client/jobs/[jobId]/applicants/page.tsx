import { notFound } from "next/navigation";
import Link from "next/link";
import { getJobPostingForClient, listApplicantsForClient } from "@/server/actions/jobs";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

const STATUS_LABEL: Record<string, string> = {
  SUBMITTED: "Envoyée",
  UNDER_REVIEW: "En cours d'examen",
  SHORTLISTED: "Présélectionnée",
  REJECTED: "Non retenue",
  HIRED: "Recruté(e)",
};

export default async function ClientApplicantsPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  const job = await getJobPostingForClient(jobId);
  if (!job) notFound();

  const applicants = await listApplicantsForClient(jobId);

  return (
    <div>
      <div className="text-sm text-ink-500 mb-1">Candidatures pour</div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900 mb-8">{job.title}</h1>

      {applicants.length === 0 ? (
        <Card className="p-8 text-center text-ink-500">Aucune candidature pour l&apos;instant.</Card>
      ) : (
        <div className="flex flex-col gap-3">
          {applicants.map((app) => (
            <Link key={app.id} href={`/client/jobs/${jobId}/applicants/${app.id}`}>
              <Card className="p-5 hover:border-teal transition-colors flex items-center justify-between">
                <div>
                  <div className="font-bold text-[16px] text-ink-900">
                    {app.candidate.firstName} {app.candidate.lastName}
                  </div>
                  <div className="text-sm text-ink-500 mt-0.5">
                    {app.candidate.headline ?? app.candidate.email}
                    {app.candidate.location ? ` · ${app.candidate.location}` : ""}
                  </div>
                  {app.messages[0] && (
                    <div className="text-xs text-ink-300 mt-1.5 line-clamp-1">
                      Dernier message : {app.messages[0].body}
                    </div>
                  )}
                </div>
                <Tag tone={app.status === "HIRED" ? "success" : app.status === "REJECTED" ? "danger" : "teal"}>
                  {STATUS_LABEL[app.status]}
                </Tag>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
