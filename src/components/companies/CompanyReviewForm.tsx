"use client";

import { useState, useTransition } from "react";
import { FormField, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { submitCompanyReviewAction } from "@/server/actions/companyReviews";

export function CompanyReviewForm({ companyId }: { companyId: string }) {
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
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
      // No router.refresh() here: the review is PENDING and won't appear until
      // moderated, and a refresh would re-evaluate eligibility server-side and
      // unmount this form (replaced by "already reviewed") before the user
      // ever sees the confirmation below.
      setSubmitted(true);
    });
  }

  if (submitted) {
    return (
      <p className="text-sm text-success-text">
        Merci ! Votre avis sera visible publiquement après validation par notre équipe.
      </p>
    );
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
