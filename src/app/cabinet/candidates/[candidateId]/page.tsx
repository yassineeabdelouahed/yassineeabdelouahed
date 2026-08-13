import { notFound } from "next/navigation";
import Link from "next/link";
import { getCandidate } from "@/server/actions/candidates";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

const SOURCE_LABEL: Record<string, string> = {
  INTERNAL_DB: "Base interne",
  JOBBOARD: "Jobboard",
  NETWORK: "Réseau",
  COOPTATION: "Cooptation",
  SELF_REGISTERED: "Inscription autonome",
};

export default async function CandidateDetailPage({
  params,
}: {
  params: Promise<{ candidateId: string }>;
}) {
  const { candidateId } = await params;
  const candidate = await getCandidate(candidateId);
  if (!candidate) notFound();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-7">
      <div className="flex flex-col gap-6">
        <Card className="p-6">
          <div className="font-heading font-extrabold text-xl text-ink-900">
            {candidate.firstName} {candidate.lastName}
          </div>
          {candidate.headline && <div className="text-ink-500 mt-1">{candidate.headline}</div>}

          <div className="flex flex-wrap gap-2 mt-4">
            {candidate.skills.map((skill) => (
              <Tag key={skill} tone="teal">
                {skill}
              </Tag>
            ))}
          </div>

          <dl className="grid grid-cols-2 gap-3 mt-5 text-sm">
            <div>
              <dt className="text-ink-300 text-xs">Email</dt>
              <dd className="text-ink-900 font-medium">{candidate.email}</dd>
            </div>
            {candidate.phone && (
              <div>
                <dt className="text-ink-300 text-xs">Téléphone</dt>
                <dd className="text-ink-900 font-medium">{candidate.phone}</dd>
              </div>
            )}
            {candidate.location && (
              <div>
                <dt className="text-ink-300 text-xs">Localisation</dt>
                <dd className="text-ink-900 font-medium">{candidate.location}</dd>
              </div>
            )}
            {candidate.yearsExperience != null && (
              <div>
                <dt className="text-ink-300 text-xs">Expérience</dt>
                <dd className="text-ink-900 font-medium">{candidate.yearsExperience} ans</dd>
              </div>
            )}
          </dl>

          {candidate.cvUrl && (
            <a
              href={candidate.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 text-sm font-semibold text-teal hover:text-teal-hover"
            >
              Voir le CV ↗
            </a>
          )}
        </Card>

        <Card className="p-6">
          <div className="font-heading font-extrabold text-base text-ink-900 mb-4">
            Candidatures sur des mandats
          </div>
          {candidate.applications.length === 0 ? (
            <p className="text-sm text-ink-500">Ce candidat n&apos;est proposé sur aucun mandat.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {candidate.applications.map((app) => (
                <Link
                  key={app.id}
                  href={`/cabinet/mandats/${app.mandat.id}`}
                  className="flex items-center justify-between p-3 rounded-[var(--radius-control)] hover:bg-neutral-bg"
                >
                  <div>
                    <div className="text-sm font-semibold text-ink-900">{app.mandat.title}</div>
                    <div className="text-xs text-ink-300">{app.mandat.reference}</div>
                  </div>
                  <Tag tone="neutral">{app.status}</Tag>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div>
        <Card className="p-6">
          <div className="text-xs text-ink-300">Source</div>
          <div className="text-sm font-semibold text-ink-900 mt-1">{SOURCE_LABEL[candidate.source]}</div>
        </Card>
      </div>
    </div>
  );
}
