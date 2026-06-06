"use client";

import Link from "next/link";

interface Project {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="block rounded-3xl border border-white/10 bg-[#111111] p-6 transition hover:border-white/20"
    >
      <h3 className="text-lg font-semibold">
        {project.name}
      </h3>

      <p className="mt-3 text-sm text-zinc-400">
        {project.description ||
          "No description provided"}
      </p>

      <p className="mt-4 text-xs text-zinc-500">
        {new Date(
          project.created_at
        ).toLocaleDateString()}
      </p>
    </Link>
  );
}