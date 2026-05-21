"use client";

import { useState, useEffect } from "react";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";

interface BookmarkItem {
  id: string;
  title: string;
  image: string;
  type: string;
  rating?: string;
  episode?: string;
}

export default function DaftarSayaPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const loadBookmarks = () => {
      const stored = localStorage.getItem("vortex_bookmarks");
      if (stored) {
        try {
          setBookmarks(JSON.parse(stored));
        } catch {
          setBookmarks([]);
        }
      } else {
        setBookmarks([]);
      }
    };

    loadBookmarks();

    window.addEventListener("bookmark-change", loadBookmarks);
    return () => {
      window.removeEventListener("bookmark-change", loadBookmarks);
    };
  }, []);

  const getHref = (item: BookmarkItem) => {
    if (item.type === "film") return `/film/${item.id}`;
    if (item.type === "series") return `/series/${item.id}`;
    return `/anime/${item.id}`;
  };

  const getSubtitle = (item: BookmarkItem) => {
    if (item.rating && item.rating !== "0") return `⭐ ${item.rating}`;
    if (item.episode) return item.episode;
    return item.type.toUpperCase();
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-[#e0b6ff] animate-pulse">Memuat Daftar Saya...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans pb-10">
      {/* Page Header */}
      <div className="liquid-glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-[#9d4edd]/10 via-[#00dce5]/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="space-y-2 z-10">
          <h1 className="text-display-sm text-white font-extrabold tracking-tight flex items-center gap-3">
            <span className="material-symbols-outlined text-4xl text-[#e0b6ff]" style={{ fontVariationSettings: "'FILL' 1" }}>
              favorite
            </span>
            Daftar Saya
          </h1>
          <p className="text-on-surface-variant text-sm max-w-xl leading-relaxed">
            Koleksi film, anime, dan drama serial favorit Anda. Disimpan secara lokal di browser Anda.
          </p>
        </div>

        {bookmarks.length > 0 && (
          <button
            onClick={() => {
              if (confirm("Apakah Anda yakin ingin menghapus semua bookmark?")) {
                localStorage.setItem("vortex_bookmarks", JSON.stringify([]));
                window.dispatchEvent(new Event("bookmark-change"));
              }
            }}
            className="z-10 px-5 py-2.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-bold hover:bg-red-500/20 active:scale-95 transition-all flex items-center gap-2 self-start md:self-center"
          >
            <span className="material-symbols-outlined text-sm">delete_sweep</span>
            Hapus Semua
          </button>
        )}
      </div>

      {/* Grid List */}
      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {bookmarks.map((item) => (
            <GlassCard
              key={item.id}
              href={getHref(item)}
              title={item.title}
              image={item.image}
              subtitle={getSubtitle(item)}
              badge={item.type}
            />
          ))}
        </div>
      ) : (
        <div className="liquid-glass rounded-3xl p-12 text-center border border-white/5 max-w-lg mx-auto mt-10 relative overflow-hidden flex flex-col items-center gap-6 shadow-2xl">
          <div className="size-20 rounded-full bg-[#9d4edd]/10 border border-[#9d4edd]/20 flex items-center justify-center text-[#e0b6ff] shadow-[0_0_30px_rgba(157,78,221,0.2)] animate-bounce">
            <span className="material-symbols-outlined text-4xl">bookmark_border</span>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white tracking-tight">Daftar favorit Anda kosong</h3>
            <p className="text-on-surface-variant text-sm max-w-xs leading-relaxed">
              Anda belum menambahkan film atau anime ke daftar favorit Anda. Mulai jelajahi judul-judul populer sekarang!
            </p>
          </div>

          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] text-white font-bold text-sm hover:hero-glow transition-all active:scale-95 flex items-center gap-2 shadow-[0_4px_20px_rgba(157,78,221,0.3)]"
          >
            <span className="material-symbols-outlined text-sm font-bold">explore</span>
            Jelajahi Sekarang
          </Link>
        </div>
      )}
    </div>
  );
}
