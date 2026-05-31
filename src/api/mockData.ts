export const machineStats = {
  healthScore: 92,
  activeAlerts: 12,
  predictedFailures: 4,
  efficiency: 87,
};

export const machines: {
  id: string;
  status: "Critical" | "Warning" | "Stable";
  risk: number;
  temperature: number;
  vibration: number;
  issue: string;
}[] = [
  {
    id: "Unit-204",
    status: "Critical",
    risk: 89,
    temperature: 84,
    vibration: 71,
    issue: "High vibration detected",
  },
  {
    id: "Pump-A12",
    status: "Stable",
    risk: 18,
    temperature: 41,
    vibration: 22,
    issue: "Operating normally",
  },
  {
    id: "Turbine-X7",
    status: "Warning",
    risk: 64,
    temperature: 73,
    vibration: 52,
    issue: "Temperature rising",
  },
];