"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiCall } from "@/src/lib/api";

interface Project {
  id: string;
  name: string;
}

export function Sidebar() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeProject = searchParams.get("project");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await apiCall("/api/projects");
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectProject = (projectId: string) => {
    router.push(`/?project=${projectId}`);
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    setIsCreating(true);
    try {
      const data = await apiCall("/api/projects", {
        method: "POST",
        body: JSON.stringify({
          name: newProjectName,
          description: "",
        }),
      });

      setProjects([...projects, data.project]);
      setNewProjectName("");
      setShowNewProjectForm(false);
      handleSelectProject(data.project.id);
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="w-64 border-r border-gray-200 bg-gray-50 flex flex-col">
      {/* Logo / Branding */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">ProjectPilot</h1>
        <p className="text-xs text-gray-500 mt-1">AI Project Manager</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3 px-2">
            Projects
          </h2>

          {isLoading ? (
            <div className="px-2 py-2 text-sm text-gray-500">Loading...</div>
          ) : projects.length > 0 ? (
            <div className="space-y-1">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleSelectProject(project.id)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${activeProject === project.id
                    ? "bg-white text-gray-900 border border-gray-200 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {project.name}
                </button>
              ))}
            </div>
          ) : (
            <div className="px-2 py-2 text-sm text-gray-500">No projects yet</div>
          )}
        </div>

        {showNewProjectForm ? (
          <form onSubmit={handleCreateProject} className="space-y-2">
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Project name..."
              autoFocus
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isCreating}
            />
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isCreating || !newProjectName.trim()}
                className="flex-1 px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 disabled:bg-gray-300"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowNewProjectForm(false);
                  setNewProjectName("");
                }}
                className="flex-1 px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowNewProjectForm(true)}
            className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors font-medium"
          >
            + New Project
          </button>
        )}
      </nav>

      {/* Quick Links */}
      <div className="border-t border-gray-200 p-4 space-y-1">
        <a
          href="/tasks"
          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
        >
          Tasks
        </a>
        <a
          href="/settings"
          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
        >
          Settings
        </a>
      </div>
    </div>
  );
}
