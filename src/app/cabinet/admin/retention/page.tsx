import { requireAdmin } from "@/lib/rbac";
import { listRetentionHistory } from "@/server/actions/retention";
import { RETENTION_RULES, type RetentionPurgeResult } from "@/lib/retention";
import { Card } from "@/components/ui/Card";
import { RetentionPurgePanel } from "@/components/cabinet/RetentionPurgePanel";

export default async function RetentionPage() {
  await requireAdmin();
  const history = await listRetentionHistory();

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900 mb-2">Rétention des données</h1>
      <p className="text-ink-500 mb-8 max-w-2xl">
        Durées de conservation par type de donnée et purge automatique associée, conformément à la politique de
        confidentialité de Talentis Connect.
      </p>

      <Card className="p-6 mb-6">
        <div className="font-heading font-extrabold text-base text-ink-900 mb-3">Politique</div>
        <div className="table-wrap overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-500 border-b border-border">
                <th className="py-2 pr-4">Donnée</th>
                <th className="py-2 pr-4">Durée de conservation</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {RETENTION_RULES.map((rule) => (
                <tr key={rule.key} className="border-b border-border last:border-0">
                  <td className="py-2 pr-4 text-ink-900 font-medium">{rule.label}</td>
                  <td className="py-2 pr-4 text-ink-700">{rule.retention}</td>
                  <td className="py-2 text-ink-700">{rule.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mb-6">
        <RetentionPurgePanel />
      </div>

      <Card className="p-6">
        <div className="font-heading font-extrabold text-base text-ink-900 mb-3">Historique des purges</div>
        {history.length === 0 ? (
          <p className="text-sm text-ink-500">Aucune purge exécutée pour l&apos;instant.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {history.map((log) => (
              <div key={log.id} className="text-sm border-b border-border last:border-0 pb-3 last:pb-0">
                <div className="flex items-center justify-between text-ink-500 mb-1">
                  <span>{log.ranAt.toLocaleString("fr-FR")}</span>
                  <span>Déclenché par : {log.triggeredBy}</span>
                </div>
                <div className="text-ink-700">
                  {(log.summary as unknown as RetentionPurgeResult[])
                    .map((r) => `${r.label} : ${r.count}`)
                    .join(" · ")}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
