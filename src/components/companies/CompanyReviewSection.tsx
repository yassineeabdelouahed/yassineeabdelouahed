"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { CompanyReviewForm } from "./CompanyReviewForm";

/**
 * Stays mounted at the same tree position across server re-renders (Next.js
 * refreshes the current route's Server Components after any server action,
 * regardless of revalidatePath — this isn't optional framework behavior).
 * Owns `justSubmitted` locally so a fresh confirmation always wins over the
 * server-computed eligibility props, which flip to "already reviewed" the
 * moment the review exists — otherwise that refresh unmounts the form (and
 * its confirmation message) before the candidate ever sees it.
 */
export function CompanyReviewSection({
  companyId,
  canReview,
  alreadyReviewed,
}: {
  companyId: string;
  canReview: boolean;
  alreadyReviewed: boolean;
}) {
  const [justSubmitted, setJustSubmitted] = useState(false);

  if (justSubmitted) {
    return (
      <p className="text-sm text-success-text">
        Merci ! Votre avis sera visible publiquement après validation par notre équipe.
      </p>
    );
  }

  if (alreadyReviewed) {
    return <p className="text-sm text-ink-500">Vous avez déjà laissé un avis sur cette entreprise.</p>;
  }

  if (!canReview) return null;

  return (
    <Card className="p-6">
      <div className="font-heading font-extrabold text-base text-ink-900 mb-3">Laisser un avis</div>
      <CompanyReviewForm companyId={companyId} onSubmitted={() => setJustSubmitted(true)} />
    </Card>
  );
}
