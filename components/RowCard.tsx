"use client";

import Link from "next/link";
import Image from "next/image";
import { safeImage } from "@/lib/image";
interface RowCardProps {
  href: string;
  title: string;
  image?: string | null;
  subtitle?: string;
  rating?: string;
}

export default function RowCard({ href, title, image, subtitle, rating }: RowCardProps) {
  return (
    <Link 
      href={href}
      className="glass-panel p-4 rounded-2xl flex gap-4 glass-stroke hover:bg-[#201f21]/60 transition-all duration-300 group cursor-pointer border border-white/5"
    >
      <div className="relative size-20 sm:size-24 rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={safeImage(image)} 
          alt={title}
          fill
          sizes="96px"
          className="object-cover group-hover:scale-110 transition-transform duration-500" 
        />
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <h3 className="text-sm font-semibold text-white group-hover:text-[#e0b6ff] transition-colors truncate">
          {title}
        </h3>
        {subtitle && (
          <p className="text-[11px] text-[#d0c2d5] mt-1 mb-2 font-sans truncate">
            {subtitle}
          </p>
        )}
        {rating && (
          <div className="flex items-center gap-1 text-[#e0b6ff] font-sans">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <span className="text-[11px] font-bold">{rating}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
