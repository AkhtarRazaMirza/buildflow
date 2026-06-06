interface Props {
  task: any;
  onStatusChange: (
    taskId: string,
    status: string
  ) => void;
}

export default function TaskCard({
  task,
  onStatusChange,
}: Props) {
  const priorityStyles = {
    high: "bg-red-500/10 text-red-400",
    medium:
      "bg-yellow-500/10 text-yellow-400",
    low: "bg-green-500/10 text-green-400",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111111] p-4">
      <div className="flex items-start justify-between">
        <h3 className="font-medium">
          {task.title}
        </h3>

        <span
          className={`rounded-full px-2 py-1 text-xs ${
            priorityStyles[
              task.priority as keyof typeof priorityStyles
            ] ||
            priorityStyles.medium
          }`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="mt-3 text-sm text-zinc-400">
          {task.description}
        </p>
      )}

      <div className="mt-4">
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(
              task.id,
              e.target.value
            )
          }
          className="w-full rounded-lg border border-white/10 bg-[#0A0A0A] p-2 text-sm"
        >
          <option value="todo">
            Todo
          </option>

          <option value="in-progress">
            In Progress
          </option>

          <option value="done">
            Done
          </option>
        </select>
      </div>
    </div>
  );
}