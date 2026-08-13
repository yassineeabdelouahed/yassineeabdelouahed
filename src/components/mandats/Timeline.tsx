import type { MandatStatus } from "@/generated/prisma/enums";
import { currentStep } from "@/server/services/mandatStateMachine";

const STEPS = [
  "Dépôt de la demande",
  "Réception et validation du besoin",
  "Sourcing et pré-qualification",
  "Envoi de la short-list",
  "Sélection des candidats",
  "Planification des entretiens",
  "Retour d'entretien",
  "Validation finale et clôture",
];

export function MandatTimeline({ status }: { status: MandatStatus }) {
  if (status === "CANCELLED") {
    return (
      <div className="text-sm font-semibold text-danger-text bg-danger-bg inline-block px-3 py-1.5 rounded-[var(--radius-tag)]">
        Mandat annulé
      </div>
    );
  }

  const active = currentStep(status);

  return (
    <ol className="flex flex-col gap-3">
      {STEPS.map((label, idx) => {
        const step = idx + 1;
        const done = step < active || status === "WON";
        const isCurrent = step === active && status !== "WON";

        return (
          <li key={label} className="flex items-center gap-3">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                done
                  ? "bg-teal text-white"
                  : isCurrent
                    ? "bg-teal-tint text-teal border-2 border-teal"
                    : "bg-neutral-bg text-ink-300"
              }`}
            >
              {done ? "✓" : step}
            </span>
            <span className={`text-sm ${isCurrent ? "font-semibold text-ink-900" : done ? "text-ink-700" : "text-ink-300"}`}>
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
