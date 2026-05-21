import { SkeletonHero, SkeletonGrid } from "@/components/Skeleton";

export default function HomeLoading() {
  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10 pb-8 sm:pb-10 lg:pb-12">
      <SkeletonHero />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <div className="h-6 w-48 rounded bg-white/5 animate-pulse" />
          <SkeletonGrid count={5} />
        </div>
      ))}
    </div>
  );
}
