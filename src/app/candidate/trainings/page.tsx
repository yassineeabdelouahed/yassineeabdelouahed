import Link from "next/link";
import { requireRole } from "@/lib/rbac";
import { listMyEnrollments } from "@/server/actions/training";
import { DOMAIN_LABEL } from "@/lib/validations/training";
import { getInvoiceMap } from "@/lib/invoice";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { LinkButton } from "@/components/ui/Button";

const STATUS_TONE: Record<string, "success" | "warning" | "danger"> = {
  CONFIRMED: "success",
  PENDING: "warning",
  CANCELLED: "danger",
};

const STATUS_LABEL: Record<string, string> = {
  CONFIRMED: "Confirmée",
  PENDING: "En attente de paiement",
  CANCELLED: "Annulée",
};

export default async function CandidateTrainingsPage() {
  await requireRole("CANDIDATE");
  const enrollments = await listMyEnrollments();
  const confirmedIds = enrollments.filter((e) => e.paymentStatus === "CONFIRMED").map((e) => e.id);
  const invoiceMap = await getInvoiceMap("ENROLLMENT", confirmedIds);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading font-extrabold text-2xl text-ink-900">Mes formations</h1>
        <LinkButton href="/trainings" variant="accent">
          Voir le catalogue
        </LinkButton>
      </div>

      {enrollments.length === 0 ? (
        <Card className="p-8 text-center text-ink-500">Vous n&apos;êtes inscrit(e) à aucune formation.</Card>
      ) : (
        <div className="flex flex-col gap-3">
          {enrollments.map((e) => (
            <Card key={e.id} className="p-5 flex items-center justify-between">
              <Link href={`/trainings/${e.session.course.slug}`} className="hover:opacity-80">
                <Tag tone="teal">{DOMAIN_LABEL[e.session.course.domain]}</Tag>
                <div className="font-bold text-[16px] text-ink-900 mt-2">{e.session.course.title}</div>
                <div className="text-sm text-ink-500 mt-0.5">
                  {e.session.startDate.toLocaleDateString("fr-FR")}
                </div>
              </Link>
              <div className="flex items-center gap-3">
                {invoiceMap[e.id] && (
                  <a
                    href={`/api/invoices/${invoiceMap[e.id].id}`}
                    className="text-sm text-teal font-semibold hover:underline"
                  >
                    Reçu
                  </a>
                )}
                <Tag tone={STATUS_TONE[e.paymentStatus]}>{STATUS_LABEL[e.paymentStatus]}</Tag>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
