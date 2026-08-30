"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { toggleCompanyVerificationAction } from "@/server/actions/companies";

export function CompanyVerificationToggle({ companyId, verified }: { companyId: string; verified: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      await toggleCompanyVerificationAction(companyId);
      router.refresh();
    });
  }

  return (
    <Button size="sm" variant={verified ? "ghost" : "secondary"} onClick={handleToggle} disabled={pending}>
      {pending ? "..." : verified ? "Retirer la vérification" : "Vérifier l'entreprise"}
    </Button>
  );
}
