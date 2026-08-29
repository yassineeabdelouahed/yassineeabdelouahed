"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { FormField, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { updateProfileAction } from "@/server/actions/profile";

type Candidate = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  headline: string | null;
  location: string | null;
  yearsExperience: number | null;
  skills: string[];
  cvUrl: string | null;
};

export function ProfileForm({ candidate }: { candidate: Candidate }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateProfileAction(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setSuccess(true);
      router.refresh();
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-7">
      <Card className="p-8">
        <form onSubmit={handleSubmit}>
          <FormField label="Titre / poste recherché" htmlFor="headline">
            <Input
              id="headline"
              name="headline"
              defaultValue={candidate.headline ?? ""}
              placeholder="ex : Développeur Full-Stack"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Localisation" htmlFor="location">
              <Input id="location" name="location" defaultValue={candidate.location ?? ""} placeholder="ex : Casablanca" />
            </FormField>
            <FormField label="Téléphone" htmlFor="phone">
              <Input id="phone" name="phone" defaultValue={candidate.phone ?? ""} />
            </FormField>
          </div>

          <FormField label="Années d'expérience" htmlFor="yearsExperience">
            <Input
              id="yearsExperience"
              name="yearsExperience"
              type="number"
              min={0}
              defaultValue={candidate.yearsExperience ?? ""}
            />
          </FormField>

          <FormField label="Compétences (séparées par des virgules)" htmlFor="skills">
            <Input id="skills" name="skills" defaultValue={candidate.skills.join(", ")} placeholder="ex : React, Node.js, SQL" />
          </FormField>

          <FormField label={candidate.cvUrl ? "Remplacer le CV (PDF)" : "CV (PDF)"} htmlFor="cv">
            <input id="cv" name="cv" type="file" accept=".pdf,.doc,.docx" className="text-sm" />
          </FormField>

          {error && <p className="text-sm text-danger-text mb-4">{error}</p>}
          {success && <p className="text-sm text-success-text mb-4">Profil mis à jour.</p>}

          <Button type="submit" variant="accent" disabled={pending}>
            {pending ? "Enregistrement..." : "Enregistrer mon profil"}
          </Button>
        </form>
      </Card>

      <div className="flex flex-col gap-4">
        <Card className="p-6">
          <div className="text-xs text-ink-300">Nom</div>
          <div className="text-sm font-semibold text-ink-900 mt-1">
            {candidate.firstName} {candidate.lastName}
          </div>
          <div className="text-xs text-ink-300 mt-3">Email</div>
          <div className="text-sm text-ink-700 mt-1">{candidate.email}</div>
        </Card>

        <Card className="p-6">
          <div className="text-xs text-ink-300 mb-2">CV</div>
          {candidate.cvUrl ? (
            <a href={candidate.cvUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold text-teal hover:text-teal-hover">
              Voir le CV actuel ↗
            </a>
          ) : (
            <Tag tone="warning">Aucun CV — ajoutez-en un pour postuler plus vite</Tag>
          )}
        </Card>
      </div>
    </div>
  );
}
