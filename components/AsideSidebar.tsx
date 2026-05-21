"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Beranda", icon: "home" },
  { href: "/film", label: "Film", icon: "movie" },
  { href: "/anime", label: "Anime", icon: "live_tv" },
  { href: "/series", label: "Series", icon: "theaters" },
  { href: "/catalog", label: "Katalog & Cari", icon: "explore" },
  { href: "/daftar-saya", label: "Daftar Saya", icon: "favorite" },
];

export default function AsideSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex h-screen w-[280px] fixed left-0 top-0 flex-col p-6 gap-6 bg-[#131315]/40 backdrop-blur-[24px] border-r border-[#4d4353]/20 shadow-2xl z-50 overflow-y-auto hide-scrollbar font-sans">

      {/* Cyclone Logo Group */}
      <div className="flex items-center gap-3 px-2 py-2">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="size-10 rounded-full bg-[#9d4edd]/20 flex items-center justify-center text-[#e0b6ff] border border-[#9d4edd]/30 shadow-[0_0_20px_rgba(157,78,221,0.3)] transition-all duration-300 group-hover:rotate-180">
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              cyclone
            </span>
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-white">
            Vortex<span className="text-[#e0b6ff]">Stream</span>
          </span>
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-2 flex-1 mt-4">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 border ${isActive
                  ? "bg-[#e0b6ff]/10 text-[#e0b6ff] border-[#e0b6ff]/20 font-bold"
                  : "text-[#d0c2d5] border-transparent hover:bg-white/5 hover:text-white"
                }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {link.icon}
              </span>
              <span className="text-sm font-medium tracking-wide">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Account Info and Settings Block */}
      <div className="mt-auto flex flex-col gap-3">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#d0c2d5] hover:bg-white/5 hover:text-[#e0b6ff] transition-all"
        >
          <span className="material-symbols-outlined text-[22px]">settings</span>
          <span className="font-medium">Pengaturan</span>
        </Link>

        <div className="p-4 bg-[#1c1b1d]/60 backdrop-blur-md rounded-2xl flex items-center gap-3 border border-[#e0b6ff]/20">
          <div className="size-10 rounded-full overflow-hidden border border-[#e0b6ff]/30 flex-shrink-0">
            <img
              alt="Avatar"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJjEqpNdFmxo5t8lR-VreHeeq2WorZw4MzDwW466s2GQcWk6CvQIP7JGak225O_f4KiOiVRgdep-aAyX32fPgOL6kFjd45EixbX6F5FKrWg627__mHKWx7sMFsCiv7TdyRiV1wgWOlXo16s4WwrfzeH-33NJbyrB0-brKwkTEj2GCgEbOyB1ayMZcYksHetw7pk7IKyBcaNZV4R7787VrsCbjRDzByzJMP_sogN4ww3bjDy5SQpp4KSH4q3evel-SwnbL7c4ZobD7t"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-xs font-bold text-white truncate">Akun Premium</p>
            <p className="text-[10px] text-[#e0b6ff] font-semibold">Berlangganan Aktif</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
