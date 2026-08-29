import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { validateResetToken } from "@/server/actions/passwordReset";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const valid = token ? await validateResetToken(token) : false;

  return (
    <div className="max-w-[440px] mx-auto px-8 py-14">
      <div className="flex justify-center mb-8">
        <Logo />
      </div>

      {valid && token ? (
        <>
          <h1 className="font-heading font-extrabold text-xl text-ink-900 mb-6 text-center">
            Nouveau mot de passe
          </h1>
          <ResetPasswordForm token={token} />
        </>
      ) : (
        <>
          <p className="text-ink-700 text-center mb-6">
            Ce lien de réinitialisation est invalide ou a expiré.
          </p>
          <p className="text-sm text-ink-500 text-center">
            <Link href="/forgot-password" className="text-teal font-semibold">
              Demander un nouveau lien
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
