import { requireRole } from "@/lib/rbac";
import { AppHeader } from "@/components/layout/AppHeader";

const LINKS = [
  { href: "/cabinet/dashboard", label: "Tableau de bord" },
  { href: "/cabinet/mandats", label: "Mandats" },
  { href: "/cabinet/prospects", label: "Prospection" },
  { href: "/cabinet/candidates", label: "Candidats" },
  { href: "/cabinet/jobs", label: "Offres" },
  { href: "/cabinet/training/courses", label: "Formations" },
  { href: "/cabinet/settings", label: "Paramètres" },
];

export default async function CabinetLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("CABINET");

  const links = user.isAdmin
    ? [
        ...LINKS,
        { href: "/cabinet/admin/invites", label: "Admin" },
        { href: "/cabinet/admin/cv-access", label: "CVthèque" },
        { href: "/cabinet/admin/reviews", label: "Avis" },
        { href: "/cabinet/admin/companies", label: "Entreprises" },
        { href: "/cabinet/admin/kpi", label: "Statistiques" },
        { href: "/cabinet/admin/facturation", label: "Facturation" },
      ]
    : LINKS;

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader homeHref="/cabinet/dashboard" links={links} userName={user.name} />
      <main className="flex-1 max-w-[1180px] w-full mx-auto px-8 py-10">{children}</main>
    </div>
  );
}
