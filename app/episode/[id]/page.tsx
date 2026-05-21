import { notFound } from "next/navigation";
import EpisodePageClient from "./EpisodePageClient";
import { ServerNotFound } from "@/components/NotFoundComponent";

export const dynamic = "force-dynamic";

import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const res = await fetch(`${BASE_URL}/episode/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error();
    const json = await res.json();
    if (!json.data) throw new Error();
    const data = json.data;
    
    // We try to use anime title if available, but usually episode API might not have full anime details without parsing title.
    const title = `${data.title || 'Episode'} - VortexStream`;
    
    return {
      title,
      description: `Nonton streaming ${data.title} gratis.`,
      alternates: {
        canonical: `/episode/${id}`,
      },
    };
  } catch {
    return {
      title: "Episode Not Found - VortexStream",
    };
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.sankavollerei.com/anime/winbu";

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let data;

  try {
    const res = await fetch(`${BASE_URL}/episode/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return <ServerNotFound />;
      }
      throw new Error(`Failed to fetch episode: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    if (!json.data) {
      return <ServerNotFound />;
    }
    data = json.data;
  } catch (error) {
    return <ServerNotFound />;
  }

  return <EpisodePageClient episodeId={id} data={data} />;
}
