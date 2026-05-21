import { getLatest } from "@/lib/api";
import ListPage from "@/components/ListPage";

export const dynamic = "force-dynamic";

export default async function LatestPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;

  let data;
  try {
    data = await getLatest(currentPage);
  } catch {
    data = { data: [], pagination: undefined };
  }

  return (
    <ListPage
      title="Anime Terbaru"
      items={data.data || []}
      currentPage={currentPage}
      basePath="/latest"
      pagination={data.pagination}
    />
  );
}
