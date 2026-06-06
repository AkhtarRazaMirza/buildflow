"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getCurrentUser } from "@/src/lib/auth";
import { getWorkspace } from "@/src/lib/workspace";

import {
  getTasks,
  createTask,
  updateTask,
} from "@/src/lib/tasks";

import TaskBoard from "@/src/components/tasks/TaskBoard";
import TaskFilters from "@/src/components/tasks/TaskFilters";
import CreateTaskModal from "@/src/components/tasks/CreateTaskModal";

export default function TasksPage() {
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

  const [tasks, setTasks] =
    useState<any[]>([]);

  const [showModal, setShowModal] =
    useState(false);

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [priorityFilter, setPriorityFilter] =
    useState("all");

  async function loadData() {
    try {
      const workspace =
        await getWorkspace(projectId);

      const taskResponse =
        await getTasks(projectId);

      setProject(workspace.project);

      setTasks(
        taskResponse.tasks || []
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function initialize() {
      try {
        const user =
          await getCurrentUser();

        if (!user) {
          router.push("/login");
          return;
        }

        await loadData();
      } catch (error) {
        console.error(error);

        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    }

    if (projectId) {
      initialize();
    }
  }, [projectId, router]);

  async function handleStatusChange(
    taskId: string,
    status: string
  ) {
    try {
      await updateTask(taskId, {
        status,
      });

      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status,
              }
            : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCreateTask(
    data: {
      title: string;
      description: string;
      priority: string;
    }
  ) {
    try {
      await createTask({
        project_id: projectId,
        title: data.title,
        description:
          data.description,
        priority: data.priority,
      });

      await loadData();
    } catch (error) {
      console.error(error);
    }
  }

  const filteredTasks =
    useMemo(() => {
      return tasks.filter((task) => {
        const statusMatch =
          statusFilter === "all" ||
          task.status === statusFilter;

        const priorityMatch =
          priorityFilter === "all" ||
          task.priority ===
            priorityFilter;

        return (
          statusMatch &&
          priorityMatch
        );
      });
    }, [
      tasks,
      statusFilter,
      priorityFilter,
    ]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        Loading tasks...
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        Project not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Tasks
            </h1>

            <p className="mt-2 text-zinc-400">
              {project.name}
            </p>
          </div>

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="rounded-xl bg-white px-5 py-3 font-medium text-black"
          >
            + New Task
          </button>
        </div>

        {/* Filters */}

        <div className="mt-8">
          <TaskFilters
            statusFilter={
              statusFilter
            }
            priorityFilter={
              priorityFilter
            }
            onStatusChange={
              setStatusFilter
            }
            onPriorityChange={
              setPriorityFilter
            }
          />
        </div>

        {/* Empty State */}

        {tasks.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-white/10 bg-[#111111] p-10 text-center">
            <h2 className="text-2xl font-semibold">
              No tasks yet
            </h2>

            <p className="mt-3 text-zinc-400">
              Generate tasks with AI
              or create one manually.
            </p>

            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() =>
                  router.push(
                    `/project/${projectId}/workspace`
                  )
                }
                className="rounded-xl border border-white/10 px-5 py-3"
              >
                Open Workspace
              </button>

              <button
                onClick={() =>
                  setShowModal(true)
                }
                className="rounded-xl bg-white px-5 py-3 text-black"
              >
                Create Task
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <TaskBoard
              tasks={filteredTasks}
              onStatusChange={
                handleStatusChange
              }
            />
          </div>
        )}

        <CreateTaskModal
          projectId={projectId}
          open={showModal}
          onClose={() =>
            setShowModal(false)
          }
          onCreate={
            handleCreateTask
          }
        />
      </div>
    </main>
  );
}