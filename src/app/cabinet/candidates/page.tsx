import Link from "next/link";
import { listCandidates } from "@/server/actions/candidates";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";

export default async function CabinetCandidatesPage() {
  const candidates = await listCandidates();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading font-extrabold text-2xl text-ink-900">Candidats</h1>
        <div className="flex items-center gap-3">
          <a href="/api/export/candidates" className="text-sm font-semibold text-teal hover:text-teal-hover">
            Exporter en CSV
          </a>
          <LinkButton href="/cabinet/candidates/new" variant="accent">
            Nouveau candidat
          </LinkButton>
        </div>
      </div>

      {candidates.length === 0 ? (
        <Card className="p-8 text-center text-ink-500">Aucun candidat pour l&apos;instant.</Card>
      ) : (
        <div className="flex flex-col gap-3">
          {candidates.map((c) => (
            <Link key={c.id} href={`/cabinet/candidates/${c.id}`}>
              <Card className="p-5 hover:border-teal hover:shadow-[var(--shadow-card-hover)] transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[16px] text-ink-900">
                      {c.firstName} {c.lastName}
                    </div>
                    <div className="text-sm text-ink-500 mt-0.5">
                      {c.headline || c.email}
                      {c.location ? ` · ${c.location}` : ""}
                    </div>
                  </div>
                  {c.yearsExperience != null && (
                    <span className="text-xs text-ink-300">{c.yearsExperience} ans d&apos;expérience</span>
                  )}
                </div>
                {c.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {c.skills.slice(0, 6).map((skill) => (
                      <Tag key={skill} tone="neutral">
                        {skill}
                      </Tag>
                    ))}
                  </div>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
