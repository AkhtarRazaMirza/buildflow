"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getCurrentUser } from "@/src/lib/auth";
import { getWorkspace } from "@/src/lib/workspace";

import ProjectHeader from "@/src/components/project/ProjectHeader";
import ProjectMemory from "@/src/components/project/ProjectMemory";
import ProjectInsights from "@/src/components/project/ProjectInsights";
import ProjectTasks from "@/src/components/project/ProjectTasks";
import ProjectActivities from "@/src/components/project/ProjectActivities";
import ContinueWorking from "@/src/components/project/ContinueWorking";
import ProjectLayout from "@/src/components/project/ProjectLayout";
import ProjectSkeleton from "@/src/components/skeletons/ProjectSkeleton";

export default function ProjectPage() {
  const router = useRouter();

  const params = useParams();

  const projectId =
    typeof params.id === "string"
      ? params.id
      : "";

  const [loading, setLoading] =
    useState(true);

  const [workspace, setWorkspace] =
    useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const user =
          await getCurrentUser();

        if (!user) {
          router.push("/login");
          return;
        }

        const data =
          await getWorkspace(projectId);

        setWorkspace(data);
      } catch (error) {
        console.error(error);

        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    }

    if (projectId) {
      load();
    }
  }, [projectId, router]);

  if (loading) {
    return <ProjectSkeleton />;
  }

  if (!workspace) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Project Not Found
          </h1>

          <p className="mt-3 text-zinc-400">
            The requested project could
            not be found.
          </p>
        </div>
      </main>
    );
  }

  const {
    project,
    tasks,
    activities,
  } = workspace;

  return (
    <ProjectLayout projectId={projectId}>
      <ProjectHeader project={project} />

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProjectMemory project={project} />
        </div>

        <ProjectInsights project={project} />
      </div>

      <div className="mt-8">
        <ProjectTasks tasks={tasks} />
      </div>

      <div className="mt-8">
        <ProjectActivities activities={activities} />
      </div>

      <div className="mt-8">
        <ContinueWorking
          projectId={projectId}
        />
      </div>
    </ProjectLayout>
  );
}