import { getUpdated } from "@/lib/api";
import ListPage from "@/components/ListPage";

export const dynamic = "force-dynamic";

export default async function UpdatedPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;

  let data;
  try {
    data = await getUpdated(currentPage);
  } catch {
    data = { data: [], pagination: undefined };
  }

  return (
    <ListPage
      title="Baru Diperbarui"
      items={data.data || []}
      currentPage={currentPage}
      basePath="/updated"
      pagination={data.pagination}
    />
  );
}
