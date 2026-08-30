import { DeleteAccountSection } from "@/components/account/DeleteAccountSection";

export default function CabinetSettingsPage() {
  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900 mb-8">Paramètres du compte</h1>
      <DeleteAccountSection />
    </div>
  );
}
