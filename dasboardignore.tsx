import StatCard from "../components/StatCard";
import StatusPill from "../components/StatusPill";
import { machines as machineData } from "../api/mockData";
import { Gauge, AlertTriangle, Wrench, ShieldCheck } from "lucide-react";

type DashboardPageProps = {
  isCritical: boolean;
  liveTemp: number;
  liveVibration: number;
};

export default function DashboardPage({
  isCritical,
  liveTemp,
  liveVibration,
}: DashboardPageProps) {
  return (
    <div className="space-y-6">
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Machine Health Score" value="92%" subtitle="+4.2% from last week" icon={Gauge} />
        <StatCard title="Active Alerts" value={isCritical ? "1" : "0"} subtitle={isCritical ? "Critical alert active" : "No critical alerts"} icon={AlertTriangle} />
        <StatCard title="Predicted Failures" value="4" subtitle="High-risk machines" icon={Wrench} />
        <StatCard title="Operational Efficiency" value="87%" subtitle="Stable performance" icon={ShieldCheck} />
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-cyan-400/10 bg-slate-950/70 p-5 shadow-lg shadow-cyan-500/10">
          <h3 className="text-lg font-semibold text-white">Live Temperature</h3>
          <div className="mt-4 text-5xl font-bold text-cyan-300">{liveTemp}°C</div>
          <p className="mt-2 text-sm text-slate-400">Real-time thermal monitoring</p>
        </div>

        <div className="rounded-2xl border border-emerald-400/10 bg-slate-950/70 p-5 shadow-lg shadow-emerald-500/10">
          <h3 className="text-lg font-semibold text-white">Live Vibration</h3>
          <div className="mt-4 text-5xl font-bold text-emerald-300">{liveVibration} Hz</div>
          <p className="mt-2 text-sm text-slate-400">Real-time vibration analysis</p>
        </div>
      </section>

      <section className="rounded-2xl border border-cyan-400/10 bg-slate-950/70 p-5 shadow-lg shadow-cyan-500/10">
        <h3 className="text-xl font-bold text-white">Predictive Maintenance Overview</h3>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {machineData.map((machine) => (
            <div key={machine.id} className="rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-white">{machine.id}</h4>
                <StatusPill status={machine.status} />
              </div>

              <p className="mt-2 text-sm text-slate-400">{machine.issue}</p>

              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-slate-400">Failure Risk</span>
                <span className="font-semibold text-cyan-300">{machine.risk}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}