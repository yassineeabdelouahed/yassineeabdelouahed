import { requireRole } from "@/lib/rbac";
import { listMandatsForClient } from "@/server/actions/mandats";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { MandatListItem } from "@/components/mandats/MandatListItem";

export default async function ClientDashboardPage() {
  const user = await requireRole("CLIENT");
  const mandats = await listMandatsForClient();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-ink-900">
            Bienvenue, {user.name}
          </h1>
          <p className="text-ink-500 mt-2">
            Déposez une demande de recrutement et suivez son avancement à travers les 8 étapes du
            processus Talentis Consult.
          </p>
        </div>
        <LinkButton href="/client/mandats/new" variant="accent">
          Déposer une demande
        </LinkButton>
      </div>

      {mandats.length === 0 ? (
        <Card className="mt-8 p-8 text-center">
          <p className="text-ink-700">Vous n&apos;avez pas encore de mandat en cours.</p>
        </Card>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {mandats.slice(0, 5).map((m) => (
            <MandatListItem
              key={m.id}
              href={`/client/mandats/${m.id}`}
              reference={m.reference}
              title={m.title}
              status={m.status}
              urgency={m.urgency}
              createdAt={m.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
