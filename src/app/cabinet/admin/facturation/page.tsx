import { requireAdmin } from "@/lib/rbac";
import { getPlatformSettings } from "@/server/actions/platformSettings";
import { Card } from "@/components/ui/Card";
import { PlatformSettingsForm } from "@/components/cabinet/PlatformSettingsForm";

export default async function PlatformSettingsPage() {
  await requireAdmin();
  const settings = await getPlatformSettings();

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900 mb-2">Mentions légales de facturation</h1>
      <p className="text-ink-500 mb-8 max-w-xl">
        Ces informations sont imprimées sur les reçus générés pour les paiements confirmés (sponsoring, CVthèque,
        formations). Tant qu&apos;elles ne sont pas renseignées, les reçus restent marqués comme ne constituant pas
        une facture au sens fiscal.
      </p>
      <Card className="p-6">
        <PlatformSettingsForm settings={settings} />
      </Card>
    </div>
  );
}
