"use client";

import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [videoQuality, setVideoQuality] = useState("auto");
  const [language, setLanguage] = useState("id");
  const [playerType, setPlayerType] = useState("advanced");
  const [autoNext, setAutoNext] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load preferences
    const q = localStorage.getItem("vortex_quality");
    const l = localStorage.getItem("vortex_lang");
    const p = localStorage.getItem("vortex_player");
    const n = localStorage.getItem("vortex_autonext");
    if (q) setVideoQuality(q);
    if (l) setLanguage(l);
    if (p) setPlayerType(p);
    if (n) setAutoNext(n === "true");
  }, []);

  const saveSettings = (key: string, value: string) => {
    localStorage.setItem(key, value);
    setMessage("Pengaturan berhasil disimpan!");
    setTimeout(() => setMessage(null), 3000);
  };

  const handleClearBookmarks = () => {
    if (confirm("Apakah Anda yakin ingin menghapus seluruh bookmark?")) {
      localStorage.setItem("vortex_bookmarks", JSON.stringify([]));
      window.dispatchEvent(new Event("bookmark-change"));
      setMessage("Semua bookmark berhasil dihapus!");
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleClearHistory = () => {
    if (confirm("Apakah Anda yakin ingin menghapus seluruh riwayat nonton?")) {
      localStorage.removeItem("vortex_watch_history");
      setMessage("Riwayat nonton berhasil dihapus!");
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-[#e0b6ff] animate-pulse">Memuat Pengaturan...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans pb-12">
      {/* Toast Alert */}
      {message && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#e0b6ff] text-[#4c007d] px-5 py-3 rounded-xl font-bold text-xs shadow-[0_4px_30px_rgba(224,182,255,0.4)] animate-slide-in border border-white/20">
          <span className="material-symbols-outlined text-sm font-bold">check_circle</span>
          {message}
        </div>
      )}

      {/* Page Title */}
      <div className="space-y-1">
        <h1 className="text-3xl font-display font-extrabold text-white tracking-tight flex items-center gap-3">
          <span className="material-symbols-outlined text-3xl text-[#e0b6ff]">settings</span>
          Pengaturan
        </h1>
        <p className="text-on-surface-variant text-sm">Sesuaikan preferensi pemutaran video dan kelola akun Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Side: Account Tier & Profile */}
        <div className="md:col-span-4 space-y-6">
          <div className="liquid-glass rounded-3xl p-6 border border-white/5 relative overflow-hidden flex flex-col items-center text-center gap-5 shadow-2xl">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#9d4edd]/10 rounded-full blur-2xl"></div>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] rounded-full blur opacity-40 group-hover:opacity-70 transition duration-300"></div>
              <img
                alt="Avatar"
                className="relative size-20 rounded-full border border-white/20 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJjEqpNdFmxo5t8lR-VreHeeq2WorZw4MzDwW466s2GQcWk6CvQIP7JGak225O_f4KiOiVRgdep-aAyX32fPgOL6kFjd45EixbX6F5FKrWg627__mHKWx7sMFsCiv7TdyRiV1wgWOlXo16s4WwrfzeH-33NJbyrB0-brKwkTEj2GCgEbOyB1ayMZcYksHetw7pk7IKyBcaNZV4R7787VrsCbjRDzByzJMP_sogN4ww3bjDy5SQpp4KSH4q3evel-SwnbL7c4ZobD7t"
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white tracking-tight">Akun Premium</h3>
              <p className="text-[#e0b6ff] text-xs font-semibold px-3 py-1 bg-[#e0b6ff]/10 rounded-full border border-[#e0b6ff]/20 inline-block uppercase tracking-wider">
                Berlangganan Aktif
              </p>
            </div>

            <div className="w-full border-t border-white/5 pt-4 flex flex-col gap-2 text-left text-xs">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Metode Bayar:</span>
                <span className="font-bold text-white">Google Play</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Berlaku s/d:</span>
                <span className="font-bold text-white">20 Juli 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Resolusi Maks:</span>
                <span className="font-bold text-[#00f4fe]">Ultra HD 4K</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Options Form */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Playback Preferences */}
          <div className="liquid-glass rounded-3xl p-6 md:p-8 border border-white/5 space-y-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-[#e0b6ff]">play_circle</span>
              Preferensi Pemutaran
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">Kualitas Default</label>
                <select
                  value={videoQuality}
                  onChange={(e) => {
                    setVideoQuality(e.target.value);
                    saveSettings("vortex_quality", e.target.value);
                  }}
                  className="w-full glass-input px-4 py-2.5 text-sm text-foreground bg-[#353437]/50"
                >
                  <option value="auto">Auto (Direkomendasikan)</option>
                  <option value="1080p">Full HD (1080p)</option>
                  <option value="720p">HD (720p)</option>
                  <option value="480p">SD (480p)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">Bahasa Subtitle</label>
                <select
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    saveSettings("vortex_lang", e.target.value);
                  }}
                  className="w-full glass-input px-4 py-2.5 text-sm text-foreground bg-[#353437]/50"
                >
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English</option>
                  <option value="jp">Japanese</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">Tipe Pemutar Video</label>
                <select
                  value={playerType}
                  onChange={(e) => {
                    setPlayerType(e.target.value);
                    saveSettings("vortex_player", e.target.value);
                  }}
                  className="w-full glass-input px-4 py-2.5 text-sm text-foreground bg-[#353437]/50"
                >
                  <option value="advanced">Iframe Stream Server (Cepat)</option>
                  <option value="native">HTML5 Native Video Player</option>
                </select>
              </div>

              <div className="flex items-center justify-between sm:pt-6">
                <div className="space-y-0.5">
                  <span className="block text-sm font-bold text-white">Putar Episode Berikutnya</span>
                  <span className="block text-[10px] text-on-surface-variant">Lanjutkan streaming otomatis.</span>
                </div>
                <button
                  onClick={() => {
                    const nextVal = !autoNext;
                    setAutoNext(nextVal);
                    saveSettings("vortex_autonext", nextVal.toString());
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    autoNext ? "bg-[#9d4edd]" : "bg-white/10"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      autoNext ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Storage & Browser Clear Controls */}
          <div className="liquid-glass rounded-3xl p-6 md:p-8 border border-white/5 space-y-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-red-400">storage</span>
              Penyimpanan & Privasi
            </h2>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              Seluruh preferensi, bookmark, dan riwayat nonton Anda hanya disimpan secara lokal di dalam browser Anda. Anda dapat mereset data tersebut di bawah ini.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleClearHistory}
                className="flex-1 px-5 py-3 rounded-full border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">history</span>
                Hapus Riwayat Nonton
              </button>

              <button
                onClick={handleClearBookmarks}
                className="flex-1 px-5 py-3 rounded-full border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">bookmark_remove</span>
                Hapus Semua Bookmark
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
