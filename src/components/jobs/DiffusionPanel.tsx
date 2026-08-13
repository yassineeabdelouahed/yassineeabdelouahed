"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";

const SOURCES = [
  { id: "francetravail", label: "France Travail", initials: "FT", color: "#0D47A1", official: true },
  { id: "linkedin", label: "LinkedIn", initials: "in", color: "#0A66C2", official: false },
  { id: "indeed", label: "Indeed", initials: "Id", color: "#003A9B", official: false },
  { id: "apec", label: "APEC", initials: "AP", color: "#E4032E", official: false },
  { id: "meteojob", label: "Meteojob", initials: "MJ", color: "#FF7A00", official: false },
  { id: "hellowork", label: "HelloWork", initials: "HW", color: "#00B2A9", official: false },
  { id: "rekrute", label: "Rekrute", initials: "RK", color: "#7C3AED", official: false },
] as const;

export function DiffusionPanel() {
  const [ftStatus, setFtStatus] = useState<"idle" | "connecting" | "connected">("idle");
  const [requested, setRequested] = useState<Record<string, boolean>>({});

  function connectFranceTravail() {
    setFtStatus("connecting");
    setTimeout(() => setFtStatus("connected"), 1100);
  }

  function requestPartnerAccess(id: string) {
    setRequested((prev) => ({ ...prev, [id]: true }));
  }

  return (
    <Card className="p-7">
      <div className="font-heading font-extrabold text-[17px] text-ink-900">
        Diffuser vos offres sur les autres sites d&apos;emploi
      </div>
      <p className="text-[13px] text-ink-300 mt-1.5 leading-relaxed">
        France Travail propose une API officielle ouverte : la connexion est réelle à intégrer côté serveur. Les
        autres plateformes n&apos;ouvrent pas leur diffusion au grand public — elles nécessitent un partenariat
        commercial (ex. LinkedIn Talent Solutions, Indeed Employer API).
      </p>

      <div className="flex flex-col gap-2.5 mt-5">
        {SOURCES.map((src) => {
          const connected = src.official && ftStatus === "connected";
          const connecting = src.official && ftStatus === "connecting";
          const partnerRequested = !src.official && requested[src.id];

          const statusLabel = src.official
            ? connected
              ? "✓ Connecté · API officielle"
              : "API officielle disponible"
            : partnerRequested
              ? "✓ Demande envoyée"
              : "Partenariat requis";
          const statusColor = connected || partnerRequested ? "text-success-text" : src.official ? "text-teal" : "text-warning-text";

          const actionLabel = src.official
            ? connecting
              ? "Connexion..."
              : connected
                ? "Connecté"
                : "Connecter l'API"
            : partnerRequested
              ? "Demande envoyée"
              : "Demander l'accès";
          const actionDisabled = connected || connecting || partnerRequested;

          return (
            <div key={src.id} className="flex items-center justify-between border border-border rounded-[10px] px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div
                  className="w-8.5 h-8.5 rounded-lg text-white font-extrabold text-xs flex items-center justify-center shrink-0"
                  style={{ background: src.color }}
                >
                  {src.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink-900">{src.label}</div>
                  <div className={`text-xs font-semibold mt-0.5 ${statusColor}`}>{statusLabel}</div>
                </div>
              </div>
              <button
                type="button"
                disabled={actionDisabled}
                onClick={() => (src.official ? connectFranceTravail() : requestPartnerAccess(src.id))}
                className={`text-xs font-bold px-4 py-2 rounded-lg whitespace-nowrap ${
                  actionDisabled
                    ? connected || partnerRequested
                      ? "bg-success-bg text-success-text cursor-default"
                      : "bg-teal text-white cursor-wait"
                    : src.official
                      ? "bg-teal text-white cursor-pointer hover:bg-teal-hover"
                      : "bg-neutral-bg text-ink-700 cursor-pointer hover:bg-border"
                }`}
              >
                {actionLabel}
              </button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
