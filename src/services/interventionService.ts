import { INTERVENTIONS } from "@/data/mockData";
import type { Intervention } from "@/types";
import { apiFetch } from "./api";

export async function listInterventions(): Promise<Intervention[]> {
  try {
    return await apiFetch<Intervention[]>("/interventions");
  } catch (err) {
    console.warn("Backend listInterventions call fallback to mockData", err);
    return INTERVENTIONS;
  }
}

export async function recordIntervention(
  payload: Omit<Intervention, "id" | "restricted" | "band">,
): Promise<Intervention> {
  try {
    return await apiFetch<Intervention>("/interventions", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn("Backend recordIntervention call fallback to mockData", err);
    return {
      id: "IN-" + Math.floor(200 + Math.random() * 700),
      band: "HIGH",
      restricted: true,
      ...payload,
    };
  }
}
