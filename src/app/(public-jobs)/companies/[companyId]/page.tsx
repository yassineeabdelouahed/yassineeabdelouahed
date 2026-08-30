import { notFound } from "next/navigation";
import { getCompanyPublicProfile, getReviewEligibility } from "@/server/actions/companyReviews";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { CompanyReviewSection } from "@/components/companies/CompanyReviewSection";

export default async function CompanyProfilePage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const profile = await getCompanyPublicProfile(companyId);
  if (!profile) notFound();

  const { company, reviews, averageRating } = profile;
  const eligibility = await getReviewEligibility(companyId);

  const initials = company.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="max-w-[820px] mx-auto px-8 py-12">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-[9px] bg-dark text-white flex items-center justify-center font-heading font-extrabold text-lg shrink-0">
          {initials}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl text-ink-900">{company.name}</h1>
            {company.verifiedAt && <Tag tone="success">✓ Entreprise vérifiée</Tag>}
          </div>
          <div className="text-sm text-ink-500 mt-1">
            {company.sector}
            {company.sector && company.city ? " · " : ""}
            {company.city}
          </div>
        </div>
      </div>

      <div className="h-px bg-border my-8" />

      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-extrabold text-lg text-ink-900">Avis des candidats</h2>
        {averageRating !== null && (
          <Tag tone="orange">
            {"★".repeat(Math.round(averageRating))} {averageRating.toFixed(1)}/5 ({reviews.length} avis)
          </Tag>
        )}
      </div>

      {reviews.length === 0 ? (
        <p className="text-sm text-ink-500 mb-8">Aucun avis pour l&apos;instant.</p>
      ) : (
        <div className="flex flex-col gap-3 mb-8">
          {reviews.map((r) => (
            <Card key={r.id} className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-orange font-bold">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                <span className="text-xs text-ink-300">{r.createdAt.toLocaleDateString("fr-FR")}</span>
              </div>
              {r.comment && <p className="text-sm text-ink-700 mt-2">{r.comment}</p>}
              <div className="text-xs text-ink-300 mt-2">{r.author.name}</div>
            </Card>
          ))}
        </div>
      )}

      <CompanyReviewSection
        companyId={companyId}
        canReview={eligibility.canReview}
        alreadyReviewed={eligibility.alreadyReviewed}
      />
    </div>
  );
}
