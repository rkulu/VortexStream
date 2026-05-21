export default function AdminLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-pulse">
      <div className="liquid-glass rounded-2xl p-6 sm:p-8">
        <div className="h-4 w-24 rounded bg-white/10 mb-2" />
        <div className="h-8 w-48 rounded bg-white/10" />
      </div>
      <div className="liquid-glass rounded-2xl p-6 sm:p-8">
        <div className="h-6 w-40 rounded bg-white/10 mb-4" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 rounded-xl bg-white/5 mb-3" />
        ))}
      </div>
    </div>
  );
}
