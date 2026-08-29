"use client";

import { useState, useTransition } from "react";
import { FormField, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { requestPasswordResetAction } from "@/server/actions/passwordReset";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const formData = new FormData();
    formData.set("email", email);

    startTransition(async () => {
      const result = await requestPasswordResetAction(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setSubmitted(true);
    });
  }

  if (submitted) {
    return (
      <p className="text-ink-700 text-center">
        Si un compte existe avec cette adresse, un e-mail de réinitialisation vient de lui être envoyé.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField label="Adresse email" htmlFor="email">
        <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormField>
      {error && <p className="text-sm text-danger-text mb-4">{error}</p>}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "..." : "Envoyer le lien de réinitialisation"}
      </Button>
    </form>
  );
}
