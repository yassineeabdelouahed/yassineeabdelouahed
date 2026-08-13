import { getSessionUser, homeForRole } from "@/lib/rbac";
import { redirect } from "next/navigation";
import { LinkButton } from "@/components/ui/Button";

export default async function HomePage() {
  const user = await getSessionUser();
  if (user) redirect(homeForRole(user.role));

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-8"
      style={{ background: "linear-gradient(120deg,#0b3b36 0%,#0f766e 55%,#14b8a6 100%)" }}
    >
      <div className="mb-8">
        <span className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mx-auto">
          <span className="font-heading font-extrabold text-white text-2xl">TC</span>
        </span>
      </div>
      <h1 className="font-heading font-extrabold text-4xl text-white max-w-xl">
        Talentis Connect
      </h1>
      <p className="text-teal-tint mt-4 max-w-md">
        La plateforme qui connecte entreprises, cabinet de recrutement et candidats sur un
        parcours unique, transparent et mesurable.
      </p>
      <div className="flex gap-4 mt-8">
        <LinkButton href="/login" variant="accent">
          Connexion
        </LinkButton>
        <LinkButton href="/register" variant="secondary">
          Créer un compte
        </LinkButton>
      </div>
    </div>
  );
}
