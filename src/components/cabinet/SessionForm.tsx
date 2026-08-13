"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FormField, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { createSessionAction } from "@/server/actions/training";

export function SessionForm({ courseId }: { courseId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs font-semibold text-teal hover:text-teal-hover cursor-pointer"
      >
        + Ajouter une session
      </button>
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createSessionAction(courseId, formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setOpen(false);
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 bg-neutral-bg rounded-[var(--radius-control)] p-4">
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Date de début" htmlFor={`start-${courseId}`}>
          <Input id={`start-${courseId}`} name="startDate" type="date" required />
        </FormField>
        <FormField label="Date de fin (optionnel)" htmlFor={`end-${courseId}`}>
          <Input id={`end-${courseId}`} name="endDate" type="date" />
        </FormField>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Prix (MAD)" htmlFor={`price-${courseId}`}>
          <Input id={`price-${courseId}`} name="price" type="number" min={0} required />
        </FormField>
        <FormField label="Capacité" htmlFor={`capacity-${courseId}`}>
          <Input id={`capacity-${courseId}`} name="capacity" type="number" min={1} required />
        </FormField>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Formateur (optionnel)" htmlFor={`instructor-${courseId}`}>
          <Input id={`instructor-${courseId}`} name="instructorName" />
        </FormField>
        <FormField label="Lieu (optionnel)" htmlFor={`location-${courseId}`}>
          <Input id={`location-${courseId}`} name="location" placeholder="ex : Casablanca" />
        </FormField>
      </div>
      {error && <p className="text-xs text-danger-text mb-2">{error}</p>}
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? "..." : "Ajouter"}
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
          Annuler
        </Button>
      </div>
    </form>
  );
}
