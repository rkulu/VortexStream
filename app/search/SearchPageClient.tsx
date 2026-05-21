"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";

interface AnimeItem {
  id: string;
  title: string;
  image: string;
  type?: string;
  episode?: string;
  status?: string;
  rating?: string;
  description?: string;
}

interface SearchPagination {
  current_page: number;
  total_pages: number;
  has_next_page: boolean;
  next_page: number | null;
  prev_page: number | null;
  has_prev_page: boolean;
}

interface SearchPageClientProps {
  initialResults?: AnimeItem[];
  initialQuery?: string;
  initialPagination?: SearchPagination;
}

export default function SearchPageClient({
  initialResults = [],
  initialQuery = "",
  initialPagination,
}: SearchPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();

  const getHref = (item: AnimeItem) => {
    if (item.type === "film") return `/film/${item.id}`;
    if (item.type === "series") return `/series/${item.id}`;
    return `/anime/${item.id}`;
  };

  const getBadge = (item: AnimeItem) => {
    if (item.type) return item.type;
    return undefined;
  };

  const getSubtitle = (item: AnimeItem) => {
    if (item.rating && item.rating !== "0" && item.rating !== "-") return `⭐ ${item.rating}`;
    if (item.episode) return item.episode;
    if (item.type) return item.type;
    return undefined;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    startTransition(() => {
      const params = new URLSearchParams();
      params.set("q", query);
      router.push(`/search?${params.toString()}`);
    });
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", query);
    params.set("page", page.toString());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div>
      <div className="liquid-glass rounded-2xl p-6 mb-8">
        <h1 className="text-2xl font-bold text-white mb-4">
          {initialQuery ? `Results for "${initialQuery}"` : "Search"}
        </h1>
        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anime, film, series..."
            className="flex-1 glass-input px-4 py-3 text-foreground placeholder-zinc-500"
          />
          <button
            type="submit"
            className="glass-button px-6 py-3 text-white font-semibold bg-accent/20 hover:bg-accent/30"
          >
            {isPending ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {initialResults.length > 0 ? (
        <>
          <div className="space-y-4">
            {initialResults.map((item) => (
              <Link
                key={item.id}
                href={getHref(item)}
                className="glass-card overflow-hidden group flex gap-4 p-4"
              >
                <div className="flex-shrink-0 w-20 h-28 sm:w-24 sm:h-36 overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {item.type && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-accent/20 text-accent">
                        {item.type}
                      </span>
                    )}
                    {item.rating && item.rating !== "0" && item.rating !== "-" && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-500/20 text-yellow-400">
                        ⭐ {item.rating}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {initialPagination && initialPagination.total_pages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {initialPagination.has_prev_page && (
                <button
                  onClick={() => handlePageChange(initialPagination.prev_page!)}
                  className="glass-button px-4 py-2 text-sm text-zinc-300"
                >
                  ← Prev
                </button>
              )}
              <span className="glass-button px-4 py-2 text-sm text-zinc-300">
                Page {initialPagination.current_page} of {initialPagination.total_pages}
              </span>
              {initialPagination.has_next_page && (
                <button
                  onClick={() => handlePageChange(initialPagination.next_page!)}
                  className="glass-button px-4 py-2 text-sm text-zinc-300"
                >
                  Next →
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-zinc-400">
            {initialQuery ? "No results found." : "Search for your favorite anime, film, or series."}
          </p>
        </div>
      )}
    </div>
  );
}
