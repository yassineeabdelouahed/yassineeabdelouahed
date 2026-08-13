import { listMandatsForClient } from "@/server/actions/mandats";
import { MandatListItem } from "@/components/mandats/MandatListItem";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default async function ClientMandatsPage() {
  const mandats = await listMandatsForClient();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading font-extrabold text-2xl text-ink-900">Mes mandats</h1>
        <LinkButton href="/client/mandats/new" variant="accent">
          Déposer une demande
        </LinkButton>
      </div>

      {mandats.length === 0 ? (
        <Card className="p-8 text-center text-ink-500">Aucun mandat pour l&apos;instant.</Card>
      ) : (
        <div className="flex flex-col gap-3">
          {mandats.map((m) => (
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
