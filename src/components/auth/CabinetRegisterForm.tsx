"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FloatingCard } from "@/components/ui/Card";
import { FormField, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { registerCabinetAction } from "@/server/actions/users";

export function CabinetRegisterForm({ token, email }: { token: string; email: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.set("token", token);
      formData.set("name", name);
      formData.set("password", password);

      const result = await registerCabinetAction(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      const signInResult = await signIn("credentials", { email, password, redirect: false });
      if (signInResult?.error) {
        router.push("/login");
        return;
      }
      router.push(result.redirectTo);
      router.refresh();
    });
  }

  return (
    <FloatingCard className="p-8">
      <div className="font-heading font-extrabold text-lg text-ink-900 mb-1">Rejoindre le cabinet</div>
      <p className="text-sm text-ink-500 mb-5">{email}</p>
      <form onSubmit={handleSubmit}>
        <FormField label="Nom complet" htmlFor="name">
          <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
        </FormField>
        <FormField label="Mot de passe" htmlFor="password">
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
          {pending ? "..." : "Créer mon compte"}
        </Button>
      </form>
    </FloatingCard>
  );
}
