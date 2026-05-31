import { systemLogs } from "../data/systemLogs";

export default function SystemLogsPage() {
  return (
    <div className="rounded-2xl border border-cyan-400/10 bg-slate-950/70 p-6 shadow-lg shadow-cyan-500/10">
      <h2 className="text-2xl font-bold text-white">
        Industrial System Logs
      </h2>

      <p className="mt-2 text-slate-400">
        Real-time operational and anomaly records
      </p>

      <div className="mt-6 space-y-4">
        {systemLogs.map((log, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-black/30 p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                {log.time}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs ${
                  log.level === "Critical"
                    ? "bg-red-500/20 text-red-300"
                    : log.level === "Warning"
                    ? "bg-yellow-500/20 text-yellow-300"
                    : "bg-emerald-500/20 text-emerald-300"
                }`}
              >
                {log.level}
              </span>
            </div>

            <p className="mt-3 text-sm text-slate-200">
              {log.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}