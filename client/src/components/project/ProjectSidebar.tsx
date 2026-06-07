import ProjectNavItem from "./ProjectNavItem";

interface ProjectSidebarProps {
  projectId: string;
}

export default function ProjectSidebar({
  projectId,
}: ProjectSidebarProps) {
  return (
    <aside className="w-full shrink-0 lg:sticky lg:top-24 lg:w-72">
      <div className="rounded-3xl border border-white/10 bg-[#111111] p-4">
        <div className="mb-6 border-b border-white/10 pb-4">
          <h2 className="text-sm font-semibold text-white">
            Project Navigation
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:block lg:space-y-2">
          <ProjectNavItem
            href={`/projects/${projectId}`}
            label="Overview"
          />

          <ProjectNavItem
            href={`/projects/${projectId}/workspace`}
            label="Workspace"
          />

          <ProjectNavItem
            href={`/projects/${projectId}/tasks`}
            label="Tasks"
          />

          <ProjectNavItem
            href={`/projects/${projectId}/activities`}
            label="Activities"
          />
        </div>
      </div>
    </aside>
  );
}