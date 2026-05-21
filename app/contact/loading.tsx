export default function ContactLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
      <div className="liquid-glass rounded-2xl sm:rounded-[24px] p-6 sm:p-8 md:p-10">
        <div className="h-4 w-16 rounded-full bg-white/10 mb-3" />
        <div className="h-10 w-48 rounded bg-white/10 mb-3" />
        <div className="h-4 w-96 rounded bg-white/5" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="liquid-glass rounded-2xl p-5 sm:p-6 space-y-3 text-center">
            <div className="size-12 rounded-full bg-white/10 mx-auto" />
            <div className="h-4 w-20 rounded bg-white/10 mx-auto" />
            <div className="h-3 w-32 rounded bg-white/5 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
