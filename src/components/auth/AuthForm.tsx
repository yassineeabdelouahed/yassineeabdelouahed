"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { FloatingCard } from "@/components/ui/Card";
import { PillTabs, UnderlineTabs } from "@/components/ui/Tabs";
import { FormField, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { registerAction } from "@/server/actions/users";

type AuthRole = "CANDIDATE" | "CLIENT";
type AuthMode = "login" | "signup";

export function AuthForm({ initialMode }: { initialMode: AuthMode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [role, setRole] = useState<AuthRole>("CANDIDATE");
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      if (mode === "login") {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (result?.error) {
          setError("Email ou mot de passe incorrect");
          return;
        }
        router.push(callbackUrl || "/");
        router.refresh();
        return;
      }

      const formData = new FormData();
      formData.set("role", role);
      formData.set("name", name);
      formData.set("email", email);
      formData.set("password", password);
      if (role === "CLIENT") formData.set("companyName", companyName);

      const result = await registerAction(formData);
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
      <PillTabs
        value={role}
        onChange={setRole}
        options={[
          { value: "CANDIDATE", label: "Candidat" },
          { value: "CLIENT", label: "Recruteur" },
        ]}
      />

      <div className="h-5" />

      <UnderlineTabs
        value={mode}
        onChange={setMode}
        options={[
          { value: "login", label: "Connexion" },
          { value: "signup", label: "Inscription" },
        ]}
      />

      <form onSubmit={handleSubmit} className="mt-5">
        {mode === "signup" && (
          <FormField label="Nom complet" htmlFor="name">
            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
          </FormField>
        )}
        {mode === "signup" && role === "CLIENT" && (
          <FormField label="Nom de l'entreprise" htmlFor="companyName">
            <Input
              id="companyName"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </FormField>
        )}
        <FormField label="Adresse email" htmlFor="email">
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>
        <FormField label="Mot de passe" htmlFor="password">
          <Input
            id="password"
            type="password"
            required
            minLength={mode === "signup" ? 8 : undefined}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>

        {error && <p className="text-sm text-danger-text mb-4">{error}</p>}

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "..." : mode === "signup" ? "S'inscrire" : "Se connecter"}
        </Button>
      </form>
    </FloatingCard>
  );
}
