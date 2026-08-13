"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { FormField, Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { createCourseAction } from "@/server/actions/training";
import { DOMAINS, DOMAIN_LABEL } from "@/lib/validations/training";

export function CourseForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createCourseAction(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      (e.target as HTMLFormElement).reset();
      router.refresh();
    });
  }

  return (
    <Card className="p-6">
      <div className="font-heading font-extrabold text-base text-ink-900 mb-4">Nouvelle formation</div>
      <form onSubmit={handleSubmit}>
        <FormField label="Titre" htmlFor="title">
          <Input id="title" name="title" required />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Domaine" htmlFor="domain">
            <Select id="domain" name="domain" defaultValue={DOMAINS[0]}>
              {DOMAINS.map((d) => (
                <option key={d} value={d}>
                  {DOMAIN_LABEL[d]}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField label="Durée (heures, optionnel)" htmlFor="durationHours">
            <Input id="durationHours" name="durationHours" type="number" min={1} />
          </FormField>
        </div>
        <FormField label="Description" htmlFor="description">
          <Textarea id="description" name="description" rows={3} required />
        </FormField>
        {error && <p className="text-sm text-danger-text mb-3">{error}</p>}
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? "..." : "Créer la formation"}
        </Button>
      </form>
    </Card>
  );
}
