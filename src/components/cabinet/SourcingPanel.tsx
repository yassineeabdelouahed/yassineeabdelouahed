"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FormField, Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  addCandidateToMandateAction,
  removeCandidateFromMandateAction,
} from "@/server/actions/candidates";
import { publishShortlistAction } from "@/server/actions/mandats";

type CandidateOption = { id: string; firstName: string; lastName: string; email: string };
type ProposedApplication = {
  id: string;
  candidate: { id: string; firstName: string; lastName: string };
  prequalNotes: string | null;
};

export function SourcingPanel({
  mandatId,
  candidates,
  proposed,
}: {
  mandatId: string;
  candidates: CandidateOption[];
  proposed: ProposedApplication[];
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await addCandidateToMandateAction(mandatId, formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      (e.target as HTMLFormElement).reset();
      router.refresh();
    });
  }

  function handleRemove(applicationId: string) {
    startTransition(async () => {
      await removeCandidateFromMandateAction(applicationId);
      router.refresh();
    });
  }

  function handlePublish() {
    setError(null);
    startTransition(async () => {
      const result = await publishShortlistAction(mandatId);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div>
      <form onSubmit={handleAdd} className="mb-6">
        <FormField label="Candidat" htmlFor="candidateId">
          <Select id="candidateId" name="candidateId" required defaultValue="">
            <option value="" disabled>
              Sélectionner un candidat...
            </option>
            {candidates.map((c) => (
              <option key={c.id} value={c.id}>
                {c.firstName} {c.lastName} — {c.email}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField label="Notes de pré-qualification" htmlFor="prequalNotes">
          <Textarea id="prequalNotes" name="prequalNotes" rows={2} />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Points forts" htmlFor="strengths">
            <Input id="strengths" name="strengths" />
          </FormField>
          <FormField label="Points de vigilance" htmlFor="watchPoints">
            <Input id="watchPoints" name="watchPoints" />
          </FormField>
        </div>
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? "..." : "Proposer ce candidat"}
        </Button>
      </form>

      {error && <p className="text-sm text-danger-text mb-4">{error}</p>}

      <div className="flex flex-col gap-2 mb-4">
        {proposed.length === 0 && (
          <p className="text-sm text-ink-500">Aucun candidat proposé pour l&apos;instant.</p>
        )}
        {proposed.map((app) => (
          <Card key={app.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-ink-900">
                {app.candidate.firstName} {app.candidate.lastName}
              </div>
              {app.prequalNotes && <div className="text-xs text-ink-500 mt-1">{app.prequalNotes}</div>}
            </div>
            <button
              type="button"
              onClick={() => handleRemove(app.id)}
              disabled={pending}
              className="text-xs font-semibold text-danger-text hover:underline cursor-pointer"
            >
              Retirer
            </button>
          </Card>
        ))}
      </div>

      {proposed.length > 0 && (
        <Button onClick={handlePublish} variant="accent" size="sm" disabled={pending}>
          {pending ? "..." : "Publier la short-list au client"}
        </Button>
      )}
    </div>
  );
}
