import { getOngoing } from "@/lib/api";
import ListPage from "@/components/ListPage";

export const dynamic = "force-dynamic";

export default async function OngoingPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;

  let data;
  try {
    data = await getOngoing(currentPage);
  } catch {
    data = { data: [], pagination: undefined };
  }

  return (
    <ListPage
      title="Anime Ongoing"
      items={data.data || []}
      currentPage={currentPage}
      basePath="/ongoing"
      pagination={data.pagination}
    />
  );
}
