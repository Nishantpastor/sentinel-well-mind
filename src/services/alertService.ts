import { ALERTS, NOTIFICATIONS } from "@/data/mockData";
import type { WelfareAlert } from "@/types";

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export async function listAlerts(): Promise<WelfareAlert[]> {
  await delay();
  return ALERTS;
}

export async function acknowledgeAlert(id: string): Promise<{ ok: true }> {
  await delay(250);
  void id;
  return { ok: true };
}

export async function listNotifications() {
  await delay(150);
  return NOTIFICATIONS;
}
