import ActivityItem from "./ActivityItem";

interface Props {
  activities: any[];
  onSelect: (
    activity: any
  ) => void;
}

export default function ActivityTimeline({
  activities,
  onSelect,
}: Props) {
  return (
    <div className="space-y-4 overflow-x-hidden">
      {activities.map(
        (activity) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            onSelect={onSelect}
          />
        )
      )}
    </div>
  );
}