interface Props {
  onAction: (
    prompt: string
  ) => void;
}

export default function QuickActions({
  onAction,
}: Props) {
  const actions = [
    {
      label: "Generate Roadmap",
      prompt:
        "Generate a complete roadmap for this project.",
    },

    {
      label: "Create Tasks",
      prompt:
        "Generate implementation tasks for this project.",
    },

    {
      label: "Research Topic",
      prompt:
        "Research the best architecture for this project.",
    },

    {
      label: "Update Memory",
      prompt:
        "Analyze the project and update memory.",
    },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111111] p-4">
      <h3 className="font-semibold">
        Quick Actions
      </h3>

      <div className="mt-4 space-y-2">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() =>
              onAction(
                action.prompt
              )
            }
            className="w-full rounded-xl border border-white/10 p-3 text-left text-sm hover:border-white/20"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}