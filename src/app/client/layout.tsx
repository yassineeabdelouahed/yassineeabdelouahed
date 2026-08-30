import { requireRole, getEmailVerified } from "@/lib/rbac";
import { AppHeader } from "@/components/layout/AppHeader";
import { EmailVerificationBanner } from "@/components/layout/EmailVerificationBanner";

const LINKS = [
  { href: "/client/dashboard", label: "Tableau de bord" },
  { href: "/client/mandats", label: "Mes mandats" },
  { href: "/client/jobs", label: "Mes offres publiées" },
  { href: "/client/cv-database", label: "CVthèque" },
  { href: "/", label: "Job board" },
  { href: "/client/settings", label: "Paramètres" },
];

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("CLIENT");
  const verified = await getEmailVerified(user.id);

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader homeHref="/client/dashboard" links={LINKS} userName={user.name} />
      <main className="flex-1 max-w-[1180px] w-full mx-auto px-8 py-10">
        {!verified && <EmailVerificationBanner />}
        {children}
      </main>
    </div>
  );
}
