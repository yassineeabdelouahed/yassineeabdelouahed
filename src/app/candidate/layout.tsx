import { requireRole } from "@/lib/rbac";
import { AppHeader } from "@/components/layout/AppHeader";

const LINKS = [
  { href: "/candidate/dashboard", label: "Tableau de bord" },
  { href: "/candidate/applications", label: "Mes candidatures" },
  { href: "/candidate/alerts", label: "Mes alertes" },
  { href: "/candidate/trainings", label: "Mes formations" },
  { href: "/candidate/profile", label: "Mon profil" },
  { href: "/", label: "Voir les offres" },
];

export default async function CandidateLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("CANDIDATE");

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader homeHref="/candidate/dashboard" links={LINKS} userName={user.name} />
      <main className="flex-1 max-w-[1180px] w-full mx-auto px-8 py-10">{children}</main>
    </div>
  );
}
