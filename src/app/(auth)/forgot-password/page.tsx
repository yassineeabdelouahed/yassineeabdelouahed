import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="max-w-[440px] mx-auto px-8 py-14">
      <div className="flex justify-center mb-8">
        <Logo />
      </div>
      <h1 className="font-heading font-extrabold text-xl text-ink-900 mb-2 text-center">Mot de passe oublié</h1>
      <p className="text-sm text-ink-500 mb-6 text-center">
        Indiquez votre adresse e-mail, nous vous enverrons un lien de réinitialisation.
      </p>
      <ForgotPasswordForm />
      <p className="text-sm text-ink-500 mt-6 text-center">
        <Link href="/login" className="text-teal font-semibold">
          Retour à la connexion
        </Link>
      </p>
    </div>
  );
}
