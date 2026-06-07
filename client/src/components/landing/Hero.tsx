
export default function Hero() {
  return (
    <section className="relative overflow-hidden animate-fade-in">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="mb-6 inline-flex rounded-full border border-white/10 px-3 py-1 text-sm text-zinc-400">
              AI-Powered Project Management
            </span>

            <h1 className="max-w-3xl text-5xl font-bold tracking-tight md:text-6xl">
              Build projects faster.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-zinc-400">
              Plan, research, organize tasks, and execute everything
              in one AI-powered workspace built for developers,
              students, and builders.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-xl bg-white px-6 py-3 font-medium text-black transition-opacity hover:opacity-90">
                Start Building
              </button>

              <button className="rounded-xl border border-white/10 px-6 py-3 font-medium text-white hover:border-white/20">
                View Demo
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6 shadow-2xl">
            <div className="mb-4 flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-[#181818] p-4">
                <p className="text-sm text-zinc-400">You</p>
                <p className="mt-2">
                  Create a roadmap for my AI Project Manager.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#131313] p-4">
                <p className="text-sm text-zinc-400">BuildFlow AI</p>

                <p className="mt-2 text-zinc-300">
                  I created a 14-day execution plan with milestones,
                  task breakdowns, research goals, and project deliverables.
                </p>

                <div className="mt-4 space-y-2">
                  <div className="rounded-lg bg-white/5 p-3">
                    Day 1–3: Planning & Architecture
                  </div>

                  <div className="rounded-lg bg-white/5 p-3">
                    Day 4–7: Core Development
                  </div>

                  <div className="rounded-lg bg-white/5 p-3">
                    Day 8–11: AI Workflows
                  </div>

                  <div className="rounded-lg bg-white/5 p-3">
                    Day 12–14: Polish & Deployment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}