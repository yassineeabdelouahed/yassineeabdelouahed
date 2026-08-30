import Link from "next/link";
import { requireAdmin } from "@/lib/rbac";
import { listCompaniesForCabinet } from "@/server/actions/companies";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { CompanyVerificationToggle } from "@/components/cabinet/CompanyVerificationToggle";

export default async function CabinetCompaniesPage() {
  await requireAdmin();
  const companies = await listCompaniesForCabinet();

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900 mb-2">Entreprises</h1>
      <p className="text-ink-500 mb-8">
        Marquez comme vérifiées les entreprises dont l&apos;identité a été confirmée par le cabinet.
      </p>

      {companies.length === 0 ? (
        <Card className="p-8 text-center text-ink-500">Aucune entreprise pour l&apos;instant.</Card>
      ) : (
        <div className="flex flex-col gap-3">
          {companies.map((c) => (
            <Card key={c.id} className="p-5 flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Link href={`/companies/${c.id}`} className="font-bold text-[16px] text-ink-900 hover:text-teal">
                    {c.name}
                  </Link>
                  {c.verifiedAt && <Tag tone="success">✓ Vérifiée</Tag>}
                </div>
                <div className="text-sm text-ink-500 mt-0.5">
                  {c.sector}
                  {c.sector && c.city ? " · " : ""}
                  {c.city}
                  {" · "}
                  {c._count.jobPostings} offre(s)
                </div>
              </div>
              <CompanyVerificationToggle companyId={c.id} verified={!!c.verifiedAt} />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
