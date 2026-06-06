import MemoryOverview
  from "./MemoryOverview";

import QuickActions
  from "./QuickActions";

interface Props {
  project: any;
  onAction: (
    prompt: string
  ) => void;
}

export default function WorkspaceSidebar({
  project,
  onAction,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-[#111111] p-5">
        <h2 className="font-semibold">
          {project.name}
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          {project.description}
        </p>
      </div>

      <MemoryOverview
        project={project}
      />

      <QuickActions
        onAction={onAction}
      />
    </div>
  );
}