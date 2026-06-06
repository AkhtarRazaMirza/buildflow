interface StatsCardsProps {
  totalProjects: number;
}

export default function StatsCards({
  totalProjects,
}: StatsCardsProps) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
        <p className="text-sm text-zinc-500">
          Total Projects
        </p>

        <h2 className="mt-4 text-4xl font-bold">
          {totalProjects}
        </h2>
      </div>

      <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
        <p className="text-sm text-zinc-500">
          AI Workspace
        </p>

        <h2 className="mt-4 text-2xl font-bold">
          Ready
        </h2>
      </div>

      <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
        <p className="text-sm text-zinc-500">
          Status
        </p>

        <h2 className="mt-4 text-2xl font-bold">
          Active
        </h2>
      </div>
    </div>
  );
}