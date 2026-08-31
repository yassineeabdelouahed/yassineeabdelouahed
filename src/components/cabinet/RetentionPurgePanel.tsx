"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { runRetentionPurgeAction } from "@/server/actions/retention";
import type { RetentionPurgeResult } from "@/lib/retention";

export function RetentionPurgePanel() {
  const router = useRouter();
  const [lastRun, setLastRun] = useState<RetentionPurgeResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleRun() {
    setError(null);
    startTransition(async () => {
      const result = await runRetentionPurgeAction();
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setLastRun(result.results);
      router.refresh();
    });
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="font-heading font-extrabold text-base text-ink-900">Lancer la purge maintenant</div>
        <Button onClick={handleRun} disabled={pending}>
          {pending ? "Purge en cours..." : "Lancer la purge"}
        </Button>
      </div>
      <p className="text-sm text-ink-500">
        Applique immédiatement les règles ci-dessus. En production, ce même traitement est déclenchable
        automatiquement via <code className="text-xs bg-ink-50 px-1 py-0.5 rounded">POST /api/cron/retention-purge</code>{" "}
        (protégé par la variable d&apos;environnement <code className="text-xs bg-ink-50 px-1 py-0.5 rounded">RETENTION_PURGE_SECRET</code>),
        à brancher sur le planificateur de l&apos;hébergeur (Vercel Cron, tâche planifiée, etc.).
      </p>
      {error && <p className="text-sm text-danger-text mt-3">{error}</p>}
      {lastRun && (
        <div className="mt-4 flex flex-col gap-1.5">
          {lastRun.map((r) => (
            <div key={r.key} className="flex items-center justify-between text-sm">
              <span className="text-ink-700">{r.label}</span>
              <span className="font-semibold text-ink-900">{r.count} ligne(s) traitée(s)</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
