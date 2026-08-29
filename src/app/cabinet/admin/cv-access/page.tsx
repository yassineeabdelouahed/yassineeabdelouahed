import { requireAdmin } from "@/lib/rbac";
import { listCvAccessRequestsForCabinet } from "@/server/actions/cvDatabase";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { CvAccessActions } from "@/components/cabinet/CvAccessActions";

export default async function CabinetCvAccessPage() {
  await requireAdmin();
  const requests = await listCvAccessRequestsForCabinet();

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900 mb-2">Accès CVthèque</h1>
      <p className="text-ink-500 mb-8">Demandes d&apos;accès à la base de candidats en attente de confirmation de paiement.</p>

      {requests.length === 0 ? (
        <Card className="p-8 text-center text-ink-500">Aucune demande en attente.</Card>
      ) : (
        <div className="flex flex-col gap-3">
          {requests.map((r) => (
            <Card key={r.id} className="p-5 flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="font-bold text-[16px] text-ink-900">{r.company.name}</div>
                <div className="text-sm text-ink-500 mt-0.5">Demandé par {r.requestedBy.name}</div>
                <div className="flex gap-2 mt-2">
                  <Tag tone="orange">{r.durationDays} jours</Tag>
                  <Tag tone="neutral">
                    {r.price.toLocaleString("fr-FR")} {r.currency} · {r.paymentMethod}
                  </Tag>
                </div>
              </div>
              <CvAccessActions requestId={r.id} />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
