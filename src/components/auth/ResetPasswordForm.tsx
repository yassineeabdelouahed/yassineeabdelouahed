"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FormField, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { resetPasswordAction } from "@/server/actions/passwordReset";

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const formData = new FormData();
    formData.set("token", token);
    formData.set("password", password);

    startTransition(async () => {
      const result = await resetPasswordAction(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setDone(true);
      setTimeout(() => router.push("/login"), 2000);
    });
  }

  if (done) {
    return (
      <p className="text-ink-700 text-center">
        Mot de passe mis à jour. Redirection vers la connexion...
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField label="Nouveau mot de passe" htmlFor="password">
        <Input
          id="password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormField>
      {error && <p className="text-sm text-danger-text mb-4">{error}</p>}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "..." : "Réinitialiser le mot de passe"}
      </Button>
    </form>
  );
}
