"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { FormField, Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { createProspectAction } from "@/server/actions/prospects";

type ProspectFormDefaults = {
  companyName?: string;
  sector?: string;
  city?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  notes?: string;
};

export function ProspectForm({ defaultValues }: { defaultValues?: ProspectFormDefaults }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createProspectAction(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push("/cabinet/prospects");
      router.refresh();
    });
  }

  return (
    <Card className="p-8 max-w-[680px]">
      <form onSubmit={handleSubmit}>
        <FormField label="Nom de l'entreprise" htmlFor="companyName">
          <Input
            id="companyName"
            name="companyName"
            required
            defaultValue={defaultValues?.companyName}
            placeholder="ex : Atlas Industries"
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Secteur" htmlFor="sector">
            <Input id="sector" name="sector" defaultValue={defaultValues?.sector} placeholder="ex : Industrie, BTP..." />
          </FormField>
          <FormField label="Ville" htmlFor="city">
            <Input id="city" name="city" defaultValue={defaultValues?.city} placeholder="ex : Casablanca" />
          </FormField>
        </div>

        <FormField label="Nom du contact" htmlFor="contactName">
          <Input
            id="contactName"
            name="contactName"
            defaultValue={defaultValues?.contactName}
            placeholder="ex : Sara Amrani, DRH"
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Email du contact" htmlFor="contactEmail">
            <Input id="contactEmail" name="contactEmail" type="email" defaultValue={defaultValues?.contactEmail} />
          </FormField>
          <FormField label="Téléphone du contact" htmlFor="contactPhone">
            <Input id="contactPhone" name="contactPhone" defaultValue={defaultValues?.contactPhone} />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Urgence du besoin" htmlFor="urgency">
            <Select id="urgency" name="urgency" defaultValue="MEDIUM">
              <option value="LOW">Faible</option>
              <option value="MEDIUM">Moyenne</option>
              <option value="HIGH">Élevée</option>
            </Select>
          </FormField>
          <FormField label="Budget estimé (MAD)" htmlFor="estimatedBudget">
            <Input id="estimatedBudget" name="estimatedBudget" type="number" min={0} />
          </FormField>
        </div>

        <FormField label="Notes" htmlFor="notes">
          <Textarea
            id="notes"
            name="notes"
            rows={3}
            defaultValue={defaultValues?.notes}
            placeholder="Contexte, source du contact, besoin pressenti..."
          />
        </FormField>

        {error && <p className="text-sm text-danger-text mb-4">{error}</p>}

        <Button type="submit" variant="accent" disabled={pending}>
          {pending ? "Enregistrement..." : "Ajouter le prospect"}
        </Button>
      </form>
    </Card>
  );
}
