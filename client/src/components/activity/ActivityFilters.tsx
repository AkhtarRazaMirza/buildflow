interface Props {
  value: string;
  onChange: (
    value: string
  ) => void;
}

export default function ActivityFilters({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(
          e.target.value
        )
      }
      className="rounded-xl border border-white/10 bg-[#111111] px-4 py-2"
    >
      <option value="all">
        All Activities
      </option>

      <option value="success">
        Success
      </option>

      <option value="failed">
        Failed
      </option>
    </select>
  );
}