import { getCatalog, getGenres } from "@/lib/api";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const [catalogData, genresData] = await Promise.all([
    getCatalog(params).catch(() => ({ results: [], pagination: undefined }) as any),
    getGenres().catch(() => ({ data: [] })),
  ]);

  const genres = genresData.data || [];

  const getHref = (item: typeof catalogData.results[0]) => {
    if (item.type === "film") return `/film/${item.id}`;
    if (item.type === "series") return `/series/${item.id}`;
    return `/anime/${item.id}`;
  };

  const getBadge = (item: typeof catalogData.results[0]) => {
    if (item.type) return item.type;
    return undefined;
  };

  const getSubtitle = (item: typeof catalogData.results[0]) => {
    if (item.rating && item.rating !== "0") return `⭐ ${item.rating}`;
    if (item.episode) return item.episode;
    if (item.type) return item.type;
    return undefined;
  };

  return (
    <div>
      <div className="liquid-glass rounded-2xl p-6 mb-8">
        <h1 className="text-2xl font-bold text-white mb-4">Catalog</h1>
        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Genre</label>
            <select
              name="genre"
              defaultValue={params.genre || ""}
              className="w-full glass-input px-4 py-2 text-foreground"
            >
              <option value="">All Genres</option>
              {genres.map((g) => {
                const slug = g.slug || g.name.toLowerCase().replace(/\s+/g, "-");
                return (
                  <option key={slug} value={slug}>
                    {g.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Type</label>
            <select
              name="type"
              defaultValue={params.type || ""}
              className="w-full glass-input px-4 py-2 text-foreground"
            >
              <option value="">All Types</option>
              <option value="tv">TV</option>
              <option value="movie">Movie</option>
              <option value="ova">OVA</option>
              <option value="ona">ONA</option>
              <option value="special">Special</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Status</label>
            <select
              name="status"
              defaultValue={params.status || ""}
              className="w-full glass-input px-4 py-2 text-foreground"
            >
              <option value="">All Status</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Sort</label>
            <select
              name="sort"
              defaultValue={params.sort || ""}
              className="w-full glass-input px-4 py-2 text-foreground"
            >
              <option value="">Default</option>
              <option value="latest">Latest</option>
              <option value="popular">Popular</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <div className="sm:col-span-2 lg:col-span-4">
            <button
              type="submit"
              className="glass-button px-6 py-2 text-white font-semibold bg-accent/20 hover:bg-accent/30"
            >
              Filter
            </button>
          </div>
        </form>
      </div>

      {catalogData.results && catalogData.results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {catalogData.results.map((item: any) => (
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
      ) : (
        <div className="text-center py-12">
          <p className="text-zinc-400">No results found.</p>
        </div>
      )}

      {catalogData.pagination && (
        <div className="flex justify-center gap-2 mt-8">
          {catalogData.pagination.hasPrev && (
            <Link
              href={`/catalog?page=${catalogData.pagination.currentPage - 1}`}
              className="glass-button px-4 py-2 text-sm text-zinc-300"
            >
              ← Prev
            </Link>
          )}
          <span className="glass-button px-4 py-2 text-sm text-zinc-300">
            Page {catalogData.pagination.currentPage} of {catalogData.pagination.totalPages}
          </span>
          {catalogData.pagination.hasNext && (
            <Link
              href={`/catalog?page=${catalogData.pagination.currentPage + 1}`}
              className="glass-button px-4 py-2 text-sm text-zinc-300"
            >
              Next →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
