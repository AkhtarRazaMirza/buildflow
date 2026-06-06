import TaskCard from "./TaskCard";

interface Props {
  title: string;
  tasks: any[];
  onStatusChange: (
    taskId: string,
    status: string
  ) => void;
}

export default function TaskColumn({
  title,
  tasks,
  onStatusChange,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0F0F0F] p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-semibold">
          {title}
        </h2>

        <span className="text-sm text-zinc-500">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={
              onStatusChange
            }
          />
        ))}
      </div>
    </div>
  );
}