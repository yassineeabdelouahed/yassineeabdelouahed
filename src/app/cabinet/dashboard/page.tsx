import { requireRole } from "@/lib/rbac";
import { Card } from "@/components/ui/Card";

export default async function CabinetDashboardPage() {
  const user = await requireRole("CABINET");

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900">
        Bonjour, {user.name}
      </h1>
      <p className="text-ink-500 mt-2">Vue d&apos;ensemble des mandats en cours.</p>

      <Card className="mt-8 p-8 text-center">
        <p className="text-ink-700">Aucun mandat pour l&apos;instant.</p>
      </Card>
    </div>
  );
}
