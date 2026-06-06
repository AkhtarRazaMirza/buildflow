export default function ProjectSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 animate-pulse">
      {/* Header */}
      <div className="h-12 w-72 rounded-xl bg-[#111111]" />

      {/* Memory + Insights */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="h-80 rounded-3xl bg-[#111111] lg:col-span-2" />

        <div className="h-80 rounded-3xl bg-[#111111]" />
      </div>

      {/* Tasks */}
      <div className="mt-8 h-64 rounded-3xl bg-[#111111]" />

      {/* Activities */}
      <div className="mt-8 h-64 rounded-3xl bg-[#111111]" />

      {/* Continue Working */}
      <div className="mt-8 h-40 rounded-3xl bg-[#111111]" />
    </div>
  );
}