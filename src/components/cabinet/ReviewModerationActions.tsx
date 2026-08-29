"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { moderateReviewAction } from "@/server/actions/companyReviews";

export function ReviewModerationActions({ reviewId }: { reviewId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handle(decision: "APPROVED" | "REJECTED") {
    startTransition(async () => {
      await moderateReviewAction(reviewId, decision);
      router.refresh();
    });
  }

  return (
    <div className="flex gap-2">
      <Button size="sm" onClick={() => handle("APPROVED")} disabled={pending}>
        {pending ? "..." : "Approuver"}
      </Button>
      <Button size="sm" variant="ghost" onClick={() => handle("REJECTED")} disabled={pending}>
        Rejeter
      </Button>
    </div>
  );
}
