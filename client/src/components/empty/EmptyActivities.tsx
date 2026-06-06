"use client";

interface EmptyActivitiesProps {
  onOpenWorkspace: () => void;
}

export default function EmptyActivities({
  onOpenWorkspace,
}: EmptyActivitiesProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111] p-12 text-center">
      <h2 className="text-2xl font-semibold">
        No Activities Yet
      </h2>

      <p className="mt-3 text-zinc-400">
        Activities will appear when AI
        tools run, research executes, or
        memory updates occur.
      </p>

      <button
        onClick={onOpenWorkspace}
        className="mt-6 rounded-xl bg-white px-6 py-3 font-medium text-black"
      >
        Open Workspace
      </button>
    </div>
  );
}