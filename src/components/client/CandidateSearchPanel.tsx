"use client";

import { useState, useTransition } from "react";
import { FormField, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { searchCandidatesForClient, type CandidateSearchResult } from "@/server/actions/cvDatabase";

export function CandidateSearchPanel() {
  const [result, setResult] = useState<CandidateSearchResult | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      setResult(await searchCandidatesForClient(formData));
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <FormField label="Mot-clé (compétence, poste...)" htmlFor="keyword">
          <Input id="keyword" name="keyword" placeholder="ex : React, Comptabilité" />
        </FormField>
        <FormField label="Localisation" htmlFor="location">
          <Input id="location" name="location" placeholder="ex : Casablanca" />
        </FormField>
        <FormField label="Expérience min. (années)" htmlFor="minExperience">
          <Input id="minExperience" name="minExperience" type="number" min={0} />
        </FormField>
        <Button type="submit" disabled={pending} className="sm:col-span-3 sm:w-auto sm:justify-self-start">
          {pending ? "Recherche..." : "Rechercher"}
        </Button>
      </form>

      {result && result.locked && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-ink-500">
            {result.teaser.length} candidat(s) correspondent — débloquez l&apos;accès pour voir les coordonnées.
          </p>
          {result.teaser.map((c, i) => (
            <Card key={i} className="p-5 relative overflow-hidden">
              <div className="font-bold text-[16px] text-ink-900 blur-sm select-none">Candidat masqué</div>
              <div className="text-sm text-ink-500 mt-0.5">
                {c.headline || "Profil candidat"}
                {c.location ? ` · ${c.location}` : ""}
              </div>
              {c.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {c.skills.slice(0, 6).map((skill) => (
                    <Tag key={skill} tone="neutral">
                      {skill}
                    </Tag>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {result && !result.locked && (
        <div className="flex flex-col gap-3">
          {result.results.length === 0 && (
            <p className="text-sm text-ink-500">Aucun candidat ne correspond à cette recherche.</p>
          )}
          {result.results.map((c) => (
            <Card key={c.id} className="p-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="font-bold text-[16px] text-ink-900">
                    {c.firstName} {c.lastName}
                  </div>
                  <div className="text-sm text-ink-500 mt-0.5">
                    {c.headline || c.email}
                    {c.location ? ` · ${c.location}` : ""}
                  </div>
                  <div className="text-xs text-ink-300 mt-1">
                    {c.email}
                    {c.phone ? ` · ${c.phone}` : ""}
                  </div>
                </div>
                {c.cvUrl && (
                  <a href={c.cvUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-teal font-semibold">
                    Voir le CV
                  </a>
                )}
              </div>
              {c.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {c.skills.slice(0, 6).map((skill) => (
                    <Tag key={skill} tone="neutral">
                      {skill}
                    </Tag>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
