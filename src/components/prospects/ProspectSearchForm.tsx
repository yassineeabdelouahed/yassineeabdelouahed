"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { FormField, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { searchLushaProspectsAction } from "@/server/actions/prospectSearch";
import type { LushaCandidate } from "@/lib/lusha";

export function ProspectSearchForm() {
  const [error, setError] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<LushaCandidate[] | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await searchLushaProspectsAction(formData);
      if (!result.ok) {
        setError(result.error);
        setCandidates(null);
        return;
      }
      setCandidates(result.candidates);
    });
  }

  return (
    <div>
      <Card className="p-8 max-w-[680px]">
        <form onSubmit={handleSubmit}>
          <FormField label="Titre du poste" htmlFor="jobTitle">
            <Input id="jobTitle" name="jobTitle" placeholder="ex : Directeur des Ressources Humaines" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Localisation" htmlFor="location">
              <Input id="location" name="location" placeholder="ex : Casablanca" />
            </FormField>
            <FormField label="Entreprise" htmlFor="companyName">
              <Input id="companyName" name="companyName" placeholder="ex : Atlas Industries" />
            </FormField>
          </div>
          {error && <p className="text-sm text-danger-text mb-4">{error}</p>}
          <Button type="submit" variant="accent" disabled={pending}>
            {pending ? "Recherche..." : "Rechercher"}
          </Button>
        </form>
      </Card>

      {candidates && (
        <div className="mt-8 flex flex-col gap-3">
          {candidates.length === 0 ? (
            <Card className="p-6 text-center text-ink-500">Aucun résultat pour ces critères.</Card>
          ) : (
            candidates.map((c) => (
              <Card key={c.contactId} className="p-5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[15px] text-ink-900">{c.fullName || "Contact"}</div>
                  <div className="text-sm text-ink-500 mt-0.5">
                    {c.jobTitle}
                    {c.jobTitle && c.companyName ? " · " : ""}
                    {c.companyName}
                    {c.location ? ` · ${c.location}` : ""}
                  </div>
                </div>
                <Link
                  href={{
                    pathname: "/cabinet/prospects/new",
                    query: {
                      companyName: c.companyName ?? "",
                      city: c.location ?? "",
                      contactName: c.fullName ?? "",
                      contactEmail: c.email ?? "",
                      contactPhone: c.phone ?? "",
                      notes: "Source : Lusha (recherche de prospects)",
                    },
                  }}
                >
                  <Button size="sm" variant="secondary">
                    Utiliser ce contact
                  </Button>
                </Link>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
