"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface EpisodePageClientProps {
  episodeId: string;
  data: {
    title: string;
    downloads: {
      resolution: string;
      links: { server: string; url: string }[];
    }[];
    streams: {
      resolution: string;
      server: string;
      data: { post: string; nume: string; type: string };
    }[];
    navigation: {
      prev: { id: string; link: string } | null;
      next: { id: string; link: string } | null;
    };
    all_episodes: {
      title: string;
      url: string;
      id: string;
      active: boolean;
    }[];
  };
}

export default function EpisodePageClient({ episodeId, data }: EpisodePageClientProps) {
  const [selectedStream, setSelectedStream] = useState(0);
  const [selectedResolution, setSelectedResolution] = useState<string | null>(null);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const activeStream = data.streams[selectedStream];

  useEffect(() => {
    if (!activeStream) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const fetchEmbed = async () => {
      try {
        const res = await fetch(
          `/api/server?post=${activeStream.data.post}&nume=${activeStream.data.nume}&type=${activeStream.data.type}`
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
  }, [activeStream]);

  const resolutions = [...new Set(data.streams.map((s) => s.resolution))];
  const filteredStreams = selectedResolution
    ? data.streams.filter((s) => s.resolution === selectedResolution)
    : data.streams;

  return (
    <div className="space-y-6 font-sans">
      {/* Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-black text-white leading-tight uppercase tracking-tight">
            {data.title}
          </h1>
          {activeStream && (
            <p className="text-[#00f4fe] text-xs font-bold uppercase tracking-wider mt-1">
              Playing on {activeStream.server} ({activeStream.resolution})
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {data.navigation.prev ? (
            <Link
              href={`/episode/${data.navigation.prev.id}`}
              className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-[#00f4fe]/5 hover:border-[#00f4fe]/30 text-xs font-bold text-[#00f4fe] transition-all uppercase tracking-wider flex items-center gap-1 active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm font-bold">arrow_back</span>
              Prev
            </Link>
          ) : (
            <button className="px-4 py-2 rounded-full border border-white/5 bg-white/5 opacity-30 text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1 cursor-not-allowed" disabled>
              <span className="material-symbols-outlined text-sm font-bold">arrow_back</span>
              Prev
            </button>
          )}
          {data.navigation.next ? (
            <Link
              href={`/episode/${data.navigation.next.id}`}
              className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-[#00f4fe]/5 hover:border-[#00f4fe]/30 text-xs font-bold text-[#00f4fe] transition-all uppercase tracking-wider flex items-center gap-1 active:scale-95 cursor-pointer"
            >
              Next
              <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
            </Link>
          ) : (
            <button className="px-4 py-2 rounded-full border border-white/5 bg-white/5 opacity-30 text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1 cursor-not-allowed" disabled>
              Next
              <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
            </button>
          )}
        </div>
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

      {/* Stream Servers & Resolutions */}
      {resolutions.length > 0 && (
        <section className="p-6 rounded-[24px] border border-white/5 shadow-lg space-y-5" style={{ background: 'rgba(20, 19, 21, 0.45)', backdropFilter: 'blur(25px)' }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="font-display text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
              <span className="text-[#00f4fe] font-black">▶</span> Select Stream Server
            </h2>
            
            {/* Resolution Filter Pills */}
            <div className="flex flex-wrap gap-1.5 bg-white/5 p-1 rounded-full border border-white/5 self-start">
              <button
                onClick={() => setSelectedResolution(null)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 ${
                  !selectedResolution
                    ? "bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] text-white shadow-[0_0_15px_rgba(0,244,254,0.4)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                All
              </button>
              {resolutions.map((res) => (
                <button
                  key={res}
                  onClick={() => setSelectedResolution(res)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 ${
                    selectedResolution === res
                      ? "bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] text-white shadow-[0_0_15px_rgba(0,244,254,0.4)]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {res}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredStreams.map((stream) => {
              const globalIndex = data.streams.indexOf(stream);
              const isSelected = globalIndex === selectedStream;
              return (
                <button
                  key={globalIndex}
                  onClick={() => setSelectedStream(globalIndex)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 active:scale-[0.98] ${
                    isSelected
                      ? "bg-gradient-to-r from-[#9d4edd]/10 to-[#00f4fe]/10 border-[#00f4fe] text-[#00f4fe] shadow-[0_0_15px_rgba(0,244,254,0.15)]"
                      : "border-white/5 bg-white/5 text-zinc-300 hover:text-white hover:border-white/10 hover:bg-white/10"
                  }`}
                >
                  <span className="text-xs font-black uppercase tracking-wider">{stream.server}</span>
                  <span className={`text-[10px] font-bold ${isSelected ? "text-[#e0b6ff]" : "text-zinc-500"}`}>{stream.resolution}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Downloads Section */}
      {data.downloads.length > 0 && (
        <section className="p-6 rounded-[24px] border border-white/5 shadow-lg" style={{ background: 'rgba(20, 19, 21, 0.45)', backdropFilter: 'blur(25px)' }}>
          <h2 className="font-display text-lg font-black text-white mb-4 uppercase tracking-tight flex items-center gap-2">
            <span className="text-[#00f4fe] font-black">▶</span> Download Links
          </h2>
          <div className="space-y-5">
            {data.downloads.map((dl) => (
              <div key={dl.resolution} className="border-t border-white/5 pt-4 first:border-0 first:pt-0">
                <h3 className="text-xs font-bold text-[#00f4fe] uppercase tracking-wider mb-2">{dl.resolution}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {dl.links.map((link) => (
                    <a
                      key={link.server}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-button py-2.5 text-center text-[10px] font-black text-zinc-300 hover:text-[#00f4fe] hover:border-[#00f4fe]/30 hover:bg-[#00f4fe]/5 transition-all uppercase tracking-wider cursor-pointer"
                    >
                      {link.server}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Episodes Deck */}
      {data.all_episodes && data.all_episodes.length > 0 && (
        <section className="p-6 rounded-[24px] border border-white/5 shadow-lg space-y-4" style={{ background: 'rgba(20, 19, 21, 0.45)', backdropFilter: 'blur(25px)' }}>
          <h2 className="font-display text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
            <span className="text-[#00f4fe] font-black">▶</span> All Episodes
          </h2>
          
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2.5">
            {data.all_episodes.map((ep) => {
              const epNum = ep.title.replace("Episode ", "") || "1";
              return (
                <Link
                  key={ep.id}
                  href={`/episode/${ep.id}`}
                  className={`py-2 text-center text-xs font-bold rounded-lg border transition-all active:scale-95 cursor-pointer ${
                    ep.active
                      ? "bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] text-white border-transparent shadow-[0_0_15px_rgba(0,244,254,0.3)] font-black"
                      : "border-white/5 bg-white/5 text-zinc-400 hover:text-white hover:border-white/15 hover:bg-white/10"
                  }`}
                  title={ep.title}
                >
                  {epNum}
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
