import TaskColumn from "./TaskColumn";

interface Props {
  tasks: any[];
  onStatusChange: (
    taskId: string,
    status: string
  ) => void;
}

export default function TaskBoard({
  tasks,
  onStatusChange,
}: Props) {
  const todo = tasks.filter(
    (task) => task.status === "todo"
  );

  const inProgress =
    tasks.filter(
      (task) =>
        task.status ===
        "in-progress"
    );

  const done = tasks.filter(
    (task) => task.status === "done"
  );

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-6 lg:grid lg:grid-cols-3">
        <div className="min-w-[320px] lg:min-w-0">
          <TaskColumn
            title="Todo"
            tasks={todo}
            onStatusChange={onStatusChange}
          />
        </div>

        <div className="min-w-[320px] lg:min-w-0">
          <TaskColumn
            title="In Progress"
            tasks={inProgress}
            onStatusChange={onStatusChange}
          />
        </div>

        <div className="min-w-[320px] lg:min-w-0">
          <TaskColumn
            title="Done"
            tasks={done}
            onStatusChange={onStatusChange}
          />
        </div>
      </div>
    </div>
  );
}