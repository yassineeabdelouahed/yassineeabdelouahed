"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { applyToJobAction } from "@/server/actions/jobs";

export function ApplyButton({ jobId, alreadyApplied }: { jobId: string; alreadyApplied: boolean }) {
  const router = useRouter();
  const [applied, setApplied] = useState(alreadyApplied);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  if (applied) {
    return <Tag tone="success">✓ Candidature envoyée</Tag>;
  }

  function handleApply() {
    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      const result = await applyToJobAction(jobId, formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setApplied(true);
      router.refresh();
    });
  }

  return (
    <div className="text-right">
      <Button variant="accent" onClick={handleApply} disabled={pending}>
        {pending ? "..." : "Postuler"}
      </Button>
      {error && <p className="text-xs text-danger-text mt-2">{error}</p>}
    </div>
  );
}
