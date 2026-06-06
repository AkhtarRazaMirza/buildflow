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

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [dashboard, setDashboard] =
    useState<any>(null);

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
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

        <QuickActions />
      </div>
    </main>
  );
}