import { requireAdmin } from "@/lib/rbac";
import { getGlobalKpis } from "@/server/actions/kpis";
import { Card } from "@/components/ui/Card";

const MANDAT_STATUS_LABEL: Record<string, string> = {
  NEW: "Nouveau",
  SOURCING: "Sourcing",
  SHORTLIST_SENT: "Short-list envoyée",
  CLIENT_SELECTING: "Sélection client",
  INTERVIEWING: "Entretiens",
  OFFER: "Offre",
  WON: "Gagné",
  CANCELLED: "Annulé",
};
const MANDAT_STATUS_ORDER = Object.keys(MANDAT_STATUS_LABEL);

function StatTile({ label, value, sublabel }: { label: string; value: string | number; sublabel?: string }) {
  return (
    <Card className="p-5">
      <div className="text-xs font-semibold text-ink-500 uppercase tracking-wide">{label}</div>
      <div className="font-heading font-extrabold text-[28px] text-ink-900 mt-1.5">{value}</div>
      {sublabel && <div className="text-xs text-ink-300 mt-1">{sublabel}</div>}
    </Card>
  );
}

export default async function CabinetKpiPage() {
  await requireAdmin();
  const kpis = await getGlobalKpis();

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900 mb-2">Statistiques globales</h1>
      <p className="text-ink-500 mb-8">Vue d&apos;ensemble de l&apos;activité de la plateforme.</p>

      <div className="font-heading font-extrabold text-base text-ink-900 mb-3">Comptes</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatTile label="Entreprises" value={kpis.accounts.client} />
        <StatTile label="Candidats" value={kpis.accounts.candidate} />
        <StatTile label="Cabinet" value={kpis.accounts.cabinet} />
        <StatTile label="Nouveaux (30j)" value={kpis.accounts.newLast30d} />
      </div>

      <div className="font-heading font-extrabold text-base text-ink-900 mb-3">Offres et candidatures</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatTile label="Offres publiées" value={kpis.jobPostings.published} sublabel={`${kpis.jobPostings.total} au total`} />
        <StatTile label="Nouvelles offres (30j)" value={kpis.jobPostings.newLast30d} />
        <StatTile label="Candidatures" value={kpis.applications.total} sublabel={`${kpis.applications.newLast30d} sur 30j`} />
        <StatTile
          label="Taux de recrutement"
          value={`${kpis.applications.hireRate.toFixed(1)}%`}
          sublabel={`${kpis.applications.hired} recruté(e)s`}
        />
      </div>

      <div className="font-heading font-extrabold text-base text-ink-900 mb-3">Mandats et entretiens</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatTile label="Mandats" value={kpis.mandats.total} />
        <StatTile
          label="Taux de réussite"
          value={`${kpis.mandats.winRate.toFixed(1)}%`}
          sublabel={`${kpis.mandats.won} gagné(s)`}
        />
        <StatTile label="Entretiens planifiés" value={kpis.interviews.scheduled} />
        <StatTile label="Entretiens réalisés" value={kpis.interviews.completed} />
      </div>
      <Card className="p-5 mb-8">
        <div className="text-xs font-semibold text-ink-500 uppercase tracking-wide mb-3">Mandats par statut</div>
        <div className="flex flex-col gap-2">
          {MANDAT_STATUS_ORDER.map((status) => (
            <div key={status} className="flex items-center justify-between text-sm">
              <span className="text-ink-700">{MANDAT_STATUS_LABEL[status]}</span>
              <span className="font-semibold text-ink-900">{kpis.mandats.byStatus[status] ?? 0}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="font-heading font-extrabold text-base text-ink-900 mb-3">Revenu</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatTile label="Revenu total" value={`${kpis.revenue.total.toLocaleString("fr-FR")} MAD`} />
        <StatTile label="Sponsoring" value={`${(kpis.revenue.bySource.SPONSORSHIP ?? 0).toLocaleString("fr-FR")} MAD`} />
        <StatTile label="CVthèque" value={`${(kpis.revenue.bySource.CV_ACCESS ?? 0).toLocaleString("fr-FR")} MAD`} />
        <StatTile label="Formations" value={`${(kpis.revenue.bySource.ENROLLMENT ?? 0).toLocaleString("fr-FR")} MAD`} />
      </div>
    </div>
  );
}
