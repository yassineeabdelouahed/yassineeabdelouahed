"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FormField, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { createInviteAction } from "@/server/actions/invites";

export function InviteForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.set("email", email);
      if (isAdmin) formData.set("isAdmin", "on");

      const result = await createInviteAction(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setEmail("");
      setIsAdmin(false);
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-3">
      <div className="flex-1">
        <FormField label="Email du collaborateur" htmlFor="invite-email">
          <Input
            id="invite-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>
      </div>
      <label className="flex items-center gap-2 text-sm text-ink-700 mb-4 cursor-pointer">
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
        Admin
      </label>
      <Button type="submit" disabled={pending} className="mb-4">
        {pending ? "..." : "Inviter"}
      </Button>
      {error && <p className="text-sm text-danger-text mb-4">{error}</p>}
    </form>
  );
}
