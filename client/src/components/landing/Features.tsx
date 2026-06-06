
const features = [
  {
    title: "AI Project Assistant",
    description:
      "Turn ideas into structured plans, milestones, and actionable tasks in seconds.",
  },
  {
    title: "Smart Task Management",
    description:
      "Create, organize, update, and track tasks naturally through conversation.",
  },
  {
    title: "Web Research",
    description:
      "Search the web directly from your workspace and keep research connected to your projects.",
  },
  {
    title: "Activity Timeline",
    description:
      "Track every important action, decision, and update in one organized history.",
  },
  {
    title: "Project Memory",
    description:
      "BuildFlow remembers project context so conversations stay focused and productive.",
  },
  {
    title: "Execution Workspace",
    description:
      "Plan, research, manage tasks, and execute everything without switching tools.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="border-t border-white/10 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-sm text-zinc-500">
            Features
          </span>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            Built for modern project execution.
          </h2>

          <p className="mt-4 text-lg text-zinc-400">
            Everything you need to move from idea
            to completion in one workspace.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-white/10 bg-[#111111] p-8 transition-all duration-300 hover:border-white/20"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black font-bold">
                {feature.title.charAt(0)}
              </div>

              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}