import { getMfaStatus } from "@/server/actions/mfa";
import { MfaSettings } from "@/components/cabinet/MfaSettings";
import { DeleteAccountSection } from "@/components/account/DeleteAccountSection";

export default async function CabinetSettingsPage() {
  const mfaEnabled = await getMfaStatus();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading font-extrabold text-2xl text-ink-900">Paramètres du compte</h1>
      <MfaSettings enabled={mfaEnabled} />
      <DeleteAccountSection />
    </div>
  );
}
