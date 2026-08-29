import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { LinkButton } from "@/components/ui/Button";
import { verifyEmailAction } from "@/server/actions/emailVerification";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const result = await verifyEmailAction(token ?? "");

  return (
    <div className="max-w-[440px] mx-auto px-8 py-14 text-center">
      <div className="flex justify-center mb-8">
        <Logo />
      </div>

      {result.ok ? (
        <>
          <div className="text-sm font-bold text-success-text bg-success-bg inline-block px-3.5 py-1.5 rounded-full mb-4">
            ✓ E-mail confirmé
          </div>
          <p className="text-ink-700 mb-6">Votre adresse e-mail a bien été vérifiée.</p>
        </>
      ) : (
        <>
          <div className="text-sm font-bold text-danger-text bg-danger-bg inline-block px-3.5 py-1.5 rounded-full mb-4">
            Échec de la confirmation
          </div>
          <p className="text-ink-700 mb-6">{result.error}</p>
        </>
      )}

      <LinkButton href="/login" variant="primary">
        Se connecter
      </LinkButton>
      {!result.ok && (
        <p className="text-sm text-ink-500 mt-4">
          Connectez-vous pour renvoyer un e-mail de confirmation depuis votre tableau de bord.
        </p>
      )}
      <p className="mt-6">
        <Link href="/" className="text-sm text-ink-500 underline">
          Retour à l&apos;accueil
        </Link>
      </p>
    </div>
  );
}
