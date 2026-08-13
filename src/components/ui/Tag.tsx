type Tone = "teal" | "orange" | "neutral" | "success" | "warning" | "danger";

const tones: Record<Tone, string> = {
  teal: "text-teal bg-teal-tint",
  orange: "text-orange-text bg-orange-tint",
  neutral: "text-neutral-text bg-neutral-bg",
  success: "text-success-text bg-success-bg",
  warning: "text-warning-text bg-warning-bg",
  danger: "text-danger-text bg-danger-bg",
};

export function Tag({ tone = "neutral", children }: { tone?: Tone; children: React.ReactNode }) {
  return (
    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-[var(--radius-tag)] ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function Pill({ tone = "neutral", children }: { tone?: Tone; children: React.ReactNode }) {
  return (
    <span className={`inline-block text-xs font-semibold px-3.5 py-1.5 rounded-full ${tones[tone]}`}>
      {children}
    </span>
  );
}
