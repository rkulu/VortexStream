import { getAnimeDetail } from "@/lib/api";
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
    const anime = await getAnimeDetail(id);
    return {
      title: `${anime.title} - VortexStream`,
      description: anime.synopsis || `Nonton streaming ${anime.title} sub indo gratis.`,
      openGraph: {
        title: `${anime.title} - VortexStream`,
        description: anime.synopsis || `Nonton streaming ${anime.title} sub indo gratis.`,
        images: [anime.image],
        type: "video.movie",
      },
      twitter: {
        card: "summary_large_image",
        title: `${anime.title} - VortexStream`,
        description: anime.synopsis || `Nonton streaming ${anime.title} sub indo gratis.`,
        images: [anime.image],
      },
      alternates: {
        canonical: `/anime/${id}`,
      },
    };
  } catch {
    return {
      title: "Anime Not Found - VortexStream",
    };
  }
}

export default async function AnimeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let anime;

  try {
    anime = await getAnimeDetail(id);
  } catch {
    notFound();
  }

  const getHref = (item: typeof anime.recommendations[0]) => {
    if (item.type === "film") return `/film/${item.id}`;
    if (item.type === "series") return `/series/${item.id}`;
    return `/anime/${item.id}`;
  };

  return (
    <div className="space-y-10 font-sans">
      {/* Hero Detail Section */}
      <section className="relative rounded-[32px] overflow-hidden border border-white/5 shadow-2xl">
        {/* Blurred Background Banner */}
        <div className="absolute inset-0 z-0">
          <Image
            alt=""
            className="object-cover blur-3xl opacity-20 scale-105"
            src={safeImage(anime.image)}
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
              alt={anime.title}
              className="relative object-cover rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-white/10"
              src={safeImage(anime.image)}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority
            />
          </div>

          {/* Details */}
          <div className="lg:col-span-8 flex flex-col gap-6 text-left">
            <div className="space-y-3">
              {anime.info.status && anime.info.status !== "-" && (
                <span className="px-3.5 py-1 rounded-full bg-[#00f4fe]/15 text-[#00f4fe] border border-[#00f4fe]/30 text-[9px] font-extrabold uppercase tracking-widest inline-block">
                  {anime.info.status === "Ongoing" ? "Airing Now" : anime.info.status}
                </span>
              )}
              <h1 className="font-display text-3xl lg:text-5xl font-black text-white leading-tight uppercase tracking-tight">
                {anime.title}
              </h1>
              
              <div className="flex items-center gap-3 text-on-surface-variant text-xs sm:text-sm flex-wrap font-semibold">
                {anime.info.rating && anime.info.rating !== "0" && (
                  <span className="flex items-center gap-1 text-[#e0b6ff]">
                    <span className="material-symbols-outlined text-sm font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    {anime.info.rating}
                  </span>
                )}
                {anime.info.episodes_count && anime.info.episodes_count !== "-" && (
                  <>
                    <span className="text-white/20">•</span>
                    <span>{anime.info.episodes_count} Episodes</span>
                  </>
                )}
                {anime.info.type && anime.info.type !== "-" && (
                  <>
                    <span className="text-white/20">•</span>
                    <span>{anime.info.type}</span>
                  </>
                )}
              </div>
            </div>

            {anime.info.genres && anime.info.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {anime.info.genres.map((genre) => {
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

            {anime.synopsis && (
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-3xl opacity-90">
                {anime.synopsis}
              </p>
            )}

            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                href={`/episode/${anime.episodes?.[0]?.id || id}`}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] text-white font-bold text-sm flex items-center gap-2 glow-primary active:scale-95 transition-all uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-sm font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                Watch Trailer
              </Link>
              
              {/* Dynamic Interactive Bookmarking button */}
              <BookmarkButton
                id={id}
                title={anime.title}
                image={anime.image}
                type="anime"
                rating={anime.info.rating}
              />
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs mt-4 pt-4 border-t border-white/5">
              {anime.info.season && anime.info.season !== "-" && (
                <div>
                  <span className="text-on-surface-variant opacity-60 font-semibold uppercase tracking-wider block mb-0.5">Season</span>
                  <span className="text-white font-bold text-sm">{anime.info.season}</span>
                </div>
              )}
              {anime.info.duration && anime.info.duration !== "-" && (
                <div>
                  <span className="text-on-surface-variant opacity-60 font-semibold uppercase tracking-wider block mb-0.5">Duration</span>
                  <span className="text-white font-bold text-sm">{anime.info.duration}</span>
                </div>
              )}
              {anime.info.studio && anime.info.studio !== "-" && (
                <div>
                  <span className="text-on-surface-variant opacity-60 font-semibold uppercase tracking-wider block mb-0.5">Studio</span>
                  <span className="text-white font-bold text-sm">{anime.info.studio}</span>
                </div>
              )}
              {anime.info.release_date && anime.info.release_date !== "-" && (
                <div>
                  <span className="text-on-surface-variant opacity-60 font-semibold uppercase tracking-wider block mb-0.5">Released</span>
                  <span className="text-white font-bold text-sm">{anime.info.release_date}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Episodes Section */}
      {anime.episodes && anime.episodes.length > 0 && (
        <section>
          <div className="flex items-end justify-between mb-6 border-b border-white/5 pb-4">
            <h2 className="font-display text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <span className="text-[#00f4fe] font-black">▶</span> Episodes
            </h2>
            <span className="text-[#00f4fe] text-xs font-bold uppercase tracking-wider bg-[#00f4fe]/10 px-3 py-1 rounded-full border border-[#00f4fe]/20">
              Season 1 {anime.info.release_date && anime.info.release_date !== "-" ? `| ${anime.info.release_date.split(" ")[2] || 2024}` : ""}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {anime.episodes.map((ep) => (
              <Link
                key={ep.id}
                href={`/episode/${ep.id}`}
                className="flex flex-col md:flex-row gap-5 p-4 rounded-[20px] transition-all cursor-pointer group border border-white/5 liquid-glass-card shadow-lg hover:scale-[1.01]"
                style={{ background: 'rgba(20, 19, 21, 0.45)', backdropFilter: 'blur(25px)' }}
              >
                <div className="relative md:w-60 aspect-video rounded-xl overflow-hidden shrink-0 border border-white/10">
                  <Image
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    src={safeImage(anime.image)}
                    alt={ep.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 240px"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-white text-4xl font-bold bg-[#00f4fe] p-2.5 rounded-full shadow-[0_0_20px_rgba(0,244,254,0.6)]">play_arrow</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-2 text-left">
                  <span className="text-[#00f4fe] text-[9px] font-extrabold uppercase tracking-wider">
                    Episode {ep.number || ep.title.match(/\d+/)?.[0] || "01"}
                  </span>
                  <h3 className="font-bold text-lg text-white group-hover:text-[#00f4fe] transition-colors">{ep.title}</h3>
                  <p className="text-on-surface-variant text-xs sm:text-sm line-clamp-2 leading-relaxed opacity-95">
                    Saksikan episode terbaru dari {anime.title}. Tonton streaming HD gratis.
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recommendations */}
      {anime.recommendations && anime.recommendations.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <span className="text-[#00f4fe] font-black">▶</span> You May Also Like
            </h2>
            <Link href="/anime" className="text-xs font-bold text-[#00f4fe] hover:underline uppercase tracking-wider">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {anime.recommendations.slice(0, 5).map((item, index) => (
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
                      <span>{item.type || "TV"}</span>
                    </div>
                  </div>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#00f4fe] transition-colors truncate">{item.title}</h4>
                <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">{item.type || "Anime"}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
