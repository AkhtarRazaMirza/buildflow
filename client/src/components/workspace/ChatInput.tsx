import { useState } from "react";

interface Props {
  onSend: (
    message: string
  ) => Promise<void>;
}

export default function ChatInput({
  onSend,
}: Props) {
  const [message, setMessage] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    const currentMessage =
      message;

    setMessage("");

    await onSend(
      currentMessage
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4"
    >
      <div className="flex gap-3">
        <input
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          placeholder="Ask BuildFlow AI..."
          className="flex-1 rounded-xl border border-white/10 bg-[#111111] px-4 py-3 outline-none"
        />

        <button
          type="submit"
          className="rounded-xl bg-white px-6 text-black"
        >
          Send
        </button>
      </div>
    </form>
  );
}