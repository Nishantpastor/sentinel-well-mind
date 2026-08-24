import { ALERTS, NOTIFICATIONS } from "@/data/mockData";
import type { WelfareAlert } from "@/types";
import { apiFetch } from "./api";

export async function listAlerts(): Promise<WelfareAlert[]> {
  try {
    return await apiFetch<WelfareAlert[]>("/alerts");
  } catch (err) {
    console.warn("Backend listAlerts call fallback to mockData", err);
    return ALERTS;
  }
}

export async function acknowledgeAlert(id: string): Promise<{ ok: true }> {
  try {
    return await apiFetch<{ ok: true }>(`/alerts/${id}/acknowledge`, {
      method: "PATCH",
    });
  } catch (err) {
    console.warn(`Backend acknowledgeAlert(${id}) call fallback`, err);
    return { ok: true };
  }
}

export async function listNotifications() {
  try {
    return await apiFetch("/alerts/notifications");
  } catch (err) {
    console.warn("Backend listNotifications call fallback to mockData", err);
    return NOTIFICATIONS;
  }
}
