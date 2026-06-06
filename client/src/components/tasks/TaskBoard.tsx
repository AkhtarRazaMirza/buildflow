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
    <div className="grid gap-6 lg:grid-cols-3">
      <TaskColumn
        title="Todo"
        tasks={todo}
        onStatusChange={
          onStatusChange
        }
      />

      <TaskColumn
        title="In Progress"
        tasks={inProgress}
        onStatusChange={
          onStatusChange
        }
      />

      <TaskColumn
        title="Done"
        tasks={done}
        onStatusChange={
          onStatusChange
        }
      />
    </div>
  );
}