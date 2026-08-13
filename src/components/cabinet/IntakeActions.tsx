"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { validateIntakeAction, cancelMandatAction } from "@/server/actions/mandats";

export function IntakeActions({ mandatId }: { mandatId: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleValidate() {
    setError(null);
    startTransition(async () => {
      const result = await validateIntakeAction(mandatId);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  function handleCancel() {
    setError(null);
    startTransition(async () => {
      const result = await cancelMandatAction(mandatId, "Annulé par le cabinet");
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div>
      <p className="text-sm text-ink-500 mb-3">
        Vérifiez que le besoin est complet (échangez avec le client ci-dessous si des informations
        manquent), puis validez pour lancer le sourcing.
      </p>
      <div className="flex gap-2">
        <Button onClick={handleValidate} variant="primary" size="sm" disabled={pending}>
          {pending ? "..." : "Valider et lancer le sourcing"}
        </Button>
        <Button onClick={handleCancel} variant="ghost" size="sm" disabled={pending}>
          Annuler le mandat
        </Button>
      </div>
      {error && <p className="text-sm text-danger-text mt-2">{error}</p>}
    </div>
  );
}
