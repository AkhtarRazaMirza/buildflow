

export default function Workflow() {
  const steps = [
    {
      title: "Plan",
      description:
        "Turn ideas into structured project plans with milestones, goals, and timelines.",
    },
    {
      title: "Research",
      description:
        "Search the web, gather context, and keep everything connected to your project.",
    },
    {
      title: "Execute",
      description:
        "Manage tasks, track progress, and move work forward without switching tools.",
    },
    {
      title: "Learn",
      description:
        "BuildFlow remembers project decisions, conversations, and important context.",
    },
  ];

  return (
    <section
      id="workflow"
      className="border-t border-white/10 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-sm text-zinc-500">
            Workflow
          </span>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            One workspace for the entire project lifecycle.
          </h2>

          <p className="mt-4 text-lg text-zinc-400">
            From the first idea to the final release,
            everything stays connected.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-3xl border border-white/10 bg-[#111111] p-6"
            >
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black font-semibold">
                {step.title[0]}
              </div>

              <h3 className="text-xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}