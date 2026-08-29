"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { deleteJobAlertAction } from "@/server/actions/jobAlerts";

type Alert = { id: string; keyword: string | null; location: string | null; category: string | null; createdAt: Date };

export function AlertList({ alerts }: { alerts: Alert[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteJobAlertAction(id);
      router.refresh();
    });
  }

  if (alerts.length === 0) {
    return <Card className="p-8 text-center text-ink-500">Aucune alerte enregistrée.</Card>;
  }

  return (
    <div className="flex flex-col gap-3">
      {alerts.map((alert) => (
        <Card key={alert.id} className="p-4 flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {alert.keyword && <Tag tone="teal">{alert.keyword}</Tag>}
            {alert.location && <Tag tone="orange">{alert.location}</Tag>}
            {alert.category && <Tag tone="neutral">{alert.category}</Tag>}
          </div>
          <button
            type="button"
            onClick={() => handleDelete(alert.id)}
            disabled={pending}
            className="text-xs font-semibold text-danger-text hover:underline cursor-pointer"
          >
            Supprimer
          </button>
        </Card>
      ))}
    </div>
  );
}
