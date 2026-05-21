import { getGenres } from "@/lib/api";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function GenrePage() {
  let genres: { name: string; slug?: string; count: number; url: string }[] = [];

  try {
    const data = await getGenres();
    genres = data.data || [];
  } catch {
    genres = [];
  }

  return (
    <div>
      <div className="liquid-glass rounded-2xl p-6 mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Genres</h1>
        <p className="text-zinc-400 text-sm">Browse anime by genre</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {genres.map((genre) => {
          const slug = genre.slug || genre.name.toLowerCase().replace(/\s+/g, "-");
          return (
            <Link
              key={slug}
              href={`/genre/${slug}`}
              className="glass-card p-4 text-center hover:bg-accent/10 transition-colors group"
            >
              <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors block">
                {genre.name}
              </span>
              <span className="text-xs text-zinc-500 mt-1 block">
                {genre.count} titles
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
