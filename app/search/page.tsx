import { searchAnime } from "@/lib/api";
import SearchPageClient from "./SearchPageClient";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;
  let results: any[] = [];
  let pagination: any = undefined;

  if (q) {
    try {
      const data = await searchAnime(q, currentPage);
      results = data.results || [];
      pagination = data.pagination;
    } catch {
      results = [];
    }
  }

  return (
    <SearchPageClient
      initialResults={results}
      initialQuery={q || ""}
      initialPagination={pagination}
    />
  );
}
