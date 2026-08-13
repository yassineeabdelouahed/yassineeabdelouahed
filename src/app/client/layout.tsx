import { requireRole } from "@/lib/rbac";
import { AppHeader } from "@/components/layout/AppHeader";

const LINKS = [
  { href: "/client/dashboard", label: "Tableau de bord" },
  { href: "/client/mandats", label: "Mes mandats" },
  { href: "/client/jobs/new", label: "Publier une offre" },
];

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("CLIENT");

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader homeHref="/client/dashboard" links={LINKS} userName={user.name} />
      <main className="flex-1 max-w-[1180px] w-full mx-auto px-8 py-10">{children}</main>
    </div>
  );
}
