"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { FloatingCard } from "@/components/ui/Card";
import { PillTabs, UnderlineTabs } from "@/components/ui/Tabs";
import { FormField, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { registerAction } from "@/server/actions/users";
import { checkRequiresMfa } from "@/server/actions/mfa";
import { homeForRole } from "@/lib/roleHome";
import type { Role } from "@/generated/prisma/enums";

type AuthRole = "CANDIDATE" | "CLIENT";
type AuthMode = "login" | "signup";

export function AuthForm({
  initialMode,
  googleEnabled = false,
  linkedinEnabled = false,
}: {
  initialMode: AuthMode;
  googleEnabled?: boolean;
  linkedinEnabled?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [role, setRole] = useState<AuthRole>("CANDIDATE");
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [mfaStep, setMfaStep] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [oauthPending, setOauthPending] = useState<"google" | "linkedin" | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      if (mode === "login") {
        if (!mfaStep) {
          const requiresMfa = await checkRequiresMfa(email);
          if (requiresMfa) {
            setMfaStep(true);
            return;
          }
        }

        const result = await signIn("credentials", {
          email,
          password,
          totpCode,
          redirect: false,
        });
        if (result?.error) {
          setError(mfaStep ? "Code de vérification incorrect ou expiré" : "Email ou mot de passe incorrect");
          return;
        }
        const session = await getSession();
        const role = session?.user ? (session.user as unknown as { role: Role }).role : null;
        router.push(callbackUrl || (role ? homeForRole(role) : "/"));
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
      router.push(callbackUrl || result.redirectTo);
      router.refresh();
    });
  }

  function handleOAuth(provider: "google" | "linkedin") {
    setOauthPending(provider);
    // full-page redirect handled by NextAuth; no need to reset oauthPending on success
    signIn(provider, { callbackUrl: callbackUrl || "/candidate/dashboard" });
  }

  const showOAuth = role === "CANDIDATE" && (googleEnabled || linkedinEnabled);

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

      {showOAuth && (
        <div className="mt-5 flex flex-col gap-2.5">
          {googleEnabled && (
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              disabled={oauthPending !== null}
              onClick={() => handleOAuth("google")}
            >
              {oauthPending === "google" ? "Redirection..." : "Continuer avec Google"}
            </Button>
          )}
          {linkedinEnabled && (
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              disabled={oauthPending !== null}
              onClick={() => handleOAuth("linkedin")}
            >
              {oauthPending === "linkedin" ? "Redirection..." : "Continuer avec LinkedIn"}
            </Button>
          )}
          <div className="flex items-center gap-3 my-1">
            <div className="h-px bg-border flex-1" />
            <span className="text-xs text-ink-300">ou</span>
            <div className="h-px bg-border flex-1" />
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className={showOAuth ? "" : "mt-5"}>
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
        {!(mode === "login" && mfaStep) && (
          <>
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
          </>
        )}

        {mode === "login" && mfaStep && (
          <FormField label="Code de vérification (application d'authentification)" htmlFor="totpCode">
            <Input
              id="totpCode"
              inputMode="numeric"
              autoFocus
              required
              placeholder="123456 ou code de secours"
              value={totpCode}
              onChange={(e) => setTotpCode(e.target.value)}
            />
          </FormField>
        )}

        {mode === "login" && !mfaStep && (
          <p className="text-sm text-right -mt-2 mb-4">
            <Link href="/forgot-password" className="text-teal font-semibold">
              Mot de passe oublié ?
            </Link>
          </p>
        )}
        {mode === "login" && mfaStep && (
          <p className="text-sm -mt-2 mb-4">
            <button
              type="button"
              onClick={() => {
                setMfaStep(false);
                setTotpCode("");
              }}
              className="text-teal font-semibold cursor-pointer"
            >
              ‹ Revenir à l&apos;e-mail et au mot de passe
            </button>
          </p>
        )}

        {error && <p className="text-sm text-danger-text mb-4">{error}</p>}

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "..." : mode === "signup" ? "S'inscrire" : "Se connecter"}
        </Button>

        {mode === "signup" && (
          <p className="text-xs text-ink-300 text-center mt-3">
            En vous inscrivant, vous acceptez nos{" "}
            <Link href="/cgu" className="underline">
              CGU
            </Link>{" "}
            et notre{" "}
            <Link href="/confidentialite" className="underline">
              politique de confidentialité
            </Link>
            .
          </p>
        )}
      </form>
    </FloatingCard>
  );
}
