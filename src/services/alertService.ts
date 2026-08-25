import type { WelfareAlert } from "@/types";
import { apiFetch } from "./api";

export async function listAlerts(): Promise<WelfareAlert[]> {
  return apiFetch<WelfareAlert[]>("/alerts");
}

export async function acknowledgeAlert(id: string): Promise<{ ok: true }> {
  return apiFetch<{ ok: true }>(`/alerts/${id}/acknowledge`, {
    method: "PATCH",
  });
}

export async function listNotifications() {
  return apiFetch("/alerts/notifications");
}
