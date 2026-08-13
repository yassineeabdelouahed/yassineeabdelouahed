import { getSessionUser } from "@/lib/rbac";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";

export default async function PublicJobsLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();

  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader userName={user?.name ?? null} />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
