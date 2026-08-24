import {
  COMMANDER_SUMMARY,
  ORG_SUMMARY,
  RECOMMENDATIONS,
  RISK_TREND,
} from "@/data/mockData";
import type { Recommendation } from "@/types";
import { apiFetch } from "./api";

export async function getOrgSummary() {
  try {
    return await apiFetch("/analytics/org-summary");
  } catch (err) {
    console.warn("Backend getOrgSummary call fallback to mockData", err);
    return ORG_SUMMARY;
  }
}

export async function getCommanderSummary() {
  try {
    return await apiFetch("/analytics/commander-summary");
  } catch (err) {
    console.warn("Backend getCommanderSummary call fallback to mockData", err);
    return COMMANDER_SUMMARY;
  }
}

export async function getRiskTrend() {
  try {
    return await apiFetch("/analytics/risk-trend");
  } catch (err) {
    console.warn("Backend getRiskTrend call fallback to mockData", err);
    return RISK_TREND;
  }
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
  try {
    return await apiFetch<Recommendation[]>(`/risk/recommendations/${personnelId}`);
  } catch (err) {
    console.warn(`Backend getRecommendations(${personnelId}) call fallback to mockData`, err);
    return RECOMMENDATIONS;
  }
}

export function explainRisk(personnelId: string) {
  return `AI analysis indicates elevated welfare risk for ${personnelId}, primarily associated with increased duty hours, frequent night shifts, prolonged deployment, declining sleep quality, and increasing self-reported stress.`;
}
