interface Props {
  activity: any;
  onSelect: (
    activity: any
  ) => void;
}

export default function ActivityItem({
  activity,
  onSelect,
}: Props) {
  return (
    <button
      onClick={() =>
        onSelect(activity)
      }
      className="w-full rounded-2xl border border-white/10 bg-[#111111] p-4 text-left hover:border-white/20"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium">
          {activity.tool_name}
        </h3>

        <span
          className={`text-xs ${
            activity.status ===
            "success"
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {activity.status}
        </span>
      </div>

      <p className="mt-2 text-sm text-zinc-500">
        {new Date(
          activity.created_at
        ).toLocaleString()}
      </p>
    </button>
  );
}