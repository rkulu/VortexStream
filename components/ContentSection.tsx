import GlassCard from "@/components/GlassCard";
import Link from "next/link";

interface AnimeItem {
  id: string;
  title: string;
  image?: string | null;
  episode?: string;
  type?: string;
  status?: string;
  rating?: string;
  rank?: string;
  badge?: string;
  subtitle?: string;
  time?: string;
  views?: string;
}

interface ContentSectionProps {
  title: string;
  href?: string;
  items: AnimeItem[];
  type?: "grid" | "scroll";
}

export default function ContentSection({
  title,
  href,
  items,
  type = "scroll",
}: ContentSectionProps) {
  if (!items.length) return null;

  const getHref = (item: AnimeItem) => {
    if (item.type === "film") return `/film/${item.id}`;
    if (item.type === "series") return `/series/${item.id}`;
    return `/anime/${item.id}`;
  };

  const getBadge = (item: AnimeItem) => {
    if (item.badge) return item.badge;
    if (item.rank) return item.rank;
    if (item.episode) return item.episode;
    if (item.type) return item.type;
    return undefined;
  };

  const getSubtitle = (item: AnimeItem) => {
    if (item.subtitle) return item.subtitle;
    if (item.rating && item.rating !== "0") return `⭐ ${item.rating}`;
    if (item.episode) return item.episode;
    if (item.type) return item.type;
    return undefined;
  };

  return (
    <section className="mb-0">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white">{title}</h2>
        {href && (
          <Link
            href={href}
            className="text-xs sm:text-sm text-accent hover:text-accent-hover transition-colors font-medium"
          >
            Semua →
          </Link>
        )}
      </div>

      {type === "scroll" ? (
        <div className="relative">
          <div className="flex gap-3 sm:gap-4 lg:gap-5 overflow-x-auto hide-scrollbar pb-4 -mx-1 px-1">
            {items.map((item) => (
              <div key={item.id} className="flex-shrink-0 w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px]">
                <GlassCard
                  href={getHref(item)}
                  title={item.title}
                  image={item.image}
                  subtitle={getSubtitle(item)}
                  badge={getBadge(item)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item) => (
            <GlassCard
              key={item.id}
              href={getHref(item)}
              title={item.title}
              image={item.image}
              subtitle={getSubtitle(item)}
              badge={getBadge(item)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
