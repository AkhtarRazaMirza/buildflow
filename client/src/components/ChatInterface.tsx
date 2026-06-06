"use client";

import React, { useState, useRef, useEffect } from "react";
import { apiCall } from "@/src/lib/api";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  toolActivity?: {
    tool: string;
    status: "success" | "failed";
  };
}

interface ChatInterfaceProps {
  projectId: string | null;
}

export function ChatInterface({
  projectId,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingState, setLoadingState] =
    useState("");

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (!projectId) {
      setMessages([]);
    }
  }, [projectId]);

  const handleSendMessage = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !input.trim() ||
      !projectId ||
      isLoading
    )
      return;

    const messageContent = input.trim();

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setInput("");
    setIsLoading(true);
    setLoadingState("Thinking...");

    try {
      const data = await apiCall("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          project_id: projectId,
          message: messageContent,
        }),
      });

      const toolMessages: Message[] = (
        data.toolResults || []
      ).map((toolResult: any) => ({
        id: crypto.randomUUID(),
        role: "assistant",
        content: toolResult.tool,
        timestamp: new Date(),
        toolActivity: {
          tool: toolResult.tool,
          status: toolResult.result?.error
            ? "failed"
            : "success",
        },
      }));

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          data.assistantMessage ||
          "No response received.",
        timestamp: new Date(),
      };

      setMessages((prev) => [
        ...prev,
        ...toolMessages,
        assistantMessage,
      ]);
    } catch (error) {
      console.error(
        "Failed to send message:",
        error
      );

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Unable to process your message. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setLoadingState("");
    }
  };

  useEffect(() => {
    if (!projectId) {
      setMessages([]);
      return;
    }

    let mounted = true;

    const loadChatHistory =
      async () => {
        try {
          const data =
            await apiCall(
              `/api/chat/${projectId}`
            );

          if (!mounted) return;

          const history =
            (
              data.messages || []
            ).map((message: any) => ({
              id:
                message.id ??
                crypto.randomUUID(),
              role: message.role,
              content:
                message.content,
              timestamp:
                new Date(
                  message.created_at
                ),
            }));

          setMessages(history);
        } catch (error) {
          console.error(
            "Failed to load chat history:",
            error
          );
        }
      };

    loadChatHistory();

    return () => {
      mounted = false;
    };
  }, [projectId]);

  if (!projectId) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No project selected
          </h2>

          <p className="text-gray-500">
            Select or create a project from
            the sidebar to start chatting.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 &&
          !isLoading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <p className="text-lg font-medium mb-2">
                  Start a conversation
                </p>

                <p className="text-sm mb-4">
                  Ask me to create tasks,
                  save memory, or search
                  the web.
                </p>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-w-md mx-auto text-left text-sm space-y-2">
                  <p>
                    • Create 5 tasks for my
                    dashboard
                  </p>
                  <p>
                    • Remember we use
                    PostgreSQL and JWT
                  </p>
                  <p>
                    • Find authentication
                    best practices
                  </p>
                </div>
              </div>
            </div>
          )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user"
              ? "justify-end"
              : "justify-start"
              }`}
          >
            {message.toolActivity ? (
              <div className="max-w-sm border border-gray-200 bg-gray-50 rounded-lg px-4 py-3">
                <div className="flex items-center gap-2">
                  <span>
                    {message.toolActivity
                      .status === "success"
                      ? "✓"
                      : "✕"}
                  </span>

                  <span className="text-sm font-medium">
                    {message.toolActivity
                      .tool}
                  </span>
                </div>
              </div>
            ) : (
              <div
                className={`max-w-2xl rounded-lg px-4 py-3 ${message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 border border-gray-200 text-gray-900"
                  }`}
              >
                <p className="text-sm whitespace-pre-wrap">
                  {message.content}
                </p>

                <p
                  className={`text-xs mt-2 ${message.role === "user"
                    ? "text-blue-100"
                    : "text-gray-500"
                    }`}
                >
                  {message.timestamp.toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3">
              <span className="text-sm text-gray-600">
                {loadingState}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="border-t border-gray-200 p-4 bg-white"
      >
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            disabled={isLoading}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder="Ask me to create tasks, save memory, or search..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={
              isLoading || !input.trim()
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}