import { requireRole } from "@/lib/rbac";
import { ProspectForm } from "@/components/prospects/ProspectForm";

export default async function NewProspectPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireRole("CABINET");
  const params = await searchParams;
  const value = (key: string) => {
    const v = params[key];
    return typeof v === "string" ? v : undefined;
  };

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900">Nouveau prospect</h1>
      <p className="text-ink-500 mt-2 mb-8">Ajoutez une entreprise à prospecter.</p>
      <ProspectForm
        defaultValues={{
          companyName: value("companyName"),
          sector: value("sector"),
          city: value("city"),
          contactName: value("contactName"),
          contactEmail: value("contactEmail"),
          contactPhone: value("contactPhone"),
          notes: value("notes"),
        }}
      />
    </div>
  );
}
