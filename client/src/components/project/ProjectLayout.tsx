import { ReactNode } from "react";
import ProjectSidebar from "./ProjectSidebar";
import Navbar from "@/src/components/layout/Navbar";


interface ProjectLayoutProps {
  projectId: string;
  children: ReactNode;
}

export default function ProjectLayout({
  projectId,
  children,
}: ProjectLayoutProps) {
  return (
    <div className="h-[calc(100vh-73px)] overflow-hidden">
      <Navbar />
      <div className="mx-auto flex h-full max-w-7xl gap-8 px-6 py-6">

        {/* Fixed Sidebar */}
        <div className="shrink-0">
          <ProjectSidebar projectId={projectId} />
        </div>

        {/* Scrollable Content */}
        <div className="min-h-0 flex-1 overflow-y-auto pr-2">
          {children}
        </div>

      </div>
    </div>
  );
}