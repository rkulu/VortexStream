import { SkeletonGrid } from "@/components/Skeleton";

export default function GenreListLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-48 rounded bg-white/10" />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="h-12 rounded-xl bg-white/5" />
        ))}
      </div>
    </div>
  );
}
