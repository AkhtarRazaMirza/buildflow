import ProjectCard from "./ProjectCard";

interface Project {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({
  projects,
}: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#111111] p-12 text-center">
        <h2 className="text-2xl font-semibold">
          No Projects Yet
        </h2>

        <p className="mt-3 text-zinc-400">
          Create your first project to
          get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
    </div>
  );
}