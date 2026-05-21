export function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="relative aspect-[2/3] rounded-[24px] overflow-hidden bg-white/5" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-3/4 rounded bg-white/5" />
        <div className="h-2.5 w-1/2 rounded bg-white/5" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="animate-pulse relative rounded-2xl sm:rounded-[24px] lg:rounded-[28px] overflow-hidden aspect-[4/3] sm:aspect-[16/7] lg:aspect-[21/9] bg-white/5">
      <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 max-w-[85%] sm:max-w-md md:max-w-xl">
        <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-[24px] bg-white/[0.05] space-y-3">
          <div className="h-4 w-16 rounded-full bg-white/10" />
          <div className="h-8 w-64 rounded bg-white/10" />
          <div className="h-3 w-48 rounded bg-white/10 hidden sm:block" />
          <div className="h-10 w-32 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonDetail() {
  return (
    <div className="space-y-10 animate-pulse">
      <div className="relative rounded-[32px] overflow-hidden border border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center">
          <div className="lg:col-span-4 aspect-[2/3] rounded-[24px] bg-white/5 max-w-sm mx-auto w-full" />
          <div className="lg:col-span-8 space-y-4">
            <div className="h-4 w-24 rounded-full bg-white/10" />
            <div className="h-10 w-3/4 rounded bg-white/10" />
            <div className="h-4 w-1/2 rounded bg-white/10" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-6 w-16 rounded-full bg-white/10" />
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-white/5" />
              <div className="h-3 w-5/6 rounded bg-white/5" />
              <div className="h-3 w-2/3 rounded bg-white/5" />
            </div>
            <div className="h-12 w-40 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonEpisodeList() {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex flex-col md:flex-row gap-5 p-4 rounded-[20px] bg-white/[0.03] border border-white/5">
          <div className="relative md:w-60 aspect-video rounded-xl bg-white/10 shrink-0" />
          <div className="flex-1 space-y-2 py-2">
            <div className="h-3 w-20 rounded bg-white/10" />
            <div className="h-5 w-3/4 rounded bg-white/10" />
            <div className="h-3 w-1/2 rounded bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
