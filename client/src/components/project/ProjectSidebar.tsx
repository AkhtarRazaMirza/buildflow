import ProjectNavItem from "./ProjectNavItem";

interface ProjectSidebarProps {
  projectId: string;
}

export default function ProjectSidebar({
  projectId,
}: ProjectSidebarProps) {
  return (
    <aside className="sticky top-24 h-fit w-78 shrink-0">
      <div className="rounded-3xl border border-white/10 bg-[#111111] p-4">
        <div className="mb-6 border-b border-white/10 pb-4">
          <h2 className="text-sm font-semibold text-white">
            Project Navigation
          </h2>
        </div>

        <div className="space-y-2">
          <ProjectNavItem
            href={`/project/${projectId}`}
            label="Overview"
          />

          <ProjectNavItem
            href={`/project/${projectId}/workspace`}
            label="Workspace"
          />

          <ProjectNavItem
            href={`/project/${projectId}/tasks`}
            label="Tasks"
          />

          <ProjectNavItem
            href={`/project/${projectId}/activities`}
            label="Activities"
          />
        </div>
      </div>
    </aside>
  );
}