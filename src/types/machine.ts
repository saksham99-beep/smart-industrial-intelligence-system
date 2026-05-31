export type MachineStatus =
  | "Stable"
  | "Warning"
  | "Critical";

export interface Machine {
  id: string;
  status: MachineStatus;
  risk: string;
  issue: string;
}

export interface BackendData {
  temperature: number;
  vibration: number;
  risk: number;
  status: MachineStatus;
}