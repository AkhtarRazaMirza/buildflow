export default function ActivitySkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-10 w-56 rounded bg-[#111111]" />

      <div className="mt-8 grid gap-8 lg:grid-cols-[420px_1fr]">
        <div className="h-[600px] rounded-3xl bg-[#111111]" />

        <div className="h-[600px] rounded-3xl bg-[#111111]" />
      </div>
    </div>
  );
}