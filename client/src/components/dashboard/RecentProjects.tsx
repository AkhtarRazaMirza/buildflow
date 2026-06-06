interface Project {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

interface RecentProjectsProps {
  projects: Project[];
}

export default function RecentProjects({
  projects,
}: RecentProjectsProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
      <h2 className="text-xl font-semibold">
        Recent Projects
      </h2>

      <div className="mt-6 space-y-4">
        {projects.length === 0 ? (
          <p className="text-zinc-500">
            No projects yet.
          </p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border border-white/10 p-4"
            >
              <h3 className="font-medium">
                {project.name}
              </h3>

              <p className="mt-2 text-sm text-zinc-400">
                {project.description ||
                  "No description provided"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}