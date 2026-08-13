"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-sm font-semibold text-ink-500 hover:text-teal cursor-pointer"
    >
      Déconnexion
    </button>
  );
}
