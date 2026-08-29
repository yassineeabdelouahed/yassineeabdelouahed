import { requireRole } from "@/lib/rbac";
import { listCandidateApplications } from "@/server/actions/jobs";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import Link from "next/link";

const STATUS_LABEL: Record<string, string> = {
  SUBMITTED: "Envoyée",
  UNDER_REVIEW: "En cours d'examen",
  SHORTLISTED: "Présélectionnée",
  REJECTED: "Non retenue",
  HIRED: "Recruté(e)",
};

export default async function CandidateDashboardPage() {
  const user = await requireRole("CANDIDATE");
  const applications = await listCandidateApplications();

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900">Bonjour, {user.name}</h1>
      <p className="text-ink-500 mt-2">Retrouvez vos candidatures et vos formations.</p>

      {applications.length === 0 ? (
        <Card className="mt-8 p-8 text-center">
          <p className="text-ink-700">Vous n&apos;avez pas encore de candidature.</p>
          <LinkButton href="/results" variant="accent" className="mt-4 inline-flex">
            Voir les offres d&apos;emploi
          </LinkButton>
        </Card>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {applications.slice(0, 5).map((app) => (
            <Link key={app.id} href={`/candidate/applications/${app.id}`}>
              <Card className="p-5 hover:border-teal transition-colors flex items-center justify-between">
                <div>
                  <div className="font-bold text-[16px] text-ink-900">{app.jobPosting.title}</div>
                  <div className="text-sm text-ink-500 mt-0.5">{app.jobPosting.company.name}</div>
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
