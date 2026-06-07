
export default function CTA() {
  return (
    <section className="border-t border-white/10 py-24 animate-fade-in">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-4xl border border-white/10 bg-[#111111] p-12 text-center lg:p-20">
          <span className="text-sm text-zinc-500">
            Get Started
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Start your next project.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            From planning and research to task management and execution,
            BuildFlow helps you stay focused on building.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="rounded-xl bg-white px-6 py-3 font-medium text-black transition-opacity hover:opacity-90">
              Create Project
            </button>

            <button className="rounded-xl border border-white/10 px-6 py-3 font-medium text-white transition-colors hover:border-white/20">
              View Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}