"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const items = [
    { href: "/", label: "HOME", icon: "home" },
    { href: "/populer", label: "TRENDING", icon: "trending_up" },
    { href: "/genre", label: "CATEGORIES", icon: "grid_view" },
    { href: "/daftar-saya", label: "MY LIST", icon: "bookmark" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#131315]/80 backdrop-blur-xl border-t border-white/10 flex justify-around items-center py-3 px-2">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              isActive ? "text-[#e0b6ff]" : "text-[#d0c2d5] hover:text-white"
            }`}
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {item.icon}
            </span>
            <span className="text-[9px] font-bold tracking-wide font-sans">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
