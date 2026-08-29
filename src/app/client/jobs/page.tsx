import Link from "next/link";
import { listJobPostingsForClient } from "@/server/actions/jobs";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { LinkButton } from "@/components/ui/Button";
import { SponsorshipButton } from "@/components/client/SponsorshipButton";

export default async function ClientJobsPage() {
  const jobs = await listJobPostingsForClient();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading font-extrabold text-2xl text-ink-900">Mes offres publiées</h1>
        <LinkButton href="/espace-recruteur" variant="accent">
          Publier une offre
        </LinkButton>
      </div>

      {jobs.length === 0 ? (
        <Card className="p-8 text-center text-ink-500">
          Vous n&apos;avez pas encore publié d&apos;offre sur le job board.
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {jobs.map((job) => (
            <Card key={job.id} className="p-5">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="font-bold text-[16px] text-ink-900">{job.title}</div>
                  <div className="text-sm text-ink-500 mt-0.5">
                    {job.city} · {job.contractType}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link href={`/client/jobs/${job.id}/applicants`} className="hover:opacity-80">
                    <Tag tone="neutral">{job.applications.length} candidature(s)</Tag>
                  </Link>
                  <Tag tone={job.status === "PUBLISHED" ? "success" : "neutral"}>{job.status}</Tag>
                </div>
              </div>
              {job.status === "PUBLISHED" && (
                <div className="mt-3 pt-3 border-t border-border-soft">
                  <SponsorshipButton
                    jobId={job.id}
                    sponsoredUntil={job.sponsoredUntil}
                    latestSponsorship={job.sponsorships[0] ?? null}
                  />
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
