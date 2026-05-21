import { getAnimedonghua } from "@/lib/api";
import ListPage from "@/components/ListPage";

export const dynamic = "force-dynamic";

export default async function AnimedonghuaPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;

  let data;
  try {
    data = await getAnimedonghua(currentPage);
  } catch {
    data = { data: [], pagination: undefined };
  }

  return (
    <ListPage
      title="Anime & Donghua"
      items={data.data || []}
      currentPage={currentPage}
      basePath="/animedonghua"
      pagination={data.pagination}
    />
  );
}
