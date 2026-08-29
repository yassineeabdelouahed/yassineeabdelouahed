"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { createJobAlertAction } from "@/server/actions/jobAlerts";

export function CreateAlertButton({ isAuthenticated }: { isAuthenticated: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [created, setCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  if (!isAuthenticated) {
    return (
      <Link
        href={`/login?callbackUrl=${encodeURIComponent(`/results?${searchParams.toString()}`)}`}
        className="text-xs font-semibold text-teal hover:text-teal-hover"
      >
        Se connecter pour créer une alerte
      </Link>
    );
  }

  if (created) {
    return <span className="text-xs font-semibold text-success-text">✓ Alerte créée</span>;
  }

  function handleCreate() {
    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.set("keyword", searchParams.get("keyword") ?? "");
      formData.set("location", searchParams.get("location") ?? "");
      formData.set("category", searchParams.get("category") ?? "");
      const result = await createJobAlertAction(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setCreated(true);
      router.refresh();
    });
  }

  return (
    <div>
      <Button variant="secondary" size="sm" onClick={handleCreate} disabled={pending}>
        {pending ? "..." : "🔔 Créer une alerte pour cette recherche"}
      </Button>
      {error && <p className="text-xs text-danger-text mt-1">{error}</p>}
    </div>
  );
}
