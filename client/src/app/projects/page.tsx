"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getCurrentUser } from "@/src/lib/auth";
import { getProjects } from "@/src/lib/projects";

import ProjectsGrid from "@/src/components/project/ProjectsGrid";
import EmptyProjects from "@/src/components/empty/EmptyProjects";

export default function ProjectsPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [projects, setProjects] =
    useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const user =
          await getCurrentUser();

        if (!user) {
          router.push("/login");
          return;
        }

        const response =
          await getProjects();

        setProjects(
          response.projects || []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Loading projects...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Projects
          </h1>

          <p className="mt-2 text-zinc-400">
            Manage all your projects.
          </p>
        </div>

        {projects.length === 0 ? (
          <EmptyProjects
            onCreateProject={() =>
              router.push("/dashboard")
            }
          />
        ) : (
          <ProjectsGrid
            projects={projects}
          />
        )}
      </div>
    </main>
  );
}