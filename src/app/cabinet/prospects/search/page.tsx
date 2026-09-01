import { requireRole } from "@/lib/rbac";
import { lushaEnabled } from "@/lib/lusha";
import { Card } from "@/components/ui/Card";
import { ProspectSearchForm } from "@/components/prospects/ProspectSearchForm";

export default async function ProspectSearchPage() {
  await requireRole("CABINET");

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900">Rechercher des prospects</h1>
      <p className="text-ink-500 mt-2 mb-8">
        Cherchez des contacts par titre, localisation ou entreprise, puis ajoutez-les à la prospection.
      </p>
      {lushaEnabled ? (
        <ProspectSearchForm />
      ) : (
        <Card className="p-6 max-w-[680px] text-ink-500">
          Recherche de prospects non configurée — définissez <code>LUSHA_API_KEY</code> dans les variables
          d&apos;environnement pour l&apos;activer.
        </Card>
      )}
    </div>
  );
}
