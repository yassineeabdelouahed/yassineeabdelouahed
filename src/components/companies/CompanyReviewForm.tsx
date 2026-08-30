"use client";

import { useState, useTransition } from "react";
import { FormField, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { submitCompanyReviewAction } from "@/server/actions/companyReviews";

export function CompanyReviewForm({ companyId, onSubmitted }: { companyId: string; onSubmitted: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await submitCompanyReviewAction(companyId, formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      onSubmitted();
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField label="Note" htmlFor="rating">
        <Select id="rating" name="rating" defaultValue="5" className="!w-auto">
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {"★".repeat(n)}
              {"☆".repeat(5 - n)}
            </option>
          ))}
        </Select>
      </FormField>
      <FormField label="Commentaire (optionnel)" htmlFor="comment">
        <Textarea id="comment" name="comment" rows={3} placeholder="Votre expérience avec cette entreprise..." />
      </FormField>
      {error && <p className="text-sm text-danger-text mb-4">{error}</p>}
      <Button type="submit" disabled={pending}>
        {pending ? "..." : "Publier mon avis"}
      </Button>
    </form>
  );
}
