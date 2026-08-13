import { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-card border border-border rounded-[var(--radius-card)] ${className}`}
      {...props}
    />
  );
}

export function FloatingCard({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-card border border-border rounded-[var(--radius-modal)] shadow-[var(--shadow-float)] ${className}`}
      {...props}
    />
  );
}
