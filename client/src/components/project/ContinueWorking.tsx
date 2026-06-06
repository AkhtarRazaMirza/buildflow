"use client";

import { useRouter } from "next/navigation";

interface ContinueWorkingProps {
  projectId: string;
}

export default function ContinueWorking({
  projectId,
}: ContinueWorkingProps) {
  const router = useRouter();

  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
      <h2 className="text-xl font-semibold">
        Continue Working
      </h2>

      <p className="mt-3 text-zinc-400">
        Continue building your project in the AI
        workspace, manage tasks, and review
        activities.
      </p>

      <div className="mt-6 flex flex-wrap gap-4">
        <button
          onClick={() =>
            router.push(
              `/project/${projectId}/workspace`
            )
          }
          className="rounded-xl bg-white px-5 py-3 font-medium text-black"
        >
          Open Workspace
        </button>

        <button
          onClick={() =>
            router.push(
              `/project/${projectId}/tasks`
            )
          }
          className="rounded-xl border border-white/10 px-5 py-3"
        >
          View Tasks
        </button>

        <button
          onClick={() =>
            router.push(
              `/project/${projectId}/activities`
            )
          }
          className="rounded-xl border border-white/10 px-5 py-3"
        >
          View Activities
        </button>
      </div>
    </div>
  );
}