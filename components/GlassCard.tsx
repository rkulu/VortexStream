import Link from "next/link";
import Image from "next/image";
import { safeImage } from "@/lib/image";
interface GlassCardProps {
  href?: string;
  title: string;
  image?: string | null;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export default function GlassCard({
  href,
  title,
  image,
  subtitle,
  badge,
  className = "",
}: GlassCardProps) {
  const content = (
    <div className={`relative aspect-[2/3] rounded-[24px] overflow-hidden liquid-glass-card group cursor-pointer ${className}`}>
      <Image
        src={safeImage(image)}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        quality={90}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
      />
      {badge && (
        <div className="absolute top-3 left-3 px-2.5 py-1 text-[9px] sm:text-[10px] font-bold rounded-lg backdrop-blur-md bg-black/60 text-white border border-white/10 z-10 uppercase tracking-wider">
          {badge}
        </div>
      )}
      
      {/* Sliding information overlay matching Stitch mockup */}
      <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-black/65 backdrop-blur-md border-t border-white/10 translate-y-[10px] group-hover:translate-y-0 transition-transform duration-300 flex flex-col justify-end">
        <h3 className="text-xs sm:text-sm font-semibold truncate text-white">
          {title}
        </h3>
        {subtitle && (
          <p className="text-[9px] sm:text-[10px] text-[#d0c2d5] font-semibold uppercase tracking-wider mt-0.5 truncate">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
