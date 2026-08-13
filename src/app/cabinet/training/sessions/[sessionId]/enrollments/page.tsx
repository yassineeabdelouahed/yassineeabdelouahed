import { notFound } from "next/navigation";
import { getSessionForCabinet, listEnrollmentsForSession } from "@/server/actions/training";
import { DOMAIN_LABEL } from "@/lib/validations/training";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { EnrollmentActions } from "@/components/cabinet/EnrollmentActions";

const PAYMENT_METHOD_LABEL: Record<string, string> = {
  VIREMENT: "Virement bancaire",
  ESPECES: "Espèces au cabinet",
  AUTRE: "Autre",
};

const STATUS_TONE: Record<string, "success" | "warning" | "danger"> = {
  CONFIRMED: "success",
  PENDING: "warning",
  CANCELLED: "danger",
};

const STATUS_LABEL: Record<string, string> = {
  CONFIRMED: "Confirmée",
  PENDING: "En attente",
  CANCELLED: "Annulée",
};

export default async function SessionEnrollmentsPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  const session = await getSessionForCabinet(sessionId);
  if (!session) notFound();

  const enrollments = await listEnrollmentsForSession(sessionId);

  return (
    <div>
      <Tag tone="teal">{DOMAIN_LABEL[session.course.domain]}</Tag>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900 mt-2">{session.course.title}</h1>
      <p className="text-ink-500 mt-1">
        Session du {session.startDate.toLocaleDateString("fr-FR")} · {enrollments.length}/{session.capacity}{" "}
        inscrit(e)s
      </p>

      <div className="flex flex-col gap-3 mt-8">
        {enrollments.length === 0 ? (
          <Card className="p-8 text-center text-ink-500">Aucune inscription pour l&apos;instant.</Card>
        ) : (
          enrollments.map((e) => (
            <Card key={e.id} className="p-5 flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="text-sm font-semibold text-ink-900">{e.user.name}</div>
                <div className="text-xs text-ink-500 mt-0.5">
                  {e.user.email} · {PAYMENT_METHOD_LABEL[e.paymentMethod]} · {e.amount.toLocaleString("fr-FR")}{" "}
                  {e.currency}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Tag tone={STATUS_TONE[e.paymentStatus]}>{STATUS_LABEL[e.paymentStatus]}</Tag>
                {e.paymentStatus === "PENDING" && <EnrollmentActions enrollmentId={e.id} />}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
