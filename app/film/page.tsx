import { getFilmList } from "@/lib/api";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function FilmListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;

  let data;
  try {
    data = await getFilmList(currentPage);
  } catch {
    data = { data: [], pagination: null };
  }

  const items = data.data || [];
  const pagination = data.pagination;

  const getSubtitle = (item: typeof items[0]) => {
    if (item.rating && item.rating !== "0" && item.rating !== "-") return `⭐ ${item.rating}`;
    if (item.time) return item.time;
    return undefined;
  };

  return (
    <div>
      <div className="liquid-glass rounded-2xl p-6 mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Film List</h1>
      </div>

      {items.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {items.map((item) => (
              <GlassCard
                key={item.id}
                href={`/film/${item.id}`}
                title={item.title}
                image={item.image}
                subtitle={getSubtitle(item)}
                badge={item.type}
              />
            ))}
          </div>

          {pagination && pagination.total_pages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {pagination.has_prev_page && (
                <Link
                  href={`/film?page=${pagination.prev_page}`}
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
                  href={`/film?page=${pagination.next_page}`}
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
