interface ProjectMemoryProps {
  project: any;
}

export default function ProjectMemory({
  project,
}: ProjectMemoryProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
      <h2 className="text-xl font-semibold">
        Latest Project Memory
      </h2>

      {!project ? (
        <p className="mt-6 text-zinc-500">
          No project memory available.
        </p>
      ) : (
        <div className="mt-6">
          <h3 className="font-medium">
            {project.name}
          </h3>

          <p className="mt-3 text-zinc-400">
            {project.project_summary ||
              "No project summary generated yet."}
          </p>
        </div>
      )}
    </div>
  );
}