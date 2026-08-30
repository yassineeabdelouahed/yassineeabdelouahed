"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Field";
import { advanceProspectAction } from "@/server/actions/prospects";
import { STAGE_LABEL } from "@/components/prospects/ProspectStageTag";
import type { ProspectStage } from "@/generated/prisma/enums";

export function ProspectStageActions({ prospectId, nextStage }: { prospectId: string; nextStage: ProspectStage | null }) {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function advance(stage: ProspectStage) {
    setError(null);
    const formData = new FormData();
    formData.set("note", note);
    startTransition(async () => {
      const result = await advanceProspectAction(prospectId, stage, formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setNote("");
      router.refresh();
    });
  }

  return (
    <div>
      <Textarea
        rows={2}
        placeholder="Note sur cette étape (optionnel)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="mb-3"
      />
      <div className="flex gap-2 flex-wrap">
        {nextStage && (
          <Button onClick={() => advance(nextStage)} size="sm" disabled={pending}>
            {pending ? "..." : `Faire avancer : ${STAGE_LABEL[nextStage]}`}
          </Button>
        )}
        <Button onClick={() => advance("LOST")} variant="ghost" size="sm" disabled={pending}>
          Marquer comme perdu
        </Button>
      </div>
      {error && <p className="text-sm text-danger-text mt-2">{error}</p>}
    </div>
  );
}
