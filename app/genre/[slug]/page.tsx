import { getGenreBySlug } from "@/lib/api";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function GenreDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;

  let data;
  try {
    data = await getGenreBySlug(slug, currentPage);
  } catch {
    notFound();
  }

  const genreName = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const getHref = (item: typeof data.results[0]) => {
    if (item.type === "film") return `/film/${item.id}`;
    if (item.type === "series") return `/series/${item.id}`;
    return `/anime/${item.id}`;
  };

  const getBadge = (item: typeof data.results[0]) => {
    if (item.type) return item.type;
    return undefined;
  };

  const getSubtitle = (item: typeof data.results[0]) => {
    if (item.rating && item.rating !== "0") return `⭐ ${item.rating}`;
    if (item.episode) return item.episode;
    if (item.type) return item.type;
    return undefined;
  };

  return (
    <div>
      <div className="liquid-glass rounded-2xl p-6 mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Genre: {genreName}</h1>
        <Link href="/genre" className="text-sm text-accent hover:text-accent-hover">
          ← All Genres
        </Link>
      </div>

      {data.results && data.results.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {data.results.map((item) => (
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

          {data.pagination && (
            <div className="flex justify-center gap-2 mt-8">
              {data.pagination.hasPrev && (
                <Link
                  href={`/genre/${slug}?page=${currentPage - 1}`}
                  className="glass-button px-4 py-2 text-sm text-zinc-300"
                >
                  ← Prev
                </Link>
              )}
              <span className="glass-button px-4 py-2 text-sm text-zinc-300">
                Page {currentPage} of {data.pagination.totalPages}
              </span>
              {data.pagination.hasNext && (
                <Link
                  href={`/genre/${slug}?page=${currentPage + 1}`}
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
          <p className="text-zinc-400">No anime found for this genre.</p>
        </div>
      )}
    </div>
  );
}
