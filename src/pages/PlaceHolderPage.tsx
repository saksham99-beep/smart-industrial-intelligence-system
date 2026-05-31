type PlaceholderPageProps = {
  title: string;
  description: string;
};

export default function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <div className="rounded-2xl border border-cyan-400/10 bg-slate-950/70 p-8 shadow-lg shadow-cyan-500/10">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="mt-3 text-slate-400">{description}</p>
    </div>
  );
}