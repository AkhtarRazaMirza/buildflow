interface Props {
  activity: any;
}

export default function ActivityDetails({
  activity,
}: Props) {
  if (!activity) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
        Select an activity
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
      <h2 className="text-xl font-semibold">
        {activity.tool_name}
      </h2>

      <p className="mt-3 text-zinc-400">
        Status: {activity.status}
      </p>

      <div className="mt-6">
        <h3 className="mb-2 font-medium">
          Arguments
        </h3>

        <pre className="overflow-auto rounded-xl bg-black/30 p-4 text-xs">
          {JSON.stringify(
            activity.arguments,
            null,
            2
          )}
        </pre>
      </div>

      {activity.result && (
        <div className="mt-6">
          <h3 className="mb-2 font-medium">
            Result
          </h3>

          <pre className="overflow-auto rounded-xl bg-black/30 p-4 text-xs">
            {JSON.stringify(
              activity.result,
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
}