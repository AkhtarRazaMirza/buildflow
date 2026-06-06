interface DashboardHeaderProps {
  userName: string;
  totalProjects: number;
}

export default function DashboardHeader({
  userName,
  totalProjects,
}: DashboardHeaderProps) {
  return (
    <div className="mb-10">
      <h1 className="text-4xl font-bold">
        Welcome back, {userName}
      </h1>

      <p className="mt-3 text-zinc-400">
        You currently have {totalProjects} project
        {totalProjects !== 1 ? "s" : ""} in BuildFlow.
      </p>
    </div>
  );
}