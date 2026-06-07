"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/src/lib/auth";
import { getDashboard } from "@/src/lib/dashboard";
import { useRouter } from "next/navigation";

import DashboardHeader from "@/src/components/dashboard/DashboardHeader";
import StatsCards from "@/src/components/dashboard/StatsCards";
import RecentProjects from "@/src/components/dashboard/RecentProjects";
import ProjectMemory from "@/src/components/dashboard/ProjectMemory";
import QuickActions from "@/src/components/dashboard/QuickActions";
import { createProject } from "@/src/lib/projects";
import CreateProjectModal from "@/src/components/project/CreateProjectModal";
import DashboardSkeleton from "@/src/components/skeletons/DashboardSkeleton";
import Navbar from "@/src/components/layout/Navbar";

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [dashboard, setDashboard] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  async function handleCreateProject(
    data: {
      name: string;
      description: string;
    }
  ) {
    try {
      const response =
        await createProject(data);

      router.push(
        `/project/${response.project.id}`
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function load() {
      const current =
        await getCurrentUser();

      if (!current) {
        router.push("/login");
        return;
      }

      setUser(current);

      const dashboardData =
        await getDashboard();

      setDashboard(dashboardData);
    }

    load();
  }, [router]);

  if (!user || !dashboard) {
    return <DashboardSkeleton />;
  }



  return (
    <div>
      <CreateProjectModal
        open={showCreateModal}
        onClose={() =>
          setShowCreateModal(false)
        }
        onCreate={handleCreateProject}
      />
      <Navbar />
      <main className="min-h-screen bg-[#0A0A0A] text-white animate-fade-in">
        <div className="mx-auto max-w-[1400px] px-6 py-10">
          <DashboardHeader
            userName={user.full_name}
            totalProjects={
              dashboard.stats.totalProjects
            }
          />

          <StatsCards
            totalProjects={
              dashboard.stats.totalProjects
            }
          />

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <RecentProjects
              projects={
                dashboard.recentProjects
              }
            />

            <ProjectMemory
              project={
                dashboard.latestProject
              }
            />
          </div>

          <QuickActions
            onCreateProject={() =>
              setShowCreateModal(true)
            }
          />
        </div>
      </main>
    </div>
  );
}