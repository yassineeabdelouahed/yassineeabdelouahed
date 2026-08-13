"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { FormField, Input, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { createMandatAction } from "@/server/actions/mandats";

export function MandatForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createMandatAction(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push("/client/mandats");
      router.refresh();
    });
  }

  return (
    <Card className="p-8 max-w-[680px]">
      <form onSubmit={handleSubmit}>
        <FormField label="Intitulé du poste" htmlFor="title">
          <Input id="title" name="title" required placeholder="ex : Développeur Full-Stack" />
        </FormField>

        <FormField label="Compétences recherchées (séparées par des virgules)" htmlFor="skillsRequired">
          <Input id="skillsRequired" name="skillsRequired" placeholder="ex : React, Node.js, SQL" />
        </FormField>

        <FormField label="Niveau d'expérience" htmlFor="experienceLevel">
          <Input id="experienceLevel" name="experienceLevel" placeholder="ex : 3-5 ans" />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Salaire min (MAD/mois)" htmlFor="salaryMin">
            <Input id="salaryMin" name="salaryMin" type="number" min={0} />
          </FormField>
          <FormField label="Salaire max (MAD/mois)" htmlFor="salaryMax">
            <Input id="salaryMax" name="salaryMax" type="number" min={0} />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Localisation" htmlFor="location">
            <Input id="location" name="location" placeholder="ex : Casablanca" />
          </FormField>
          <FormField label="Politique de télétravail" htmlFor="remotePolicy">
            <Input id="remotePolicy" name="remotePolicy" placeholder="ex : Sur site / Hybride" />
          </FormField>
        </div>

        <FormField label="Urgence" htmlFor="urgency">
          <Select id="urgency" name="urgency" defaultValue="MEDIUM">
            <option value="LOW">Faible</option>
            <option value="MEDIUM">Moyenne</option>
            <option value="HIGH">Élevée</option>
          </Select>
        </FormField>

        {error && <p className="text-sm text-danger-text mb-4">{error}</p>}

        <Button type="submit" variant="accent" disabled={pending}>
          {pending ? "Envoi..." : "Déposer la demande"}
        </Button>
      </form>
    </Card>
  );
}
