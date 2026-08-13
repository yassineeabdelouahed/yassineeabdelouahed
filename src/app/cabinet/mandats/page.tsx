import { listMandatsForCabinet } from "@/server/actions/mandats";
import { MandatListItem } from "@/components/mandats/MandatListItem";
import { Card } from "@/components/ui/Card";

export default async function CabinetMandatsPage() {
  const mandats = await listMandatsForCabinet();

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900 mb-8">Mandats</h1>

      {mandats.length === 0 ? (
        <Card className="p-8 text-center text-ink-500">Aucun mandat pour l&apos;instant.</Card>
      ) : (
        <div className="flex flex-col gap-3">
          {mandats.map((m) => (
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
