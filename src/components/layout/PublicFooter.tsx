import Link from "next/link";

const LEGAL_LINKS = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/cgu", label: "CGU" },
  { href: "/cgv", label: "CGV" },
];

export function PublicFooter() {
  return (
    <div className="bg-dark px-8 py-10">
      <div className="max-w-[1180px] mx-auto flex items-center justify-between flex-wrap gap-4">
        <div className="font-heading font-extrabold text-base text-white">
          Talentis<span className="text-teal-accent">Consult</span>
        </div>
        <nav className="flex items-center gap-4 flex-wrap">
          {LEGAL_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-[13px] text-ink-300 hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="text-[13px] text-ink-300">© 2026 Talentis Consult · talentisconsult.com</div>
      </div>
    </div>
  );
}
