"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { safeImage } from "@/lib/image";

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
  const [focused, setFocused] = useState(false);
  const [isPending, startTransition] = useTransition();

  const getHref = (item: AnimeItem) => {
    if (item.type === "film") return `/film/${item.id}`;
    if (item.type === "series") return `/series/${item.id}`;
    return `/anime/${item.id}`;
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
    <div className="min-h-screen">
      {/* Search Hero */}
      <div className="liquid-glass rounded-2xl p-6 md:p-8 mb-8 border border-white/10 transition-all duration-300">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
            {initialQuery ? `Results for "${initialQuery}"` : "Search"}
          </h1>
          <p className="text-zinc-400 text-sm mb-5">
            {initialQuery
              ? `${initialResults.length} anime found`
              : "Find your favorite anime, film, or series"}
          </p>
          <form onSubmit={handleSearch}>
            <div className={`relative flex items-center gap-3 rounded-2xl border transition-all duration-300 ${focused ? "border-[#9d4edd] shadow-[0_0_20px_rgba(157,78,221,0.2)]" : "border-white/10"} bg-black/40 backdrop-blur-md p-1.5`}>
              <div className="flex-1 flex items-center gap-2 pl-2">
                <span className={`material-symbols-outlined text-lg transition-colors duration-300 ${focused ? "text-[#9d4edd]" : "text-zinc-500"}`}>
                  search
                </span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Search anime, film, series..."
                  className="flex-1 bg-transparent py-2.5 text-sm sm:text-base text-white placeholder-zinc-500 outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={!query.trim() || isPending}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] hover:shadow-[0_0_16px_rgba(157,78,221,0.4)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 whitespace-nowrap"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Searching
                  </span>
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results */}
      {initialResults.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4">
            {initialResults.map((item, i) => (
              <Link
                key={item.id}
                href={getHref(item)}
                className="group flex gap-3 sm:gap-5 p-3 sm:p-5 rounded-2xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="relative size-20 sm:size-28 md:size-32 shrink-0 rounded-xl overflow-hidden">
                  <Image
                    src={safeImage(item.image)}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="128px"
                  />
                  {item.type && (
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-black/70 text-white border border-white/10 uppercase tracking-wider">
                      {item.type}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white group-hover:text-[#e0b6ff] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 flex-wrap">
                    {item.rating && item.rating !== "0" && item.rating !== "-" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">
                        <svg className="size-3" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {item.rating}
                      </span>
                    )}
                    {item.episode && (
                      <span className="text-[10px] text-zinc-500">
                        {item.episode} eps
                      </span>
                    )}
                  </div>
                </div>
                <div className="hidden sm:flex items-center">
                  <span className="material-symbols-outlined text-zinc-600 group-hover:text-zinc-400 transition-colors">
                    chevron_right
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {initialPagination && initialPagination.total_pages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-10">
              {initialPagination.has_prev_page && (
                <button
                  onClick={() => handlePageChange(initialPagination.prev_page!)}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium text-zinc-300 border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                  Prev
                </button>
              )}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: Math.min(initialPagination.total_pages, 5) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`size-9 rounded-xl text-sm font-medium transition-all ${
                        pageNum === initialPagination.current_page
                          ? "bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] text-white shadow-[0_0_12px_rgba(157,78,221,0.3)]"
                          : "text-zinc-400 border border-white/10 hover:bg-white/[0.08]"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {initialPagination.total_pages > 5 && (
                  <span className="text-zinc-600 px-1">...</span>
                )}
              </div>
              {initialPagination.has_next_page && (
                <button
                  onClick={() => handlePageChange(initialPagination.next_page!)}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium text-zinc-300 border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 transition-all active:scale-95"
                >
                  Next
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="size-16 sm:size-20 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center mb-5">
            <span className="material-symbols-outlined text-3xl sm:text-4xl text-zinc-600">
              {initialQuery ? "search_off" : "manage_search"}
            </span>
          </div>
          <p className="text-zinc-400 text-sm sm:text-base text-center max-w-xs">
            {initialQuery
              ? `No results for "${initialQuery}". Try a different keyword.`
              : "Type something to start searching for your favorite anime, film, or series."}
          </p>
          {initialQuery && (
            <button
              onClick={() => {
                setQuery("");
                router.push("/search");
              }}
              className="mt-5 px-5 py-2 rounded-xl text-sm font-medium text-white bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] transition-all active:scale-95"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}
