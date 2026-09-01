import Link from "next/link";
import { requireRole } from "@/lib/rbac";
import { listProspects, listClosedProspects } from "@/server/actions/prospects";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { LinkButton } from "@/components/ui/Button";
import { ProspectStageTag } from "@/components/prospects/ProspectStageTag";

export default async function CabinetProspectsPage() {
  await requireRole("CABINET");
  const [prospects, closedProspects] = await Promise.all([listProspects(), listClosedProspects()]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-ink-900">Prospection commerciale</h1>
          <p className="text-ink-500 mt-2">Entreprises en cours de prospection, avant de devenir clientes.</p>
        </div>
        <div className="flex gap-2">
          <LinkButton href="/cabinet/prospects/search" variant="secondary">
            Rechercher des prospects
          </LinkButton>
          <LinkButton href="/cabinet/prospects/new" variant="accent">
            Nouveau prospect
          </LinkButton>
        </div>
      </div>

      {prospects.length === 0 ? (
        <Card className="p-8 text-center text-ink-500">Aucun prospect en cours.</Card>
      ) : (
        <div className="flex flex-col gap-3">
          {prospects.map((p) => (
            <Link key={p.id} href={`/cabinet/prospects/${p.id}`}>
              <Card className="p-5 hover:border-teal hover:shadow-[var(--shadow-card-hover)] transition-shadow flex items-center justify-between">
                <div>
                  <div className="font-bold text-[16px] text-ink-900">{p.companyName}</div>
                  <div className="text-sm text-ink-500 mt-0.5">
                    {p.sector}
                    {p.sector && p.city ? " · " : ""}
                    {p.city}
                    {p.contactName ? ` · ${p.contactName}` : ""}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {p.urgency === "HIGH" && <Tag tone="danger">Urgent</Tag>}
                  <ProspectStageTag stage={p.stage} />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {closedProspects.length > 0 && (
        <>
          <div className="font-heading font-extrabold text-base text-ink-900 mt-10 mb-3">
            Clôturés récemment
          </div>
          <div className="flex flex-col gap-2">
            {closedProspects.map((p) => (
              <Link key={p.id} href={`/cabinet/prospects/${p.id}`}>
                <Card className="p-4 hover:border-teal transition-colors flex items-center justify-between">
                  <span className="text-sm text-ink-700">{p.companyName}</span>
                  <ProspectStageTag stage={p.stage} />
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
