import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ketentuan Layanan - VortexStream",
  description: "Syarat dan ketentuan penggunaan layanan streaming VortexStream. Baca kebijakan kami sebelum menggunakan platform.",
  keywords: ["ketentuan layanan", "syarat dan ketentuan", "terms of service", "VortexStream"],
  openGraph: {
    title: "Ketentuan Layanan - VortexStream",
    description: "Syarat dan ketentuan penggunaan layanan streaming VortexStream.",
    url: "https://vortexstream.id/terms",
    siteName: "VortexStream",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ketentuan Layanan - VortexStream",
    description: "Syarat dan ketentuan penggunaan layanan streaming VortexStream.",
  },
  alternates: {
    canonical: "https://vortexstream.id/terms",
  },
};

const sections = [
  {
    title: "1. Penerimaan Ketentuan",
    content:
      "Dengan mengakses dan menggunakan platform VortexStream, Anda menyetujui untuk terikat oleh ketentuan layanan ini. Jika Anda tidak setuju dengan bagian mana pun dari ketentuan ini, Anda tidak diperbolehkan menggunakan layanan kami.",
  },
  {
    title: "2. Deskripsi Layanan",
    content:
      "VortexStream menyediakan layanan streaming konten anime, film, series, dan hiburan lainnya secara online. Kami berusaha menyediakan akses ke berbagai konten berkualitas tinggi, namun ketersediaan konten dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.",
  },
  {
    title: "3. Hak Kekayaan Intelektual",
    content:
      "Seluruh konten yang tersedia di VortexStream dilindungi oleh hak cipta dan hukum kekayaan intelektual yang berlaku. Anda tidak diperbolehkan untuk mendistribusikan, memodifikasi, mengunggah ulang, atau menjual kembali konten dari platform kami tanpa izin tertulis dari pemilik hak cipta.",
  },
  {
    title: "4. Penggunaan yang Diizinkan",
    content:
      "Anda setuju untuk menggunakan VortexStream hanya untuk tujuan pribadi dan non-komersial. Dilarang menggunakan layanan kami untuk kegiatan ilegal, melanggar hukum, atau melanggar hak pihak ketiga.",
  },
  {
    title: "5. Akun Pengguna",
    content:
      "Anda bertanggung jawab penuh atas keamanan akun dan kata sandi Anda. VortexStream tidak bertanggung jawab atas kerugian yang timbul akibat penggunaan akun Anda oleh pihak yang tidak berwenang. Anda wajib segera melaporkan jika terjadi akses tidak sah ke akun Anda.",
  },
  {
    title: "6. Batasan Tanggung Jawab",
    content:
      "VortexStream tidak bertanggung jawab atas kerusakan langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan layanan kami. Layanan disediakan 'sebagaimana adanya' tanpa jaminan tersurat maupun tersirat.",
  },
  {
    title: "7. Perubahan Ketentuan",
    content:
      "Kami berhak untuk mengubah ketentuan layanan ini sewaktu-waktu. Perubahan akan diumumkan melalui platform kami. Dengan terus menggunakan layanan setelah perubahan, Anda dianggap menyetujui ketentuan yang telah diperbarui.",
  },
  {
    title: "8. Hukum yang Berlaku",
    content:
      "Ketentuan layanan ini diatur oleh dan ditafsirkan sesuai dengan hukum yang berlaku di Republik Indonesia. Setiap sengketa yang timbul akan diselesaikan di pengadilan yang berwenang di Indonesia.",
  },
  {
    title: "9. Kontak",
    content:
      "Jika Anda memiliki pertanyaan mengenai ketentuan layanan ini, silakan hubungi kami melalui halaman Kontak atau email di support@vortexstream.id.",
  },
];

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
      <div className="liquid-glass rounded-2xl sm:rounded-[24px] p-6 sm:p-8 md:p-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="material-symbols-outlined text-[#00f4fe] text-2xl">description</span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#00f4fe]">Legal</span>
        </div>
        <h1 className="font-display text-display-sm sm:text-display-lg font-black text-white mb-4">
          Ketentuan Layanan
        </h1>
        <p className="text-on-surface-variant text-body-sm sm:text-body-lg leading-relaxed">
          Terakhir diperbarui: 21 Mei 2026. Harap baca ketentuan layanan ini dengan saksama sebelum menggunakan platform VortexStream.
        </p>
      </div>

      <div className="space-y-5 sm:space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="liquid-glass rounded-2xl p-5 sm:p-7">
            <h2 className="font-display text-title-lg font-bold text-white mb-3">{section.title}</h2>
            <p className="text-on-surface-variant text-body-sm sm:text-body-lg leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      <div className="liquid-glass rounded-2xl p-5 sm:p-7 text-center">
        <p className="text-on-surface-variant text-body-sm">
          Dengan menggunakan VortexStream, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh ketentuan layanan ini.
        </p>
      </div>
    </div>
  );
}
