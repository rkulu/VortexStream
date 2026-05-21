"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getContactInfo, type ContactInfo } from "@/lib/admin-settings";

const defaultInfo: ContactInfo = {
  email: "support@vortexstream.id",
  phone: "+62 812-3456-7890",
  address: "Jl. Mangga Dua Raya No. 8, Jakarta Pusat 10730, Indonesia",
  whatsapp: "https://wa.me/6281234567890",
  telegram: "https://t.me/vortexstream",
  instagram: "https://instagram.com/vortexstream",
  twitter: "https://twitter.com/vortexstream",
};

const faqItems = [
  {
    q: "Bagaimana cara mengganti kualitas video?",
    a: "Anda dapat mengubah kualitas video melalui menu Pengaturan di halaman profil atau saat memutar video, klik ikon gear dan pilih resolusi yang diinginkan.",
  },
  {
    q: "Apakah VortexStream gratis?",
    a: "VortexStream menawarkan layanan streaming gratis dengan kualitas standar. Untuk pengalaman bebas iklan dan kualitas 4K, Anda dapat meningkatkan ke akun premium.",
  },
  {
    q: "Bagaimana cara melaporkan konten rusak?",
    a: "Jika menemukan konten yang tidak dapat diputar atau mengalami masalah, silakan laporkan melalui form di halaman ini atau hubungi kami di email support.",
  },
  {
    q: "Berapa lama proses permintaan film/series?",
    a: "Permintaan konten baru biasanya diproses dalam 1-3 hari kerja, tergantung pada ketersediaan dan lisensi konten tersebut.",
  },
];

const socialLinks = [
  { icon: "chat", label: "WhatsApp", key: "whatsapp" as const },
  { icon: "send", label: "Telegram", key: "telegram" as const },
  { icon: "photo_camera", label: "Instagram", key: "instagram" as const },
  { icon: "alternate_email", label: "Twitter", key: "twitter" as const },
];

export default function ContactPage() {
  const [info, setInfo] = useState<ContactInfo>(defaultInfo);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setInfo(getContactInfo());
    const handleAdminUpdate = () => setInfo(getContactInfo());
    window.addEventListener("admin-update", handleAdminUpdate);
    return () => window.removeEventListener("admin-update", handleAdminUpdate);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="liquid-glass rounded-2xl p-8 animate-pulse">
          <div className="h-8 w-64 bg-white/10 rounded mb-4" />
          <div className="h-4 w-96 bg-white/10 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
      <div className="liquid-glass rounded-2xl sm:rounded-[24px] p-6 sm:p-8 md:p-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="material-symbols-outlined text-[#00f4fe] text-2xl">headset_mic</span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#00f4fe]">Bantuan</span>
        </div>
        <h1 className="font-display text-display-sm sm:text-display-lg font-black text-white mb-4">
          Hubungi Kami
        </h1>
        <p className="text-on-surface-variant text-body-sm sm:text-body-lg leading-relaxed max-w-2xl">
          Punya pertanyaan, saran, atau butuh bantuan? Tim kami siap membantu Anda. Pilih metode komunikasi yang paling nyaman.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {([
          { icon: "mail", label: "Email", value: info.email, href: `mailto:${info.email}` },
          { icon: "call", label: "Telepon", value: info.phone, href: `tel:${info.phone.replace(/\s/g, "")}` },
          { icon: "location_on", label: "Alamat", value: info.address, href: null },
        ] as const).map((method) => (
          <div key={method.label} className="liquid-glass rounded-2xl p-5 sm:p-6 text-center">
            <span className="material-symbols-outlined text-3xl text-[#e0b6ff] mb-3">{method.icon}</span>
            <h3 className="font-display text-title-lg font-bold text-white mb-1">{method.label}</h3>
            {method.href ? (
              <a href={method.href} className="text-on-surface-variant text-body-sm hover:text-[#00f4fe] transition-colors">
                {method.value}
              </a>
            ) : (
              <p className="text-on-surface-variant text-body-sm">{method.value}</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="liquid-glass rounded-2xl p-6 sm:p-8">
          <h2 className="font-display text-title-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f4fe]">forum</span>
            Kirim Pesan
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nama Anda"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="glass-input w-full px-4 py-3 text-sm text-white rounded-xl outline-none"
            />
            <input
              type="email"
              placeholder="Email Anda"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="glass-input w-full px-4 py-3 text-sm text-white rounded-xl outline-none"
            />
            <textarea
              placeholder="Pesan Anda"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
              className="glass-input w-full px-4 py-3 text-sm text-white rounded-xl outline-none resize-none"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] text-white font-bold py-3 px-6 rounded-full hover:opacity-90 transition-all active:scale-95 text-sm"
            >
              {sent ? "Terkirim ✓" : "Kirim Pesan"}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="liquid-glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-title-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00f4fe]">link</span>
              Ikuti Kami
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => {
                const url = info[social.key];
                return (
                  <a
                    key={social.key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button p-3 sm:p-4 flex items-center gap-2 sm:gap-3 hover:bg-white/10 transition-all"
                  >
                    <span className="material-symbols-outlined text-[#e0b6ff] text-xl">{social.icon}</span>
                    <span className="text-sm font-medium text-white">{social.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="liquid-glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-title-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00f4fe]">help</span>
              FAQ
            </h2>
            <div className="space-y-3">
              {faqItems.slice(0, 3).map((item) => (
                <details key={item.q} className="group">
                  <summary className="text-sm font-semibold text-white cursor-pointer hover:text-[#e0b6ff] transition-colors list-none flex items-center justify-between">
                    {item.q}
                    <span className="material-symbols-outlined text-sm transition-transform group-open:rotate-180 text-on-surface-variant">
                      expand_more
                    </span>
                  </summary>
                  <p className="text-on-surface-variant text-body-sm mt-2 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 text-[#00f4fe] text-sm font-bold mt-4 hover:underline"
            >
              Lihat semua FAQ <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
