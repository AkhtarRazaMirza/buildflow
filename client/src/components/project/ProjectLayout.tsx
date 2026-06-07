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
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:gap-8 lg:px-6 lg:py-10">
      <ProjectSidebar projectId={projectId} />

      <div className="min-w-0 flex-1">
        {children}
      </div>
    </div>
  );
}