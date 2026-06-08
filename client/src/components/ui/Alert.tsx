interface AlertProps {
  type: "success" | "error";
  message: string;
}

export default function Alert({
  type,
  message,
}: AlertProps) {
  return (
    <div
      className={`p-3 rounded-lg text-sm border ${
        type === "success"
          ? "border-green-500 text-green-400"
          : "border-red-500 text-red-400"
      }`}
    >
      {message}
    </div>
  );
}