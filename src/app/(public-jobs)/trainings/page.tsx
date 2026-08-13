import Link from "next/link";
import { listPublishedCourses } from "@/server/actions/training";
import { DOMAINS, DOMAIN_LABEL } from "@/lib/validations/training";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import type { TrainingDomain } from "@/generated/prisma/enums";

export default async function TrainingsPage({
  searchParams,
}: {
  searchParams: Promise<{ domain?: string }>;
}) {
  const { domain } = await searchParams;
  const validDomain = DOMAINS.includes(domain as TrainingDomain) ? (domain as TrainingDomain) : undefined;
  const courses = await listPublishedCourses(validDomain);

  return (
    <div className="max-w-[1180px] mx-auto px-8 py-12">
      <h1 className="font-heading font-extrabold text-[32px] text-ink-900">Nos formations</h1>
      <p className="text-ink-500 mt-2 max-w-xl">
        Marketing digital, finance et RH — des formations professionnelles animées par des experts du terrain.
      </p>

      <div className="flex gap-2.5 mt-6 flex-wrap">
        <Link
          href="/trainings"
          className={`text-[13px] font-semibold px-4 py-1.5 rounded-full border ${
            !validDomain ? "bg-teal text-white border-teal" : "border-border text-ink-700"
          }`}
        >
          Toutes
        </Link>
        {DOMAINS.map((d) => (
          <Link
            key={d}
            href={`/trainings?domain=${d}`}
            className={`text-[13px] font-semibold px-4 py-1.5 rounded-full border ${
              validDomain === d ? "bg-teal text-white border-teal" : "border-border text-ink-700"
            }`}
          >
            {DOMAIN_LABEL[d]}
          </Link>
        ))}
      </div>

      {courses.length === 0 ? (
        <p className="text-ink-500 mt-10">Aucune formation disponible pour l&apos;instant.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 mt-8">
          {courses.map((course) => (
            <Link key={course.id} href={`/trainings/${course.slug}`}>
              <Card className="p-6 hover:border-teal hover:shadow-[var(--shadow-card-hover)] transition-shadow h-full">
                <Tag tone="teal">{DOMAIN_LABEL[course.domain]}</Tag>
                <div className="font-bold text-[17px] text-ink-900 mt-3">{course.title}</div>
                <p className="text-sm text-ink-500 mt-2 line-clamp-3">{course.description}</p>
                <div className="text-xs text-ink-300 mt-4">
                  {course.sessions.length === 0
                    ? "Aucune session programmée"
                    : `${course.sessions.length} session(s) disponible(s)`}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
