import { listPublishedJobs } from "@/server/actions/jobs";
import { getSessionUser } from "@/lib/rbac";
import { SearchBar } from "@/components/jobs/SearchBar";
import { FiltersSidebar } from "@/components/jobs/FiltersSidebar";
import { JobCard } from "@/components/jobs/JobCard";
import { CreateAlertButton } from "@/components/jobs/CreateAlertButton";

type SearchParams = {
  keyword?: string;
  location?: string;
  category?: string;
  contract?: string | string[];
  remote?: string;
  sort?: string;
};

export default async function ResultsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const contracts = params.contract ? (Array.isArray(params.contract) ? params.contract : [params.contract]) : [];

  const [jobs, user] = await Promise.all([
    listPublishedJobs({
      keyword: params.keyword,
      location: params.location,
      category: params.category,
      contracts,
      remoteOnly: params.remote === "1",
      sort: params.sort === "salary" ? "salary" : "recent",
    }),
    getSessionUser(),
  ]);

  return (
    <div className="max-w-[1180px] mx-auto px-8 py-8">
      <SearchBar variant="compact" defaultKeyword={params.keyword} defaultLocation={params.location} />
      <div className="flex items-center justify-between mb-6 px-0.5 flex-wrap gap-2">
        <div className="text-sm text-ink-500">
          {jobs.length} {jobs.length === 1 ? "offre correspond" : "offres correspondent"} à votre recherche
        </div>
        <CreateAlertButton isAuthenticated={!!user} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-7">
        <FiltersSidebar />

        <div className="flex flex-col gap-3.5">
          {jobs.length === 0 ? (
            <div className="text-center py-12 text-ink-500">Aucune offre ne correspond à ces critères.</div>
          ) : (
            jobs.map((job) => <JobCard key={job.id} job={job} showCategory />)
          )}
        </div>
      </div>
    </div>
  );
}
