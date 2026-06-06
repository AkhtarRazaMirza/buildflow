"use client";

import Link from "next/link";
import UserMenu from "./UserMenu";
import { useState } from "react";
import { useRouter } from "next/navigation";

import CreateProjectModal from "@/src/components/project/CreateProjectModal";
import { createProject } from "@/src/lib/projects";

export default function Navbar() {
  const router = useRouter();

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  async function handleCreateProject(
    data: {
      name: string;
      description: string;
    }
  ) {
    try {
      const response =
        await createProject(data);

      setShowCreateModal(false);

      router.push(
        `/projects/${response.project.id}`
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
          {/* Left */}
          <div className="flex items-center gap-10">
            <Link
              href="/dashboard"
              className="text-xl font-bold tracking-tight text-white"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-white" />

                <span className="text-xl font-bold tracking-tight text-white">
                  BuildFlow
                </span>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              <Link
                href="/dashboard"
                className="text-sm text-zinc-400 transition hover:text-white"
              >
                Dashboard
              </Link>

              <Link
                href="/projects"
                className="text-sm text-zinc-400 transition hover:text-white"
              >
                Projects
              </Link>
            </nav>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setShowCreateModal(true)
              }
              className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 md:block"
            >
              New Project
            </button>

            <UserMenu />
          </div>
        </div>
      </header>

      <CreateProjectModal
        open={showCreateModal}
        onClose={() =>
          setShowCreateModal(false)
        }
        onCreate={handleCreateProject}
      />
    </>
  );
}