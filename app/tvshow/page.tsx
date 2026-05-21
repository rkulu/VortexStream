import { getTvShowList } from "@/lib/api";
import ListPage from "@/components/ListPage";

export const dynamic = "force-dynamic";

export default async function TvShowPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;

  let data;
  try {
    data = await getTvShowList(currentPage);
  } catch {
    data = { data: [], pagination: undefined };
  }

  return (
    <ListPage
      title="TV Shows"
      items={data.data || []}
      currentPage={currentPage}
      basePath="/tvshow"
      pagination={data.pagination}
    />
  );
}
