export default function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 animate-pulse">
      <div className="h-10 w-64 rounded-xl bg-[#111111]" />

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-32 rounded-3xl bg-[#111111]"
          />
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="h-80 rounded-3xl bg-[#111111]" />
        <div className="h-80 rounded-3xl bg-[#111111]" />
      </div>
    </div>
  );
}