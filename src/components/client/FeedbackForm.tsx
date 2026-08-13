"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Textarea, Select, FormField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { submitFeedbackAction } from "@/server/actions/interviews";

export function FeedbackForm({ interviewId }: { interviewId: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    formData.set("interviewId", interviewId);

    startTransition(async () => {
      const result = await submitFeedbackAction(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <FormField label="Votre retour" htmlFor={`outcome-${interviewId}`}>
        <Select id={`outcome-${interviewId}`} name="outcome" defaultValue="VALIDATED">
          <option value="VALIDATED">Validé</option>
          <option value="RESERVED">Réserve</option>
          <option value="REFUSED">Refusé</option>
        </Select>
      </FormField>
      <FormField label="Commentaire (optionnel)" htmlFor={`comment-${interviewId}`}>
        <Textarea id={`comment-${interviewId}`} name="comment" rows={2} />
      </FormField>
      {error && <p className="text-sm text-danger-text mb-2">{error}</p>}
      <Button type="submit" size="sm" disabled={pending}>
        {pending ? "..." : "Envoyer mon retour"}
      </Button>
    </form>
  );
}
