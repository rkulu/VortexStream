import { getFilmDetail } from "@/lib/api";
import { notFound } from "next/navigation";
import FilmWatchClient from "./FilmWatchClient";

export const dynamic = "force-dynamic";

export default async function FilmWatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let film;

  try {
    film = await getFilmDetail(id);
  } catch {
    notFound();
  }

  return <FilmWatchClient filmId={id} data={film as any} />;
}
