import Link from "next/link";
import { listAllCoursesForCabinet } from "@/server/actions/training";
import { DOMAIN_LABEL } from "@/lib/validations/training";
import { requireAdmin } from "@/lib/rbac";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { CourseForm } from "@/components/cabinet/CourseForm";
import { SessionForm } from "@/components/cabinet/SessionForm";

export default async function CabinetTrainingCoursesPage() {
  await requireAdmin();
  const courses = await listAllCoursesForCabinet();

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900 mb-6">Formations</h1>

      <CourseForm />

      <div className="flex flex-col gap-4 mt-6">
        {courses.map((course) => (
          <Card key={course.id} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Tag tone="teal">{DOMAIN_LABEL[course.domain]}</Tag>
                <div className="font-bold text-[16px] text-ink-900 mt-2">{course.title}</div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              {course.sessions.length === 0 && (
                <p className="text-sm text-ink-500">Aucune session pour l&apos;instant.</p>
              )}
              {course.sessions.map((session) => (
                <Link
                  key={session.id}
                  href={`/cabinet/training/sessions/${session.id}/enrollments`}
                  className="flex items-center justify-between p-3 rounded-[var(--radius-control)] hover:bg-neutral-bg"
                >
                  <span className="text-sm text-ink-700">
                    {session.startDate.toLocaleDateString("fr-FR")} · {session.price.toLocaleString("fr-FR")}{" "}
                    {session.currency}
                  </span>
                  <Tag tone="neutral">
                    {session.enrollments.length}/{session.capacity} inscrit(e)s
                  </Tag>
                </Link>
              ))}
            </div>

            <div className="mt-3">
              <SessionForm courseId={course.id} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
