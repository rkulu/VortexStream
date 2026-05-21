import Link from "next/link";
import Image from "next/image";
import { safeImage } from "@/lib/image";

interface AnimeItem {
  id: string;
  title: string;
  image?: string | null;
  type?: string;
  time?: string;
  rating?: string;
}

interface PopularSidebarProps {
  items: AnimeItem[];
}

export default function PopularSidebar({ items }: PopularSidebarProps) {
  if (!items.length) return null;

  const getHref = (item: AnimeItem) => {
    if (item.type === "film") return `/film/${item.id}`;
    if (item.type === "series") return `/series/${item.id}`;
    return `/anime/${item.id}`;
  };

  return (
    <div className="liquid-glass rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/10 bg-white/5">
        <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Top 10 Populer
        </h2>
        <Link
          href="/populer"
          className="text-xs text-accent hover:text-accent-hover transition-colors font-medium"
        >
          Semua →
        </Link>
      </div>
      <ul className="divide-y divide-white/5">
        {items.map((item, index) => (
          <li key={item.id}>
            <Link
              href={getHref(item)}
              className="flex items-center gap-3 p-2.5 sm:p-3 hover:bg-white/5 transition-all duration-200 group"
            >
              <span
                className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg text-xs font-bold transition-transform duration-200 group-hover:scale-110 ${
                  index === 0
                    ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white"
                    : index === 1
                    ? "bg-gradient-to-br from-zinc-300 to-zinc-500 text-white"
                    : index === 2
                    ? "bg-gradient-to-br from-amber-600 to-amber-800 text-white"
                    : "bg-white/10 text-zinc-400"
                }`}
              >
                {index + 1}
              </span>
              <div className="relative flex-shrink-0 w-9 h-12 sm:w-10 sm:h-14 overflow-hidden rounded-md shadow">
                <Image
                  src={safeImage(item.image)}
                  alt={item.title}
                  fill
                  sizes="40px"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-foreground truncate group-hover:text-accent transition-colors">
                  {item.title}
                </p>
                {item.time && (
                  <p className="text-[10px] sm:text-xs text-zinc-500 mt-0.5">{item.time}</p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
