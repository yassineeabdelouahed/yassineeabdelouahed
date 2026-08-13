import { requireRole } from "@/lib/rbac";
import { CandidateForm } from "@/components/cabinet/CandidateForm";

export default async function NewCandidatePage() {
  await requireRole("CABINET");

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900 mb-8">Nouveau candidat</h1>
      <CandidateForm />
    </div>
  );
}
