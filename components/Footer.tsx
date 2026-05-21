import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 md:px-8 py-6 sm:py-8 w-full mt-8 sm:mt-12 bg-[#201f21]/40 backdrop-blur-[20px] border-t border-white/5 opacity-80 hover:opacity-100 transition-opacity font-sans">
      <div className="mb-4 sm:mb-0 text-center sm:text-left">
        <span className="font-display text-xl sm:text-2xl font-black text-[#e5e1e4]">
          Vortex<span className="text-[#9d4edd] italic">.</span>
        </span>
        <p className="text-[10px] sm:text-xs text-[#d0c2d5] mt-1.5 sm:mt-2">
          © {new Date().getFullYear()} Vortex Stream. Hak Cipta Dilindungi.
        </p>
      </div>
      <div className="flex gap-8 sm:gap-12">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-[#9d4edd] uppercase">PERUSAHAAN</span>
          <Link href="/privacy" className="text-[#d0c2d5] hover:text-[#e0b6ff] transition-colors text-[11px] sm:text-xs">
            Kebijakan Privasi
          </Link>
          <Link href="/terms" className="text-[#d0c2d5] hover:text-[#e0b6ff] transition-colors text-[11px] sm:text-xs">
            Ketentuan Layanan
          </Link>
        </div>
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-[#9d4edd] uppercase">BANTUAN</span>
          <Link href="/contact" className="text-[#d0c2d5] hover:text-[#e0b6ff] transition-colors text-[11px] sm:text-xs">
            Hubungi Kami
          </Link>
          <Link href="/press" className="text-[#d0c2d5] hover:text-[#e0b6ff] transition-colors text-[11px] sm:text-xs">
            Press Global
          </Link>
        </div>
      </div>
    </footer>
  );
}
