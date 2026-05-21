import { getHomeData, getPopular, getGenres, getOngoing } from "@/lib/api";
import ContentSection from "@/components/ContentSection";
import PopularSidebar from "@/components/PopularSidebar";
import GenreSidebar from "@/components/GenreSidebar";
import Link from "next/link";
import RowCard from "@/components/RowCard";
import LandscapeCard from "@/components/LandscapeCard";
import BookmarkButton from "@/components/BookmarkButton";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [homeData, popularData, genresData, ongoingData] = await Promise.all([
    getHomeData().catch((error) => {
      console.error('Error fetching home data:', error);
      return null;
    }),
    getPopular().catch((error) => {
      console.error('Error fetching popular data:', error);
      return null;
    }),
    getGenres().catch((error) => {
      console.error('Error fetching genres data:', error);
      return null;
    }),
    getOngoing(1).catch((error) => {
      console.error('Error fetching ongoing data:', error);
      return null;
    }),
  ]);

  if (!homeData || !homeData.data) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="glass-panel rounded-2xl p-8 text-center">
          <p className="text-on-surface-variant text-sm">Gagal memuat data. Silakan coba beberapa saat lagi.</p>
          <p className="text-on-surface-variant text-xs mt-2 opacity-70">API mungkin sedang maintenance atau tidak tersedia.</p>
        </div>
      </div>
    );
  }

  const { top10_anime, top10_film, latest_anime, latest_film, latest_series, tv_show } = homeData.data;

  // Hero Slider Item
  const sliderItems = top10_anime.slice(0, 5).map((item) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    type: item.type || "Anime",
    rating: item.rating && item.rating !== "0" ? item.rating : "9.8",
  }));

  const mustWatchAnime = top10_anime.slice(5, 8).map((item) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    genre: item.type || "Action, Fantasy",
    rating: item.rating && item.rating !== "0" ? item.rating : "9.5",
  }));

  const popularTop10 = popularData?.data?.slice(0, 10) || [];
  const genreTop20 = genresData?.data?.slice(0, 20) || [];

  // Ongoing Gems Mapping
  const ongoingGems = (ongoingData?.results?.slice(0, 3) || top10_anime.slice(7, 10)).map((item, idx) => {
    const days = ["Mondays", "Thursdays", "Sundays"];
    const percentages = [42, 42, 83];
    return {
      id: item.id,
      title: item.title,
      image: item.image,
      day: `Weekly on ${days[idx % 3]}`,
      progress: percentages[idx % 3],
    };
  });

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10 pb-8 sm:pb-10 lg:pb-12 font-sans">

      {/* Cinematic Hero Slider - Fluid Glass styled banner */}
      {sliderItems.length > 0 && (
        <section className="relative rounded-2xl sm:rounded-[24px] lg:rounded-[28px] overflow-hidden aspect-[4/3] sm:aspect-[16/7] lg:aspect-[21/9] group border border-white/10 shadow-[0_12px_45px_rgba(0,0,0,0.6)]">
          {/* Background image & gradient overlays */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${sliderItems[0].image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-transparent to-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#131315]/90 via-[#131315]/40 to-transparent"></div>
          </div>

          {/* Floating Glass Detail Board */}
          <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 max-w-[85%] sm:max-w-md md:max-w-xl z-10">
            <div
              className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-[24px] border border-white/10 flex flex-col gap-2 sm:gap-4 shadow-2xl relative overflow-hidden"
              style={{ background: 'rgba(20, 19, 21, 0.45)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)' }}
            >
              <div className="absolute top-0 left-0 w-[3px] sm:w-[4px] h-full bg-[#00f4fe]"></div>

              <div className="flex items-center gap-2 sm:gap-3">
                <span className="bg-[#00f4fe]/15 text-[#00f4fe] px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-wider border border-[#00f4fe]/25">
                  Featured
                </span>
                <div className="flex items-center gap-1 text-[#e0b6ff]">
                  <span className="material-symbols-outlined text-xs sm:text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="text-[10px] sm:text-xs font-bold">{sliderItems[0].rating}</span>
                </div>
              </div>

              <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-display font-extrabold text-white leading-tight tracking-tight uppercase line-clamp-2">
                {sliderItems[0].title}
              </h1>

              <p className="text-on-surface-variant text-[10px] sm:text-xs md:text-sm line-clamp-2 leading-relaxed opacity-90 hidden sm:block">
                Saksikan tayangan mahakarya {sliderItems[0].title} secara eksklusif dengan kualitas video Ultra HD 4K dan server streaming berkecepatan tinggi.
              </p>

              <div className="flex items-center gap-2 sm:gap-3 sm:mt-2">
                <Link
                  href={`/anime/${sliderItems[0].id}`}
                  className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] text-white px-4 sm:px-7 py-2 sm:py-3 rounded-full font-bold hover:hero-glow transition-all active:scale-95 text-[10px] sm:text-xs tracking-wider uppercase"
                >
                  <span className="material-symbols-outlined text-xs sm:text-sm font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  Watch Now
                </Link>

                <BookmarkButton
                  id={sliderItems[0].id}
                  title={sliderItems[0].title}
                  image={sliderItems[0].image}
                  type="anime"
                  rating={sliderItems[0].rating}
                  variant="circle"
                />
              </div>
            </div>
          </div>

          {/* Slider indicators */}
          <div className="absolute bottom-3 right-3 sm:bottom-8 sm:right-8 flex items-center gap-2 sm:gap-3 z-10">
            <button className="size-8 sm:size-10 rounded-full border border-white/20 bg-black/40 text-white hover:bg-white/10 active:scale-90 transition-all flex items-center justify-center">
              <span className="material-symbols-outlined text-xs sm:text-sm">chevron_left</span>
            </button>
            <button className="size-8 sm:size-10 rounded-full border border-white/20 bg-black/40 text-white hover:bg-white/10 active:scale-90 transition-all flex items-center justify-center">
              <span className="material-symbols-outlined text-xs sm:text-sm">chevron_right</span>
            </button>
          </div>
        </section>
      )}

      {/* Categories Bento Grid */}
      <section>
        <h2 className="font-display text-xl sm:text-2xl font-extrabold mb-4 sm:mb-6 text-white tracking-tight flex items-center gap-2">
          <span className="text-[#00f4fe] font-black">▶</span> Eksplorasi Kategori
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <Link
            href="/anime"
            className="md:col-span-2 relative rounded-2xl sm:rounded-[24px] overflow-hidden group cursor-pointer liquid-glass-card aspect-[16/10] sm:aspect-[16/9] md:aspect-auto border border-white/5"
          >
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj1V9bzLv7MBMGZt-kQrtyECICXyCuLhNmEK24Ddx_OnL7GRZE-CK_zLn9llaZ1rpc_rqFFpu7QC1ElL4q0hZnU1WbFBc6qz1L9PjS9BQIRyMosv8vllQvXRKhWToYrurvzY1qcfahStusj7mtuOiBDGA44ACXvDLzv53LRdwiyzCz28eKO8DvvObbM2QFaIgiQCHEfYA_9oeq4Rj1dnxDKPOI767cmFnmLwk-Jfo11zwp4IZN7aQ4loIZeV-T7PhVS7oCIJeUlG5e"
              alt="Anime Category"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent p-4 sm:p-6 md:p-8 flex flex-col justify-center gap-1 sm:gap-1.5">
              <span className="text-[#00f4fe] text-[8px] sm:text-[9px] font-bold uppercase tracking-widest">Paling Populer</span>
              <h3 className="font-display text-base sm:text-xl md:text-2xl font-black text-white uppercase tracking-tight">Wajib Tonton Anime</h3>
              <p className="text-on-surface-variant text-[10px] sm:text-xs max-w-sm leading-relaxed opacity-95 hidden sm:block">Koleksi mahakarya dari studio ternama dunia dengan kualitas visual yang memukau.</p>
              <div className="mt-1 sm:mt-3 flex items-center gap-2 text-[#00f4fe] text-[10px] sm:text-xs font-bold">
                <span>Mulai Jelajahi</span>
                <span className="material-symbols-outlined text-xs sm:text-sm">arrow_forward</span>
              </div>
            </div>
          </Link>

          <div className="flex flex-row md:flex-col gap-4 sm:gap-6">
            <Link
              href="/series"
              className="flex-1 relative rounded-2xl overflow-hidden group cursor-pointer liquid-glass-card aspect-[3/2] sm:aspect-[16/9] md:aspect-auto border border-white/5"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuABDdmRUmaq8aCn6yZkFDadGSKkPtZ4mZOdLEQkgnOFCXJlG9PRFZN0et0_GOohTI0ExTLWy0hb7FP5_zudQP633PpYS6WQ4qHFz9UnS5vm5XgBdY_myX2VDpeOpm-r1N5FyvUewOgxjBmAqrn62qvqjRMkLFdC-C1z1ICR3l02anhHfdmVEl5RkUxUSSxInI6JjX9bw_lxOKLEdfo-uf8p9igivtFzddc22SS3GUDNSugjNCVIDq-5n8wTAKxZARfHnju84THm4DeH"
                alt="Series"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 sm:p-5 flex flex-col justify-end">
                <h3 className="font-display text-sm sm:text-base font-extrabold text-white">Series</h3>
                <p className="text-on-surface-variant text-[9px] sm:text-[10px] mt-0.5 opacity-90">Series List penuh emosi yang sedang tren.</p>
              </div>
            </Link>

            <Link
              href="/film"
              className="flex-1 relative rounded-2xl overflow-hidden group cursor-pointer liquid-glass-card aspect-[3/2] sm:aspect-[16/9] md:aspect-auto border border-white/5"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFx3g6p81EBLPubac-LLIJNqTytAJLUT0jSF7T_o9WFo3Mdp2hd1jMp4mCKCSZNBtzPoQjWSpTgky6uCqrLnCsLoNZf3vDyHYv1YkfOKrR7tFrpQvLW0z1WLFRgkl3nrczwnFi9KKBKCYcycwVVbyODJlyfiE8Vgjp9qG7_Ji4YDWeo0CSnvBoeHSMsExy1wqQEvy-EFZw1uZDR8d3cDdlcFIqrBe9wgPEBAZ5JKbr9Fk27lF8Y01DFt8EKEebjzu13ZOEG2qM0nGi"
                alt="Blockbuster Movies"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 sm:p-5 flex flex-col justify-end">
                <h3 className="font-display text-sm sm:text-base font-extrabold text-white">Blockbuster Movies</h3>
                <p className="text-on-surface-variant text-[9px] sm:text-[10px] mt-0.5 opacity-90">Film layar lebar terpopuler kualitas bioskop.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Grid Content Area */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="flex-1 min-w-0 space-y-6 sm:space-y-8 lg:space-y-10">

          {/* Popular Now - Refactored 5-column grid */}
          {top10_anime && top10_anime.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span className="text-[#00f4fe] font-black">▶</span> Popular Now
                </h2>
                <Link href="/populer" className="text-[10px] sm:text-xs font-bold text-[#00f4fe] hover:underline flex items-center gap-1 uppercase tracking-wider">
                  See All <span className="material-symbols-outlined text-xs sm:text-sm font-bold">arrow_forward</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 mb-8">
                {top10_anime.slice(0, 5).map((item) => (
                  <Link key={item.id} href={`/anime/${item.id}`} className="anime-card group cursor-pointer block">
                    <div className="relative aspect-[2/3] rounded-[20px] overflow-hidden mb-3 border border-white/5 shadow-lg liquid-glass-card">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500"
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                      />

                      {/* Interactive slide up quick play overlay */}
                      <div className="poster-overlay absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-end p-3 transition-opacity duration-300">
                        <span className="w-full py-2 bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] text-white rounded-xl font-bold text-xs text-center shadow-md uppercase tracking-wider transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          Quick Play
                        </span>
                      </div>

                      {item.rating && item.rating !== "0" && (
                        <div className="absolute top-3 left-3 bg-black/60 text-[#e0b6ff] px-2.5 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
                          ★ {item.rating}
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-white group-hover:text-[#00f4fe] transition-colors mb-0.5 truncate text-xs sm:text-sm">{item.title}</h3>
                    <p className="text-[10px] sm:text-xs text-on-surface-variant font-medium">{item.type || "Anime"}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Wajib Tonton: Anime */}
          {mustWatchAnime.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span className="text-[#00f4fe] font-black">▶</span> Wajib Tonton: Anime
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {mustWatchAnime.map((anime) => (
                  <RowCard
                    key={anime.id}
                    href={`/anime/${anime.id}`}
                    title={anime.title}
                    image={anime.image}
                    subtitle={anime.genre}
                    rating={anime.rating}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Latest Releases - Horizontal Scroll */}
          {latest_anime && latest_anime.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span className="text-[#00f4fe] font-black">▶</span> Latest Releases
                </h2>
                <Link href="/latest" className="text-[10px] sm:text-xs font-bold text-[#00f4fe] hover:underline flex items-center gap-1 uppercase tracking-wider">
                  See All <span className="material-symbols-outlined text-xs sm:text-sm font-bold">arrow_forward</span>
                </Link>
              </div>
              <div className="flex overflow-x-auto gap-3 sm:gap-5 pb-4 snap-x snap-mandatory stitch-scrollbar">
                {latest_anime.slice(0, 6).map((item) => (
                  <Link key={item.id} href={`/anime/${item.id}`} className="min-w-[260px] sm:min-w-[300px] md:min-w-[340px] snap-start relative rounded-2xl overflow-hidden border border-white/5 group flex-shrink-0 shadow-xl liquid-glass-card">
                    <div className="h-36 sm:h-44 overflow-hidden relative">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-transparent to-transparent"></div>
                    </div>
                    <div className="p-3 sm:p-4" style={{ background: 'rgba(20, 19, 21, 0.45)', backdropFilter: 'blur(20px)' }}>
                      <div className="flex justify-between items-start mb-1.5 gap-2">
                        <h3 className="font-bold text-white text-xs sm:text-sm truncate group-hover:text-[#00f4fe] transition-colors">{item.title}</h3>
                        {item.episode && (
                          <span className="text-[8px] sm:text-[9px] bg-[#00f4fe]/15 px-2 py-0.5 rounded text-[#00f4fe] border border-[#00f4fe]/30 font-bold flex-shrink-0 ml-1">EP {item.episode}</span>
                        )}
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed opacity-90">{item.description || `${item.title} - Episode terbaru telah tayang! Nonton sekarang gratis.`}</p>
                      <div className="flex items-center justify-between mt-3 sm:mt-4">
                        <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-white/50">{item.type || "Anime"}</span>
                        <span className="size-6 sm:size-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#9d4edd] hover:to-[#00f4fe] hover:text-white transition-all text-on-surface">
                          <span className="material-symbols-outlined text-[10px] sm:text-xs font-bold">arrow_forward</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Ongoing Gems - New horizontal progress list matches mockup exactly */}
          {ongoingGems.length > 0 && (
            <section className="space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span className="text-[#00f4fe] font-black">▶</span> Ongoing Gems
                </h2>
                <Link href="/jadwal" className="text-[10px] sm:text-xs font-bold text-[#00f4fe] hover:underline flex items-center gap-1 uppercase tracking-wider">
                  View Schedule <span className="material-symbols-outlined text-xs sm:text-sm font-bold">arrow_forward</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {ongoingGems.map((gem) => (
                  <Link
                    key={gem.id}
                    href={`/anime/${gem.id}`}
                    className="p-3 sm:p-4 rounded-2xl border border-white/5 flex items-center gap-3 sm:gap-4 transition-all liquid-glass-card shadow-lg"
                    style={{ background: 'rgba(20, 19, 21, 0.45)', backdropFilter: 'blur(20px)' }}
                  >
                    <div className="size-14 sm:size-16 rounded-xl sm:rounded-[14px] overflow-hidden shrink-0 border border-white/10">
                      <img src={gem.image} alt={gem.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1 sm:space-y-1.5">
                      <h3 className="font-bold text-xs sm:text-sm text-white truncate group-hover:text-[#00f4fe]">{gem.title}</h3>
                      <p className="text-[9px] sm:text-[10px] text-on-surface-variant font-medium">{gem.day}</p>

                      <div className="space-y-1">
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] rounded-full" style={{ width: `${gem.progress}%` }}></div>
                        </div>
                        <span className="block text-[7px] sm:text-[8px] font-bold text-[#00f4fe] uppercase tracking-wider">{gem.progress}% Season Progress</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* K-Drama Terpopuler */}
          {latest_series && latest_series.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span className="text-[#00f4fe] font-black">▶</span> K-Drama Terpopuler
                </h2>
                <Link href="/series" className="text-[10px] sm:text-xs font-bold text-[#00f4fe] hover:underline uppercase tracking-wider">Lihat Semua</Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {latest_series.slice(0, 4).map((series) => (
                  <LandscapeCard
                    key={series.id}
                    href={`/series/${series.id}`}
                    title={series.title}
                    image={series.image}
                    badge={series.type || "Drama"}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Film Terbaru */}
          {latest_film && latest_film.length > 0 && (
            <ContentSection
              title="Film Terbaru"
              href="/film"
              items={latest_film}
              type="scroll"
            />
          )}

          {/* TV Show */}
          {tv_show && tv_show.length > 0 && (
            <ContentSection
              title="TV Show"
              href="/tvshow"
              items={tv_show}
              type="scroll"
            />
          )}

          {/* Sidebar fallback for Mobile */}
          <div className="lg:hidden space-y-6 sm:space-y-8 pt-2 sm:pt-4">
            <PopularSidebar items={popularTop10} />
            <GenreSidebar items={genreTop20} />
          </div>

        </div>

        {/* Sidebar for Desktop */}
        <div className="hidden lg:block w-72 xl:w-80 flex-shrink-0 space-y-6 sm:space-y-8">
          <PopularSidebar items={popularTop10} />
          <GenreSidebar items={genreTop20} />
        </div>
      </div>
    </div>
  );
}
