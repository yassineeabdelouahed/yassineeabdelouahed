import { requireRole } from "@/lib/rbac";
import { ProspectForm } from "@/components/prospects/ProspectForm";

export default async function NewProspectPage() {
  await requireRole("CABINET");

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900">Nouveau prospect</h1>
      <p className="text-ink-500 mt-2 mb-8">Ajoutez une entreprise à prospecter.</p>
      <ProspectForm />
    </div>
  );
}
