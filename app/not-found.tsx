import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Halaman Tidak Ditemukan | Winbu Stream",
  description:
    "Halaman yang kamu cari tidak ditemukan. Kembali ke halaman utama untuk menjelajahi anime favoritmu.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[75vh] text-center px-4 overflow-hidden select-none">
      {/* Animated orbs background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="notfound-orb notfound-orb--purple" />
        <div className="notfound-orb notfound-orb--cyan" />
        <div className="notfound-orb notfound-orb--pink" />
      </div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="notfound-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      {/* Glitch 404 number */}
      <div className="relative mb-2 sm:mb-4">
        <h1 className="notfound-number" data-text="404" aria-label="Error 404">
          404
        </h1>
        {/* Scan-line overlay */}
        <div className="notfound-scanlines" aria-hidden="true" />
      </div>

      {/* Subtitle with gradient */}
      <p className="notfound-subtitle font-display">
        Dimensi Tidak Ditemukan
      </p>

      {/* Description */}
      <p className="max-w-md text-on-surface-variant text-body-lg mb-8 sm:mb-10 leading-relaxed">
        Sepertinya kamu tersesat di dimensi lain.
        <br className="hidden sm:block" />
        Halaman yang kamu cari tidak ada di dunia ini.
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
        <Link
          href="/"
          className="notfound-btn notfound-btn--primary group"
        >
          <span className="material-symbols-outlined text-[20px] transition-transform group-hover:-translate-x-0.5">
            home
          </span>
          Kembali ke Beranda
        </Link>
        <Link
          href="/search"
          className="notfound-btn notfound-btn--ghost group"
        >
          <span className="material-symbols-outlined text-[20px] transition-transform group-hover:scale-110">
            search
          </span>
          Cari Anime
        </Link>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute -bottom-2 left-0 right-0 h-24 pointer-events-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-full opacity-10"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            fill="url(#waveGrad)"
          />
          <defs>
            <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#9d4edd" />
              <stop offset="50%" stopColor="#00f4fe" />
              <stop offset="100%" stopColor="#d422a7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* --- Inline scoped styles for 404 page --- */}
      <style>{`
        /* ── Glitch 404 number ── */
        .notfound-number {
          font-family: var(--font-montserrat), sans-serif;
          font-size: clamp(100px, 22vw, 220px);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.04em;
          background: linear-gradient(135deg, #e0b6ff 0%, #00f4fe 40%, #d422a7 80%, #e0b6ff 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: notfound-gradientShift 6s ease-in-out infinite;
          position: relative;
          filter: drop-shadow(0 0 40px rgba(157, 78, 221, 0.35));
          user-select: none;
        }

        .notfound-number::before,
        .notfound-number::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          background: inherit;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .notfound-number::before {
          animation: notfound-glitch1 3s infinite;
          clip-path: inset(20% 0 40% 0);
          opacity: 0.7;
        }

        .notfound-number::after {
          animation: notfound-glitch2 3s infinite;
          clip-path: inset(60% 0 10% 0);
          opacity: 0.7;
        }

        @keyframes notfound-glitch1 {
          0%, 90%, 100% { transform: translate(0); }
          92% { transform: translate(-4px, 2px); }
          94% { transform: translate(4px, -2px); }
          96% { transform: translate(-2px, -1px); }
        }

        @keyframes notfound-glitch2 {
          0%, 88%, 100% { transform: translate(0); }
          90% { transform: translate(3px, -3px); }
          93% { transform: translate(-3px, 1px); }
          95% { transform: translate(2px, 2px); }
        }

        @keyframes notfound-gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* ── Scan-lines ── */
        .notfound-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.015) 2px,
            rgba(255, 255, 255, 0.015) 4px
          );
          pointer-events: none;
          mix-blend-mode: overlay;
        }

        /* ── Subtitle ── */
        .notfound-subtitle {
          font-size: clamp(18px, 3vw, 28px);
          font-weight: 700;
          margin-bottom: 12px;
          background: linear-gradient(90deg, #e0b6ff, #00f4fe);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        /* ── Buttons ── */
        .notfound-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 14px;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
        }

        .notfound-btn--primary {
          background: linear-gradient(135deg, #9d4edd, #6a0baa);
          color: #fff;
          border: 1px solid rgba(224, 182, 255, 0.3);
          box-shadow: 0 0 20px rgba(157, 78, 221, 0.3), 0 4px 16px rgba(0, 0, 0, 0.3);
        }

        .notfound-btn--primary:hover {
          background: linear-gradient(135deg, #b15efc, #8a2be2);
          box-shadow: 0 0 35px rgba(157, 78, 221, 0.5), 0 6px 24px rgba(0, 0, 0, 0.3);
          transform: translateY(-2px);
        }

        .notfound-btn--ghost {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: var(--on-surface-variant);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .notfound-btn--ghost:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(0, 244, 254, 0.35);
          color: #00f4fe;
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(0, 244, 254, 0.15);
        }

        /* ── Floating orbs ── */
        .notfound-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          animation: notfound-orbFloat 12s ease-in-out infinite alternate;
        }

        .notfound-orb--purple {
          width: 350px;
          height: 350px;
          background: rgba(157, 78, 221, 0.2);
          top: -10%;
          left: -5%;
          animation-delay: 0s;
        }

        .notfound-orb--cyan {
          width: 280px;
          height: 280px;
          background: rgba(0, 244, 254, 0.15);
          bottom: 5%;
          right: -8%;
          animation-delay: -4s;
        }

        .notfound-orb--pink {
          width: 200px;
          height: 200px;
          background: rgba(212, 34, 167, 0.15);
          top: 30%;
          right: 20%;
          animation-delay: -8s;
        }

        @keyframes notfound-orbFloat {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
          100% { transform: translate(10px, -10px) scale(1.05); }
        }

        /* ── Floating particles ── */
        .notfound-particle {
          position: absolute;
          bottom: -10%;
          border-radius: 50%;
          background: linear-gradient(135deg, #e0b6ff, #00f4fe);
          animation: notfound-particleRise linear infinite;
          opacity: 0;
        }

        @keyframes notfound-particleRise {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
            transform: scale(1);
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-110vh) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
