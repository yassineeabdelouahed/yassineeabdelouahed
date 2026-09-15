import { requireRole } from "@/lib/rbac";
import { ProspectImportForm } from "@/components/prospects/ProspectImportForm";

export default async function ImportProspectsPage() {
  await requireRole("CABINET");

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900">Importer des prospects</h1>
      <p className="text-ink-500 mt-2 mb-8">
        Collez le JSON généré par{" "}
        <a
          href="https://github.com/Mahanaicoach/google-maps-scraper-kit"
          target="_blank"
          rel="noreferrer"
          className="text-teal underline"
        >
          google-maps-scraper-kit
        </a>{" "}
        pour convertir automatiquement les résultats de recherche Google Maps en prospects. Les entreprises déjà
        présentes dans la liste de prospection sont ignorées.
      </p>
      <ProspectImportForm />
    </div>
  );
}
