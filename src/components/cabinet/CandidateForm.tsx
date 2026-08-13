"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { FormField, Input, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { createCandidateAction } from "@/server/actions/candidates";

export function CandidateForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createCandidateAction(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push(`/cabinet/candidates/${result.candidateId}`);
      router.refresh();
    });
  }

  return (
    <Card className="p-8 max-w-[680px]">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Prénom" htmlFor="firstName">
            <Input id="firstName" name="firstName" required />
          </FormField>
          <FormField label="Nom" htmlFor="lastName">
            <Input id="lastName" name="lastName" required />
          </FormField>
        </div>

        <FormField label="Email" htmlFor="email">
          <Input id="email" name="email" type="email" required />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Téléphone" htmlFor="phone">
            <Input id="phone" name="phone" />
          </FormField>
          <FormField label="Localisation" htmlFor="location">
            <Input id="location" name="location" placeholder="ex : Casablanca" />
          </FormField>
        </div>

        <FormField label="Titre / poste actuel" htmlFor="headline">
          <Input id="headline" name="headline" placeholder="ex : Développeur Backend Senior" />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Années d'expérience" htmlFor="yearsExperience">
            <Input id="yearsExperience" name="yearsExperience" type="number" min={0} />
          </FormField>
          <FormField label="Source" htmlFor="source">
            <Select id="source" name="source" defaultValue="INTERNAL_DB">
              <option value="INTERNAL_DB">Base interne</option>
              <option value="JOBBOARD">Jobboard</option>
              <option value="NETWORK">Réseau</option>
              <option value="COOPTATION">Cooptation</option>
            </Select>
          </FormField>
        </div>

        <FormField label="Compétences (séparées par des virgules)" htmlFor="skills">
          <Input id="skills" name="skills" placeholder="ex : React, Node.js, SQL" />
        </FormField>

        <FormField label="CV (PDF)" htmlFor="cv">
          <input id="cv" name="cv" type="file" accept=".pdf,.doc,.docx" className="text-sm" />
        </FormField>

        {error && <p className="text-sm text-danger-text mb-4">{error}</p>}

        <Button type="submit" disabled={pending}>
          {pending ? "Enregistrement..." : "Ajouter le candidat"}
        </Button>
      </form>
    </Card>
  );
}
