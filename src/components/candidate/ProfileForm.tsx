"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { FormField, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { updateProfileAction } from "@/server/actions/profile";
import type { CvSuggestions } from "@/lib/cvParser";

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
  const [skills, setSkills] = useState(candidate.skills.join(", "));
  const [yearsExperience, setYearsExperience] = useState(candidate.yearsExperience?.toString() ?? "");
  const [suggestions, setSuggestions] = useState<CvSuggestions | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, startTransition] = useTransition();

  const currentSkills = new Set(skills.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean));
  const newSkillSuggestions = (suggestions?.skills ?? []).filter((s) => !currentSkills.has(s.toLowerCase()));
  const experienceSuggestionUseful =
    suggestions?.experienceYears != null && String(suggestions.experienceYears) !== yearsExperience;

  function addSuggestedSkill(skill: string) {
    setSkills((prev) => (prev.trim() ? `${prev}, ${skill}` : skill));
  }

  function addAllSuggestedSkills() {
    setSkills((prev) => {
      const merged = prev.trim() ? `${prev}, ${newSkillSuggestions.join(", ")}` : newSkillSuggestions.join(", ");
      return merged;
    });
  }

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
      const hasSuggestions =
        result.cvSuggestions && (result.cvSuggestions.skills.length > 0 || result.cvSuggestions.experienceYears != null);
      setSuggestions(hasSuggestions ? result.cvSuggestions! : null);
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
              value={yearsExperience}
              onChange={(e) => setYearsExperience(e.target.value)}
            />
          </FormField>

          <FormField label="Compétences (séparées par des virgules)" htmlFor="skills">
            <Input
              id="skills"
              name="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="ex : React, Node.js, SQL"
            />
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

        {(newSkillSuggestions.length > 0 || experienceSuggestionUseful) && (
          <div className="mt-6 pt-6 border-t border-border-soft">
            <div className="text-sm font-bold text-ink-900 mb-1">Détecté dans votre CV</div>
            <p className="text-xs text-ink-500 mb-3">
              Repérage automatique par mots-clés — vérifiez avant d&apos;ajouter.
            </p>
            {newSkillSuggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {newSkillSuggestions.map((skill) => (
                  <button key={skill} type="button" onClick={() => addSuggestedSkill(skill)}>
                    <Tag tone="teal">+ {skill}</Tag>
                  </button>
                ))}
              </div>
            )}
            <div className="flex gap-3 items-center flex-wrap">
              {newSkillSuggestions.length > 1 && (
                <Button type="button" variant="secondary" size="sm" onClick={addAllSuggestedSkills}>
                  Tout ajouter aux compétences
                </Button>
              )}
              {experienceSuggestionUseful && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setYearsExperience(String(suggestions!.experienceYears))}
                >
                  Utiliser {suggestions!.experienceYears} ans d&apos;expérience
                </Button>
              )}
            </div>
          </div>
        )}
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
