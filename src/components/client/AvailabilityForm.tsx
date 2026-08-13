"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { submitAvailabilityAction } from "@/server/actions/interviews";

type SlotDraft = { startAt: string; endAt: string };

function emptySlot(): SlotDraft {
  return { startAt: "", endAt: "" };
}

export function AvailabilityForm({ interviewId }: { interviewId: string }) {
  const router = useRouter();
  const [slots, setSlots] = useState<SlotDraft[]>([emptySlot()]);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function updateSlot(idx: number, field: keyof SlotDraft, value: string) {
    setSlots((prev) => prev.map((s, i) => (i === idx ? { ...s, [field]: value } : s)));
  }

  function addSlot() {
    setSlots((prev) => [...prev, emptySlot()]);
  }

  function removeSlot(idx: number) {
    setSlots((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const formData = new FormData();
    formData.set("interviewId", interviewId);
    formData.set("slotsJson", JSON.stringify(slots));

    startTransition(async () => {
      const result = await submitAvailabilityAction(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <p className="text-xs text-ink-500 mb-2">Proposez un ou plusieurs créneaux pour cet entretien.</p>
      <div className="flex flex-col gap-2">
        {slots.map((slot, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <Input
              type="datetime-local"
              required
              value={slot.startAt}
              onChange={(e) => updateSlot(idx, "startAt", e.target.value)}
            />
            <span className="text-ink-300 text-xs">à</span>
            <Input
              type="datetime-local"
              required
              value={slot.endAt}
              onChange={(e) => updateSlot(idx, "endAt", e.target.value)}
            />
            {slots.length > 1 && (
              <button
                type="button"
                onClick={() => removeSlot(idx)}
                className="text-xs text-danger-text cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addSlot}
        className="text-xs font-semibold text-teal hover:text-teal-hover cursor-pointer mt-2"
      >
        + Ajouter un créneau
      </button>

      {error && <p className="text-sm text-danger-text mt-2">{error}</p>}

      <Button type="submit" size="sm" className="mt-3" disabled={pending}>
        {pending ? "..." : "Envoyer mes disponibilités"}
      </Button>
    </form>
  );
}
