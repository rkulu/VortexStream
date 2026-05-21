import { getSeriesList } from "@/lib/api";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function SeriesListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;

  let data;
  try {
    data = await getSeriesList(currentPage);
  } catch {
    data = { data: [], pagination: null };
  }

  const items = data.data || [];
  const pagination = data.pagination;

  const getHref = (item: typeof items[0]) => {
    if (item.type === "film") return `/film/${item.id}`;
    if (item.type === "series") return `/series/${item.id}`;
    return `/anime/${item.id}`;
  };

  const getBadge = (item: typeof items[0]) => {
    if (item.type) return item.type;
    return undefined;
  };

  const getSubtitle = (item: typeof items[0]) => {
    if (item.rating && item.rating !== "0" && item.rating !== "-") return `⭐ ${item.rating}`;
    if (item.episode) return item.episode;
    if (item.time) return item.time;
    return undefined;
  };

  return (
    <div>
      <div className="liquid-glass rounded-2xl p-6 mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Series List</h1>
      </div>

      {items.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {items.map((item) => (
              <GlassCard
                key={item.id}
                href={getHref(item)}
                title={item.title}
                image={item.image}
                subtitle={getSubtitle(item)}
                badge={getBadge(item)}
              />
            ))}
          </div>

          {pagination && pagination.total_pages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {pagination.has_prev_page && (
                <Link
                  href={`/series?page=${pagination.prev_page}`}
                  className="glass-button px-4 py-2 text-sm text-zinc-300"
                >
                  ← Prev
                </Link>
              )}
              <span className="glass-button px-4 py-2 text-sm text-zinc-300">
                Page {pagination.current_page} of {pagination.total_pages}
              </span>
              {pagination.has_next_page && (
                <Link
                  href={`/series?page=${pagination.next_page}`}
                  className="glass-button px-4 py-2 text-sm text-zinc-300"
                >
                  Next →
                </Link>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-zinc-400">No results found.</p>
        </div>
      )}
    </div>
  );
}
