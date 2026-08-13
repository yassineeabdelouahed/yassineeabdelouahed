"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { selectShortlistCandidatesAction } from "@/server/actions/mandats";

type Application = {
  id: string;
  prequalNotes: string | null;
  strengths: string | null;
  watchPoints: string | null;
  candidate: { firstName: string; lastName: string; headline: string | null };
};

export function ShortlistSelection({ mandatId, applications }: { mandatId: string; applications: Application[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleSubmit() {
    setError(null);
    startTransition(async () => {
      const result = await selectShortlistCandidatesAction(mandatId, Array.from(selected));
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div>
      <p className="text-sm text-ink-500 mb-4">
        Sélectionnez les candidats que vous souhaitez rencontrer en entretien.
      </p>
      <div className="flex flex-col gap-3 mb-4">
        {applications.map((app) => (
          <label key={app.id}>
            <Card
              className={`p-4 cursor-pointer transition-colors ${
                selected.has(app.id) ? "border-teal bg-teal-tint" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={selected.has(app.id)}
                  onChange={() => toggle(app.id)}
                  className="mt-1"
                />
                <div>
                  <div className="text-sm font-semibold text-ink-900">
                    {app.candidate.firstName} {app.candidate.lastName}
                  </div>
                  {app.candidate.headline && <div className="text-xs text-ink-500">{app.candidate.headline}</div>}
                  {app.prequalNotes && <p className="text-xs text-ink-700 mt-2">{app.prequalNotes}</p>}
                  <div className="flex gap-4 mt-1">
                    {app.strengths && <span className="text-xs text-success-text">✓ {app.strengths}</span>}
                    {app.watchPoints && (
                      <span className="text-xs text-warning-text">⚠ {app.watchPoints}</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </label>
        ))}
      </div>

      {error && <p className="text-sm text-danger-text mb-3">{error}</p>}

      <Button variant="accent" size="sm" onClick={handleSubmit} disabled={pending || selected.size === 0}>
        {pending ? "..." : `Confirmer ma sélection (${selected.size})`}
      </Button>
    </div>
  );
}
