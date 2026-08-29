import { Suspense } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { Logo } from "@/components/layout/Logo";
import { googleEnabled, linkedinEnabled } from "@/lib/auth";

export default function LoginPage() {
  return (
    <div className="max-w-[440px] mx-auto px-8 py-14">
      <div className="flex justify-center mb-8">
        <Logo />
      </div>
      <Suspense>
        <AuthForm initialMode="login" googleEnabled={googleEnabled} linkedinEnabled={linkedinEnabled} />
      </Suspense>
    </div>
  );
}
