import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press Global - VortexStream",
  description: "Pusat informasi pers dan media VortexStream. Dapatkan siaran pers, kit media, dan informasi terbaru tentang platform streaming kami.",
  keywords: ["press", "media", "siaran pers", "VortexStream", "media kit"],
  openGraph: {
    title: "Press Global - VortexStream",
    description: "Informasi pers dan media untuk VortexStream.",
    url: "https://vortexstream.id/press",
    siteName: "VortexStream",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Press Global - VortexStream",
    description: "Informasi pers dan media untuk VortexStream.",
  },
  alternates: {
    canonical: "https://vortexstream.id/press",
  },
};

const pressReleases = [
  {
    date: "15 Mei 2026",
    title: "VortexStream Luncurkan Fitur Streaming 4K Ultra HD",
    summary:
      "VortexStream mengumumkan peluncuran fitur streaming 4K Ultra HD untuk seluruh konten premium, memberikan pengalaman menonton dengan kualitas visual terbaik bagi pengguna di Indonesia.",
  },
  {
    date: "28 April 2026",
    title: "VortexStream Tembus 1 Juta Pengguna Aktif",
    summary:
      "Platform streaming VortexStream mencapai tonggak sejarah dengan 1 juta pengguna aktif bulanan dalam waktu kurang dari setahun sejak peluncuran.",
  },
  {
    date: "10 Maret 2026",
    title: "Kolaborasi Eksklusif dengan Studio Anime Terkemuka",
    summary:
      "VortexStream menjalin kemitraan strategis dengan beberapa studio anime terkemuka Jepang untuk menghadirkan konten eksklusif bagi pengguna setia.",
  },
  {
    date: "5 Januari 2026",
    title: "VortexStream Resmi Diluncurkan",
    summary:
      "Platform streaming terbaru, VortexStream, resmi diluncurkan di Indonesia dengan menawarkan ribuan konten anime, film, dan series berkualitas tinggi.",
  },
];

export default function PressPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
      <div className="liquid-glass rounded-2xl sm:rounded-[24px] p-6 sm:p-8 md:p-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="material-symbols-outlined text-[#00f4fe] text-2xl">campaign</span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#00f4fe]">Media</span>
        </div>
        <h1 className="font-display text-display-sm sm:text-display-lg font-black text-white mb-4">
          Press Global
        </h1>
        <p className="text-on-surface-variant text-body-sm sm:text-body-lg leading-relaxed max-w-2xl">
          Selamat datang di pusat informasi pers VortexStream. Temukan siaran pers terbaru, kit media, dan informasi perusahaan untuk kebutuhan liputan Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="liquid-glass rounded-2xl p-5 sm:p-6 text-center">
          <span className="material-symbols-outlined text-3xl text-[#e0b6ff] mb-3">download</span>
          <h3 className="font-display text-title-lg font-bold text-white mb-2">Media Kit</h3>
          <p className="text-on-surface-variant text-body-sm mb-4">Logo, screenshot, dan aset visual resmi VortexStream.</p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#00f4fe] text-sm font-bold hover:underline"
          >
            Download ZIP <span className="material-symbols-outlined text-sm">download</span>
          </a>
        </div>
        <div className="liquid-glass rounded-2xl p-5 sm:p-6 text-center">
          <span className="material-symbols-outlined text-3xl text-[#e0b6ff] mb-3">mail</span>
          <h3 className="font-display text-title-lg font-bold text-white mb-2">Kontak Pers</h3>
          <p className="text-on-surface-variant text-body-sm mb-4">Hubungi tim PR dan komunikasi kami.</p>
          <a
            href="mailto:press@vortexstream.id"
            className="inline-flex items-center gap-2 text-[#00f4fe] text-sm font-bold hover:underline"
          >
            press@vortexstream.id <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>
        <div className="liquid-glass rounded-2xl p-5 sm:p-6 text-center">
          <span className="material-symbols-outlined text-3xl text-[#e0b6ff] mb-3">info</span>
          <h3 className="font-display text-title-lg font-bold text-white mb-2">Tentang</h3>
          <p className="text-on-surface-variant text-body-sm mb-4">Profil singkat perusahaan VortexStream.</p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#00f4fe] text-sm font-bold hover:underline"
          >
            Baca Selengkapnya <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>

      <div>
        <h2 className="font-display text-display-sm font-black text-white mb-6 flex items-center gap-3">
          <span className="text-[#00f4fe] font-black">▶</span> Siaran Pers Terbaru
        </h2>
        <div className="space-y-4">
          {pressReleases.map((release, index) => (
            <div key={index} className="liquid-glass rounded-2xl p-5 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex flex-col items-center justify-center bg-white/5 rounded-xl px-3 py-2 min-w-[70px]">
                  <span className="text-[10px] font-bold text-[#00f4fe] uppercase tracking-wider">
                    {release.date.split(" ")[1]}
                  </span>
                  <span className="text-display-sm font-black text-white leading-none">
                    {release.date.split(" ")[0]}
                  </span>
                  <span className="text-[10px] text-on-surface-variant">{release.date.split(" ")[2]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-on-surface-variant sm:hidden mb-1">{release.date}</p>
                  <h3 className="font-display text-title-lg font-bold text-white mb-2">{release.title}</h3>
                  <p className="text-on-surface-variant text-body-sm leading-relaxed">{release.summary}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="liquid-glass rounded-2xl p-6 sm:p-8 text-center">
        <h2 className="font-display text-title-lg font-bold text-white mb-3">Liputan Media</h2>
        <p className="text-on-surface-variant text-body-sm mb-6">
          Untuk pertanyaan pers, wawancara, atau informasi lebih lanjut, hubungi tim komunikasi kami.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:press@vortexstream.id"
            className="glass-button px-6 py-3 text-sm font-bold text-white inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">mail</span>
            press@vortexstream.id
          </a>
          <a
            href="/contact"
            className="glass-button px-6 py-3 text-sm font-bold text-white inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">headset_mic</span>
            Hubungi Kami
          </a>
        </div>
      </div>
    </div>
  );
}
