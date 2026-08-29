"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { sendDirectMessageAction } from "@/server/actions/messages";

type Message = {
  id: string;
  body: string;
  createdAt: Date;
  sender: { name: string; role: "CLIENT" | "CABINET" | "CANDIDATE" };
};

const ROLE_LABEL: Record<Message["sender"]["role"], string> = {
  CLIENT: "Recruteur",
  CABINET: "Cabinet",
  CANDIDATE: "Candidat",
};

export function DirectMessageThread({ applicationId, messages }: { applicationId: string; messages: Message[] }) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const formData = new FormData();
    formData.set("body", body);

    startTransition(async () => {
      const result = await sendDirectMessageAction(applicationId, formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setBody("");
      router.refresh();
    });
  }

  return (
    <div>
      <div className="flex flex-col gap-3 mb-4 max-h-[420px] overflow-y-auto">
        {messages.length === 0 && (
          <p className="text-sm text-ink-500">Aucun message pour l&apos;instant — lancez la conversation.</p>
        )}
        {messages.map((m) => (
          <div key={m.id} className="bg-neutral-bg rounded-[var(--radius-control)] p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-ink-700">
                {m.sender.name} · {ROLE_LABEL[m.sender.role]}
              </span>
              <span className="text-xs text-ink-300">
                {m.createdAt.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}
              </span>
            </div>
            <p className="text-sm text-ink-900 whitespace-pre-wrap">{m.body}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Textarea
          rows={3}
          placeholder="Écrire un message..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        {error && <p className="text-sm text-danger-text">{error}</p>}
        <Button type="submit" size="sm" disabled={pending} className="self-end">
          {pending ? "..." : "Envoyer"}
        </Button>
      </form>
    </div>
  );
}
