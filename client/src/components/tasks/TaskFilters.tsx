interface Props {
  statusFilter: string;
  priorityFilter: string;

  onStatusChange: (
    value: string
  ) => void;

  onPriorityChange: (
    value: string
  ) => void;
}

export default function TaskFilters({
  statusFilter,
  priorityFilter,
  onStatusChange,
  onPriorityChange,
}: Props) {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <select
        value={statusFilter}
        onChange={(e) =>
          onStatusChange(
            e.target.value
          )
        }
        className="rounded-xl border border-white/10 bg-[#111111] px-4 py-2"
      >
        <option value="all">
          All Status
        </option>

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

      <select
        value={priorityFilter}
        onChange={(e) =>
          onPriorityChange(
            e.target.value
          )
        }
        className="rounded-xl border border-white/10 bg-[#111111] px-4 py-2"
      >
        <option value="all">
          All Priority
        </option>

        <option value="high">
          High
        </option>

        <option value="medium">
          Medium
        </option>

        <option value="low">
          Low
        </option>
      </select>
    </div>
  );
}