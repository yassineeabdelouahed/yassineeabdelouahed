import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

function relativeDate(date: Date): string {
  const days = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (days <= 0) return "Aujourd'hui";
  if (days === 1) return "Il y a 1 jour";
  if (days < 7) return `Il y a ${days} jours`;
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "Il y a 1 semaine";
  return `Il y a ${weeks} semaines`;
}

function formatSalary(min: number | null, max: number | null): string | null {
  if (!min && !max) return null;
  const fmt = (n: number) => n.toLocaleString("fr-FR");
  if (min && max) return `${fmt(min)} – ${fmt(max)} MAD / mois`;
  return `${fmt((min ?? max)!)} MAD / mois`;
}

export type JobCardData = {
  id: string;
  title: string;
  city: string | null;
  contractType: string | null;
  remoteType: string | null;
  category: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  publishedAt: Date | null;
  createdAt: Date;
  company: { name: string };
};

export function JobCard({ job, showCategory = false }: { job: JobCardData; showCategory?: boolean }) {
  const salary = formatSalary(job.salaryMin, job.salaryMax);

  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="p-[22px] hover:border-teal hover:shadow-[var(--shadow-card-hover)] transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-bold text-[16px] text-ink-900">{job.title}</div>
            <div className="text-sm text-ink-500 mt-1">
              {job.company.name}
              {job.city ? ` · ${job.city}` : ""}
            </div>
          </div>
          <div className="text-xs text-ink-300 whitespace-nowrap">{relativeDate(job.publishedAt ?? job.createdAt)}</div>
        </div>
        <div className="flex gap-2 mt-3.5 flex-wrap">
          {job.contractType && <Tag tone="teal">{job.contractType}</Tag>}
          {job.remoteType && <Tag tone="orange">{job.remoteType}</Tag>}
          {showCategory && job.category && <Tag tone="neutral">{job.category}</Tag>}
        </div>
        {salary && <div className="text-[13px] text-ink-700 mt-3 font-semibold">{salary}</div>}
      </Card>
    </Link>
  );
}
