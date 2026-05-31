import StatusPill from "../components/StatusPill";
import StatCard from "../components/StatCard";
import { machines as machineData } from "../api/mockData";
import {
  sensorData,
  downtimeData,
} from "../data/chartData";

import {
  Activity,
  AlertTriangle,
  Gauge,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

type DashboardPageProps = {
  isCritical: boolean;
  liveTemp: number;
  liveVibration: number;
  prediction: {
    risk_score: number;
    status: string;
    recommendation: string;
  };
};

export default function DashboardPage({
  isCritical,
  liveTemp,
  liveVibration,
  prediction,
}: DashboardPageProps) {
  return (
    <div className="space-y-6">
      {/* KPI CARDS */}
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Machine Health Score"
          value="92%"
          subtitle="+4.2% from last week"
          icon={Gauge}
        />

        <StatCard
          title="Active Alerts"
          value={isCritical ? "1" : "0"}
          subtitle={
            isCritical
              ? "Critical alert active"
              : "No critical alerts"
          }
          icon={AlertTriangle}
        />

        <StatCard
          title="Predicted Failures"
          value="4"
          subtitle="High-risk machines"
          icon={Wrench}
        />

        <StatCard
          title="Operational Efficiency"
          value="87%"
          subtitle="Stable performance"
          icon={ShieldCheck}
        />
      </section>

      {/* LIVE DATA */}
      <section className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-cyan-400/10 bg-slate-950/70 p-5 shadow-lg shadow-cyan-500/10">
          <h3 className="text-lg font-semibold text-white">
            Live Temperature
          </h3>

          <div className="mt-4 text-5xl font-bold text-cyan-300">
            {liveTemp}°C
          </div>

          <p className="mt-2 text-sm text-slate-400">
            Real-time thermal monitoring
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-400/10 bg-slate-950/70 p-5 shadow-lg shadow-emerald-500/10">
          <h3 className="text-lg font-semibold text-white">
            Live Vibration
          </h3>

          <div className="mt-4 text-5xl font-bold text-emerald-300">
            {liveVibration} Hz
          </div>

          <p className="mt-2 text-sm text-slate-400">
            Real-time vibration analysis
          </p>
        </div>
      </section>

      {/* ALERT PANEL */}
      <section>
        <div
          className={`rounded-2xl border p-5 shadow-lg transition-all ${
            isCritical
              ? "border-red-500/30 bg-red-500/10 shadow-red-500/20"
              : "border-emerald-500/20 bg-emerald-500/10 shadow-emerald-500/20"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">
                Industrial Alert System
              </h3>

              <p className="mt-2 text-sm text-slate-300">
                Real-time anomaly monitoring and operational
                risk analysis
              </p>
            </div>

            <div
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                isCritical
                  ? "bg-red-500/20 text-red-300"
                  : "bg-emerald-500/20 text-emerald-300"
              }`}
            >
              {isCritical
                ? "CRITICAL ALERT"
                : "SYSTEM STABLE"}
            </div>
          </div>
        </div>
      </section>

      {/* AI FAILURE PREDICTION */}
      <section>
        <div className="rounded-2xl border border-cyan-400/10 bg-slate-950/70 p-5 shadow-lg shadow-cyan-500/10">
          <h3 className="text-xl font-bold text-white">
            AI Failure Prediction
          </h3>

          <div className="mt-4 flex items-center gap-4">
            <div className="rounded-xl bg-cyan-400/10 px-4 py-3">
              <p className="text-sm text-slate-400">
                Risk Score
              </p>

              <h4 className="text-3xl font-bold text-cyan-300">
                {prediction.risk_score}%
              </h4>
            </div>

            <div className="rounded-xl bg-emerald-400/10 px-4 py-3">
              <p className="text-sm text-slate-400">
                Status
              </p>

              <h4 className="text-2xl font-bold text-emerald-300">
                {prediction.status}
              </h4>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-4">
            <p className="text-sm text-slate-300">
              {prediction.recommendation}
            </p>
          </div>
        </div>
      </section>

      {/* SENSOR MONITORING */}
      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-cyan-400/10 bg-slate-950/70 p-5 shadow-lg shadow-cyan-500/10 xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Real-Time Sensor Monitoring
              </h3>

              <p className="text-sm text-slate-400">
                Temperature, vibration, and pressure trends
              </p>
            </div>

            <Activity className="text-cyan-300" />
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sensorData}>
                <XAxis
                  dataKey="time"
                  stroke="#94a3b8"
                />

                <YAxis stroke="#94a3b8" />

                <Tooltip
                  contentStyle={{
                    background: "#020617",
                    border:
                      "1px solid rgba(34,211,238,.25)",
                    borderRadius: "12px",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke="#22d3ee"
                  fill="#22d3ee"
                  fillOpacity={0.15}
                />

                <Area
                  type="monotone"
                  dataKey="vibration"
                  stroke="#84cc16"
                  fill="#84cc16"
                  fillOpacity={0.12}
                />

                <Area
                  type="monotone"
                  dataKey="pressure"
                  stroke="#2dd4bf"
                  fill="#2dd4bf"
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* PREDICTIVE MAINTENANCE */}
      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-cyan-400/10 bg-slate-950/70 p-5 shadow-lg shadow-cyan-500/10">
          <h3 className="text-lg font-semibold text-white">
            Predictive Maintenance
          </h3>

          <p className="text-sm text-slate-400">
            ML-based failure risk prediction
          </p>

          <div className="mt-5 space-y-4">
            {machineData.map((machine) => (
              <div
                key={machine.id}
                className="rounded-xl border border-white/10 bg-black/30 p-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white">
                    {machine.id}
                  </h4>

                  <StatusPill status={machine.status} />
                </div>

                <p className="mt-2 text-sm text-slate-400">
                  {machine.issue}
                </p>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-slate-400">
                    Failure Risk
                  </span>

                  <span className="font-semibold text-cyan-300">
                    {machine.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOWNTIME ANALYTICS */}
        <div className="rounded-2xl border border-cyan-400/10 bg-slate-950/70 p-5 shadow-lg shadow-cyan-500/10">
          <h3 className="text-lg font-semibold text-white">
            Downtime Analytics
          </h3>

          <p className="text-sm text-slate-400">
            Weekly downtime by industrial unit
          </p>

          <div className="mt-5 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={downtimeData}>
                <XAxis
                  dataKey="unit"
                  stroke="#94a3b8"
                />

                <YAxis stroke="#94a3b8" />

                <Tooltip
                  contentStyle={{
                    background: "#020617",
                    border:
                      "1px solid rgba(34,211,238,.25)",
                    borderRadius: "12px",
                  }}
                />

                <Bar
                  dataKey="downtime"
                  fill="#22d3ee"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
}