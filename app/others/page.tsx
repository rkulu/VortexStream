import { getOthersList } from "@/lib/api";
import ListPage from "@/components/ListPage";

export const dynamic = "force-dynamic";

export default async function OthersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;

  let data;
  try {
    data = await getOthersList(currentPage);
  } catch {
    data = { data: [], pagination: undefined };
  }

  return (
    <ListPage
      title="Konten Lainnya"
      items={data.data || []}
      currentPage={currentPage}
      basePath="/others"
      pagination={data.pagination}
    />
  );
}
