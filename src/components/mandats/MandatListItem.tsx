import Link from "next/link";
import type { MandatStatus, MandatUrgency } from "@/generated/prisma/enums";
import { Card } from "@/components/ui/Card";
import { MandatStatusTag } from "@/components/mandats/StatusTag";
import { Tag } from "@/components/ui/Tag";

const URGENCY_LABEL: Record<MandatUrgency, string> = {
  LOW: "Urgence faible",
  MEDIUM: "Urgence moyenne",
  HIGH: "Urgence élevée",
};

export function MandatListItem({
  href,
  reference,
  title,
  status,
  urgency,
  companyName,
  createdAt,
}: {
  href: string;
  reference: string;
  title: string;
  status: MandatStatus;
  urgency: MandatUrgency;
  companyName?: string;
  createdAt: Date;
}) {
  return (
    <Link href={href}>
      <Card className="p-5 hover:border-teal hover:shadow-[var(--shadow-card-hover)] transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-ink-300">{reference}</div>
            <div className="font-bold text-[16px] text-ink-900 mt-0.5">{title}</div>
            {companyName && <div className="text-sm text-ink-500 mt-0.5">{companyName}</div>}
          </div>
          <MandatStatusTag status={status} />
        </div>
        <div className="flex items-center gap-2 mt-3">
          {urgency === "HIGH" && <Tag tone="danger">{URGENCY_LABEL[urgency]}</Tag>}
          <span className="text-xs text-ink-300">
            Déposé le {createdAt.toLocaleDateString("fr-FR")}
          </span>
        </div>
      </Card>
    </Link>
  );
}
