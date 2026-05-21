"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TopHeader() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="flex justify-between items-center w-full px-3 sm:px-6 md:px-8 py-2.5 md:py-3 sticky top-0 z-40 bg-[#131315]/60 backdrop-blur-[24px] border-b border-white/10">
      <div className="flex items-center gap-6">
        {/* Mobile-only logo */}
        <Link href="/" className="md:hidden flex items-center gap-1.5">
          <span className="font-display text-2xl font-black text-[#e0b6ff]">Vortex</span>
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
        {/* Search input with submit handler */}
        <form onSubmit={handleSearchSubmit} className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#d0c2d5] text-[18px] sm:text-[20px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari..."
            className="bg-[#353437]/50 border-none rounded-full pl-8 sm:pl-9 pr-3 sm:pr-4 py-1.5 text-xs w-36 sm:w-48 md:w-64 text-white focus:ring-1 focus:ring-[#9d4edd] focus:w-44 sm:focus:w-56 md:focus:w-64 transition-all outline-none"
          />
        </form>

        <button className="material-symbols-outlined text-[#d0c2d5] hover:text-[#e0b6ff] transition-colors text-[22px] p-1">
          notifications
        </button>

        <img
          alt="Avatar"
          className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-[#9d4edd]/30 object-cover cursor-pointer"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMyKqMTscj7I9Wq7vkgS-rz_0TCP-z6hRKtADA-Ucaw5NaJi0PlsqThVkUCPSecAcZEesBdPurJH1WnvO-1VIfZzu7OgsxQCeqmrn_kmMqvLnvX7dIOLCq9ZbjRMlHRXy2aLHNjxryhfo5TSvLBl2HgJ1yaFHTHQNEk43YDrPD3Co1PdTMRLlD13OpiNzkhsAlM6p7Kdu3g1QgH2JKS8WiDgr1m-BSLY2SKUkvRsVqIbCRNlwoFmvme363iyvmNloigOi8gLkrHd10"
        />
      </div>
    </header>
  );
}
