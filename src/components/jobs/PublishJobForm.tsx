"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { FormField, Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { createJobPostingAction } from "@/server/actions/jobs";
import { CATEGORIES, CONTRACT_TYPES } from "@/lib/validations/jobs";

export function PublishJobForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createJobPostingAction(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setSubmitted(true);
      router.refresh();
    });
  }

  if (submitted) {
    return (
      <Card className="p-8 text-center">
        <div className="text-sm font-bold text-success-text bg-success-bg inline-block px-3.5 py-1.5 rounded-full">
          ✓ Votre offre est en ligne
        </div>
        <p className="text-ink-500 mt-4">Elle est désormais visible sur le job board public.</p>
        <Button variant="dark" size="sm" className="mt-5" onClick={() => setSubmitted(false)}>
          Publier une autre offre
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-8">
      <div className="font-heading font-extrabold text-lg text-ink-900 mb-4.5">Détails de l&apos;offre</div>
      <form onSubmit={handleSubmit}>
        <FormField label="Intitulé du poste" htmlFor="title">
          <Input id="title" name="title" required placeholder="ex : Développeur Full-Stack" />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Ville" htmlFor="city">
            <Input id="city" name="city" placeholder="ex : Casablanca" />
          </FormField>
          <FormField label="Type de contrat" htmlFor="contractType">
            <Select id="contractType" name="contractType" defaultValue="CDI">
              {CONTRACT_TYPES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Catégorie" htmlFor="category">
            <Select id="category" name="category" defaultValue={CATEGORIES[0]}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField label="Télétravail" htmlFor="remoteType">
            <Select id="remoteType" name="remoteType" defaultValue="Sur site">
              <option value="Sur site">Sur site</option>
              <option value="Télétravail partiel">Télétravail partiel</option>
              <option value="Télétravail total">Télétravail total</option>
            </Select>
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Salaire min (MAD/mois, optionnel)" htmlFor="salaryMin">
            <Input id="salaryMin" name="salaryMin" type="number" min={0} />
          </FormField>
          <FormField label="Salaire max (MAD/mois, optionnel)" htmlFor="salaryMax">
            <Input id="salaryMax" name="salaryMax" type="number" min={0} />
          </FormField>
        </div>

        <FormField label="Description du poste" htmlFor="description">
          <Textarea id="description" name="description" rows={5} required placeholder="Missions, profil recherché, avantages..." />
        </FormField>

        {error && <p className="text-sm text-danger-text mb-4">{error}</p>}

        <Button type="submit" variant="accent" className="w-full" disabled={pending}>
          {pending ? "Publication..." : "Publier l'offre"}
        </Button>
      </form>
    </Card>
  );
}
