"use client";

export function PillTabs<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex gap-2 bg-neutral-bg rounded-[9px] p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 text-center py-2.5 rounded-[7px] cursor-pointer text-[13px] font-bold transition-colors ${
            value === opt.value ? "text-teal bg-white" : "text-ink-500"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function UnderlineTabs<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex gap-5 border-b border-border">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`pb-2.5 cursor-pointer text-sm font-bold border-b-2 -mb-px transition-colors ${
            value === opt.value ? "text-ink-900 border-teal" : "text-ink-300 border-transparent"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
