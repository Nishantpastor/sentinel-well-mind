import type { CheckIn, MonthlySeries } from "@/types";
import { apiFetch } from "./api";

export async function getMyTrends(): Promise<MonthlySeries[]> {
  return apiFetch<MonthlySeries[]>("/wellness/trends/me");
}

export async function submitCheckIn(payload: CheckIn): Promise<{ ok: true; recordedAt: string }> {
  return apiFetch<{ ok: true; recordedAt: string }>("/wellness/check-in", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function submitAssessment(
  answers: Record<string, number | string>,
): Promise<{ ok: true; supportRequested: boolean }> {
  return apiFetch<{ ok: true; supportRequested: boolean }>("/wellness/assessment", {
    method: "POST",
    body: JSON.stringify(answers),
  });
}

export async function requestSupport(): Promise<{ ok: true; reference: string }> {
  return apiFetch<{ ok: true; reference: string }>("/wellness/support/request", {
    method: "POST",
  });
}
