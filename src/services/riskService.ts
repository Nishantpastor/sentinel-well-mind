import type { Recommendation } from "@/types";
import { apiFetch } from "./api";

export async function getOrgSummary() {
  return apiFetch("/analytics/org-summary");
}

export async function getCommanderSummary() {
  return apiFetch("/analytics/commander-summary");
}

export async function getRiskTrend() {
  return apiFetch("/analytics/risk-trend");
}

export async function getWorkloadTrend() {
  return apiFetch("/analytics/workload");
}

export async function getFatigueIndicators() {
  return apiFetch("/analytics/fatigue");
}

export async function getDeploymentDistribution() {
  return apiFetch("/analytics/deployment");
}

export async function getLeaveUtilisation() {
  return apiFetch("/analytics/leave");
}

export async function getUnitTrends() {
  return apiFetch("/analytics/unit-trends");
}

export async function getRecommendations(personnelId: string): Promise<Recommendation[]> {
  return apiFetch<Recommendation[]>(`/risk/recommendations/${personnelId}`);
}

export async function explainRisk(personnelId: string): Promise<string> {
  const res = await apiFetch<{ explanation: string }>(`/risk/explain/${personnelId}`);
  return res?.explanation || `AI analysis indicates elevated welfare risk for ${personnelId}.`;
}
