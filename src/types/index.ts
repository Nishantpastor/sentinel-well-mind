export type Role = "personnel" | "welfare" | "commander" | "admin";

export type RiskBand = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export type Trend = "Stable" | "Increasing" | "Decreasing";

export interface MonthlySeries {
  month: string;
  stress: number;
  sleep: number;
  workload: number;
  dutyHours: number;
  risk: number;
}

export interface RiskFactor {
  label: string;
  value: number; // 0-100 contribution
}

export interface Personnel {
  id: string;
  unit: string;
  role: string;
  riskScore: number;
  previousScore: number;
  band: RiskBand;
  trend: Trend;
  indicators: string[];
  lastAssessment: string;
  series: MonthlySeries[];
  factors: RiskFactor[];
  deploymentDays: number;
  nightShifts: number;
  leaveTaken: number;
}

export interface Unit {
  id: string;
  name: string;
  personnel: number;
  band: RiskBand;
  trend: Trend;
  averageRisk: number;
}

export interface WelfareAlert {
  id: string;
  personnelId: string;
  unit: string;
  type: string;
  severity: RiskBand;
  score: number;
  previousScore: number;
  detectedChanges: string[];
  recommendation: string;
  raisedAt: string;
  acknowledged: boolean;
}

export type InterventionStatus =
  | "Pending"
  | "In Progress"
  | "Completed"
  | "Follow-up Required";

export interface Intervention {
  id: string;
  personnelId: string;
  band: RiskBand;
  type: string;
  officer: string;
  date: string;
  status: InterventionStatus;
  followUp: string;
  restricted: boolean;
}

export interface Recommendation {
  id: string;
  title: string;
  detail: string;
  priority: "High" | "Medium" | "Low";
}

export interface AuditEntry {
  id: string;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  result: "Authorized" | "Denied";
}

export interface CheckIn {
  stress: number;
  sleep: number;
  energy: number;
  workload: number;
  mood: string;
}
