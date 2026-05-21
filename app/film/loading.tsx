import { SkeletonGrid } from "@/components/Skeleton";

export default function FilmListLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-48 rounded bg-white/10" />
      <SkeletonGrid count={10} />
    </div>
  );
}
