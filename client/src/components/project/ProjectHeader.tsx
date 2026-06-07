interface Props {
  project: any;
}

export default function ProjectHeader({
  project,
}: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl lg:text-4xl font-bold">
        {project.name}
      </h1>

      <p className="mt-3 max-w-3xl text-zinc-400">
        {project.description ||
          "No description provided"}
      </p>

      <p className="mt-4 text-sm text-zinc-500">
        Created{" "}
        {new Date(
          project.created_at
        ).toLocaleDateString()}
      </p>
    </div>
  );
}