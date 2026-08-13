import { requireRole } from "@/lib/rbac";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";

export default async function ClientDashboardPage() {
  const user = await requireRole("CLIENT");

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900">
        Bienvenue, {user.name}
      </h1>
      <p className="text-ink-500 mt-2">
        Déposez une demande de recrutement et suivez son avancement à travers les 8 étapes du processus Talentis Consult.
      </p>

      <Card className="mt-8 p-8 text-center">
        <p className="text-ink-700">Vous n&apos;avez pas encore de mandat en cours.</p>
        <LinkButton href="/client/mandats/new" variant="accent" className="mt-4 inline-flex">
          Déposer une demande de recrutement
        </LinkButton>
      </Card>
    </div>
  );
}
