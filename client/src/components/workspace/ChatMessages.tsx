interface Props {
  messages: any[];
}

export default function ChatMessages({
  messages,
}: Props) {
  return (
    <div className="flex-1 space-y-6 overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.role === "user"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <div
            className={`max-w-3xl rounded-2xl px-4 py-3 ${
              message.role === "user"
                ? "bg-white text-black"
                : "bg-[#111111] border border-white/10"
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
}