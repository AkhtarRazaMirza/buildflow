interface Props {
  project: any;
}

export default function MemoryOverview({
  project,
}: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111111] p-4">
      <h3 className="font-semibold">
        Project Memory
      </h3>

      <div className="mt-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-zinc-400">
            Goals
          </span>

          <span>
            {project.goals?.length || 0}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">
            Features
          </span>

          <span>
            {project.features?.length || 0}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">
            Tech Stack
          </span>

          <span>
            {project.tech_stack?.length || 0}
          </span>
        </div>
      </div>
    </div>
  );
}