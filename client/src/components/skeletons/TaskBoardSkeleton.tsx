export default function TaskBoardSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-3 animate-pulse">
      {[1, 2, 3].map((column) => (
        <div
          key={column}
          className="rounded-3xl border border-white/10 bg-[#111111] p-4"
        >
          <div className="h-6 w-24 rounded bg-[#1a1a1a]" />

          <div className="mt-4 space-y-4">
            {[1, 2, 3].map((card) => (
              <div
                key={card}
                className="rounded-2xl bg-[#1a1a1a] p-4"
              >
                <div className="h-4 w-3/4 rounded bg-[#222222]" />
                <div className="mt-3 h-4 w-1/2 rounded bg-[#222222]" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}