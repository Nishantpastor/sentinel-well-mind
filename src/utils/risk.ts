import type { RiskBand } from "@/types";

export const RISK_BANDS: { band: RiskBand; min: number; max: number }[] = [
  { band: "LOW", min: 0, max: 30 },
  { band: "MODERATE", min: 31, max: 60 },
  { band: "HIGH", min: 61, max: 80 },
  { band: "CRITICAL", min: 81, max: 100 },
];

export function bandForScore(score: number): RiskBand {
  if (score <= 30) return "LOW";
  if (score <= 60) return "MODERATE";
  if (score <= 80) return "HIGH";
  return "CRITICAL";
}

export const RISK_COLOR: Record<RiskBand, string> = {
  LOW: "var(--risk-low)",
  MODERATE: "var(--risk-moderate)",
  HIGH: "var(--risk-high)",
  CRITICAL: "var(--risk-critical)",
};

export const RISK_TEXT: Record<RiskBand, string> = {
  LOW: "text-risk-low",
  MODERATE: "text-risk-moderate",
  HIGH: "text-risk-high",
  CRITICAL: "text-risk-critical",
};

export function bandLabel(band: RiskBand) {
  return band.charAt(0) + band.slice(1).toLowerCase();
}
