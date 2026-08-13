import Link from "next/link";
import { listCandidateApplications } from "@/server/actions/jobs";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

const STATUS_LABEL: Record<string, string> = {
  SUBMITTED: "Envoyée",
  UNDER_REVIEW: "En cours d'examen",
  SHORTLISTED: "Présélectionnée",
  REJECTED: "Non retenue",
  HIRED: "Recruté(e)",
};

export default async function CandidateApplicationsPage() {
  const applications = await listCandidateApplications();

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900 mb-8">Mes candidatures</h1>

      {applications.length === 0 ? (
        <Card className="p-8 text-center text-ink-500">Vous n&apos;avez pas encore postulé à une offre.</Card>
      ) : (
        <div className="flex flex-col gap-3">
          {applications.map((app) => (
            <Link key={app.id} href={`/jobs/${app.jobPosting.id}`}>
              <Card className="p-5 hover:border-teal transition-colors flex items-center justify-between">
                <div>
                  <div className="font-bold text-[16px] text-ink-900">{app.jobPosting.title}</div>
                  <div className="text-sm text-ink-500 mt-0.5">
                    {app.jobPosting.company.name}
                    {app.jobPosting.city ? ` · ${app.jobPosting.city}` : ""}
                  </div>
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
