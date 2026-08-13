import { requireRole } from "@/lib/rbac";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";

export default async function CandidateDashboardPage() {
  const user = await requireRole("CANDIDATE");

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900">
        Bonjour, {user.name}
      </h1>
      <p className="text-ink-500 mt-2">Retrouvez vos candidatures et vos formations.</p>

      <Card className="mt-8 p-8 text-center">
        <p className="text-ink-700">Vous n&apos;avez pas encore de candidature.</p>
        <LinkButton href="/results" variant="accent" className="mt-4 inline-flex">
          Voir les offres d&apos;emploi
        </LinkButton>
      </Card>
    </div>
  );
}
