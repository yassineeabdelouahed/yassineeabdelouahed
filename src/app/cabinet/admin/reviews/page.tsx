import { requireAdmin } from "@/lib/rbac";
import { listPendingReviewsForCabinet } from "@/server/actions/companyReviews";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { ReviewModerationActions } from "@/components/cabinet/ReviewModerationActions";

export default async function CabinetReviewsPage() {
  await requireAdmin();
  const reviews = await listPendingReviewsForCabinet();

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900 mb-2">Avis d&apos;entreprise</h1>
      <p className="text-ink-500 mb-8">Avis en attente de modération avant publication.</p>

      {reviews.length === 0 ? (
        <Card className="p-8 text-center text-ink-500">Aucun avis en attente.</Card>
      ) : (
        <div className="flex flex-col gap-3">
          {reviews.map((r) => (
            <Card key={r.id} className="p-5 flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[16px] text-ink-900">{r.company.name}</span>
                  <Tag tone="orange">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</Tag>
                </div>
                <div className="text-sm text-ink-500 mt-0.5">Par {r.author.name}</div>
                {r.comment && <p className="text-sm text-ink-700 mt-2 max-w-[480px]">{r.comment}</p>}
              </div>
              <ReviewModerationActions reviewId={r.id} />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
