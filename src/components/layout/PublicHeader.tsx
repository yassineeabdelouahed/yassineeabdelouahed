"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { SignOutButton } from "@/components/layout/SignOutButton";

const NAV_LINKS = [
  { href: "/", label: "Offres d'emploi", match: ["/", "/results", "/jobs"] },
  { href: "/trainings", label: "Formations", match: ["/trainings"] },
  { href: "/espace-recruteur", label: "Espace recruteur", match: ["/espace-recruteur"] },
  { href: "/about", label: "À propos", match: ["/about"] },
];

export function PublicHeader({ userName }: { userName: string | null }) {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-[1180px] mx-auto px-8 h-[72px] flex items-center justify-between">
        <div className="flex items-center gap-9">
          <Logo href="/" />
          <nav className="flex items-center gap-7 h-full">
            {NAV_LINKS.map((link) => {
              const active = link.match.some((m) => (m === "/" ? pathname === "/" : pathname.startsWith(m)));
              return (
                <Link key={link.href} href={link.href} className="h-full flex flex-col justify-center pt-[26px]">
                  <span className={`text-[15px] font-semibold ${active ? "text-ink-900" : "text-ink-700"}`}>
                    {link.label}
                  </span>
                  {active && <div className="h-[3px] bg-teal rounded mt-1.5" />}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3.5">
          {userName ? (
            <>
              <span className="text-sm text-ink-500 hidden sm:inline">{userName}</span>
              <SignOutButton />
            </>
          ) : (
            <Link href="/login" className="text-[15px] font-semibold text-ink-900 hover:text-teal">
              Connexion
            </Link>
          )}
          <Link href="/espace-recruteur">
            <Button size="sm">Publier une offre</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
