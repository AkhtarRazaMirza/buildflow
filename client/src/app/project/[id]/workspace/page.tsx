"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { getCurrentUser } from "@/src/lib/auth";

import { getWorkspace } from "@/src/lib/workspace";

import {
  getProjectHistory,
  sendMessage,
} from "@/src/lib/chat";

import WorkspaceSidebar from "@/src/components/workspace/WorkspaceSidebar";
import ChatMessages from "@/src/components/workspace/ChatMessages";
import ChatInput from "@/src/components/workspace/ChatInput";

export default function WorkspacePage() {
  const router = useRouter();

  const params = useParams();

  const projectId =
    typeof params.id === "string"
      ? params.id
      : "";

  const [loading, setLoading] =
    useState(true);

  const [sending, setSending] =
    useState(false);

  const [project, setProject] =
    useState<any>(null);

  const [messages, setMessages] =
    useState<any[]>([]);

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
          await getWorkspace(
            projectId
          );

        const history =
          await getProjectHistory(
            projectId
          );

        setProject(
          workspace.project
        );

        setMessages(
          history.messages || []
        );
      } catch (error) {
        console.error(error);

        router.push(
          "/dashboard"
        );
      } finally {
        setLoading(false);
      }
    }

    if (projectId) {
      load();
    }
  }, [projectId, router]);

  async function handleSend(
    message: string
  ) {
    try {
      setSending(true);

      const tempUserMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: message,
      };

      setMessages((prev) => [
        ...prev,
        tempUserMessage,
      ]);

      const response =
        await sendMessage(
          projectId,
          message
        );

      const assistantMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          response.assistantMessage,
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);

      if (response.project) {
        setProject(
          response.project
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
    }
  }

  async function handleQuickAction(
    prompt: string
  ) {
    await handleSend(prompt);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <p>
          Loading workspace...
        </p>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Workspace Not Found
          </h1>

          <p className="mt-3 text-zinc-400">
            Unable to load this
            workspace.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen bg-[#0A0A0A] text-white">
      <div className="grid h-full lg:grid-cols-[320px_1fr]">
        {/* Sidebar */}

        <aside className="border-r border-white/10 p-6 overflow-y-auto">
          <WorkspaceSidebar
            project={project}
            onAction={
              handleQuickAction
            }
          />
        </aside>

        {/* Chat Area */}

        <section className="flex h-full flex-col">
          <div className="border-b border-white/10 px-6 py-4">
            <h1 className="font-semibold">
              BuildFlow AI Workspace
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              {project.name}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <ChatMessages
              messages={messages}
            />
          </div>

          <div className="border-t border-white/10 p-6">
            {sending && (
              <p className="mb-3 text-sm text-zinc-500">
                BuildFlow AI is
                thinking...
              </p>
            )}

            <ChatInput
              onSend={handleSend}
            />
          </div>
        </section>
      </div>
    </main>
  );
}