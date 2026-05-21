"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function TopHeader() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [settings, setSettings] = useState<{ siteName: string; logoUrl: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((res) => {
        if (res.settings) setSettings(res.settings);
      })
      .catch(() => { });
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const siteName = settings?.siteName || "VortexStream";
  const logoUrl = settings?.logoUrl;

  return (
    <header className="flex justify-between items-center w-full px-3 sm:px-6 md:px-8 py-2.5 md:py-3 sticky top-0 z-40 bg-[#131315]/60 backdrop-blur-[24px] border-b border-white/10">
      <div className="flex items-center gap-6">
        <Link href="/" className="md:hidden flex items-center gap-1.5">
          {logoUrl ? (
            <Image src={logoUrl} alt={siteName} width={28} height={28} className="object-contain" />
          ) : (
            <span className="font-display text-2xl font-black text-[#e0b6ff]">Vortex</span>
          )}
        </Link>

        <nav className="hidden md:flex gap-6 font-sans">
          <Link href="/" className="text-[#e0b6ff] border-b-2 border-[#e0b6ff] pb-1 text-sm font-semibold">
            Beranda
          </Link>
          <Link href="/ongoing" className="text-[#d0c2d5] hover:text-white transition-colors text-sm font-semibold">
            Ongoing
          </Link>
          <Link href="/completed" className="text-[#d0c2d5] hover:text-white transition-colors text-sm font-semibold">
            Completed
          </Link>
          <Link href="/jadwal" className="text-[#d0c2d5] hover:text-white transition-colors text-sm font-semibold">
            Jadwal Rilis
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <form
          onSubmit={handleSearchSubmit}
          className={`relative flex items-center rounded-full border transition-all duration-300 ${focused
              ? "border-[#9d4edd] shadow-[0_0_12px_rgba(157,78,221,0.15)] w-44 sm:w-56 md:w-72"
              : "border-transparent w-36 sm:w-48 md:w-64"
            } bg-[#353437]/50`}
        >
          <span className={`material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-sm sm:text-base transition-colors duration-300 pointer-events-none ${focused ? "text-[#9d4edd]" : "text-[#d0c2d5]"}`}>
            search
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Cari..."
            className="w-full bg-transparent border-none rounded-full pl-8 sm:pl-9 pr-2.5 py-1.5 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none"
          />
        </form>

        <button className="material-symbols-outlined text-[#d0c2d5] hover:text-[#e0b6ff] transition-all duration-200 text-[22px] p-1 active:scale-90">
          notifications
        </button>

        <Link href="/admin" className="text-[#d0c2d5] hover:text-white transition-colors text-sm font-semibold">
          <img
            alt="Avatar"
            className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-[#9d4edd]/30 object-cover cursor-pointer transition-all duration-200 hover:border-[#9d4edd]/60 active:scale-95"
            src="/image/profile.png"
          />
        </Link>
      </div>
    </header>
  );
}
