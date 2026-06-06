interface QuickActionsProps {
  onCreateProject: () => void;
}

export default function QuickActions({
  onCreateProject,
}: QuickActionsProps) {
  return (
    <div className="mt-8 rounded-3xl border border-white/10 bg-[#111111] p-6">
      <h2 className="text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <button
          onClick={onCreateProject}
          className="rounded-2xl border border-white/10 p-4 text-left transition hover:border-white/20"
        >
          New Project
        </button>

        <button className="rounded-2xl border border-white/10 p-4 text-left transition hover:border-white/20">
          Generate Roadmap
        </button>

        <button className="rounded-2xl border border-white/10 p-4 text-left transition hover:border-white/20">
          Research Topic
        </button>

        <button className="rounded-2xl border border-white/10 p-4 text-left transition hover:border-white/20">
          Open Workspace
        </button>
      </div>
    </div>
  );
}