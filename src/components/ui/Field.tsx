import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";

const controlClass =
  "w-full border border-border rounded-[var(--radius-control)] px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-teal transition-colors bg-white placeholder:text-ink-300";

export function Label({ children, htmlFor }: { children: ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-[13px] font-semibold text-ink-700 mb-1.5">
      {children}
    </label>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${controlClass} ${props.className ?? ""}`} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${controlClass} resize-vertical ${props.className ?? ""}`} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${controlClass} ${props.className ?? ""}`} />;
}

export function FormField({
  label,
  htmlFor,
  children,
  error,
}: {
  label: string;
  htmlFor?: string;
  children: ReactNode;
  error?: string;
}) {
  return (
    <div className="mb-4">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? <p className="mt-1 text-xs text-danger-text">{error}</p> : null}
    </div>
  );
}
