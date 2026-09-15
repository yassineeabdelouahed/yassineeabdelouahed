"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { FormField, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { importProspectsFromGoogleMapsAction } from "@/server/actions/prospectImport";

export function ProspectImportForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<{ imported: number; skipped: number } | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSummary(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await importProspectsFromGoogleMapsAction(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setSummary({ imported: result.imported, skipped: result.skipped });
      router.refresh();
    });
  }

  return (
    <Card className="p-8 max-w-[680px]">
      <form onSubmit={handleSubmit}>
        <FormField label="Export JSON du scraper" htmlFor="payload">
          <Textarea
            id="payload"
            name="payload"
            rows={12}
            required
            placeholder='[{"title": "Atlas Industries", "category": "Manufacturer", "phone": "+212...", "emails": ["contact@..."], "web_site": "https://...", "address": "..."}]'
            className="font-mono text-xs"
          />
        </FormField>

        {error && <p className="text-sm text-danger-text mb-4">{error}</p>}
        {summary && (
          <p className="text-sm text-ink-700 mb-4">
            {summary.imported} prospect{summary.imported > 1 ? "s" : ""} importé
            {summary.imported > 1 ? "s" : ""}
            {summary.skipped > 0 ? `, ${summary.skipped} ignoré${summary.skipped > 1 ? "s" : ""} (déjà présent${summary.skipped > 1 ? "s" : ""})` : ""}.
          </p>
        )}

        <Button type="submit" variant="accent" disabled={pending}>
          {pending ? "Import en cours..." : "Importer"}
        </Button>
      </form>
    </Card>
  );
}
