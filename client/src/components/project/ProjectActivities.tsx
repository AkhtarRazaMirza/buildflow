interface Props {
  activities: any[];
}

export default function ProjectActivities({
  activities,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
      <h2 className="text-xl font-semibold">
        Recent Activities
      </h2>

      <div className="mt-6 space-y-3">
        {activities.length === 0 ? (
          <p className="text-zinc-500">
            No activities yet.
          </p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between rounded-2xl border border-white/10 p-4"
            >
              <div>
                <p>
                  {activity.tool_name}
                </p>

                <p className="text-sm text-zinc-500">
                  {activity.status}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}