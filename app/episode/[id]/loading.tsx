export default function EpisodeLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 w-40 rounded bg-white/5" />
      <div className="relative rounded-[28px] overflow-hidden aspect-video bg-white/5" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-14 rounded-xl bg-white/5" />
        ))}
      </div>
    </div>
  );
}
