import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { listPublishedJobs } from "@/server/actions/jobs";
import { CATEGORIES } from "@/lib/validations/jobs";
import { SearchBar } from "@/components/jobs/SearchBar";
import { JobCard } from "@/components/jobs/JobCard";
import { LinkButton } from "@/components/ui/Button";

export default async function HomePage() {
  const [jobs, jobCount, companyCount] = await Promise.all([
    listPublishedJobs({ sort: "recent" }),
    prisma.jobPosting.count({ where: { status: "PUBLISHED" } }),
    prisma.company.count({ where: { jobPostings: { some: { status: "PUBLISHED" } } } }),
  ]);
  const featuredJobs = jobs.slice(0, 4);

  return (
    <div>
      <div
        className="relative overflow-hidden px-8 pt-16 pb-24"
        style={{ background: "linear-gradient(120deg,#0b3b36 0%,#0f766e 55%,#14b8a6 100%)" }}
      >
        <div
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(251,146,60,0.28), transparent 70%)" }}
        />
        <div className="max-w-[820px] mx-auto text-center relative">
          <div className="inline-block bg-white/15 text-[#e6fffb] text-[13px] font-semibold px-3.5 py-1.5 rounded-full mb-5">
            +{jobCount} offres actives au Maroc
          </div>
          <h1 className="font-heading font-extrabold text-4xl text-white leading-tight">
            Trouvez le poste qui vous correspond vraiment.
          </h1>
          <p className="text-[17px] text-teal-tint mt-3.5">
            Talentis Consult connecte candidats et recruteurs, sans détour.
          </p>
        </div>

        <SearchBar variant="hero" />

        <div className="max-w-[760px] mx-auto mt-5.5 flex justify-center gap-2.5 flex-wrap">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/results?category=${encodeURIComponent(cat)}`}
              className="cursor-pointer bg-white/12 hover:bg-white/22 text-white text-[13px] font-semibold px-4 py-1.5 rounded-full border border-white/30 transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-8 pt-11 flex justify-around text-center flex-wrap gap-6">
        <div>
          <div className="font-heading font-extrabold text-[28px] text-teal">{jobCount}</div>
          <div className="text-[13px] text-ink-500 mt-1">offres actives</div>
        </div>
        <div>
          <div className="font-heading font-extrabold text-[28px] text-teal">{companyCount}</div>
          <div className="text-[13px] text-ink-500 mt-1">entreprises partenaires</div>
        </div>
        <div>
          <div className="font-heading font-extrabold text-[28px] text-teal">48h</div>
          <div className="text-[13px] text-ink-500 mt-1">délai moyen de réponse</div>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-8 pt-14">
        <div className="flex justify-between items-baseline mb-5.5">
          <div className="font-heading font-extrabold text-2xl text-ink-900">Offres à la une</div>
          <Link href="/results" className="text-teal font-semibold text-sm hover:text-teal-hover">
            Voir toutes les offres →
          </Link>
        </div>
        {featuredJobs.length === 0 ? (
          <p className="text-ink-500">Aucune offre publiée pour l&apos;instant.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>

      <div className="max-w-[1180px] mx-auto px-8 pt-14 pb-16">
        <div className="bg-gradient-to-br from-dark to-[#1e293b] rounded-2xl p-11 flex items-center justify-between gap-7 flex-wrap">
          <div>
            <div className="font-heading font-extrabold text-2xl text-white">Vous recrutez ?</div>
            <p className="text-[15px] text-[#cbd5e1] mt-2 max-w-[420px]">
              Publiez une offre en quelques minutes et recevez vos premières candidatures dès aujourd&apos;hui.
            </p>
          </div>
          <LinkButton href="/espace-recruteur" variant="accent">
            Publier une offre
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
