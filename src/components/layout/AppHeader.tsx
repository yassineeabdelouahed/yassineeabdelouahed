import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { SignOutButton } from "@/components/layout/SignOutButton";

export function AppHeader({
  homeHref,
  links,
  userName,
}: {
  homeHref: string;
  links: { href: string; label: string }[];
  userName: string;
}) {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-[1180px] mx-auto px-8 h-[72px] flex items-center justify-between">
        <div className="flex items-center gap-9">
          <Logo href={homeHref} />
          <nav className="flex items-center gap-7">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] font-semibold text-ink-900 hover:text-teal"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-ink-500 hidden sm:inline">{userName}</span>
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
