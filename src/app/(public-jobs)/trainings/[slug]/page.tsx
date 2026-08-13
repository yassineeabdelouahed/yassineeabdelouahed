import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/server/actions/training";
import { getSessionUser } from "@/lib/rbac";
import { DOMAIN_LABEL } from "@/lib/validations/training";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { EnrollForm } from "@/components/training/EnrollForm";

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const user = await getSessionUser();

  return (
    <div className="max-w-[820px] mx-auto px-8 py-12">
      <Tag tone="teal">{DOMAIN_LABEL[course.domain]}</Tag>
      <h1 className="font-heading font-extrabold text-[28px] text-ink-900 mt-3">{course.title}</h1>
      {course.durationHours && <p className="text-sm text-ink-500 mt-1">{course.durationHours}h de formation</p>}
      <p className="text-[15px] leading-relaxed text-ink-700 mt-5">{course.description}</p>

      <div className="font-heading font-extrabold text-lg text-ink-900 mt-9 mb-4">Sessions disponibles</div>

      {course.sessions.length === 0 ? (
        <p className="text-ink-500">Aucune session programmée pour l&apos;instant.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {course.sessions.map((session) => {
            const isFull = session.status !== "OPEN" || session.enrollments.length >= session.capacity;
            const alreadyEnrolled = user ? session.enrollments.some((e) => e.userId === user.id) : false;

            return (
              <Card key={session.id} className="p-5 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="text-sm font-semibold text-ink-900">
                    {session.startDate.toLocaleDateString("fr-FR", { dateStyle: "long" })}
                    {session.endDate ? ` → ${session.endDate.toLocaleDateString("fr-FR", { dateStyle: "long" })}` : ""}
                  </div>
                  <div className="text-xs text-ink-500 mt-1">
                    {session.location ?? "Lieu à confirmer"}
                    {session.instructorName ? ` · Animée par ${session.instructorName}` : ""}
                  </div>
                  <div className="text-sm font-bold text-ink-700 mt-1.5">
                    {session.price.toLocaleString("fr-FR")} {session.currency}
                  </div>
                </div>
                <EnrollForm
                  sessionId={session.id}
                  isAuthenticated={!!user}
                  alreadyEnrolled={alreadyEnrolled}
                  isFull={isFull}
                />
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
