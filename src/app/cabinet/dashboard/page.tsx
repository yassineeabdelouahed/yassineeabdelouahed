import { requireRole } from "@/lib/rbac";
import { listMandatsForCabinet } from "@/server/actions/mandats";
import { Card } from "@/components/ui/Card";
import { MandatListItem } from "@/components/mandats/MandatListItem";

export default async function CabinetDashboardPage() {
  const user = await requireRole("CABINET");
  const mandats = await listMandatsForCabinet();
  const newCount = mandats.filter((m) => m.status === "NEW").length;

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900">Bonjour, {user.name}</h1>
      <p className="text-ink-500 mt-2">
        {newCount > 0
          ? `${newCount} mandat${newCount > 1 ? "s" : ""} en attente de validation.`
          : "Vue d'ensemble des mandats en cours."}
      </p>

      {mandats.length === 0 ? (
        <Card className="mt-8 p-8 text-center">
          <p className="text-ink-700">Aucun mandat pour l&apos;instant.</p>
        </Card>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {mandats.slice(0, 8).map((m) => (
            <MandatListItem
              key={m.id}
              href={`/cabinet/mandats/${m.id}`}
              reference={m.reference}
              title={m.title}
              status={m.status}
              urgency={m.urgency}
              companyName={m.company.name}
              createdAt={m.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
