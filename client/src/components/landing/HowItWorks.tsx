
const steps = [
  {
    step: "01",
    title: "Create a Project",
    description:
      "Start with an idea, goal, or project you want to build.",
  },
  {
    step: "02",
    title: "Describe Your Goal",
    description:
      "Tell BuildFlow what you're working on and what you need help with.",
  },
  {
    step: "03",
    title: "Generate a Plan",
    description:
      "BuildFlow creates tasks, milestones, and execution strategies.",
  },
  {
    step: "04",
    title: "Execute and Track",
    description:
      "Complete tasks, monitor progress, and keep everything organized.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t border-white/10 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="text-sm text-zinc-500">
            How It Works
          </span>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            Four simple steps.
          </h2>

          <p className="mt-4 text-lg text-zinc-400">
            Start planning and executing projects in minutes.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.step}
              className="rounded-3xl border border-white/10 bg-[#111111] p-8"
            >
              <span className="text-sm font-medium text-zinc-500">
                {step.step}
              </span>

              <h3 className="mt-4 text-xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}