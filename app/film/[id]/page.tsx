import { getFilmDetail } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import BookmarkButton from "@/components/BookmarkButton";
import { safeImage } from "@/lib/image";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const film = await getFilmDetail(id);
    return {
      title: `${film.title} - VortexStream`,
      description: film.synopsis || `Nonton streaming ${film.title} sub indo gratis.`,
      openGraph: {
        title: `${film.title} - VortexStream`,
        description: film.synopsis || `Nonton streaming ${film.title} sub indo gratis.`,
        images: [film.image],
        type: "video.movie",
      },
      twitter: {
        card: "summary_large_image",
        title: `${film.title} - VortexStream`,
        description: film.synopsis || `Nonton streaming ${film.title} sub indo gratis.`,
        images: [film.image],
      },
      alternates: {
        canonical: `/film/${id}`,
      },
    };
  } catch {
    return {
      title: "Film Not Found - VortexStream",
    };
  }
}

export default async function FilmDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let film;

  try {
    film = await getFilmDetail(id);
  } catch {
    notFound();
  }

  const getHref = (item: typeof film.recommendations[0]) => {
    if (item.type === "film") return `/film/${item.id}`;
    if (item.type === "series") return `/series/${item.id}`;
    return `/anime/${item.id}`;
  };

  const downloadLinks = (film as any).downloads || [];
  const streamOptions = (film as any).stream_options || {};

  const allServers = Object.entries(streamOptions)
    .filter(([key]) => key !== "")
    .flatMap(([, servers]) => servers) as any[];

  return (
    <div className="space-y-10 font-sans">
      {/* Hero Detail Section */}
      <section className="relative rounded-[32px] overflow-hidden border border-white/5 shadow-2xl">
        {/* Blurred Background Banner */}
        <div className="absolute inset-0 z-0">
          <Image
            alt=""
            className="object-cover blur-3xl opacity-20 scale-105"
            src={safeImage(film.image)}
            fill
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center">
          {/* Poster with Glowing Border Frame */}
          <div className="lg:col-span-4 aspect-[2/3] group relative max-w-sm mx-auto w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] rounded-[24px] blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <Image
              alt={film.title}
              className="relative object-cover rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-white/10"
              src={safeImage(film.image)}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority
            />
          </div>

          {/* Details */}
          <div className="lg:col-span-8 flex flex-col gap-6 text-left">
            <div className="space-y-3">
              {film.info.status && film.info.status !== "-" && (
                <span className="px-3.5 py-1 rounded-full bg-[#00f4fe]/15 text-[#00f4fe] border border-[#00f4fe]/30 text-[9px] font-extrabold uppercase tracking-widest inline-block">
                  {film.info.status === "Ongoing" ? "Airing Now" : film.info.status}
                </span>
              )}
              <h1 className="font-display text-3xl lg:text-5xl font-black text-white leading-tight uppercase tracking-tight">
                {film.title}
              </h1>
              
              <div className="flex items-center gap-3 text-on-surface-variant text-xs sm:text-sm flex-wrap font-semibold">
                {film.info.rating && film.info.rating !== "0" && (
                  <span className="flex items-center gap-1 text-[#e0b6ff]">
                    <span className="material-symbols-outlined text-sm font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    {film.info.rating}
                  </span>
                )}
                {film.info.episodes_count && film.info.episodes_count !== "-" && (
                  <>
                    <span className="text-white/20">•</span>
                    <span>{film.info.episodes_count} Episodes</span>
                  </>
                )}
                {film.info.type && film.info.type !== "-" && (
                  <>
                    <span className="text-white/20">•</span>
                    <span>{film.info.type}</span>
                  </>
                )}
              </div>
            </div>

            {film.info.genres && film.info.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {film.info.genres.map((genre) => {
                  const slug = genre.url.split("/").pop() || genre.name.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <Link
                      key={genre.name}
                      href={`/genre/${slug}`}
                      className="px-3 py-1 text-[10px] font-bold rounded-full bg-white/5 border border-white/10 text-on-surface-variant hover:text-[#00f4fe] hover:border-[#00f4fe]/30 hover:bg-[#00f4fe]/5 transition-all uppercase tracking-wider"
                    >
                      {genre.name}
                    </Link>
                  );
                })}
              </div>
            )}

            {film.synopsis && (
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-3xl opacity-90 whitespace-pre-line">
                {film.synopsis}
              </p>
            )}

            <div className="flex flex-wrap gap-4 mt-2">
              {allServers.length > 0 && (
                <Link
                  href={`/film/${id}/watch`}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] text-white font-bold text-sm flex items-center gap-2 glow-primary active:scale-95 transition-all uppercase tracking-wider"
                >
                  <span className="material-symbols-outlined text-sm font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  Watch Now
                </Link>
              )}
              
              {/* Dynamic Interactive Bookmarking button */}
              <BookmarkButton
                id={id}
                title={film.title}
                image={film.image}
                type="film"
                rating={film.info.rating}
              />
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs mt-4 pt-4 border-t border-white/5">
              {film.info.season && film.info.season !== "-" && (
                <div>
                  <span className="text-on-surface-variant opacity-60 font-semibold uppercase tracking-wider block mb-0.5">Season</span>
                  <span className="text-white font-bold text-sm">{film.info.season}</span>
                </div>
              )}
              {film.info.duration && film.info.duration !== "-" && (
                <div>
                  <span className="text-on-surface-variant opacity-60 font-semibold uppercase tracking-wider block mb-0.5">Duration</span>
                  <span className="text-white font-bold text-sm">{film.info.duration}</span>
                </div>
              )}
              {film.info.studio && film.info.studio !== "-" && (
                <div>
                  <span className="text-on-surface-variant opacity-60 font-semibold uppercase tracking-wider block mb-0.5">Studio</span>
                  <span className="text-white font-bold text-sm">{film.info.studio}</span>
                </div>
              )}
              {film.info.release_date && film.info.release_date !== "-" && (
                <div>
                  <span className="text-on-surface-variant opacity-60 font-semibold uppercase tracking-wider block mb-0.5">Released</span>
                  <span className="text-white font-bold text-sm">{film.info.release_date}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      {downloadLinks.length > 0 && (
        <section className="p-6 rounded-[24px] border border-white/5 shadow-lg" style={{ background: 'rgba(20, 19, 21, 0.45)', backdropFilter: 'blur(25px)' }}>
          <h2 className="font-display text-xl font-black text-white mb-4 uppercase tracking-tight flex items-center gap-2">
            <span className="text-[#00f4fe] font-black">▶</span> Download Links
          </h2>
          <div className="space-y-6">
            {downloadLinks.map((dl: any) => (
              <div key={dl.resolution} className="border-t border-white/5 pt-4 first:border-0 first:pt-0">
                <h3 className="text-xs font-bold text-[#00f4fe] uppercase tracking-wider mb-3">{dl.resolution}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {dl.links.map((link: any) => (
                    <a
                      key={link.server}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-button py-3 text-center text-xs font-bold text-zinc-300 hover:text-[#00f4fe] hover:border-[#00f4fe]/30 hover:bg-[#00f4fe]/5 transition-all uppercase tracking-wider cursor-pointer"
                    >
                      {link.server}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recommendations */}
      {film.recommendations && film.recommendations.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <span className="text-[#00f4fe] font-black">▶</span> You May Also Like
            </h2>
            <Link href="/catalog" className="text-xs font-bold text-[#00f4fe] hover:underline uppercase tracking-wider">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {film.recommendations.slice(0, 5).map((item, index) => (
              <Link key={`${item.id}-${index}`} href={getHref(item)} className="group cursor-pointer block">
                <div className="relative aspect-[2/3] rounded-[20px] overflow-hidden mb-3 conic-border-hover liquid-glass-card border border-white/5">
                  <Image
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    src={safeImage(item.image)}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center justify-between text-[9px] font-bold text-white uppercase tracking-wider">
                      {item.rating && item.rating !== "0" && (
                        <span className="flex items-center gap-1 text-[#e0b6ff]">
                          <span className="material-symbols-outlined text-[10px] font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          {item.rating}
                        </span>
                      )}
                      <span>{item.type || "Film"}</span>
                    </div>
                  </div>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#00f4fe] transition-colors truncate">{item.title}</h4>
                <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">{item.type || "Film"}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
