"use client";

interface EmptyProjectsProps {
  onCreateProject: () => void;
}

export default function EmptyProjects({
  onCreateProject,
}: EmptyProjectsProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111] p-12 text-center">
      <h2 className="text-2xl font-semibold">
        No Projects Yet
      </h2>

      <p className="mt-3 text-zinc-400">
        Create your first project and let
        BuildFlow help you plan and build it.
      </p>

      <button
        onClick={onCreateProject}
        className="mt-6 rounded-xl bg-white px-6 py-3 font-medium text-black"
      >
        Create Project
      </button>
    </div>
  );
}