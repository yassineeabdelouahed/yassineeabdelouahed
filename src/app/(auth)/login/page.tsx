import { Suspense } from "react";
import { AuthForm } from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <div className="max-w-[440px] mx-auto px-8 py-14">
      <Suspense>
        <AuthForm initialMode="login" />
      </Suspense>
    </div>
  );
}
