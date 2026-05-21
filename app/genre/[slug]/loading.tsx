import { SkeletonGrid } from "@/components/Skeleton";

export default function GenreLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-48 rounded bg-white/10" />
      <div className="h-4 w-32 rounded bg-white/5" />
      <SkeletonGrid count={10} />
    </div>
  );
}
