import { requireAdmin } from "@/lib/rbac";
import { listSponsorshipsForCabinet } from "@/server/actions/sponsorship";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { SponsorshipActions } from "@/components/cabinet/SponsorshipActions";

export default async function CabinetJobsPage() {
  await requireAdmin();
  const sponsorships = await listSponsorshipsForCabinet();

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900 mb-2">Offres sponsorisées</h1>
      <p className="text-ink-500 mb-8">Demandes de sponsorisation en attente de confirmation de paiement.</p>

      {sponsorships.length === 0 ? (
        <Card className="p-8 text-center text-ink-500">Aucune demande en attente.</Card>
      ) : (
        <div className="flex flex-col gap-3">
          {sponsorships.map((s) => (
            <Card key={s.id} className="p-5 flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="font-bold text-[16px] text-ink-900">{s.jobPosting.title}</div>
                <div className="text-sm text-ink-500 mt-0.5">
                  {s.jobPosting.company.name} · Demandé par {s.requestedBy.name}
                </div>
                <div className="flex gap-2 mt-2">
                  <Tag tone="orange">{s.durationDays} jours</Tag>
                  <Tag tone="neutral">
                    {s.price.toLocaleString("fr-FR")} {s.currency} · {s.paymentMethod}
                  </Tag>
                </div>
              </div>
              <SponsorshipActions sponsorshipId={s.id} />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
