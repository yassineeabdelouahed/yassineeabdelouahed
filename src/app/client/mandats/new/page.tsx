import { requireRole } from "@/lib/rbac";
import { MandatForm } from "@/components/client/MandatForm";

export default async function NewMandatPage() {
  await requireRole("CLIENT");

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900">
        Déposer une demande de recrutement
      </h1>
      <p className="text-ink-500 mt-2 mb-8">
        Décrivez le poste recherché ; le cabinet validera votre demande sous 48h ouvrées.
      </p>
      <MandatForm />
    </div>
  );
}
