"use client";

import { useState, useEffect } from "react";

interface BookmarkItem {
  id: string;
  title: string;
  image: string;
  type: string;
  rating?: string;
  episode?: string;
}

interface BookmarkButtonProps {
  id: string;
  title: string;
  image: string;
  type: string;
  rating?: string;
  episode?: string;
  variant?: "pill" | "circle";
}

export default function BookmarkButton({
  id,
  title,
  image,
  type,
  rating,
  episode,
  variant = "pill",
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkBookmark = () => {
      const stored = localStorage.getItem("vortex_bookmarks");
      if (stored) {
        try {
          const list: BookmarkItem[] = JSON.parse(stored);
          setIsBookmarked(list.some((item) => item.id === id));
        } catch {
          // ignore parsing error
        }
      }
    };
    checkBookmark();

    // Listen to changes from other buttons or tabs
    window.addEventListener("bookmark-change", checkBookmark);
    return () => {
      window.removeEventListener("bookmark-change", checkBookmark);
    };
  }, [id]);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const stored = localStorage.getItem("vortex_bookmarks");
    let list: BookmarkItem[] = [];

    if (stored) {
      try {
        list = JSON.parse(stored);
      } catch {
        list = [];
      }
    }

    const index = list.findIndex((item) => item.id === id);
    if (index > -1) {
      // Remove
      list.splice(index, 1);
      setIsBookmarked(false);
    } else {
      // Add
      list.push({
        id,
        title,
        image,
        type: type || "anime",
        rating: rating || "9.5",
        episode: episode || undefined,
      });
      setIsBookmarked(true);
    }

    localStorage.setItem("vortex_bookmarks", JSON.stringify(list));
    // Dispatch event to notify other components (e.g. bookmarks list)
    window.dispatchEvent(new Event("bookmark-change"));
  };

  if (!mounted) {
    // Return skeleton or placeholder during SSR to prevent layout shifting/hydration bugs
    if (variant === "circle") {
      return (
        <div className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center animate-pulse">
          <span className="material-symbols-outlined text-sm text-zinc-600">add</span>
        </div>
      );
    }
    return (
      <div className="w-40 h-[48px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center animate-pulse">
        <span className="text-zinc-600 text-sm font-bold">...</span>
      </div>
    );
  }

  if (variant === "circle") {
    return (
      <button
        onClick={toggleBookmark}
        className={`size-10 rounded-full flex items-center justify-center border transition-all active:scale-90 ${
          isBookmarked
            ? "bg-[#e0b6ff]/20 border-[#e0b6ff] text-[#e0b6ff] shadow-[0_0_15px_rgba(224,182,255,0.4)]"
            : "bg-white/10 hover:bg-white/20 border-white/20 text-white"
        }`}
        title={isBookmarked ? "Hapus dari Daftar Saya" : "Tambah ke Daftar Saya"}
      >
        <span className="material-symbols-outlined text-lg" style={isBookmarked ? { fontVariationSettings: "'FILL' 1" } : undefined}>
          {isBookmarked ? "check" : "add"}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleBookmark}
      className={`px-6 py-3 rounded-full border text-sm font-bold flex items-center gap-2 active:scale-95 transition-all ${
        isBookmarked
          ? "bg-[#e0b6ff]/10 border-[#e0b6ff]/40 text-[#e0b6ff] hover:bg-[#e0b6ff]/20 shadow-[0_0_20px_rgba(224,182,255,0.15)]"
          : "border-white/20 bg-white/5 text-[#e0b6ff] hover:bg-white/10"
      }`}
    >
      <span className="material-symbols-outlined" style={isBookmarked ? { fontVariationSettings: "'FILL' 1" } : undefined}>
        {isBookmarked ? "check" : "add"}
      </span>
      {isBookmarked ? "In Your List" : "Add to List"}
    </button>
  );
}
