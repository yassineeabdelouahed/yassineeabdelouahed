"use client";

import { useState } from "react";

export function ClientInviteLink({ token }: { token: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = `${window.location.origin}/register/client-team?token=${token}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="text-xs font-semibold text-teal hover:text-teal-hover cursor-pointer"
    >
      {copied ? "Lien copié !" : "Copier le lien d'invitation"}
    </button>
  );
}
