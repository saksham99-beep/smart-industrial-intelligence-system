import { motion } from "framer-motion";

type StatCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-cyan-400/20 bg-slate-950/70 p-5 shadow-lg shadow-cyan-500/10"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>
          <p className="mt-1 text-sm text-emerald-300">{subtitle}</p>
        </div>

        <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
          <Icon size={28} />
        </div>
      </div>
    </motion.div>
  );
}
