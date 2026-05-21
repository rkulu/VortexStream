"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { safeImage } from "@/lib/image";
import type { EpisodeItem } from "@/lib/types";

interface EpisodeListProps {
  episodes: EpisodeItem[];
  animeTitle: string;
  animeImage: string;
  season?: string;
  releaseDate?: string;
}

function getEpisodeNumber(ep: EpisodeItem): number {
  const raw = ep.number || ep.title.match(/\d+/)?.[0] || ep.title.replace("Episode ", "");
  return parseInt(raw, 10) || 0;
}

export default function EpisodeList({ episodes, animeTitle, animeImage, season, releaseDate }: EpisodeListProps) {
  const PAGE_SIZE = 10;

  const sortedEpisodes = useMemo(
    () => [...episodes].sort((a, b) => getEpisodeNumber(a) - getEpisodeNumber(b)),
    [episodes]
  );

  const totalEpisodes = sortedEpisodes.length;
  const totalPages = Math.ceil(totalEpisodes / PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(totalPages - 1);

  const currentEpisodes = useMemo(() => {
    const start = currentPage * PAGE_SIZE;
    return sortedEpisodes.slice(start, start + PAGE_SIZE);
  }, [currentPage, sortedEpisodes]);

  const pageRanges = useMemo(
    () =>
      Array.from({ length: totalPages }, (_, i) => {
        const first = sortedEpisodes[i * PAGE_SIZE];
        const last = sortedEpisodes[Math.min((i + 1) * PAGE_SIZE - 1, totalEpisodes - 1)];
        return {
          label: `EP ${getEpisodeNumber(first)} - EP ${getEpisodeNumber(last)}`,
          page: i,
        };
      }),
    [sortedEpisodes, totalPages, totalEpisodes]
  );

  const getEpisodeLabel = (ep: EpisodeItem) => String(getEpisodeNumber(ep));

  return (
    <section>
      <div className="flex items-end justify-between mb-6 border-b border-white/5 pb-4">
        <h2 className="font-display text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
          <span className="text-[#00f4fe] font-black">▶</span> Episodes
        </h2>
        <span className="text-[#00f4fe] text-xs font-bold uppercase tracking-wider bg-[#00f4fe]/10 px-3 py-1 rounded-full border border-[#00f4fe]/20">
          Total {totalEpisodes} Episodes
        </span>
      </div>

      <div className="mb-6">
        <div className="relative inline-block">
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="px-4 py-2.5 pr-11 text-sm font-bold rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#9d4edd] focus:ring-1 focus:ring-[#9d4edd]/50 transition-all appearance-none cursor-pointer"
          >
            {pageRanges.map((range) => (
              <option
                key={range.page}
                value={range.page}
                className="bg-[#1a1a1e] text-white"
              >
                {range.label}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#e0b6ff] text-lg pointer-events-none">
            expand_more
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {currentEpisodes.map((ep) => (
          <Link
            key={ep.id}
            href={`/episode/${ep.id}`}
            className="group relative aspect-video rounded-[16px] overflow-hidden border border-white/5 liquid-glass-card shadow-lg hover:scale-[1.03] transition-all duration-300"
            style={{ background: "rgba(20, 19, 21, 0.45)", backdropFilter: "blur(25px)" }}
          >
            <Image
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              src={safeImage(animeImage)}
              alt={ep.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
              loading="lazy"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-white text-3xl font-bold bg-[#00f4fe]/80 p-2 rounded-full shadow-[0_0_20px_rgba(0,244,254,0.6)]">play_arrow</span>
            </div>
            <div className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-extrabold rounded-md bg-black/70 text-[#00f4fe] border border-[#00f4fe]/30 uppercase tracking-wider">
              EP {getEpisodeLabel(ep)}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="text-[11px] font-bold text-white truncate group-hover:text-[#00f4fe] transition-colors">
                {ep.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
