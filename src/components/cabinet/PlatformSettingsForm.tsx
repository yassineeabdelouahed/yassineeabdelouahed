"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FormField, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { updatePlatformSettingsAction } from "@/server/actions/platformSettings";

type Settings = {
  legalName: string;
  ice: string | null;
  rc: string | null;
  identifiantFiscal: string | null;
  patente: string | null;
  cnss: string | null;
  address: string | null;
  tvaRatePercent: number;
};

export function PlatformSettingsForm({ settings }: { settings: Settings }) {
  const router = useRouter();
  const [values, setValues] = useState({
    legalName: settings.legalName,
    ice: settings.ice ?? "",
    rc: settings.rc ?? "",
    identifiantFiscal: settings.identifiantFiscal ?? "",
    patente: settings.patente ?? "",
    cnss: settings.cnss ?? "",
    address: settings.address ?? "",
    tvaRatePercent: String(settings.tvaRatePercent),
  });
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  function set(field: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      setSaved(false);
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => formData.set(key, value));
      const result = await updatePlatformSettingsAction(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setSaved(true);
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-xl">
      <FormField label="Raison sociale" htmlFor="legalName">
        <Input id="legalName" required value={values.legalName} onChange={set("legalName")} />
      </FormField>
      <FormField label="Adresse" htmlFor="address">
        <Input id="address" value={values.address} onChange={set("address")} />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="ICE" htmlFor="ice">
          <Input id="ice" value={values.ice} onChange={set("ice")} />
        </FormField>
        <FormField label="RC" htmlFor="rc">
          <Input id="rc" value={values.rc} onChange={set("rc")} />
        </FormField>
        <FormField label="Identifiant fiscal (IF)" htmlFor="identifiantFiscal">
          <Input id="identifiantFiscal" value={values.identifiantFiscal} onChange={set("identifiantFiscal")} />
        </FormField>
        <FormField label="Patente" htmlFor="patente">
          <Input id="patente" value={values.patente} onChange={set("patente")} />
        </FormField>
        <FormField label="CNSS" htmlFor="cnss">
          <Input id="cnss" value={values.cnss} onChange={set("cnss")} />
        </FormField>
        <FormField label="Taux de TVA (%)" htmlFor="tvaRatePercent">
          <Input id="tvaRatePercent" type="number" min={0} max={100} value={values.tvaRatePercent} onChange={set("tvaRatePercent")} />
        </FormField>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Enregistrement..." : "Enregistrer"}
        </Button>
        {saved && <span className="text-sm text-success-text">Mentions enregistrées.</span>}
        {error && <span className="text-sm text-danger-text">{error}</span>}
      </div>
    </form>
  );
}
