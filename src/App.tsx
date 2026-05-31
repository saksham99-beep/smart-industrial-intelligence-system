import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import AIPage from "./pages/AIPage";

import type { BackendData } from "./types/machine";
import PlaceholderPage from "./pages/PlaceHolderPage";
import SystemLogsPage from "./pages/SystemLogsPage";
import LoginPage from "./pages/LoginPage";

import DocumentUploadPage from "./pages/DocumentUploadPage";
import {
  fetchMachineStatus,
  askIndustrialAI,
  predictFailure,
} from "./api/industrialApi";

export default function SmartIndustrialDashboard() {
const [isAuthenticated, setIsAuthenticated] =
  useState(
    localStorage.getItem("industrial-auth") === "true"
  );
  const [activeTab, setActiveTab] = useState("Dashboard");

  const [liveTemp, setLiveTemp] = useState(82);
  const [liveVibration, setLiveVibration] = useState(51);

  const [backendData, setBackendData] = useState<BackendData>({
    temperature: 82,
    vibration: 51,
    risk: 50,
    status: "Stable",
  });

  const [prediction, setPrediction] = useState({
    risk_score: 0,
    status: "Stable",
    recommendation: "",
  });

  const [userQuery, setUserQuery] = useState("");

  const [aiResponse, setAiResponse] = useState(
    "Ask me about machine failures, SOPs, maintenance risks, or industrial alerts."
  );

  const isCritical =
    backendData.status === "Critical" ||
    liveTemp > 85 ||
    liveVibration > 60;

  const handleAskAI = async () => {
    if (!userQuery.trim()) return;

    try {
      const data = await askIndustrialAI(userQuery);
      setAiResponse(data.response);
      setUserQuery("");
    } catch (error) {
      setAiResponse("AI backend unavailable.");
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await fetchMachineStatus();

        setBackendData(data);
        setLiveTemp(data.temperature);
        setLiveVibration(data.vibration);

        const predictionData = await predictFailure(
          data.temperature,
          data.vibration,
          60
        );

        setPrediction(predictionData);
      } catch (error) {
        console.error("Backend fetch failed:", error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("industrial-auth", "true");
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
  localStorage.removeItem("industrial-auth");
  setIsAuthenticated(false);
};

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#02080d] text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(132,204,22,0.14),transparent_35%)]" />

      <div className="relative flex min-h-screen">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-5 lg:p-8">
          <header className="mb-8 flex flex-col gap-4 rounded-2xl border border-cyan-400/10 bg-slate-950/60 p-5 shadow-lg shadow-cyan-500/10 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-cyan-300">
                Industrial AI Control Center
              </p>

              <h2 className="text-2xl font-bold text-white md:text-3xl">
                {activeTab}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-cyan-400/10 bg-black/40 px-4 py-2 text-sm text-slate-400">
                Live Monitoring:{" "}
                <span className="text-emerald-300">Active</span>
              </div>

              <div className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
                System Online
                <button
  onClick={handleLogout}
  className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/20"
>
  Logout
</button>
              </div>
            </div>
          </header>

          {activeTab === "Dashboard" && (
            <DashboardPage
              isCritical={isCritical}
              liveTemp={liveTemp}
              liveVibration={liveVibration}
              prediction={prediction}
            />
          )}

          {activeTab === "AI Assistant" && (
            <AIPage
              userQuery={userQuery}
              setUserQuery={setUserQuery}
              aiResponse={aiResponse}
              handleAskAI={handleAskAI}
            />
          )}
{activeTab === "Predictive Maintenance" && (
  <PlaceholderPage
    title="Predictive Maintenance"
    description="ML-based failure prediction, equipment diagnostics, and maintenance recommendations will appear here."
  />
)}

{activeTab === "Analytics" && (
  <PlaceholderPage
    title="Industrial Analytics"
    description="Operational KPIs, downtime trends, risk analysis, and machine performance insights will appear here."
  />
)}

{activeTab === "Anomaly Detection" && (
  <PlaceholderPage
    title="Anomaly Detection"
    description="Real-time abnormal sensor behavior, thermal deviation, and vibration anomaly alerts will appear here."
  />
)}

{activeTab === "System Logs" && (
  <SystemLogsPage />
)}

{activeTab === "Document Upload" && (
  <DocumentUploadPage />
)}

{activeTab === "Settings" && (
  <PlaceholderPage
    title="Settings"
    description="User preferences, system configuration, API settings, and model options will appear here."
  />
)}
        </main>
      </div>
    </div>
  );
}