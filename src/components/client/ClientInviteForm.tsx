"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FormField, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { createClientInviteAction } from "@/server/actions/clientInvites";

export function ClientInviteForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.set("email", email);

      const result = await createClientInviteAction(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setEmail("");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-3">
      <div className="flex-1">
        <FormField label="Email du collègue" htmlFor="invite-email">
          <Input id="invite-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormField>
      </div>
      <Button type="submit" disabled={pending} className="mb-4">
        {pending ? "..." : "Inviter"}
      </Button>
      {error && <p className="text-sm text-danger-text mb-4">{error}</p>}
    </form>
  );
}
