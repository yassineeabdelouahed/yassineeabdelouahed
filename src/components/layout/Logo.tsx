import Link from "next/link";
import Image from "next/image";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2">
      <Image src="/logo-icon.png" alt="Talentis Consult" width={36} height={49} className="h-9 w-auto" priority />
      <span className="font-heading font-extrabold text-[19px] text-ink-900">
        Talentis<span className="text-teal">Consult</span>
      </span>
    </Link>
  );
}
