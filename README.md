# VortexStream — Anime Streaming Platform

Platform streaming anime modern dengan desain Liquid Glass UI, dibangun menggunakan **Next.js 16**, **React 19**, **TypeScript**, dan **Tailwind CSS v4**.

---

## Fitur Utama

- Halaman beranda dengan hero slider, konten terbaru, dan anime populer
- Detail anime (sinopsis, genre, rating, episode)
- Pemutar video streaming dengan multiple server dan resolusi
- Pencarian anime dengan pagination
- Katalog dengan filter genre, status, tipe, dan urutan
- Jadwal tayang anime per hari
- Sistem bookmark (localStorage)
- Admin dashboard (kelola metadata situs, notifikasi)
- SEO lengkap (OpenGraph, Twitter Cards, JSON-LD, Sitemap, Robots.txt)
- Desain responsif (desktop sidebar + mobile bottom nav)
- Liquid Glass UI (glassmorphism, mesh gradient, glow effects)

---

## Teknologi

| Bagian | Teknologi |
|--------|-----------|
| **Framework** | Next.js 16.2.6 |
| **React** | 19.2.4 |
| **Bahasa** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 + Custom Liquid Glass Design System |
| **Database** | PostgreSQL (Neon.tech) + Prisma 7 |
| **Auth** | JWT + bcryptjs |
| **Ikon** | Google Material Symbols |
| **Font** | Inter (sans), Montserrat (display) |

---

## Struktur Proyek

```
├── app/                        # App Router pages & API routes
│   ├── admin/                  # Admin dashboard + login
│   ├── anime/[id]/             # Detail anime
│   ├── api/                    # API routes (server, settings, auth, dll)
│   ├── catalog/                # Katalog dengan filter
│   ├── episode/[id]/           # Halaman tonton episode
│   ├── film/[id]/              # Detail film + watch
│   ├── genre/[slug]/           # Anime per genre
│   ├── search/                 # Pencarian
│   ├── series/[id]/            # Detail series
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Beranda
│   ├── sitemap.ts              # Sitemap dinamis
│   └── robots.ts               # Robots.txt
│
├── components/                 # Komponen reusable
│   ├── AsideSidebar.tsx        # Sidebar desktop
│   ├── MobileBottomNav.tsx     # Navigasi bawah mobile
│   ├── TopHeader.tsx           # Header + search
│   ├── HeroSlider.tsx          # Slider hero
│   ├── GlassCard.tsx           # Card poster
│   ├── EpisodeList.tsx         # Daftar episode dengan filter
│   ├── BookmarkButton.tsx      # Tombol bookmark
│   └── ...                     # lainnya
│
├── lib/                        # Utilitas & logic
│   ├── api.ts                  # Semua fetch ke external API
│   ├── types.ts                # TypeScript interfaces
│   ├── auth.ts                 # Autentikasi (JWT, bcrypt)
│   ├── settings.ts             # CRUD metadata situs
│   ├── image.ts                # safeImage() helper
│   └── prisma.ts               # Prisma client singleton
│
├── prisma/
│   └── schema.prisma           # User, Notification, SiteSetting
│
├── public/                     # Aset statis
│   ├── favicon.svg / .ico
│   └── image/                  # Placeholder & OG images
│
├── proxy.ts                    # Proteksi route /admin (Next.js 16 Proxy)
├── next.config.ts
├── tailwind.config.ts
└── .env.local                  # Environment variables
```

---

## Routes

### Halaman Publik

| Route | Halaman |
|-------|---------|
| `/` | Beranda (hero, trending, terbaru, rekomendasi) |
| `/anime` | Semua anime |
| `/anime/[id]` | Detail anime + daftar episode |
| `/series` | Semua series |
| `/series/[id]` | Detail series + daftar episode |
| `/film` | Semua film |
| `/film/[id]` | Detail film |
| `/film/[id]/watch` | Tonton film |
| `/episode/[id]` | Tonton episode (player, server, download) |
| `/catalog` | Katalog dengan filter (genre, status, type, sort) |
| `/genre` | Semua genre |
| `/genre/[slug]` | Anime per genre |
| `/search?q=` | Pencarian |
| `/populer` | Anime populer |
| `/latest` | Anime terbaru |
| `/ongoing` | Anime ongoing |
| `/completed` | Anime completed |
| `/jadwal` | Jadwal tayang |
| `/daftar-saya` | Bookmark tersimpan |
| `/settings` | Pengaturan pengguna |
| `/contact` | Kontak |
| `/privacy` | Kebijakan privasi |
| `/terms` | Syarat & ketentuan |
| `/press` | Press kit |

### API Routes

| Route | Method | Fungsi |
|-------|--------|--------|
| `/api/health` | GET | Cek kesehatan external API |
| `/api/settings` | GET | Ambil metadata situs |
| `/api/notifications` | GET | Notifikasi aktif |
| `/api/server` | GET | Proxy streaming embed |
| `/api/admin/login` | POST | Login admin |
| `/api/admin/me` | GET | Cek session admin |
| `/api/admin/seed` | POST | Seed admin awal |
| `/api/admin/settings` | GET/PUT | Kelola metadata situs |
| `/api/admin/notifications` | GET/POST | Kelola notifikasi |

---

## Environment Variables

Buat file `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://www.sankavollerei.com/anime/winbu
DATABASE_URL=postgresql://user:password@host:5432/db?sslmode=require
JWT_SECRET=your-random-64-char-hex-secret
NEXT_PUBLIC_SITE_URL=https://example.com
JWT_EXPIRES_IN=7d
```

| Variable | Deskripsi |
|----------|-----------|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL external anime API |
| `DATABASE_URL` | Koneksi PostgreSQL |
| `JWT_SECRET` | Secret key untuk JWT |
| `NEXT_PUBLIC_SITE_URL` | URL situs untuk SEO |
| `JWT_EXPIRES_IN` | Masa berlaku token (default: 7d) |

---

## Cara Menjalankan

```bash
# Install dependencies
npm install

# Setup database (Pastikan DATABASE_URL sudah diisi)
npx prisma generate
npx prisma db push

# Seed admin (username: admin, password: admin123)
curl -X POST http://localhost:3000/api/admin/seed

# Development
npm run dev

# Build production
npm run build

# Start production
npm start
```

---

## Admin Dashboard

Akses di `/admin`. Login dengan akun yang sudah di-seed.

Fitur admin:
- Edit metadata situs (title, description, keywords, OG image, favicon, logo)
- Kelola notifikasi (tambah, edit, hapus, aktif/nonaktif)

---

## Eksternal API

Situs ini menggunakan data dari:

```
https://www.sankavollerei.com/anime/winbu
```

Endpoint yang digunakan: `/home`, `/anime/:id`, `/episode/:id`, `/series/:id`, `/film/:id`, `/search`, `/catalog`, `/genre/:slug`, `/genres`, `/populer`, `/schedule`, `/ongoing`, `/completed`, `/latest`, `/updated`, `/server`, dan lainnya.

---

## Desain

- **Liquid Glass UI** — Glassmorphism dengan efek blur, backdrop, dan glow
- **Dark theme** — Palet gelap Material Design 3
- **Animasi** — Framer Motion-like dengan CSS keyframes (liquidPulse, float, glow)
- **Responsif** — Desktop sidebar (280px) + mobile bottom navigation
- **Material Symbols** — Ikon dari Google Fonts

---

## Lisensi

Proyek ini bersifat privat.
