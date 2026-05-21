"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { safeImage } from "@/lib/image";
interface HeroSliderProps {
  slides: {
    id: string;
    title: string;
    image?: string | null;
    type?: string;
    rating?: string;
  }[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide((current + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [current, slides.length]);

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 450);
  };

  if (!slides.length) return null;

  const slide = slides[current];

  return (
    <div className="relative h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh] w-full rounded-[16px] sm:rounded-[24px] lg:rounded-[32px] overflow-hidden group">
      
      {/* Background slide image */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          isTransitioning ? "opacity-30 scale-105 blur-sm" : "opacity-100 scale-100 blur-0"
        }`}
      >
        <Image
          src={safeImage(slide.image)}
          alt={slide.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Color overlay to match mockup */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Hero Content Overlay Card */}
      <div className="absolute bottom-6 left-4 right-4 sm:left-8 sm:bottom-8 lg:bottom-10 lg:left-10 max-w-xl z-20">
        <div
          className={`liquid-glass-card p-6 sm:p-8 rounded-[24px] border border-white/10 shadow-2xl transition-all duration-500 ease-out ${
            isTransitioning ? "opacity-0 translate-y-4 scale-95" : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#9d4edd]/20 text-[#e0b6ff] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#9d4edd]/30">
              {slide.type || "Trending"}
            </span>
            {slide.rating && (
              <div className="flex items-center gap-1 text-[#e6feff]">
                <span className="material-symbols-outlined text-[16px] text-[#00f5ff]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="text-[10px] font-bold tracking-wider">{slide.rating} Rating</span>
              </div>
            )}
          </div>

          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 sm:mb-4 leading-tight tracking-tight line-clamp-2">
            {slide.title}
          </h1>

          <p className="text-[#d0c2d5] text-xs sm:text-sm mb-6 leading-relaxed line-clamp-2 font-sans">
            Saksikan tayangan menarik {slide.title} terbaru secara eksklusif dengan kualitas video terbaik dan terjemahan bahasa Indonesia lengkap.
          </p>

          <div className="flex items-center gap-3 font-sans">
            <Link
              href={`/anime/${slide.id}`}
              className="flex items-center gap-2 px-5 py-3 bg-[#9d4edd] text-white rounded-xl text-xs sm:text-sm font-bold primary-glow hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                play_arrow
              </span>
              Tonton Sekarang
            </Link>
            <Link
              href={`/anime/${slide.id}`}
              className="flex items-center gap-2 px-4 py-3 bg-[#131315]/40 backdrop-blur-md border border-white/20 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-white/10 active:scale-95 transition-all duration-200"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Daftar Saya
            </Link>
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`transition-all duration-300 rounded-full h-2 ${
              i === current
                ? "w-8 bg-[#9d4edd] shadow-[0_0_10px_#9d4edd]"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide navigation buttons */}
      <button
        onClick={() => goToSlide((current - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white bg-black/30 backdrop-blur-sm border border-white/10 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black/50 transition-all duration-300"
      >
        <span className="material-symbols-outlined text-[20px] block">chevron_left</span>
      </button>
      <button
        onClick={() => goToSlide((current + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white bg-black/30 backdrop-blur-sm border border-white/10 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black/50 transition-all duration-300"
      >
        <span className="material-symbols-outlined text-[20px] block">chevron_right</span>
      </button>
    </div>
  );
}
