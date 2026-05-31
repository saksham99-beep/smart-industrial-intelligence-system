type AIChatProps = {
  userQuery: string;
  setUserQuery: (value: string) => void;
  aiResponse: string;
  handleAskAI: () => void;
};

export default function AIChat({
  userQuery,
  setUserQuery,
  aiResponse,
  handleAskAI,
}: AIChatProps) {
  return (
    <div className="rounded-2xl border border-cyan-400/10 bg-slate-950/70 p-5 shadow-lg shadow-cyan-500/10">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-xl bg-cyan-400/10 p-2 text-cyan-300">
          🤖
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">
            Industrial AI Assistant
          </h3>

          <p className="text-sm text-slate-400">
            RAG-based query interface
          </p>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-white/10 bg-black/30 p-4">
        <div className="rounded-xl bg-cyan-400/10 p-3 text-sm text-cyan-100">
          Ask: “Why is Unit-204 showing high vibration?”
        </div>

        <div className="rounded-xl bg-emerald-400/10 p-3 text-sm text-emerald-100">
          {aiResponse}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Type industrial query..."
          className="flex-1 rounded-xl border border-cyan-400/20 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
        />

        <button
          onClick={handleAskAI}
          className="rounded-xl bg-cyan-400/20 px-4 py-3 text-sm font-semibold text-cyan-200 hover:bg-cyan-400/30"
        >
          Ask
        </button>
      </div>
    </div>
  );
}