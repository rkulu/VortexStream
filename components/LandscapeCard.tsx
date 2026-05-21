"use client";

import Link from "next/link";
import Image from "next/image";
import { safeImage } from "@/lib/image";
interface LandscapeCardProps {
  href: string;
  title: string;
  image?: string | null;
  badge?: string;
}

export default function LandscapeCard({ href, title, image, badge }: LandscapeCardProps) {
  return (
    <Link 
      href={href}
      className="relative aspect-video rounded-[20px] overflow-hidden group cursor-pointer border border-white/5 block"
    >
      <Image
        src={safeImage(image)} 
        alt={title} 
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-110 transition-all duration-700" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300">
        {badge && (
          <span className="text-[10px] font-extrabold text-[#63f7ff] mb-1 uppercase tracking-widest">
            {badge}
          </span>
        )}
        <h4 className="text-white font-bold text-sm sm:text-base group-hover:text-[#e0b6ff] transition-colors truncate">
          {title}
        </h4>
      </div>
    </Link>
  );
}
