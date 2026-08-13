"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { enrollAction } from "@/server/actions/training";

export function EnrollForm({
  sessionId,
  isAuthenticated,
  alreadyEnrolled,
  isFull,
}: {
  sessionId: string;
  isAuthenticated: boolean;
  alreadyEnrolled: boolean;
  isFull: boolean;
}) {
  const router = useRouter();
  const [enrolled, setEnrolled] = useState(alreadyEnrolled);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  if (enrolled) {
    return <Tag tone="success">✓ Inscrit(e)</Tag>;
  }
  if (isFull) {
    return <Tag tone="neutral">Session complète</Tag>;
  }
  if (!isAuthenticated) {
    return (
      <Link
        href={`/login?callbackUrl=${encodeURIComponent("/trainings")}`}
        className="text-xs font-semibold text-teal hover:text-teal-hover whitespace-nowrap"
      >
        Se connecter pour s&apos;inscrire
      </Link>
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await enrollAction(sessionId, formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setEnrolled(true);
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Select name="paymentMethod" defaultValue="VIREMENT" className="!w-auto text-xs py-2">
        <option value="VIREMENT">Virement bancaire</option>
        <option value="ESPECES">Espèces au cabinet</option>
        <option value="AUTRE">Autre</option>
      </Select>
      <Button type="submit" size="sm" disabled={pending}>
        {pending ? "..." : "S'inscrire"}
      </Button>
      {error && <p className="text-xs text-danger-text">{error}</p>}
    </form>
  );
}
