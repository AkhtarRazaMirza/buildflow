"use client";

interface EmptyTasksProps {
  onCreateTask: () => void;
  onOpenWorkspace: () => void;
}

export default function EmptyTasks({
  onCreateTask,
  onOpenWorkspace,
}: EmptyTasksProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111] p-12 text-center">
      <h2 className="text-2xl font-semibold">
        No Tasks Yet
      </h2>

      <p className="mt-3 text-zinc-400">
        Generate tasks with AI or create
        your first task manually.
      </p>

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={onOpenWorkspace}
          className="rounded-xl border border-white/10 px-5 py-3"
        >
          Open Workspace
        </button>

        <button
          onClick={onCreateTask}
          className="rounded-xl bg-white px-5 py-3 text-black"
        >
          Create Task
        </button>
      </div>
    </div>
  );
}