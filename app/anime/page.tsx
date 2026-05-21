import { getAllAnime, getAnimeList } from "@/lib/api";
import ListPage from "@/components/ListPage";

export const dynamic = "force-dynamic";

export default async function AnimeListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  const currentPage = page
    ? parseInt(page, 10)
    : 1;

  let data;

  try {
    data = await getAllAnime(currentPage);
  } catch {
    data = {
      data: [],
      pagination: undefined,
    };
  }

  return (
    <ListPage
      title="Anime List"
      items={data.data || []}
      currentPage={currentPage}
      basePath="/anime"
      pagination={data.pagination}
    />
  );
}