import { ReactNode } from "react";
import ProjectSidebar from "./ProjectSidebar";

interface ProjectLayoutProps {
  projectId: string;
  children: ReactNode;
}

export default function ProjectLayout({
  projectId,
  children,
}: ProjectLayoutProps) {
  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-6 py-10">
      <ProjectSidebar projectId={projectId} />

      <div className="min-w-0 flex-1">
        {children}
      </div>
    </div>
  );
}