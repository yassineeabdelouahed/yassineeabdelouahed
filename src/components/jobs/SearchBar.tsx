"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function SearchBar({
  variant = "hero",
  defaultKeyword = "",
  defaultLocation = "",
}: {
  variant?: "hero" | "compact";
  defaultKeyword?: string;
  defaultLocation?: string;
}) {
  const router = useRouter();
  const [keyword, setKeyword] = useState(defaultKeyword);
  const [location, setLocation] = useState(defaultLocation);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    if (location) params.set("location", location);
    router.push(`/results?${params.toString()}`);
  }

  const isHero = variant === "hero";

  return (
    <form
      onSubmit={handleSubmit}
      className={
        isHero
          ? "max-w-[760px] mx-auto mt-9 bg-white rounded-[14px] shadow-[0_20px_45px_rgba(4,30,27,0.25)] p-3 flex gap-2.5"
          : "bg-white border border-border rounded-[var(--radius-card)] p-3.5 flex gap-2.5 mb-2"
      }
    >
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Intitulé du poste, mots-clés"
        className={
          isHero
            ? "flex-[1.3] border-none outline-none text-[15px] px-4 py-3.5 text-ink-900"
            : "flex-[1.3] border border-border rounded-lg outline-none text-sm px-3.5 py-2.5"
        }
      />
      {isHero && <div className="w-px bg-border my-2" />}
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Ville ou région"
        className={
          isHero
            ? "flex-1 border-none outline-none text-[15px] px-4 py-3.5 text-ink-900"
            : "flex-1 border border-border rounded-lg outline-none text-sm px-3.5 py-2.5"
        }
      />
      <Button type="submit" variant="accent" size={isHero ? "md" : "sm"}>
        Rechercher
      </Button>
    </form>
  );
}
