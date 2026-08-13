"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FormField, Select, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { scheduleInterviewAction } from "@/server/actions/interviews";

type Slot = { id: string; startAt: Date; endAt: Date };

export function ScheduleForm({ interviewId, slots }: { interviewId: string; slots: Slot[] }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    formData.set("interviewId", interviewId);

    startTransition(async () => {
      const result = await scheduleInterviewAction(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <FormField label="Créneau choisi" htmlFor={`slot-${interviewId}`}>
        <div className="flex flex-col gap-2">
          {slots.map((slot) => (
            <label key={slot.id} className="flex items-center gap-2 text-sm text-ink-700 cursor-pointer">
              <input type="radio" name="slotId" value={slot.id} required />
              {slot.startAt.toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" })} –{" "}
              {slot.endAt.toLocaleString("fr-FR", { timeStyle: "short" })}
            </label>
          ))}
        </div>
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Modalité" htmlFor={`mode-${interviewId}`}>
          <Select id={`mode-${interviewId}`} name="mode" defaultValue="VIDEO">
            <option value="ONSITE">Sur site</option>
            <option value="VIDEO">Visioconférence</option>
            <option value="PHONE">Téléphone</option>
          </Select>
        </FormField>
        <FormField label="Lien de réunion (optionnel)" htmlFor={`link-${interviewId}`}>
          <Input id={`link-${interviewId}`} name="meetingLink" placeholder="https://..." />
        </FormField>
      </div>

      {error && <p className="text-sm text-danger-text mb-2">{error}</p>}

      <Button type="submit" size="sm" disabled={pending}>
        {pending ? "..." : "Confirmer l'entretien"}
      </Button>
    </form>
  );
}
