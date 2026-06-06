interface Props {
  tasks: any[];
}

export default function ProjectTasks({
  tasks,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
      <h2 className="text-xl font-semibold">
        Tasks
      </h2>

      <div className="mt-6 space-y-3">
        {tasks.length === 0 ? (
          <p className="text-zinc-500">
            No tasks created yet.
          </p>
        ) : (
          tasks.slice(0, 5).map((task) => (
            <div
              key={task.id}
              className="rounded-2xl border border-white/10 p-4"
            >
              <div className="flex items-center justify-between">
                <h3>{task.title}</h3>

                <span className="text-xs text-zinc-400">
                  {task.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}