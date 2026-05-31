type LoginPageProps = {
  onLogin: () => void;
};

export default function LoginPage({
  onLogin,
}: LoginPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#02080d] p-6">
      <div className="w-full max-w-md rounded-2xl border border-cyan-400/10 bg-slate-950/80 p-8 shadow-2xl shadow-cyan-500/10">
        <h1 className="text-3xl font-bold text-white">
          Industrial AI Platform
        </h1>

        <p className="mt-2 text-slate-400">
          Secure access to industrial monitoring system
        </p>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-cyan-400/10 bg-black/40 px-4 py-3 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-cyan-400/10 bg-black/40 px-4 py-3 text-white outline-none"
          />

          <button
            onClick={onLogin}
            className="w-full rounded-xl bg-cyan-400/20 px-4 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-400/30"
          >
            Access Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}