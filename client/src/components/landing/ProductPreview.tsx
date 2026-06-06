
export default function ProductPreview() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="text-sm text-zinc-500">
            Product Preview
          </span>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            Everything happens in one place.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Chat with your AI assistant, manage tasks,
            track activities, and organize project knowledge
            without jumping between tools.
          </p>
        </div>

        <div className="mt-16 rounded-4xl border border-white/10 bg-[#111111] p-6">
          <div className="aspect-video rounded-2xl border border-white/10 bg-[#0F0F0F] p-6">
            <div className="grid h-full gap-4 lg:grid-cols-[280px_1fr]">
              <div className="rounded-2xl border border-white/10 bg-[#141414] p-4">
                <div className="mb-4 h-4 w-24 rounded bg-white/10" />
                <div className="space-y-3">
                  <div className="h-10 rounded-lg bg-white/5" />
                  <div className="h-10 rounded-lg bg-white/5" />
                  <div className="h-10 rounded-lg bg-white/5" />
                  <div className="h-10 rounded-lg bg-white/5" />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#141414] p-6">
                <div className="mb-6 h-6 w-56 rounded bg-white/10" />

                <div className="space-y-4">
                  <div className="ml-auto w-3/4 rounded-2xl bg-white px-4 py-3 text-black">
                    Create a roadmap for my project.
                  </div>

                  <div className="w-4/5 rounded-2xl bg-white/5 px-4 py-3">
                    Generated roadmap with milestones,
                    tasks, and execution phases.
                  </div>

                  <div className="w-2/3 rounded-2xl bg-white/5 px-4 py-3">
                    Research completed.
                  </div>

                  <div className="w-3/5 rounded-2xl bg-white/5 px-4 py-3">
                    Tasks created.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Replace this mockup with a real BuildFlow screenshot later.
          </p>
        </div>
      </div>
    </section>
  );
}