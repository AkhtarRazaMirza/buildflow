"use client";

import { useRouter } from "next/navigation";
import ErrorCard from "./ErrorCard";

export default function WorkspaceError() {
  const router = useRouter();

  return (
    <ErrorCard
      title="Workspace Unavailable"
      description="BuildFlow could not load this workspace."
      action={
        <button
          onClick={() =>
            router.push("/dashboard")
          }
          className="rounded-xl bg-white px-5 py-3 text-black"
        >
          Go to Dashboard
        </button>
      }
    />
  );
}