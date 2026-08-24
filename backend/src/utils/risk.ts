export type RiskBand = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export function bandForScore(score: number): RiskBand {
  if (score <= 30) return "LOW";
  if (score <= 60) return "MODERATE";
  if (score <= 80) return "HIGH";
  return "CRITICAL";
}
