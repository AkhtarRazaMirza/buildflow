interface Props {
  project: any;
}

export default function ProjectInsights({
  project,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
      <h2 className="text-xl font-semibold">
        Insights
      </h2>

      <div className="mt-6 space-y-4">
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
            {project.tech_stack?.length ||
              0}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">
            Risks
          </span>

          <span>
            {project.risks?.length || 0}
          </span>
        </div>
      </div>
    </div>
  );
}