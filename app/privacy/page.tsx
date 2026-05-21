import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi - VortexStream",
  description: "Kebijakan privasi VortexStream menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda.",
  keywords: ["kebijakan privasi", "privacy policy", "perlindungan data", "VortexStream"],
  openGraph: {
    title: "Kebijakan Privasi - VortexStream",
    description: "Pelajari bagaimana VortexStream melindungi data pribadi Anda.",
    url: "https://vortexstream.id/privacy",
    siteName: "VortexStream",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kebijakan Privasi - VortexStream",
    description: "Pelajari bagaimana VortexStream melindungi data pribadi Anda.",
  },
  alternates: {
    canonical: "https://vortexstream.id/privacy",
  },
};

const sections = [
  {
    title: "1. Informasi yang Kami Kumpulkan",
    content:
      "Kami mengumpulkan informasi yang Anda berikan secara langsung saat mendaftar akun, seperti nama, alamat email, dan preferensi konten. Kami juga secara otomatis mengumpulkan data penggunaan seperti jenis perangkat, alamat IP, halaman yang dikunjungi, dan durasi menonton untuk meningkatkan layanan kami.",
  },
  {
    title: "2. Penggunaan Informasi",
    content:
      "Informasi yang kami kumpulkan digunakan untuk: (a) Menyediakan dan memelihara layanan streaming kami; (b) Menyesuaikan rekomendasi konten berdasarkan preferensi Anda; (c) Mengirimkan pembaruan, newsletter, dan informasi promosi jika Anda berlangganan; (d) Menganalisis pola penggunaan untuk meningkatkan pengalaman pengguna; (e) Mendeteksi dan mencegah aktivitas yang melanggar ketentuan.",
  },
  {
    title: "3. Perlindungan Data",
    content:
      "Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi data pribadi Anda dari akses tidak sah, perubahan, pengungkapan, atau penghancuran. Data Anda disimpan di server yang aman dengan enkripsi dan firewall.",
  },
  {
    title: "4. Cookie dan Teknologi Pelacakan",
    content:
      "Kami menggunakan cookie dan teknologi serupa untuk meningkatkan fungsionalitas platform, menganalisis tren, dan mengingat preferensi Anda. Anda dapat mengontrol penggunaan cookie melalui pengaturan browser Anda.",
  },
  {
    title: "5. Berbagi Data dengan Pihak Ketiga",
    content:
      "Kami tidak menjual data pribadi Anda kepada pihak ketiga. Kami hanya membagikan data Anda dengan penyedia layanan tepercaya yang membantu kami mengoperasikan platform, seperti penyedia hosting dan analitik, dengan perjanjian kerahasiaan yang ketat.",
  },
  {
    title: "6. Hak Anda",
    content:
      "Anda memiliki hak untuk: (a) Mengakses data pribadi yang kami simpan; (b) Meminta koreksi data yang tidak akurat; (c) Meminta penghapusan data Anda; (d) Menolak pemrosesan data untuk tujuan pemasaran; (e) Menarik persetujuan kapan saja. Hubungi kami untuk menggunakan hak-hak ini.",
  },
  {
    title: "7. Retensi Data",
    content:
      "Kami menyimpan data pribadi Anda selama akun Anda aktif atau selama diperlukan untuk menyediakan layanan. Setelah itu, data akan dihapus atau dianonimkan sesuai kebijakan retensi internal.",
  },
  {
    title: "8. Perubahan Kebijakan Privasi",
    content:
      "Kebijakan privasi ini dapat diperbarui dari waktu ke waktu. Perubahan signifikan akan diberitahukan melalui platform atau email. Dengan terus menggunakan layanan setelah perubahan, Anda menyetujui kebijakan yang diperbarui.",
  },
  {
    title: "9. Kontak",
    content:
      "Jika Anda memiliki pertanyaan atau kekhawatiran tentang kebijakan privasi ini, silakan hubungi kami di support@vortexstream.id atau melalui halaman Kontak.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
      <div className="liquid-glass rounded-2xl sm:rounded-[24px] p-6 sm:p-8 md:p-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="material-symbols-outlined text-[#00f4fe] text-2xl">shield</span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#00f4fe]">Privasi</span>
        </div>
        <h1 className="font-display text-display-sm sm:text-display-lg font-black text-white mb-4">
          Kebijakan Privasi
        </h1>
        <p className="text-on-surface-variant text-body-sm sm:text-body-lg leading-relaxed">
          Terakhir diperbarui: 21 Mei 2026. VortexStream berkomitmen untuk melindungi privasi Anda. Kebijakan ini menjelaskan praktik kami terkait pengumpulan, penggunaan, dan pengungkapan data pribadi.
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
          Kepercayaan Anda penting bagi kami. Kami berkomitmen untuk melindungi data pribadi Anda dan menjaga transparansi dalam praktik kami.
        </p>
      </div>
    </div>
  );
}
