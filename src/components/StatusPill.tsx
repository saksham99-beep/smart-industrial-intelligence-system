type StatusPillProps = {
  status: "Critical" | "Warning" | "Stable";
};

export default function StatusPill({ status }: StatusPillProps) {
  const style =
    status === "Critical"
      ? "border-red-400/30 bg-red-500/10 text-red-300"
      : status === "Warning"
      ? "border-yellow-400/30 bg-yellow-500/10 text-yellow-300"
      : "border-emerald-400/30 bg-emerald-500/10 text-emerald-300";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs ${style}`}>
      {status}
    </span>
  );
}