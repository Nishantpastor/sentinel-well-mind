import { MY_SERIES } from "@/data/mockData";
import type { CheckIn, MonthlySeries } from "@/types";

const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));

export async function getMyTrends(): Promise<MonthlySeries[]> {
  await delay();
  return MY_SERIES;
}

export async function submitCheckIn(payload: CheckIn): Promise<{ ok: true; recordedAt: string }> {
  await delay(600);
  // Placeholder: POST /api/wellness/check-in
  void payload;
  return { ok: true, recordedAt: new Date().toISOString() };
}

export async function submitAssessment(
  answers: Record<string, number | string>,
): Promise<{ ok: true; supportRequested: boolean }> {
  await delay(700);
  return { ok: true, supportRequested: answers["support"] === "yes" };
}

export async function requestSupport(): Promise<{ ok: true; reference: string }> {
  await delay(500);
  return { ok: true, reference: "SR-" + Math.floor(1000 + Math.random() * 8999) };
}
