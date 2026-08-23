import {
  COMMANDER_SUMMARY,
  ORG_SUMMARY,
  RECOMMENDATIONS,
  RISK_TREND,
} from "@/data/mockData";
import type { Recommendation } from "@/types";

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export async function getOrgSummary() {
  await delay();
  return ORG_SUMMARY;
}

export async function getCommanderSummary() {
  await delay();
  return COMMANDER_SUMMARY;
}

export async function getRiskTrend() {
  await delay();
  return RISK_TREND;
}

export async function getRecommendations(personnelId: string): Promise<Recommendation[]> {
  await delay(250);
  void personnelId;
  return RECOMMENDATIONS;
}

export function explainRisk(personnelId: string) {
  return `AI analysis indicates elevated welfare risk for ${personnelId}, primarily associated with increased duty hours, frequent night shifts, prolonged deployment, declining sleep quality, and increasing self-reported stress.`;
}
