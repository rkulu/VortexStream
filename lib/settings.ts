import { prisma } from "@/lib/prisma";

export interface SiteMetadata {
  title: string;
  description: string;
  keywords: string;
  siteName: string;
  ogImage: string;
  logoUrl: string;
  faviconUrl: string;
  siteDescription: string;
}

const defaults: SiteMetadata = {
  title: "Vortex Stream - Premium Streaming",
  description:
    "Streaming anime terlengkap dengan kualitas terbaik. Nonton anime, film, dan series favorit kamu secara gratis.",
  keywords: "streaming anime, nonton anime, anime subtitle indonesia, film series",
  siteName: "VortexStream",
  ogImage: "/images/homeog.png",
  logoUrl: "",
  faviconUrl: "/favicon.svg",
  siteDescription: "Streaming Platform - Nonton Anime, Film, dan Series Favoritmu",
};

const SETTING_PREFIX = "meta_";

function prefixed(key: keyof SiteMetadata): string {
  return `${SETTING_PREFIX}${key}`;
}

export async function getSiteMetadata(): Promise<SiteMetadata> {
  try {
    const keys = Object.keys(defaults) as (keyof SiteMetadata)[];
    const prefixedKeys = keys.map(prefixed);

    const rows = await prisma.siteSetting.findMany({
      where: { key: { in: prefixedKeys } },
    });

    const map = new Map(rows.map((r) => [r.key, r.value]));

    const result: Record<string, string> = {};
    for (const key of keys) {
      result[key] = map.get(prefixed(key)) ?? (defaults as any)[key];
    }

    return result as unknown as SiteMetadata;
  } catch {
    return defaults;
  }
}

export async function saveSiteMetadata(
  meta: Partial<SiteMetadata>
): Promise<void> {
  const entries = Object.entries(meta).map(([key, value]) => ({
    key: prefixed(key as keyof SiteMetadata),
    value: String(value),
  }));

  for (const { key, value } of entries) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
}
