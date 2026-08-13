"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formalizeOfferAction, closeMandatWonAction } from "@/server/actions/mandats";

type ValidatedCandidate = { applicationId: string; name: string };

export function OfferFormalizationPanel({
  mandatId,
  validatedCandidates,
}: {
  mandatId: string;
  validatedCandidates: ValidatedCandidate[];
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleFormalize(applicationId: string) {
    setError(null);
    startTransition(async () => {
      const result = await formalizeOfferAction(mandatId, applicationId);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  if (validatedCandidates.length === 0) {
    return <p className="text-sm text-ink-500">En attente d&apos;un candidat validé par le client.</p>;
  }

  return (
    <div>
      <p className="text-sm text-ink-500 mb-3">
        Candidats validés par le client — formalisez une offre pour clôturer le mandat.
      </p>
      <div className="flex flex-col gap-2">
        {validatedCandidates.map((c) => (
          <Card key={c.applicationId} className="p-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-ink-900">{c.name}</span>
            <Button size="sm" onClick={() => handleFormalize(c.applicationId)} disabled={pending}>
              {pending ? "..." : "Formaliser une offre"}
            </Button>
          </Card>
        ))}
      </div>
      {error && <p className="text-sm text-danger-text mt-2">{error}</p>}
    </div>
  );
}

export function ConfirmHirePanel({ mandatId, candidateName }: { mandatId: string; candidateName: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleConfirm() {
    setError(null);
    startTransition(async () => {
      const result = await closeMandatWonAction(mandatId);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div>
      <p className="text-sm text-ink-700 mb-3">
        Offre en cours avec <strong>{candidateName}</strong>.
      </p>
      <Button variant="accent" size="sm" onClick={handleConfirm} disabled={pending}>
        {pending ? "..." : "Confirmer le recrutement et clôturer le mandat"}
      </Button>
      {error && <p className="text-sm text-danger-text mt-2">{error}</p>}
    </div>
  );
}
