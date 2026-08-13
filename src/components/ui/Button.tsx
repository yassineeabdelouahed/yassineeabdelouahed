import { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";

type Variant = "primary" | "accent" | "secondary" | "ghost" | "dark";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-[var(--radius-control)] transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50";

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-[15px] px-5 py-3",
};

const variants: Record<Variant, string> = {
  primary: "bg-teal text-white hover:bg-teal-hover",
  accent: "bg-orange text-white hover:bg-orange-hover",
  secondary: "bg-white text-teal border border-teal hover:bg-teal-tint",
  ghost: "bg-transparent text-ink-900 hover:bg-neutral-bg",
  dark: "bg-dark text-white hover:bg-ink-700",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", ...props }, ref) => (
    <button
      ref={ref}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    />
  ),
);
Button.displayName = "Button";

interface LinkButtonProps {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

export function LinkButton({ href, variant = "primary", size = "md", className = "", children }: LinkButtonProps) {
  return (
    <Link href={href} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
