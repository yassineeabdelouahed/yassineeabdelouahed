"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { confirmEnrollmentAction, cancelEnrollmentAction } from "@/server/actions/training";

export function EnrollmentActions({ enrollmentId }: { enrollmentId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      await confirmEnrollmentAction(enrollmentId);
      router.refresh();
    });
  }

  function handleCancel() {
    startTransition(async () => {
      await cancelEnrollmentAction(enrollmentId);
      router.refresh();
    });
  }

  return (
    <div className="flex gap-2">
      <Button size="sm" onClick={handleConfirm} disabled={pending}>
        {pending ? "..." : "Confirmer le paiement"}
      </Button>
      <Button size="sm" variant="ghost" onClick={handleCancel} disabled={pending}>
        Annuler
      </Button>
    </div>
  );
}
