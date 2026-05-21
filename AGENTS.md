<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

---
## Project Overview

This project is an anime streaming website built using:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Liquid Glass UI Design

Base API:

https://www.sankavollerei.com/anime/winbu

---
# SEO Rules

## General SEO Rules

- Every public page must implement SEO metadata
- Use `generateMetadata()` in App Router pages
- Avoid duplicate metadata
- Use descriptive and keyword-rich titles
- Use clean URLs
- Use semantic HTML structure

---

# Metadata Rules

## Every Page Must Include

- title
- description
- keywords
- OpenGraph metadata
- Twitter metadata
- canonical URL

---

# Dynamic Metadata

Use dynamic metadata for:

- anime detail pages
- watch pages
- genre pages
- search pages

# SEO Rules

## General SEO Rules

- Every public page must implement SEO metadata
- Use `generateMetadata()` in App Router pages
- Avoid duplicate metadata
- Use descriptive and keyword-rich titles
- Use clean URLs
- Use semantic HTML structure

---

# Metadata Rules

## Every Page Must Include

- title
- description
- keywords
- OpenGraph metadata
- Twitter metadata
- canonical URL

---

# Dynamic Metadata

Use dynamic metadata for:

- anime detail pages
- watch pages
- genre pages
- search pages

Example:

```tsx
export async function generateMetadata({
  params,
}: Props) {
  const anime = await fetchAnime(params.id);

  return {
    title: anime.title,
    description: anime.synopsis,
    openGraph: {
      images: [anime.image],
    },
  };
}
```

---

# OpenGraph Rules

All pages should support:

- og:title
- og:description
- og:image
- og:url
- og:type

Use anime poster/banner as OG image.

---

# Twitter Card Rules

Use:

```txt
summary_large_image
```

for anime detail pages and homepage.

---

# Canonical Rules

Every page must define canonical URL.

Example:

```tsx
alternates: {
  canonical:
    `https://yourdomain.com/anime/${slug}`
}
```

---

# Image SEO Rules

Always:

- use `next/image`
- provide `alt` text
- optimize image sizes
- lazy load images

Example:

```tsx
<Image
  src={anime.image}
  alt={anime.title}
  fill
/>
```

---

# Structured Data Rules

Use JSON-LD for:

- Anime detail
- Episode detail
- Breadcrumbs
- Search pages

Preferred schemas:

- Movie
- TVSeries
- VideoObject
- BreadcrumbList

---

# Sitemap Rules

Generate dynamic sitemap.

Include:

- homepage
- anime pages
- episode pages
- genre pages
- latest pages

Use:

```txt
/app/sitemap.ts
```

---

# Robots Rules

Create:

```txt
/app/robots.ts
```

Allow indexing for public pages.

Disallow:
- admin pages
- internal API routes

---

# URL Structure Rules

Use SEO-friendly URLs.

Good:

```txt
/anime/one-piece
/watch/one-piece-episode-1
/genre/action
```

Avoid:

```txt
/anime?id=123
/watch?v=999
```

---

# Internal Linking Rules

Always link:

- related anime
- next episode
- previous episode
- genre pages

Improve crawlability.

---

# Performance SEO Rules

Target:

- Lighthouse SEO > 95
- Fast LCP
- Minimal CLS
- Optimized TTFB

Always:
- lazy load below-the-fold sections
- optimize images
- avoid unnecessary JS

---

# Content SEO Rules

Anime pages should contain:

- synopsis
- genres
- studio
- release year
- status
- episode count

Avoid thin pages.

---

# Search Page SEO Rules

Search pages should:

- use dynamic title
- noindex empty search results
- include query keyword in metadata

Example:

```txt
Search "Naruto" - Winbu Stream
```

---

# Pagination SEO Rules

Paginated pages should support:

- canonical URLs
- prev/next navigation
- indexed main pages only when necessary

---

# Watch Page SEO Rules

Watch pages should include:

- episode title
- anime title
- episode number
- canonical URL
- OpenGraph image

---

# Mobile SEO Rules

Website must be:

- fully responsive
- mobile optimized
- touch friendly

---

# Accessibility SEO Rules

Always include:

- alt attributes
- semantic headings
- aria labels when needed
- accessible buttons

---

# Technical SEO Rules

Avoid:

- duplicate routes
- duplicate content
- empty metadata
- broken links
- hydration mismatch

---

# Indexing Rules

Important pages to index:

- homepage
- anime detail pages
- genre pages
- latest anime pages

Optional indexing:
- watch pages
- search pages

---

# Recommended SEO Libraries

Optional:

- next-seo
- schema-dts
- zod for validation

---

# Final SEO Goal

The website should be:

- search engine friendly
- social media optimized
- fast loading
- mobile optimized
- properly indexed
- rich preview enabled

# Performance & Server Optimization Rules

## General Performance Rules

- Prioritize fast loading and low server usage
- Minimize unnecessary API requests
- Avoid heavy client-side rendering
- Use caching whenever possible
- Optimize all assets before production

---

# Rendering Rules

Prefer:

- Server Components
- Static Rendering
- ISR (Incremental Static Regeneration)

Avoid:

- unnecessary Client Components
- unnecessary hydration
- rendering large lists on client

---

# Fetch Optimization Rules

Always:

- cache API requests
- use `revalidate`
- deduplicate fetch calls
- fetch only required data

Example:

```ts
fetch(url, {
  next: {
    revalidate: 300
  }
})
```

---

# ISR Rules

Use ISR for:

- homepage
- anime detail
- genre pages
- latest pages
- popular pages

Recommended:

```txt
revalidate: 60
revalidate: 300
revalidate: 600
```

depending on endpoint update frequency.

---

# API Usage Rules

Avoid:

- fetching all endpoints simultaneously
- nested duplicate requests
- repeated fetch on every render

Prefer:

- parallel fetching
- cached requests
- shared API utilities

---

# Image Optimization Rules

Always use:

```tsx
next/image
```

Rules:

- lazy load images
- use responsive sizes
- use optimized formats
- avoid full-resolution images

---

# Video & Streaming Rules

Avoid:

- autoplay all players
- loading all streaming servers at once
- preloading hidden iframes

Prefer:

- load active server only
- dynamic iframe rendering
- defer player initialization

---

# Pagination Rules

Always paginate large data.

Avoid rendering:
- full anime lists
- huge episode lists
- thousands of cards

Use:
- pagination
- infinite scroll
- virtualized lists when necessary

---

# Bundle Optimization Rules

Always:

- split components
- dynamic import heavy components
- remove unused libraries

Example:

```tsx
const Player = dynamic(
  () => import("@/components/player"),
  {
    ssr: false
  }
);
```

---

# Dynamic Import Rules

Use dynamic imports for:

- video players
- sliders
- animations
- modals

---

# Animation Performance Rules

Avoid excessive:

- blur layers
- box shadows
- infinite animations

Prefer:
- GPU-friendly transforms
- opacity animations
- lightweight motion effects

---

# Tailwind Optimization Rules

Avoid:
- duplicated utility classes
- excessive arbitrary values

Prefer:
- reusable utility composition
- component abstraction

---

# Database & Storage Rules

If using database later:

- cache frequent queries
- index searchable fields
- paginate all large datasets

---

# CDN Rules

Use CDN for:

- images
- static assets
- fonts
- thumbnails

Prefer:
- Cloudflare
- Vercel Edge
- Image CDN

---

# Font Optimization Rules

Avoid loading many fonts.

Prefer:
- system fonts
- one primary font family
- variable fonts

Use:

```tsx
next/font
```

---

# Script Optimization Rules

Avoid:
- unnecessary third-party scripts
- large analytics scripts
- blocking scripts

Always:
- lazy load external scripts
- defer non-critical scripts

---

# CSS Optimization Rules

Avoid:
- massive global CSS
- duplicated styles

Prefer:
- Tailwind utilities
- modular styles
- component-based styling

---

# Memory Optimization Rules

Avoid:
- storing huge objects in state
- unnecessary rerenders
- large client caches

Prefer:
- memoization
- server rendering
- lightweight states

---

# Hosting Optimization Rules

Target:
- low RAM usage
- low CPU usage
- minimal bandwidth usage

Prefer:
- ISR
- static generation
- edge caching

Avoid:
- SSR on every request
- constant API polling
- unnecessary websocket connections

---

# Edge Cache Rules

Use edge cache for:

- homepage
- genre pages
- popular pages
- static assets

---

# Lighthouse Performance Targets

Minimum target:

- Performance > 90
- SEO > 95
- Accessibility > 90
- Best Practices > 90

---

# Mobile Optimization Rules

Always optimize for:

- low-end Android devices
- slow mobile networks
- limited RAM devices

---

# Resource Loading Rules

Prioritize loading:

1. visible content
2. active player
3. current viewport images

Delay:
- below-the-fold sections
- recommendations
- secondary carousels

---

# Streaming Optimization Rules

Prefer:

- lightweight iframe embeds
- deferred player load
- minimal autoplay usage

Avoid:
- multiple active players
- hidden iframe rendering
- unnecessary preload

---

# Production Build Rules

Before deployment:

- analyze bundle size
- remove console logs
- remove unused imports
- optimize images
- test Lighthouse score

---

# Final Optimization Goal

The website should:

- load fast on mobile
- consume minimal server resources
- minimize hosting bandwidth
- reduce API load
- scale efficiently under traffic
- remain smooth with liquid glass UI


# Image Handling Rules

## General Image Rules

- All images must remain sharp and responsive
- Prevent stretched or broken aspect ratios
- Always preserve image quality on resize
- Use placeholders when image is null or broken

---

# Next Image Rules

Always use:

```tsx
import Image from "next/image";
```

Avoid:

```tsx
<img />
```

unless absolutely necessary.

---

# Responsive Image Rules

Images must:

- scale proportionally
- maintain aspect ratio
- avoid pixelation
- avoid distortion
- support mobile responsiveness

Use:

```tsx
className="object-cover object-center"
```

or

```tsx
className="object-contain"
```

depending on use case.

---

# Anime Thumbnail Rules

Anime cards should use:

```tsx
<Image
  src={imageUrl}
  alt={title}
  fill
  className="object-cover"
/>
```

Container example:

```tsx
<div className="relative aspect-[2/3]">
```

This prevents image stretching.

---

# Banner Image Rules

Banner images should use:

```tsx
className="object-cover"
```

with:

```tsx
className="relative aspect-video"
```

or:

```tsx
className="h-[400px]"
```

---

# Null Image Rules

If image is null, undefined, empty, or broken:

- show placeholder image
- never render broken image icon

---

# Placeholder Rules

Use fallback placeholder:

```txt
/public/images/placeholder.webp
```

Recommended placeholder types:

- anime placeholder
- episode placeholder
- banner placeholder

---

# Safe Image Utility Rules

Create reusable helper:

```ts
export function safeImage(url?: string) {
  if (!url || url === "null") {
    return "/images/placeholder.webp";
  }

  return url;
}
```

---

# Image Error Handling Rules

Always handle image loading errors.

Example:

```tsx
onError={(e) => {
  e.currentTarget.src =
    "/images/placeholder.webp";
}}
```

---

# Blur Placeholder Rules

Use blur placeholders when possible.

Example:

```tsx
placeholder="blur"
blurDataURL="/images/blur.jpg"
```

---

# Image Quality Rules

Use optimized quality settings.

Recommended:

```tsx
quality={80}
```

Avoid:
- oversized original images
- unoptimized PNGs
- extremely large dimensions

---

# Aspect Ratio Rules

Recommended aspect ratios:

## Anime Posters

```txt
2:3
```

## Banners

```txt
16:9
```

## Avatars

```txt
1:1
```

---

# Lazy Loading Rules

All non-critical images must:

- lazy load
- defer offscreen rendering

Example:

```tsx
loading="lazy"
```

---

# CDN & Remote Image Rules

Allow remote domains in:

```txt
next.config.ts
```

Example:

```ts
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "**"
    }
  ]
}
```

---

# Skeleton Loading Rules

Before image loads:

- show shimmer
- show glass skeleton
- avoid layout shift

---

# Image Performance Rules

Avoid:

- full-size uploads
- rendering huge images
- multiple hidden images

Prefer:
- responsive images
- optimized thumbnails
- compressed webp

---

# Recommended Formats

Prefer:

- webp
- avif

Avoid:
- bmp
- uncompressed png
- oversized jpg

---

# Accessibility Rules

Every image must include:

```tsx
alt={title}
```

Avoid empty alt except decorative images.

---

# Final Image Goal

Images should:

- never appear broken
- remain sharp on resize
- load fast
- support responsive layouts
- use placeholders safely
- minimize CLS/layout shift


<!-- END:nextjs-agent-rules -->
