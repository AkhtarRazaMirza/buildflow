"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { apiCall } from "@/src/lib/api";

interface Activity {
  id: string;
  tool_name: string;
  status: "success" | "failed";
  created_at: string;
  arguments?: Record<string, unknown>;
  result?: Record<string, unknown>;
}

export function ActivityPanel() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");

  useEffect(() => {
    if (!projectId) return;

    let mounted = true;

    const fetchActivities = async () => {
      try {
        const data = await apiCall(
          `/api/activities/${projectId}?limit=50`
        );

        if (mounted) {
          setActivities(data.activities || []);
        }
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      }
    };

    // Initial fetch
    fetchActivities();

    // Poll every 5 seconds
    const interval = setInterval(fetchActivities, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [projectId]);

  const getToolIcon = (toolName: string) => {
    switch (toolName) {
      case "createTask":
        return "✓";
      case "saveProjectMemory":
        return "💾";
      case "searchWeb":
        return "🔍";
      default:
        return "🔧";
    }
  };

  const getToolLabel = (toolName: string) => {
    switch (toolName) {
      case "createTask":
        return "Create Task";
      case "saveProjectMemory":
        return "Save Memory";
      case "searchWeb":
        return "Search Web";
      default:
        return toolName;
    }
  };

  if (!projectId) {
    return (
      <div className="w-80 border-l border-gray-200 bg-white flex flex-col">
        <div className="border-b border-gray-200 p-4">
          <h2 className="text-sm font-semibold text-gray-900">
            Agent Activity
          </h2>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-gray-500 text-center">
            Select a project to view activities
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 border-l border-gray-200 bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-sm font-semibold text-gray-900">
          Agent Activity
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Recent tool calls
        </p>
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-sm text-gray-500">
              No activities yet
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Tool calls will appear here
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="p-3 hover:bg-gray-50 transition-colors"
              >
                <button
                  onClick={() =>
                    setExpandedId(
                      expandedId === activity.id
                        ? null
                        : activity.id
                    )
                  }
                  className="w-full text-left"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg mt-0.5">
                      {getToolIcon(activity.tool_name)}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900">
                          {getToolLabel(activity.tool_name)}
                        </p>

                        <span
                          className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                            activity.status === "success"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {activity.status}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(
                          activity.created_at
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </button>

                {expandedId === activity.id && (
                  <div className="mt-3 pl-6 text-xs space-y-2 border-l-2 border-gray-200 py-2">
                    {activity.arguments &&
                      Object.keys(activity.arguments).length > 0 && (
                        <div>
                          <p className="font-medium text-gray-600 mb-1">
                            Arguments
                          </p>

                          <pre className="bg-gray-50 p-2 rounded text-gray-700 overflow-auto max-h-32">
                            {JSON.stringify(
                              activity.arguments,
                              null,
                              2
                            )}
                          </pre>
                        </div>
                      )}

                    {activity.result && (
                      <div>
                        <p className="font-medium text-gray-600 mb-1">
                          Result
                        </p>

                        <pre className="bg-gray-50 p-2 rounded text-gray-700 overflow-auto max-h-32">
                          {JSON.stringify(
                            activity.result,
                            null,
                            2
                          )}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}