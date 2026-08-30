import { getCvDatabaseAccessStatus } from "@/server/actions/cvDatabase";
import { getInvoiceMap } from "@/lib/invoice";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { CvAccessRequestForm } from "@/components/client/CvAccessRequestForm";
import { CandidateSearchPanel } from "@/components/client/CandidateSearchPanel";

export default async function ClientCvDatabasePage() {
  const status = await getCvDatabaseAccessStatus();
  const invoiceMap = status.activeAccessId
    ? await getInvoiceMap("CV_ACCESS", [status.activeAccessId])
    : {};
  const invoiceId = status.activeAccessId ? invoiceMap[status.activeAccessId]?.id ?? null : null;

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900 mb-2">CVthèque</h1>
      <p className="text-ink-500 mb-6">Recherchez parmi les candidats inscrits sur Talentis Connect.</p>

      {status.unlocked ? (
        <div className="flex items-center gap-3">
          <Tag tone="success">
            Accès actif jusqu&apos;au {status.expiresAt!.toLocaleDateString("fr-FR")}
          </Tag>
          {invoiceId && (
            <a href={`/api/invoices/${invoiceId}`} className="text-sm text-teal font-semibold hover:underline">
              Télécharger le reçu
            </a>
          )}
        </div>
      ) : (
        <Card className="p-6 mb-8">
          <div className="font-heading font-extrabold text-base text-ink-900 mb-1">Débloquer l&apos;accès complet</div>
          <p className="text-sm text-ink-500 mb-4">
            Sans accès actif, vous voyez le nombre de profils correspondants mais pas leurs coordonnées.
          </p>
          {status.hasPending ? (
            <Tag tone="warning">Demande en attente de confirmation</Tag>
          ) : (
            <CvAccessRequestForm />
          )}
        </Card>
      )}

      <div className="mt-8">
        <CandidateSearchPanel />
      </div>
    </div>
  );
}
