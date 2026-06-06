export default function QuickActions() {
  const actions = [
    "New Project",
    "Generate Roadmap",
    "Research Topic",
    "Open Workspace",
  ];

  return (
    <div className="mt-8 rounded-3xl border border-white/10 bg-[#111111] p-6">
      <h2 className="text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => (
          <button
            key={action}
            className="rounded-2xl border border-white/10 p-4 text-left transition hover:border-white/20"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}