"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { requestSponsorshipAction } from "@/server/actions/sponsorship";
import { SPONSORSHIP_TIERS } from "@/lib/validations/sponsorship";

type Sponsorship = { paymentStatus: "PENDING" | "CONFIRMED" | "CANCELLED" };

export function SponsorshipButton({
  jobId,
  sponsoredUntil,
  latestSponsorship,
  invoiceId,
}: {
  jobId: string;
  sponsoredUntil: Date | null;
  latestSponsorship: Sponsorship | null;
  invoiceId?: string | null;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const isActive = !!sponsoredUntil && sponsoredUntil > new Date();
  if (isActive) {
    return (
      <div className="flex items-center gap-3">
        <Tag tone="orange">★ Sponsorisée jusqu&apos;au {sponsoredUntil!.toLocaleDateString("fr-FR")}</Tag>
        {invoiceId && (
          <a href={`/api/invoices/${invoiceId}`} className="text-xs text-teal font-semibold hover:underline">
            Télécharger le reçu
          </a>
        )}
      </div>
    );
  }
  if (latestSponsorship?.paymentStatus === "PENDING") {
    return <Tag tone="warning">Sponsorisation en attente de confirmation</Tag>;
  }

  if (!open) {
    return (
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        ★ Sponsoriser
      </Button>
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await requestSponsorshipAction(jobId, formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setOpen(false);
      router.refresh();
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Select name="durationDays" defaultValue={String(SPONSORSHIP_TIERS[0].durationDays)} className="!w-auto text-xs py-2">
          {SPONSORSHIP_TIERS.map((t) => (
            <option key={t.durationDays} value={t.durationDays}>
              {t.durationDays} jours — {t.price} MAD
            </option>
          ))}
        </Select>
        <Select name="paymentMethod" defaultValue="VIREMENT" className="!w-auto text-xs py-2">
          <option value="VIREMENT">Virement</option>
          <option value="ESPECES">Espèces</option>
          <option value="AUTRE">Autre</option>
        </Select>
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? "..." : "Confirmer"}
        </Button>
        <button type="button" onClick={() => setOpen(false)} className="text-xs text-ink-500 cursor-pointer">
          Annuler
        </button>
        {error && <p className="text-xs text-danger-text">{error}</p>}
      </form>
      <p className="text-xs text-ink-300 mt-1.5">
        En confirmant, vous acceptez nos{" "}
        <Link href="/cgv" className="underline">
          CGV
        </Link>
        .
      </p>
    </div>
  );
}
