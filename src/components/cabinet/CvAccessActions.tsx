"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { confirmCvAccessAction, cancelCvAccessAction } from "@/server/actions/cvDatabase";

export function CvAccessActions({ requestId }: { requestId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      await confirmCvAccessAction(requestId);
      router.refresh();
    });
  }

  function handleCancel() {
    startTransition(async () => {
      await cancelCvAccessAction(requestId);
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
