import { requireRole } from "@/lib/rbac";
import { listMyJobAlerts } from "@/server/actions/jobAlerts";
import { AlertList } from "@/components/candidate/AlertList";
import { LinkButton } from "@/components/ui/Button";

export default async function CandidateAlertsPage() {
  await requireRole("CANDIDATE");
  const alerts = await listMyJobAlerts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-ink-900">Mes alertes</h1>
          <p className="text-ink-500 mt-2">
            Vous êtes notifié(e) dès qu&apos;une nouvelle offre correspond à vos critères.
          </p>
        </div>
        <LinkButton href="/results" variant="accent">
          Nouvelle recherche
        </LinkButton>
      </div>
      <AlertList alerts={alerts} />
    </div>
  );
}
