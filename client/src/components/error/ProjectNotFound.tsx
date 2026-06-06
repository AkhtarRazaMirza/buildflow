"use client";

import { useRouter } from "next/navigation";
import ErrorCard from "./ErrorCard";

export default function ProjectNotFound() {
  const router = useRouter();

  return (
    <ErrorCard
      title="Project Not Found"
      description="The project you are looking for does not exist or has been removed."
      action={
        <button
          onClick={() =>
            router.push("/projects")
          }
          className="rounded-xl bg-white px-5 py-3 text-black"
        >
          Back to Projects
        </button>
      }
    />
  );
}