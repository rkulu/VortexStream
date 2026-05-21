"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { safeImage } from "@/lib/image";

interface FilmWatchClientProps {
  filmId: string;
  data: {
    title: string;
    recommendations: {
      title: string;
      rating: string;
      image: string;
      type: string;
      id: string;
    }[];
    stream_options: Record<string, { server: string; post: string; nume: string; type: string }[]>;
  };
}

export default function FilmWatchClient({ filmId, data }: FilmWatchClientProps) {
  const [currentServer, setCurrentServer] = useState(0);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const allServers = Object.entries(data.stream_options || {})
    .filter(([key]) => key !== "")
    .flatMap(([, servers]) => servers);

  const activeServer = allServers[currentServer];

  useEffect(() => {
    if (!activeServer) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const fetchEmbed = async () => {
      try {
        const res = await fetch(
          `/api/server?post=${activeServer.post}&nume=${activeServer.nume}&type=${activeServer.type}`
        );
        const json = await res.json();
        setEmbedUrl(json.embed_url || null);
      } catch {
        setEmbedUrl(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEmbed();
  }, [activeServer]);

  const getHref = (item: typeof data.recommendations[0]) => {
    if (item.type === "film") return `/film/${item.id}`;
    if (item.type === "series") return `/series/${item.id}`;
    return `/anime/${item.id}`;
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Navigation Header */}
      <div className="border-b border-white/5 pb-4">
        <Link
          href={`/film/${filmId}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#00f4fe] hover:text-[#00f4fe]/85 uppercase tracking-wider transition-colors active:scale-95 cursor-pointer bg-white/5 px-4 py-2 rounded-full border border-white/10"
        >
          <span className="material-symbols-outlined text-sm font-bold">arrow_back</span>
          Back to {data.title}
        </Link>
      </div>

      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-black text-white leading-tight uppercase tracking-tight">
          {data.title}
        </h1>
        {activeServer && (
          <p className="text-[#00f4fe] text-xs font-bold uppercase tracking-wider mt-1">
            Playing on {activeServer.server}
          </p>
        )}
      </div>

      {/* Cinematic Video Player Casing with Neon Glow Borders */}
      <div className="relative rounded-[28px] overflow-hidden border border-white/5 shadow-2xl p-1 bg-black/60">
        {/* Glow behind the player */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] rounded-[28px] blur opacity-25"></div>
        
        <div className="relative aspect-video rounded-[24px] overflow-hidden bg-[#0e0e10] flex items-center justify-center border border-white/10">
          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="size-10 rounded-full border-2 border-[#00f4fe] border-t-transparent animate-spin"></div>
              <div className="text-[#00f4fe] text-xs font-extrabold uppercase tracking-widest animate-pulse">Loading Stream...</div>
            </div>
          ) : embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allowFullScreen
              allow="autoplay; encrypted-media"
              sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
            />
          ) : (
            <div className="text-center p-6 space-y-2">
              <span className="material-symbols-outlined text-red-400 text-5xl">warning</span>
              <p className="text-on-surface-variant font-bold text-sm">No Stream Available For This Server</p>
              <p className="text-zinc-500 text-xs">Silakan ganti server streaming di bawah.</p>
            </div>
          )}
        </div>
      </div>

      {/* Server Options */}
      {allServers.length > 0 && (
        <section className="p-6 rounded-[24px] border border-white/5 shadow-lg space-y-4" style={{ background: 'rgba(20, 19, 21, 0.45)', backdropFilter: 'blur(25px)' }}>
          <h2 className="font-display text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
            <span className="text-[#00f4fe] font-black">▶</span> Server Options
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {allServers.map((srv, i) => {
              const isSelected = i === currentServer;
              return (
                <button
                  key={i}
                  onClick={() => setCurrentServer(i)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 active:scale-[0.98] ${
                    isSelected
                      ? "bg-gradient-to-r from-[#9d4edd]/10 to-[#00f4fe]/10 border-[#00f4fe] text-[#00f4fe] shadow-[0_0_15px_rgba(0,244,254,0.15)] font-black"
                      : "border-white/5 bg-white/5 text-zinc-300 hover:text-white hover:border-white/10 hover:bg-white/10"
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider">{srv.server}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Recommendations */}
      {data.recommendations && data.recommendations.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <span className="text-[#00f4fe] font-black">▶</span> You May Also Like
            </h2>
            <Link href="/catalog" className="text-xs font-bold text-[#00f4fe] hover:underline uppercase tracking-wider">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {data.recommendations.slice(0, 5).map((item, index) => (
              <Link key={`${item.id}-${index}`} href={getHref(item)} className="group cursor-pointer block">
                <div className="relative aspect-[2/3] rounded-[20px] overflow-hidden mb-3 conic-border-hover liquid-glass-card border border-white/5">
                  <Image
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    src={safeImage(item.image)}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    loading="lazy"
                    quality={90}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center justify-between text-[9px] font-bold text-white uppercase tracking-wider">
                      {item.rating && item.rating !== "0" && (
                        <span className="flex items-center gap-1 text-[#e0b6ff]">
                          <span className="material-symbols-outlined text-[10px] font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          {item.rating}
                        </span>
                      )}
                      <span>{item.type || "Film"}</span>
                    </div>
                  </div>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#00f4fe] transition-colors truncate">{item.title}</h4>
                <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">{item.type || "Film"}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
