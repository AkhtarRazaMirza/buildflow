"use client";

import { useState } from "react";

interface Props {
  projectId: string;
  open: boolean;
  onClose: () => void;
  onCreate: (data: {
    title: string;
    description: string;
    priority: string;
  }) => Promise<void>;
}

export default function CreateTaskModal({
  projectId,
  open,
  onClose,
  onCreate,
}: Props) {
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("medium");

  const [loading, setLoading] =
    useState(false);

  if (!open) {
    return null;
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await onCreate({
        title,
        description,
        priority,
      });

      setTitle("");
      setDescription("");
      setPriority("medium");

      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#111111] p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Create Task
          </h2>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Title
            </label>

            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
              className="w-full rounded-xl border border-white/10 bg-[#0A0A0A] px-4 py-3 outline-none"
              placeholder="Task title"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-[#0A0A0A] px-4 py-3 outline-none"
              placeholder="Task description"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-white/10 bg-[#0A0A0A] px-4 py-3 outline-none"
            >
              <option value="low">
                Low
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="high">
                High
              </option>
            </select>
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-white py-3 font-medium text-black"
          >
            {loading
              ? "Creating..."
              : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
}