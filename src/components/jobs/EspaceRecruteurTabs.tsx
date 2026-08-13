"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { PublishJobForm } from "@/components/jobs/PublishJobForm";
import { DiffusionPanel } from "@/components/jobs/DiffusionPanel";

type Tab = "publish" | "diffuse";

export function EspaceRecruteurTabs({ canPublish }: { canPublish: boolean }) {
  const [tab, setTab] = useState<Tab>("publish");

  return (
    <div className="max-w-[680px] mx-auto px-8 -mt-7 pb-16">
      <div className="flex gap-2 bg-white border border-border rounded-[10px] p-1.5 mb-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
        <button
          type="button"
          onClick={() => setTab("publish")}
          className={`flex-1 text-center py-2.5 rounded-[7px] cursor-pointer text-sm font-bold ${
            tab === "publish" ? "text-teal bg-teal-tint" : "text-ink-500"
          }`}
        >
          Publier une offre
        </button>
        <button
          type="button"
          onClick={() => setTab("diffuse")}
          className={`flex-1 text-center py-2.5 rounded-[7px] cursor-pointer text-sm font-bold ${
            tab === "diffuse" ? "text-teal bg-teal-tint" : "text-ink-500"
          }`}
        >
          Diffuser mes offres
        </button>
      </div>

      {tab === "publish" &&
        (canPublish ? (
          <PublishJobForm />
        ) : (
          <Card className="p-8 text-center">
            <p className="text-ink-700">
              Connectez-vous avec un compte recruteur pour publier une offre.
            </p>
            <div className="flex justify-center gap-3 mt-5">
              <LinkButton href="/login?callbackUrl=/espace-recruteur" variant="primary" size="sm">
                Connexion
              </LinkButton>
              <LinkButton href="/register?callbackUrl=/espace-recruteur" variant="secondary" size="sm">
                Créer un compte
              </LinkButton>
            </div>
          </Card>
        ))}

      {tab === "diffuse" && <DiffusionPanel />}

      {canPublish && (
        <p className="text-xs text-ink-300 text-center mt-4">
          Vous gérez plusieurs mandats ?{" "}
          <Link href="/client/mandats" className="text-teal font-semibold">
            Accéder à votre espace client
          </Link>
        </p>
      )}
    </div>
  );
}
