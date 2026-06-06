export default function ChatSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="rounded-3xl bg-[#111111] p-6"
        >
          <div className="h-4 w-24 rounded bg-[#1a1a1a]" />

          <div className="mt-4 h-4 w-full rounded bg-[#1a1a1a]" />

          <div className="mt-2 h-4 w-3/4 rounded bg-[#1a1a1a]" />
        </div>
      ))}
    </div>
  );
}