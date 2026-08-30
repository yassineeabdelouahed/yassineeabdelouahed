"use client";

import { useState, useTransition } from "react";
import { signOut } from "next-auth/react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { deleteAccountAction } from "@/server/actions/accountDeletion";

const CONFIRM_WORD = "SUPPRIMER";

export function DeleteAccountSection() {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    setError(null);
    startTransition(async () => {
      const result = await deleteAccountAction();
      if (!result.ok) {
        setError(result.error);
        return;
      }
      await signOut({ callbackUrl: "/" });
    });
  }

  return (
    <Card className="p-6 border-danger-text/20">
      <div className="font-heading font-extrabold text-base text-danger-text mb-2">Zone de danger</div>
      {!open ? (
        <>
          <p className="text-sm text-ink-500 mb-4">
            Supprimer définitivement votre compte et vos données personnelles.
          </p>
          <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
            Supprimer mon compte
          </Button>
        </>
      ) : (
        <div>
          <p className="text-sm text-ink-700 mb-3">
            Cette action est irréversible : votre nom, e-mail, téléphone, CV et préférences seront supprimés ou
            anonymisés. Les échanges et candidatures déjà liés à d&apos;autres utilisateurs sont conservés,
            mais votre identité y apparaîtra comme &quot;Utilisateur supprimé&quot;.
          </p>
          <p className="text-sm text-ink-700 mb-2">
            Tapez <strong>{CONFIRM_WORD}</strong> pour confirmer :
          </p>
          <Input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="mb-3 max-w-[240px]"
          />
          {error && <p className="text-sm text-danger-text mb-3">{error}</p>}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={confirmText !== CONFIRM_WORD || pending}
              style={{ color: "var(--color-danger-text)" }}
            >
              {pending ? "Suppression..." : "Confirmer la suppression définitive"}
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setOpen(false)} disabled={pending}>
              Annuler
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
