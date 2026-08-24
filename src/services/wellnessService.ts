import { MY_SERIES } from "@/data/mockData";
import type { CheckIn, MonthlySeries } from "@/types";
import { apiFetch } from "./api";

export async function getMyTrends(): Promise<MonthlySeries[]> {
  try {
    return await apiFetch<MonthlySeries[]>("/wellness/trends/me");
  } catch (err) {
    console.warn("Backend getMyTrends call fallback to mockData", err);
    return MY_SERIES;
  }
}

export async function submitCheckIn(payload: CheckIn): Promise<{ ok: true; recordedAt: string }> {
  try {
    return await apiFetch<{ ok: true; recordedAt: string }>("/wellness/check-in", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn("Backend submitCheckIn call fallback", err);
    return { ok: true, recordedAt: new Date().toISOString() };
  }
}

export async function submitAssessment(
  answers: Record<string, number | string>,
): Promise<{ ok: true; supportRequested: boolean }> {
  try {
    return await apiFetch<{ ok: true; supportRequested: boolean }>("/wellness/assessment", {
      method: "POST",
      body: JSON.stringify(answers),
    });
  } catch (err) {
    console.warn("Backend submitAssessment call fallback", err);
    return { ok: true, supportRequested: answers["support"] === "yes" };
  }
}

export async function requestSupport(): Promise<{ ok: true; reference: string }> {
  try {
    return await apiFetch<{ ok: true; reference: string }>("/wellness/support/request", {
      method: "POST",
    });
  } catch (err) {
    console.warn("Backend requestSupport call fallback", err);
    return { ok: true, reference: "SR-" + Math.floor(1000 + Math.random() * 8999) };
  }
}
