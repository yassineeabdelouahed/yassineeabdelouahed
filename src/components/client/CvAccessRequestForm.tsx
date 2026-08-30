"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { requestCvAccessAction } from "@/server/actions/cvDatabase";
import { CV_ACCESS_TIERS } from "@/lib/validations/cvDatabase";

export function CvAccessRequestForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await requestCvAccessAction(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-end gap-3 flex-wrap">
        <div>
          <label className="block text-[13px] font-semibold text-ink-700 mb-1.5">Durée</label>
          <Select name="durationDays" defaultValue={String(CV_ACCESS_TIERS[0].durationDays)} className="!w-auto">
            {CV_ACCESS_TIERS.map((t) => (
              <option key={t.durationDays} value={t.durationDays}>
                {t.durationDays} jours — {t.price.toLocaleString("fr-FR")} MAD
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-ink-700 mb-1.5">Mode de paiement</label>
          <Select name="paymentMethod" defaultValue="VIREMENT" className="!w-auto">
            <option value="VIREMENT">Virement</option>
            <option value="ESPECES">Espèces</option>
            <option value="AUTRE">Autre</option>
          </Select>
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "..." : "Demander l'accès"}
        </Button>
        {error && <p className="text-sm text-danger-text w-full">{error}</p>}
      </form>
      <p className="text-xs text-ink-300 mt-2">
        En confirmant, vous acceptez nos{" "}
        <Link href="/cgv" className="underline">
          CGV
        </Link>
        .
      </p>
    </div>
  );
}
