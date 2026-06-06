"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getCurrentUser } from "@/src/lib/auth";
import { getWorkspace } from "@/src/lib/workspace";
import { getActivities } from "@/src/lib/activity";

import ActivityTimeline from "@/src/components/activity/ActivityTimeline";
import ActivityDetails from "@/src/components/activity/ActivityDetails";
import ActivityFilters from "@/src/components/activity/ActivityFilters";
import ProjectLayout from "@/src/components/project/ProjectLayout";
import ActivitySkeleton from "@/src/components/skeletons/ActivitySkeleton";
import EmptyActivities from "@/src/components/empty/EmptyActivities";
import ProjectNotFound from "@/src/components/error/ProjectNotFound";

export default function ActivitiesPage() {
  const router = useRouter();

  const params = useParams();

  const projectId =
    typeof params.id === "string"
      ? params.id
      : "";

  const [loading, setLoading] =
    useState(true);

  const [project, setProject] =
    useState<any>(null);

  const [activities, setActivities] =
    useState<any[]>([]);

  const [selectedActivity, setSelectedActivity] =
    useState<any>(null);

  const [filter, setFilter] =
    useState("all");

  useEffect(() => {
    async function load() {
      try {
        const user =
          await getCurrentUser();

        if (!user) {
          router.push("/login");
          return;
        }

        const workspace =
          await getWorkspace(projectId);

        const activityResponse =
          await getActivities(projectId);

        setProject(workspace.project);

        const activityList =
          activityResponse.activities || [];

        setActivities(activityList);

        if (activityList.length > 0) {
          setSelectedActivity(
            activityList[0]
          );
        }
      } catch (error) {
        console.error(error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    }

    if (projectId) {
      load();
    }
  }, [projectId, router]);

  const filteredActivities =
    useMemo(() => {
      if (filter === "all") {
        return activities;
      }

      return activities.filter(
        (activity) =>
          activity.status === filter
      );
    }, [activities, filter]);

  if (loading) {
    return (
      <ActivitySkeleton />
    );
  }

  if (!project) {
    return <ProjectNotFound />;
  }

  return (
    <ProjectLayout projectId={projectId}>
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Activity Timeline
        </h1>

        <p className="mt-2 text-zinc-400">
          {project.name}
        </p>
      </div>

      {/* Filter */}

      <div className="mb-8">
        <ActivityFilters
          value={filter}
          onChange={setFilter}
        />
      </div>

      {/* Empty State */}

      {filteredActivities.length === 0 ? (
        <EmptyActivities
          onOpenWorkspace={() =>
            router.push(
              `/project/${projectId}/workspace`
            )
          }
        />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
          <div>
            <ActivityTimeline
              activities={
                filteredActivities
              }
              onSelect={
                setSelectedActivity
              }
            />
          </div>

          <div>
            <ActivityDetails
              activity={
                selectedActivity
              }
            />
          </div>
        </div>
      )}
    </ProjectLayout>
  );
}