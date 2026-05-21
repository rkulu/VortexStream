import GlassCard from "@/components/GlassCard";
import Link from "next/link";
import { PaginationData } from "@/lib/types";

interface AnimeItem {
  id: string;
  title: string;
  image: string | null;
  type?: string;
  status?: string;
  episode?: string;
  rating?: string;
  rank?: string;
}

interface ListPageProps {
  title: string;
  items: AnimeItem[];
  currentPage: number;
  basePath: string;
  pagination?: PaginationData;
}

export default function ListPage({
  title,
  items,
  currentPage,
  basePath,
  pagination,
}: ListPageProps) {
  const getHref = (item: AnimeItem) => {
    if (item.type === "film") return `/film/${item.id}`;
    if (item.type === "series") return `/series/${item.id}`;
    return `/anime/${item.id}`;
  };

  const getBadge = (item: AnimeItem) => {
    if (item.rank) return item.rank;
    if (item.episode) return item.episode;
    if (item.type) return item.type;
    return undefined;
  };

  const getSubtitle = (item: AnimeItem) => {
    if (item.rating && item.rating !== "0" && item.rating !== "-") return `⭐ ${item.rating}`;
    if (item.episode) return item.episode;
    if (item.type) return item.type;
    return undefined;
  };

  const hasPrev = pagination?.has_prev_page ?? false;
  const hasNext = pagination?.has_next_page ?? false;
  const totalPages = pagination?.total_pages;
  const prevPage = pagination?.prev_page ?? currentPage - 1;
  const nextPage = pagination?.next_page ?? currentPage + 1;

  return (
    <div>
      <div className="liquid-glass rounded-2xl p-6 mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
        {totalPages && (
          <p className="text-zinc-400 text-sm">
            Halaman {currentPage} dari {totalPages}
          </p>
        )}
      </div>

      {items.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {items.map((item) => (
              <GlassCard
                key={item.id}
                href={getHref(item)}
                title={item.title}
                image={item.image ?? "/placeholder.png"}
                subtitle={getSubtitle(item)}
                badge={getBadge(item)}
              />
            ))}
          </div>

          {totalPages && totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {hasPrev && (
                <Link
                  href={`${basePath}?page=${prevPage}`}
                  className="glass-button px-4 py-2 text-sm text-zinc-300"
                >
                  ← Prev
                </Link>
              )}
              <span className="glass-button px-4 py-2 text-sm text-zinc-300">
                {currentPage} / {totalPages}
              </span>
              {hasNext && (
                <Link
                  href={`${basePath}?page=${nextPage}`}
                  className="glass-button px-4 py-2 text-sm text-zinc-300"
                >
                  Next →
                </Link>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🎬</div>
          <p className="text-zinc-400 text-lg font-medium">Tidak ada konten tersedia.</p>
          <p className="text-zinc-600 text-sm mt-1">Coba kembali beberapa saat lagi.</p>
        </div>
      )}
    </div>
  );
}
