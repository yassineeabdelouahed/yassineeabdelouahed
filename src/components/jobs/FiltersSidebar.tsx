"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { CONTRACT_TYPES } from "@/lib/validations/jobs";

export function FiltersSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const contracts = searchParams.getAll("contract");
  const remoteOnly = searchParams.get("remote") === "1";
  const sort = searchParams.get("sort") ?? "recent";

  function updateParams(mutate: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    router.push(`/results?${params.toString()}`);
  }

  function toggleContract(contract: string) {
    updateParams((params) => {
      const current = params.getAll("contract");
      params.delete("contract");
      const next = current.includes(contract) ? current.filter((c) => c !== contract) : [...current, contract];
      next.forEach((c) => params.append("contract", c));
    });
  }

  function toggleRemote() {
    updateParams((params) => {
      if (params.get("remote") === "1") params.delete("remote");
      else params.set("remote", "1");
    });
  }

  function onSortChange(value: string) {
    updateParams((params) => params.set("sort", value));
  }

  function clearFilters() {
    router.push("/results");
  }

  return (
    <Card className="p-5">
      <div className="flex justify-between items-baseline mb-3.5">
        <div className="font-bold text-[15px]">Filtres</div>
        <button onClick={clearFilters} className="text-xs text-teal font-semibold cursor-pointer">
          Réinitialiser
        </button>
      </div>

      <div className="text-[13px] font-bold text-ink-700 mb-2">Type de contrat</div>
      {CONTRACT_TYPES.map((c) => (
        <label key={c} className="flex items-center gap-2 text-sm text-ink-700 mb-2 cursor-pointer">
          <input type="checkbox" checked={contracts.includes(c)} onChange={() => toggleContract(c)} />
          {c}
        </label>
      ))}

      <div className="h-px bg-border my-3.5" />

      <label className="flex items-center gap-2 text-sm text-ink-700 cursor-pointer">
        <input type="checkbox" checked={remoteOnly} onChange={toggleRemote} />
        Télétravail possible
      </label>

      <div className="h-px bg-border my-3.5" />

      <div className="text-[13px] font-bold text-ink-700 mb-2">Trier par</div>
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="w-full border border-border rounded-lg p-2 text-[13px] text-ink-700"
      >
        <option value="recent">Plus récentes</option>
        <option value="salary">Salaire</option>
      </select>
    </Card>
  );
}
