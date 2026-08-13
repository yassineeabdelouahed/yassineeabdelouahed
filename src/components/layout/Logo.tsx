import Link from "next/link";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5">
      <span className="w-9 h-9 rounded-[9px] bg-gradient-to-br from-teal to-teal-accent flex items-center justify-center">
        <span className="font-heading font-extrabold text-white text-[15px]">TC</span>
      </span>
      <span className="font-heading font-extrabold text-[19px] text-ink-900">
        Talentis<span className="text-teal">Consult</span>
      </span>
    </Link>
  );
}
