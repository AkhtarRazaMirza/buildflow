interface ErrorCardProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function ErrorCard({
  title,
  description,
  action,
}: ErrorCardProps) {
  return (
    <div className="rounded-3xl border border-red-500/20 bg-[#111111] p-12 text-center">
      <h2 className="text-2xl font-semibold text-white">
        {title}
      </h2>

      <p className="mt-3 text-zinc-400">
        {description}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}