import axios from "axios";
import { config } from "../config/index.js";
import { logger } from "../utils/logger.js";
import { bandForScore, RiskBand } from "../utils/risk.js";

export interface MLPredictionInput {
  dutyHours: number;
  nightShifts: number;
  deploymentDays: number;
  leaveDays: number;
  trainingLoad?: number;
  stressScore: number;
  sleepScore: number;
  energyScore?: number;
  workloadScore: number;
  previousScore?: number;
}

export interface MLFactor {
  label: string;
  value: number;
}

export interface MLPredictionOutput {
  riskScore: number;
  riskLevel: RiskBand;
  trend: "Stable" | "Increasing" | "Decreasing";
  factors: MLFactor[];
  explanation: string;
  modelVersion: string;
}

export async function predictWelfareRisk(input: MLPredictionInput): Promise<MLPredictionOutput> {
  try {
    const response = await axios.post<MLPredictionOutput>(
      `${config.mlServiceUrl}/predict-risk`,
      input,
      { timeout: 3000 }
    );
    return response.data;
  } catch (error) {
    logger.warn("ML Service unavailable, using internal fallback prediction logic: %s", error);

    // Fallback prototype calculation
    const stressContrib = (Math.min(10, Math.max(1, input.stressScore)) / 10.0) * 26.0;
    const sleepContrib = ((6.0 - Math.min(5, Math.max(1, input.sleepScore))) / 5.0) * 22.0;
    const dutyContrib = (Math.min(100.0, Math.max(0.0, input.dutyHours - 150.0)) / 110.0) * 20.0;
    const nightContrib = (Math.min(25.0, Math.max(0.0, input.nightShifts)) / 25.0) * 15.0;
    const deployContrib = (Math.min(200.0, Math.max(0.0, input.deploymentDays)) / 200.0) * 10.0;
    const leaveContrib = (Math.min(12.0, Math.max(0.0, 12.0 - input.leaveDays)) / 12.0) * 7.0;

    const rawScore = stressContrib + sleepContrib + dutyContrib + nightContrib + deployContrib + leaveContrib;
    const score = Math.round(Math.min(100, Math.max(0, rawScore)));
    const band = bandForScore(score);

    const prev = input.previousScore ?? score;
    const diff = score - prev;
    const trend = diff > 2 ? "Increasing" : diff < -2 ? "Decreasing" : "Stable";

    return {
      riskScore: score,
      riskLevel: band,
      trend,
      factors: [
        { label: "Duty Hours", value: Math.round((input.dutyHours / 260.0) * 100) },
        { label: "Night Shifts", value: Math.round((input.nightShifts / 25.0) * 100) },
        { label: "Sleep Quality", value: Math.round(((6 - input.sleepScore) / 5.0) * 100) },
        { label: "Deployment Duration", value: Math.round((input.deploymentDays / 180.0) * 100) },
        { label: "Low Leave Utilisation", value: Math.round(((15 - input.leaveDays) / 15.0) * 100) },
        { label: "Reported Workload", value: Math.round((input.workloadScore / 5.0) * 100) },
      ],
      explanation: `AI analysis indicates ${band.toLowerCase()} welfare risk (Score ${score}), based on duty hours (${input.dutyHours}h), night shifts (${input.nightShifts}), and sleep deficit.`,
      modelVersion: "v1.0.0-prototype-fallback",
    };
  }
}
