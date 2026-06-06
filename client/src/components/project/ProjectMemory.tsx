interface Props {
  project: any;
}

export default function ProjectMemory({
  project,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
      <h2 className="text-xl font-semibold">
        Project Memory
      </h2>

      <p className="mt-4 text-zinc-400">
        {project.project_summary ||
          "No project summary available yet."}
      </p>

      <div className="mt-6">
        <h3 className="mb-3 font-medium">
          Goals
        </h3>

        <div className="flex flex-wrap gap-2">
          {(project.goals || []).map(
            (
              goal: string,
              index: number
            ) => (
              <span
                key={index}
                className="rounded-full border border-white/10 px-3 py-1 text-sm"
              >
                {goal}
              </span>
            )
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 font-medium">
          Tech Stack
        </h3>

        <div className="flex flex-wrap gap-2">
          {(project.tech_stack || []).map(
            (
              tech: string,
              index: number
            ) => (
              <span
                key={index}
                className="rounded-full bg-white text-black px-3 py-1 text-sm"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}