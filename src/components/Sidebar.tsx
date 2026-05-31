import {
  AlertTriangle,
  Bot,
  Database,
  Home,
  LineChart,
  Settings,
  Upload,
  Wrench,
  Zap,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: Home },
  { label: "AI Assistant", icon: Bot },
  { label: "Predictive Maintenance", icon: Wrench },
  { label: "Analytics", icon: LineChart },
  { label: "Anomaly Detection", icon: AlertTriangle },
  { label: "System Logs", icon: Database },
  { label: "Document Upload", icon: Upload },
  { label: "Settings", icon: Settings },
];

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="hidden w-72 border-r border-cyan-400/10 bg-black/40 p-5 backdrop-blur-xl lg:block">
      <div className="mb-10 flex items-center gap-3">
        <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300 shadow-lg shadow-cyan-500/20">
          <Zap />
        </div>

        <div>
          <h1 className="text-sm font-bold leading-tight text-white">
            SMART INDUSTRIAL
          </h1>
          <p className="text-xs text-cyan-300">INTELLIGENCE SYSTEM</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                activeTab === item.label
                  ? "bg-cyan-400/10 text-cyan-200 shadow-md shadow-cyan-500/10"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}