"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import {
  beginMfaEnrollmentAction,
  confirmMfaEnrollmentAction,
  disableMfaAction,
} from "@/server/actions/mfa";

type Step = "idle" | "enrolling" | "backup-codes";

export function MfaSettings({ enabled }: { enabled: boolean }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("idle");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleBegin() {
    setError(null);
    startTransition(async () => {
      const result = await beginMfaEnrollmentAction();
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setQrCodeDataUrl(result.qrCodeDataUrl);
      setSecret(result.secret);
      setStep("enrolling");
    });
  }

  function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await confirmMfaEnrollmentAction(code);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setBackupCodes(result.backupCodes);
      setStep("backup-codes");
    });
  }

  function handleFinish() {
    setStep("idle");
    router.refresh();
  }

  function handleDisable(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await disableMfaAction(code);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setCode("");
      router.refresh();
    });
  }

  if (step === "backup-codes") {
    return (
      <Card className="p-6">
        <div className="font-heading font-extrabold text-base text-ink-900 mb-2">
          Double authentification activée
        </div>
        <p className="text-sm text-ink-700 mb-3">
          Conservez ces codes de secours dans un endroit sûr. Chacun ne peut être utilisé qu&apos;une fois,
          pour vous connecter si vous perdez l&apos;accès à votre application d&apos;authentification.
        </p>
        <div className="grid grid-cols-2 gap-2 font-mono text-sm bg-neutral-bg rounded-[var(--radius-control)] p-4 mb-4">
          {backupCodes.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
        <Button size="sm" onClick={handleFinish}>
          J&apos;ai enregistré mes codes
        </Button>
      </Card>
    );
  }

  if (step === "enrolling") {
    return (
      <Card className="p-6">
        <div className="font-heading font-extrabold text-base text-ink-900 mb-2">
          Scannez ce QR code
        </div>
        <p className="text-sm text-ink-500 mb-3">
          Avec une application d&apos;authentification (Google Authenticator, Authy...).
        </p>
        {qrCodeDataUrl && (
          // eslint-disable-next-line @next/next/no-img-element -- data: URI, next/image adds no value here
          <img src={qrCodeDataUrl} alt="QR code de double authentification" width={200} height={200} />
        )}
        {secret && (
          <p className="text-xs text-ink-300 mt-2 font-mono break-all">Clé manuelle : {secret}</p>
        )}
        <form onSubmit={handleConfirm} className="mt-4 flex items-end gap-2">
          <div>
            <label htmlFor="mfa-enroll-code" className="block text-[13px] font-semibold text-ink-700 mb-1.5">
              Code à 6 chiffres
            </label>
            <Input
              id="mfa-enroll-code"
              inputMode="numeric"
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="!w-auto"
            />
          </div>
          <Button type="submit" size="sm" disabled={pending}>
            {pending ? "..." : "Confirmer"}
          </Button>
          <button type="button" onClick={() => setStep("idle")} className="text-sm text-ink-500 cursor-pointer">
            Annuler
          </button>
        </form>
        {error && <p className="text-sm text-danger-text mt-2">{error}</p>}
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="font-heading font-extrabold text-base text-ink-900 mb-2">
        Double authentification (2FA)
      </div>
      {enabled ? (
        <>
          <p className="text-sm text-ink-500 mb-3">Activée sur votre compte.</p>
          <form onSubmit={handleDisable} className="flex items-end gap-2">
            <div>
              <label htmlFor="mfa-disable-code" className="block text-[13px] font-semibold text-ink-700 mb-1.5">
                Code de vérification pour désactiver
              </label>
              <Input
                id="mfa-disable-code"
                inputMode="numeric"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="!w-auto"
              />
            </div>
            <Button type="submit" variant="ghost" size="sm" disabled={pending}>
              {pending ? "..." : "Désactiver"}
            </Button>
          </form>
          {error && <p className="text-sm text-danger-text mt-2">{error}</p>}
        </>
      ) : (
        <>
          <p className="text-sm text-ink-500 mb-3">
            Recommandée pour les comptes cabinet, qui ont accès aux données candidats et entreprises.
          </p>
          <Button size="sm" onClick={handleBegin} disabled={pending}>
            {pending ? "..." : "Activer la 2FA"}
          </Button>
          {error && <p className="text-sm text-danger-text mt-2">{error}</p>}
        </>
      )}
    </Card>
  );
}
