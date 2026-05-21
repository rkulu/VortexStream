import Link from "next/link";

interface GenreItem {
  name: string;
  slug?: string;
  count: number;
  url: string;
}

interface GenreSidebarProps {
  items: GenreItem[];
}

export default function GenreSidebar({ items }: GenreSidebarProps) {
  if (!items.length) return null;

  return (
    <div className="liquid-glass rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/10 bg-white/5">
        <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          Genres
        </h2>
        <Link
          href="/genre"
          className="text-xs text-accent hover:text-accent-hover transition-colors font-medium"
        >
          Semua →
        </Link>
      </div>
      <div className="p-3 sm:p-4">
        <div className="grid grid-cols-2 gap-2">
          {items.map((genre) => {
            const slug = genre.slug || genre.name.toLowerCase().replace(/\s+/g, "-");
            return (
              <Link
                key={slug}
                href={`/genre/${slug}`}
                className="glass-button p-2.5 sm:p-3 text-center hover:bg-accent/10 transition-all duration-200 group"
              >
                <span className="text-xs sm:text-sm font-medium text-foreground group-hover:text-accent transition-colors block truncate">
                  {genre.name}
                </span>
                <span className="text-[10px] sm:text-xs text-zinc-500 mt-0.5 block">
                  {genre.count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
