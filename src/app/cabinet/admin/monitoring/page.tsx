import { requireAdmin } from "@/lib/rbac";
import { getMonitoringOverview } from "@/server/actions/monitoring";
import { Card } from "@/components/ui/Card";
import { Pill, Tag } from "@/components/ui/Tag";

export default async function MonitoringPage() {
  await requireAdmin();
  const { health, recentErrors, errorCountLast24h } = await getMonitoringOverview();

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900 mb-2">Supervision</h1>
      <p className="text-ink-500 mb-8 max-w-2xl">
        État de la plateforme et journal des erreurs serveur récentes. Le point de contrôle{" "}
        <code className="text-xs bg-ink-50 px-1 py-0.5 rounded">GET /api/health</code> est public et peut être
        branché sur un service de supervision externe (UptimeRobot, le health check de l&apos;hébergeur, etc.).
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="p-5">
          <div className="text-xs font-semibold text-ink-500 uppercase tracking-wide mb-2">État général</div>
          <Pill tone={health.status === "ok" ? "success" : "danger"}>
            {health.status === "ok" ? "Opérationnel" : "Dégradé"}
          </Pill>
        </Card>
        <Card className="p-5">
          <div className="text-xs font-semibold text-ink-500 uppercase tracking-wide mb-2">Base de données</div>
          <Pill tone={health.db === "ok" ? "success" : "danger"}>{health.db === "ok" ? "Connectée" : "Injoignable"}</Pill>
        </Card>
        <Card className="p-5">
          <div className="text-xs font-semibold text-ink-500 uppercase tracking-wide mb-2">Erreurs (24h)</div>
          <div className="font-heading font-extrabold text-[28px] text-ink-900">{errorCountLast24h}</div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="font-heading font-extrabold text-base text-ink-900 mb-3">Erreurs récentes</div>
        {recentErrors.length === 0 ? (
          <p className="text-sm text-ink-500">Aucune erreur enregistrée.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {recentErrors.map((e) => (
              <div key={e.id} className="text-sm border-b border-border last:border-0 pb-3 last:pb-0">
                <div className="flex items-center gap-2 text-ink-500 mb-1">
                  <span>{e.createdAt.toLocaleString("fr-FR")}</span>
                  {e.method && <Tag tone="neutral">{e.method}</Tag>}
                  {e.routePath && <span className="text-ink-300">{e.routePath}</span>}
                </div>
                <div className="text-ink-900 font-mono text-xs break-all">{e.message}</div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
