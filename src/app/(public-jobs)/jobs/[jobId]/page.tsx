import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedJob, listSimilarJobs, hasCandidateApplied } from "@/server/actions/jobs";
import { currentCandidateHasCv } from "@/server/actions/profile";
import { getSessionUser } from "@/lib/rbac";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { ApplyButton } from "@/components/jobs/ApplyButton";

function formatSalary(min: number | null, max: number | null): string | null {
  if (!min && !max) return null;
  const fmt = (n: number) => n.toLocaleString("fr-FR");
  if (min && max) return `${fmt(min)} – ${fmt(max)} MAD / mois`;
  return `${fmt((min ?? max)!)} MAD / mois`;
}

export default async function JobDetailPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  const job = await getPublishedJob(jobId);
  if (!job) notFound();

  const [similarJobs, alreadyApplied, user, hasCv] = await Promise.all([
    listSimilarJobs(job.category, job.id),
    hasCandidateApplied(job.id),
    getSessionUser(),
    currentCandidateHasCv(),
  ]);

  const salary = formatSalary(job.salaryMin, job.salaryMax);
  const initials = job.company.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="max-w-[1180px] mx-auto px-8 py-8">
      <Link href="/results" className="text-sm font-semibold text-teal hover:text-teal-hover">
        ‹ Retour aux résultats
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-7 mt-5">
        <Card className="p-8">
          <div className="flex justify-between items-start gap-5">
            <div>
              <div className="font-heading font-extrabold text-[26px] text-ink-900">{job.title}</div>
              <div className="text-[15px] text-ink-500 mt-2">
                {job.company.name}
                {job.city ? ` · ${job.city}` : ""}
              </div>
            </div>
            {user?.role === "CANDIDATE" ? (
              <div className="text-right">
                <ApplyButton jobId={job.id} alreadyApplied={alreadyApplied} />
                {!hasCv && !alreadyApplied && (
                  <p className="text-xs text-ink-300 mt-2 max-w-[220px]">
                    <Link href="/candidate/profile" className="text-teal font-semibold">
                      Ajoutez votre CV
                    </Link>{" "}
                    pour postuler encore plus vite la prochaine fois.
                  </p>
                )}
              </div>
            ) : !user ? (
              <Link
                href={`/login?callbackUrl=${encodeURIComponent(`/jobs/${job.id}`)}`}
                className="text-sm font-semibold text-teal hover:text-teal-hover whitespace-nowrap"
              >
                Se connecter pour postuler
              </Link>
            ) : null}
          </div>

          <div className="flex gap-2 mt-4.5 flex-wrap">
            {job.contractType && <Tag tone="teal">{job.contractType}</Tag>}
            {job.remoteType && <Tag tone="orange">{job.remoteType}</Tag>}
            {job.category && <Tag tone="neutral">{job.category}</Tag>}
          </div>
          {salary && <div className="text-base font-bold text-ink-700 mt-4.5">{salary}</div>}

          <div className="h-px bg-border my-6.5" />

          <div className="font-heading font-extrabold text-base text-ink-900 mb-2.5">Description du poste</div>
          <p className="text-[15px] leading-relaxed text-ink-700 whitespace-pre-wrap">{job.description}</p>

          {job.missions.length > 0 && (
            <>
              <div className="font-heading font-extrabold text-base text-ink-900 mt-5.5 mb-2.5">Vos missions</div>
              {job.missions.map((m, i) => (
                <div key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-700 mb-2">
                  <span className="text-teal">✓</span>
                  {m}
                </div>
              ))}
            </>
          )}

          {job.profile.length > 0 && (
            <>
              <div className="font-heading font-extrabold text-base text-ink-900 mt-5.5 mb-2.5">Profil recherché</div>
              {job.profile.map((p, i) => (
                <div key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-700 mb-2">
                  <span className="text-teal">✓</span>
                  {p}
                </div>
              ))}
            </>
          )}
        </Card>

        <div className="flex flex-col gap-4">
          <Link href={`/companies/${job.companyId}`}>
            <Card className="p-6 hover:border-teal transition-colors">
              <div className="w-11 h-11 rounded-[9px] bg-dark text-white flex items-center justify-center font-heading font-extrabold text-base">
                {initials}
              </div>
              <div className="font-bold text-[15px] text-ink-900 mt-3">{job.company.name}</div>
              {job.city && <div className="text-[13px] text-ink-500 mt-1">{job.city}</div>}
              <div className="text-xs text-teal font-semibold mt-2">Voir le profil et les avis</div>
            </Card>
          </Link>

          {similarJobs.length > 0 && (
            <Card className="p-6">
              <div className="font-bold text-sm text-ink-900 mb-3.5">Offres similaires</div>
              {similarJobs.map((sj) => (
                <Link
                  key={sj.id}
                  href={`/jobs/${sj.id}`}
                  className="block py-3 border-t border-border-soft first:border-t-0"
                >
                  <div className="text-sm font-semibold text-ink-900">{sj.title}</div>
                  <div className="text-xs text-ink-300 mt-0.5">
                    {sj.company.name}
                    {sj.city ? ` · ${sj.city}` : ""}
                  </div>
                </Link>
              ))}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
