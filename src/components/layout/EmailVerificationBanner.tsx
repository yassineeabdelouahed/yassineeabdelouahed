"use client";

import { useState, useTransition } from "react";
import { resendVerificationEmailAction } from "@/server/actions/emailVerification";

export function EmailVerificationBanner() {
  const [pending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleResend() {
    setError(null);
    startTransition(async () => {
      const result = await resendVerificationEmailAction();
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setSent(true);
    });
  }

  return (
    <div className="bg-warning-bg border border-warning-text/20 rounded-[var(--radius-card)] p-4 mb-6 flex items-center justify-between flex-wrap gap-3">
      <div>
        <p className="text-sm font-bold text-warning-text">Confirmez votre adresse e-mail</p>
        <p className="text-sm text-ink-500 mt-0.5">
          Un lien de confirmation vous a été envoyé à l&apos;inscription.
          {error && <span className="block text-danger-text mt-1">{error}</span>}
        </p>
      </div>
      {sent ? (
        <span className="text-sm font-bold text-success-text">E-mail envoyé ✓</span>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          disabled={pending}
          className="text-sm font-bold text-warning-text underline underline-offset-2 disabled:opacity-50"
        >
          {pending ? "Envoi..." : "Renvoyer l'e-mail"}
        </button>
      )}
    </div>
  );
}
