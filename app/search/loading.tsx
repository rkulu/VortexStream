export default function SearchLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="liquid-glass rounded-2xl p-6 md:p-8">
        <div className="h-8 w-48 rounded bg-white/10 mb-2" />
        <div className="h-4 w-32 rounded bg-white/5 mb-5" />
        <div className="h-14 rounded-2xl bg-white/10" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-3 sm:gap-5 p-3 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5">
          <div className="size-20 sm:size-28 rounded-xl bg-white/10 shrink-0" />
          <div className="flex-1 space-y-2 py-1">
            <div className="h-5 w-3/4 rounded bg-white/10" />
            <div className="h-3 w-1/2 rounded bg-white/5" />
            <div className="h-3 w-1/4 rounded bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
